import os
import json
import logging
import joblib
import numpy as np
import pandas as pd
import shap

from sklearn.model_selection import GroupShuffleSplit
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, log_loss, brier_score_loss,
    confusion_matrix
)

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.data_loader import load_raw_data
from src.feature_engineering import create_features
from src.preprocessing import preprocess_and_save

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

RANDOM_SEED = 42

def evaluate_production_model():
    """
    Evaluates saved production model on held-out test dataset,
    computes SHAP feature importance, and outputs complete evaluation reports.
    """
    logger.info("Starting Production Model Evaluation & SHAP Analysis...")
    
    # 1. Load Data & Preprocessor
    df_raw = load_raw_data()
    df_feat = create_features(df_raw)
    
    X_raw, X_proc, y, groups, feat_cols, trans_feat_names, preprocessor = preprocess_and_save(df_feat)
    
    participant_groups = df_feat["male_id"].values
    
    # Participant-Aware Held-Out Split
    gss = GroupShuffleSplit(n_splits=1, test_size=0.20, random_state=RANDOM_SEED)
    train_idx, test_idx = next(gss.split(X_proc, y, groups=participant_groups))
    
    X_test = X_proc[test_idx]
    y_test = y[test_idx]
    
    # 2. Load Model & Metadata
    model_path = os.path.join("models", "datezo_match_model.pkl")
    meta_path = os.path.join("models", "feature_metadata.json")
    
    if not os.path.exists(model_path) or not os.path.exists(meta_path):
        raise FileNotFoundError("Trained model or metadata missing. Run src/train.py first.")
        
    model = joblib.load(model_path)
    with open(meta_path, "r") as f:
        metadata = json.load(f)
        
    threshold = metadata.get("optimal_threshold", 0.50)
    
    # 3. Model Predictions & Probability Calibration Metrics
    y_probas = model.predict_proba(X_test)[:, 1]
    y_preds = (y_probas >= threshold).astype(int)
    
    cm = confusion_matrix(y_test, y_preds)
    tn, fp, fn, tp = cm.ravel()
    
    acc = accuracy_score(y_test, y_preds)
    prec = precision_score(y_test, y_preds, zero_division=0)
    rec = recall_score(y_test, y_preds, zero_division=0)
    f1 = f1_score(y_test, y_preds, zero_division=0)
    roc_auc = roc_auc_score(y_test, y_probas)
    pr_auc = average_precision_score(y_test, y_probas)
    logloss = log_loss(y_test, y_probas)
    brier = brier_score_loss(y_test, y_probas)
    
    logger.info(f"Held-out Test Evaluation: Accuracy={acc:.4f}, Precision={prec:.4f}, Recall={rec:.4f}, F1={f1:.4f}, ROC-AUC={roc_auc:.4f}")
    
    # 4. SHAP Feature Importance Analysis
    logger.info("Computing SHAP feature importance...")
    
    # Retrieve base estimator from CalibratedClassifierCV if calibrated
    base_estimator = model.estimator if hasattr(model, "estimator") else model
    
    try:
        explainer = shap.Explainer(base_estimator, X_test[:200])
        shap_values = explainer(X_test[:200])
        vals = np.abs(shap_values.values).mean(axis=0)
        if vals.ndim > 1:
            vals = vals.mean(axis=-1)
    except Exception as e:
        logger.warning(f"SHAP Explainer fallback to summary statistics due to: {e}")
        # Fallback to feature variance/correlation magnitude
        vals = np.abs(np.corrcoef(X_test.T, y_test)[:-1, -1])
        vals = np.nan_to_num(vals)
        
    feat_imp_df = pd.DataFrame({
        "feature": trans_feat_names,
        "importance": vals
    }).sort_values(by="importance", ascending=False).reset_index(drop=True)
    feat_imp_df["rank"] = feat_imp_df.index + 1
    
    os.makedirs("reports", exist_ok=True)
    feat_imp_df.to_csv("reports/feature_importance.csv", index=False)
    logger.info("Saved feature importances to reports/feature_importance.csv")
    
    # 5. Build Complete Evaluation Report JSON
    evaluation_report = {
        "dataset_statistics": {
            "total_records": int(len(df_raw)),
            "test_records": int(len(y_test)),
            "num_features_raw": int(len(feat_cols)),
            "num_features_transformed": int(len(trans_feat_names))
        },
        "target_distribution": {
            "overall_match_rate": float(np.mean(df_raw["match"])),
            "test_match_rate": float(np.mean(y_test))
        },
        "preprocessing_strategy": {
            "numerical_imputation": "Median Imputer",
            "scaling": "StandardScaler",
            "categorical_encoding": "OneHotEncoder(handle_unknown='ignore')",
            "leakage_prevention": "Strict exclusion of male_decision, female_decision, match, and participant IDs"
        },
        "feature_engineering": [
            "Age Compatibility (age_gap)",
            "Mutual Ratings (attractiveness, sincerity, intelligence, fun, ambition)",
            "Rating Gaps (perception asymmetry)",
            "Preference Alignment (normalized pref vs ratings)",
            "Lifestyle Compatibility (going out frequency gap)",
            "Overall Ratings & Rating Gaps"
        ],
        "train_test_methodology": "GroupShuffleSplit and 5-Fold GroupKFold on participant ID (male_id) to prevent participant leakage",
        "best_model": metadata.get("model_name", "Random Forest"),
        "selected_threshold": threshold,
        "classification_metrics": {
            "accuracy": round(float(acc), 4),
            "precision": round(float(prec), 4),
            "recall": round(float(rec), 4),
            "f1_score": round(float(f1), 4),
            "roc_auc": round(float(roc_auc), 4),
            "pr_auc": round(float(pr_auc), 4),
            "log_loss": round(float(logloss), 4),
            "brier_score": round(float(brier), 4)
        },
        "confusion_matrix": {
            "true_positive": int(tp),
            "true_negative": int(tn),
            "false_positive": int(fp),
            "false_negative": int(fn),
            "interpretation": {
                "TP": "Model correctly predicted mutual match",
                "TN": "Model correctly predicted no match",
                "FP": "Model predicted match, but participants did not mutually match (False Hope)",
                "FN": "Model predicted no match, but participants actually matched (Missed Opportunity)"
            }
        },
        "top_10_features": feat_imp_df.head(10)[["feature", "importance", "rank"]].to_dict(orient="records"),
        "known_limitations": [
            "Scenario A Post-Date Prediction: Uses post-interaction ratings given after dates.",
            "Cannot predict pre-date mutual matches prior to participants meeting."
        ]
    }
    
    report_path = os.path.join("reports", "evaluation_report.json")
    with open(report_path, "w") as f:
        json.dump(evaluation_report, f, indent=2)
        
    logger.info(f"Complete evaluation report saved to {report_path}")
    return evaluation_report

if __name__ == "__main__":
    report = evaluate_production_model()
    print("--- Final Evaluation Summary ---")
    print("Metrics:", report["classification_metrics"])
    print("Confusion Matrix:", report["confusion_matrix"])
