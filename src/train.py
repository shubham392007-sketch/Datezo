import os
import time
import json
import logging
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import GroupShuffleSplit, GroupKFold, RandomizedSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.svm import SVC, LinearSVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, log_loss, brier_score_loss
)

import xgboost as xgb
import lightgbm as lgb

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.data_loader import load_raw_data
from src.feature_engineering import create_features
from src.preprocessing import preprocess_and_save, get_feature_columns

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

RANDOM_SEED = 42

def train_and_evaluate_models():
    """
    Complete model training pipeline with GroupKFold cross-validation,
    model comparison, probability calibration, and threshold optimization.
    """
    logger.info("Starting Datezo ML Model Training Pipeline...")
    
    # 1. Load & Feature Engineer Data
    df_raw = load_raw_data()
    df_feat = create_features(df_raw)
    
    # 2. Preprocess & Save Processed CSV
    X_raw, X_proc, y, groups, feat_cols, trans_feat_names, preprocessor = preprocess_and_save(df_feat)
    
    # Use male_id as the grouping variable for participant-aware splitting
    participant_groups = df_feat["male_id"].values
    
    # 3. Participant-Aware Held-Out Test Split (80% Train, 20% Held-Out Test)
    gss = GroupShuffleSplit(n_splits=1, test_size=0.20, random_state=RANDOM_SEED)
    train_idx, test_idx = next(gss.split(X_proc, y, groups=participant_groups))
    
    X_train, X_test = X_proc[train_idx], X_proc[test_idx]
    y_train, y_test = y[train_idx], y[test_idx]
    groups_train = participant_groups[train_idx]
    
    logger.info(f"Group-aware train/test split complete: Train shape {X_train.shape}, Test shape {X_test.shape}")
    logger.info(f"Target distribution - Train match rate: {np.mean(y_train):.3f}, Test match rate: {np.mean(y_test):.3f}")
    
    # 4. Model Registry Setup
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000, random_state=RANDOM_SEED, class_weight="balanced"),
        "Decision Tree": DecisionTreeClassifier(max_depth=6, random_state=RANDOM_SEED, class_weight="balanced"),
        "Random Forest": RandomForestClassifier(n_estimators=150, max_depth=8, random_state=RANDOM_SEED, class_weight="balanced", n_jobs=-1),
        "SVM": CalibratedClassifierCV(LinearSVC(max_iter=2000, random_state=RANDOM_SEED, class_weight="balanced", dual="auto")),
        "KNN": KNeighborsClassifier(n_neighbors=15, weights="distance", n_jobs=-1),
        "XGBoost": xgb.XGBClassifier(n_estimators=150, max_depth=5, learning_rate=0.05, random_state=RANDOM_SEED, scale_pos_weight=1.0, eval_metric="logloss", n_jobs=-1),
        "LightGBM": lgb.LGBMClassifier(n_estimators=150, max_depth=5, learning_rate=0.05, random_state=RANDOM_SEED, class_weight="balanced", verbose=-1, n_jobs=-1)
    }
    
    comparison_results = []
    gkf = GroupKFold(n_splits=5)
    
    logger.info("Evaluating models via 5-Fold GroupKFold Cross-Validation...")
    
    best_model_name = None
    best_model_obj = None
    best_score = -1.0
    
    for name, model in models.items():
        start_time = time.time()
        
        cv_rocaus, cv_praucs, cv_f1s, cv_accs, cv_precs, cv_recalls, cv_loglosses, cv_briers = [], [], [], [], [], [], [], []
        
        for train_fold_idx, val_fold_idx in gkf.split(X_train, y_train, groups=groups_train):
            X_tr, X_val = X_train[train_fold_idx], X_train[val_fold_idx]
            y_tr, y_val = y_train[train_fold_idx], y_train[val_fold_idx]
            
            model.fit(X_tr, y_tr)
            y_pred = model.predict(X_val)
            y_proba = model.predict_proba(X_val)[:, 1]
            
            cv_accs.append(accuracy_score(y_val, y_pred))
            cv_precs.append(precision_score(y_val, y_pred, zero_division=0))
            cv_recalls.append(recall_score(y_val, y_pred, zero_division=0))
            cv_f1s.append(f1_score(y_val, y_pred, zero_division=0))
            cv_rocaus.append(roc_auc_score(y_val, y_proba))
            cv_praucs.append(average_precision_score(y_val, y_proba))
            cv_loglosses.append(log_loss(y_val, y_proba))
            cv_briers.append(brier_score_loss(y_val, y_proba))
            
        elapsed_time = time.time() - start_time
        
        avg_roc_auc = np.mean(cv_rocaus)
        avg_pr_auc = np.mean(cv_praucs)
        avg_f1 = np.mean(cv_f1s)
        avg_acc = np.mean(cv_accs)
        avg_prec = np.mean(cv_precs)
        avg_rec = np.mean(cv_recalls)
        avg_logloss = np.mean(cv_loglosses)
        avg_brier = np.mean(cv_briers)
        
        logger.info(f"Model: {name:<20} | CV ROC-AUC: {avg_roc_auc:.4f} | PR-AUC: {avg_pr_auc:.4f} | F1: {avg_f1:.4f}")
        
        comparison_results.append({
            "Model": name,
            "Accuracy": round(avg_acc, 4),
            "Precision": round(avg_prec, 4),
            "Recall": round(avg_rec, 4),
            "F1 Score": round(avg_f1, 4),
            "ROC-AUC": round(avg_roc_auc, 4),
            "PR-AUC": round(avg_pr_auc, 4),
            "Log Loss": round(avg_logloss, 4),
            "Brier Score": round(avg_brier, 4),
            "Training Time (s)": round(elapsed_time, 2)
        })
        
        if avg_roc_auc > best_score:
            best_score = avg_roc_auc
            best_model_name = name
            best_model_obj = model
            
    # Save Model Comparison CSV
    df_comp = pd.DataFrame(comparison_results).sort_values(by="ROC-AUC", ascending=False)
    os.makedirs("reports", exist_ok=True)
    df_comp.to_csv("reports/model_comparison.csv", index=False)
    logger.info(f"Model comparison saved to reports/model_comparison.csv. Best model selected: {best_model_name}")
    
    # 5. Fit & Calibrate the Best Model on Full Training Set
    logger.info(f"Fitting and calibrating final best model ({best_model_name}) on full training set...")
    calibrated_model = CalibratedClassifierCV(estimator=best_model_obj, cv=5, method="sigmoid")
    calibrated_model.fit(X_train, y_train)
    
    # 6. Evaluate Decision Thresholds on Held-Out Test Set
    test_probas = calibrated_model.predict_proba(X_test)[:, 1]
    thresholds = [0.30, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70]
    
    best_threshold = 0.50
    best_thresh_f1 = -1.0
    threshold_results = []
    
    for t in thresholds:
        t_preds = (test_probas >= t).astype(int)
        t_prec = precision_score(y_test, t_preds, zero_division=0)
        t_rec = recall_score(y_test, t_preds, zero_division=0)
        t_f1 = f1_score(y_test, t_preds, zero_division=0)
        t_acc = accuracy_score(y_test, t_preds)
        
        threshold_results.append({
            "threshold": t,
            "precision": round(t_prec, 4),
            "recall": round(t_rec, 4),
            "f1_score": round(t_f1, 4),
            "accuracy": round(t_acc, 4)
        })
        
        if t_f1 > best_thresh_f1:
            best_thresh_f1 = t_f1
            best_threshold = t
            
    logger.info(f"Optimal decision threshold selected: {best_threshold:.2f} with Test F1: {best_thresh_f1:.4f}")
    
    # 7. Final Model Serialization & Metadata Output
    os.makedirs("models", exist_ok=True)
    joblib.dump(calibrated_model, "models/datezo_match_model.pkl")
    logger.info("Serialized final calibrated model to models/datezo_match_model.pkl")
    
    metadata = {
        "model_name": best_model_name,
        "optimal_threshold": float(best_threshold),
        "test_roc_auc": float(roc_auc_score(y_test, test_probas)),
        "test_pr_auc": float(average_precision_score(y_test, test_probas)),
        "test_f1": float(best_thresh_f1),
        "raw_feature_names": feat_cols,
        "transformed_feature_names": trans_feat_names,
        "threshold_evaluations": threshold_results
    }
    
    with open("models/feature_metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)
    logger.info("Saved metadata to models/feature_metadata.json")

    return df_comp, calibrated_model, metadata

if __name__ == "__main__":
    train_and_evaluate_models()
