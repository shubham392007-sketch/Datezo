import os
import logging
import joblib
import pandas as pd
import numpy as np

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Mandatory exclusions for target leakage & participant memorization
EXCLUDE_COLUMNS = ["male_decision", "female_decision", "match", "male_id", "female_id", "event_id"]

def get_feature_columns(df: pd.DataFrame) -> list:
    """
    Returns list of predictor feature names after excluding target and leakage columns.
    """
    return [col for col in df.columns if col not in EXCLUDE_COLUMNS]

def build_preprocessor_pipeline(numerical_cols: list, categorical_cols: list) -> ColumnTransformer:
    """
    Builds a reproducible sklearn ColumnTransformer preprocessor.
    - Numerical: Median Imputer + StandardScaler
    - Categorical: Most Frequent Imputer + OneHotEncoder
    """
    num_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])
    
    cat_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
    ])
    
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", num_pipeline, numerical_cols),
            ("cat", cat_pipeline, categorical_cols)
        ],
        remainder="drop"
    )
    
    return preprocessor

def preprocess_and_save(df_featured: pd.DataFrame, processed_data_path: str = os.path.join("data", "processed", "processed_speed_dating.csv")) -> tuple:
    """
    Preprocesses dataset, saves processed CSV, and returns (X, y, groups, preprocessor).
    """
    if "match" not in df_featured.columns:
        raise ValueError("Dataset missing target column 'match'")
        
    y = df_featured["match"].values
    groups = df_featured["male_id"].astype(str) + "_" + df_featured["female_id"].astype(str) if ("male_id" in df_featured.columns and "female_id" in df_featured.columns) else df_featured.index
    
    feature_cols = get_feature_columns(df_featured)
    X_raw = df_featured[feature_cols].copy()
    
    categorical_cols = [c for c in ["male_goes_out", "female_goes_out"] if c in feature_cols]
    numerical_cols = [c for c in feature_cols if c not in categorical_cols]
    
    preprocessor = build_preprocessor_pipeline(numerical_cols, categorical_cols)
    X_processed = preprocessor.fit_transform(X_raw)
    
    # Extract transformed feature names
    cat_encoder = preprocessor.named_transformers_["cat"].named_steps["encoder"]
    encoded_cat_names = cat_encoder.get_feature_names_out(categorical_cols).tolist() if categorical_cols else []
    all_transformed_feature_names = numerical_cols + encoded_cat_names
    
    # Create processed dataframe
    df_processed = pd.DataFrame(X_processed, columns=all_transformed_feature_names)
    df_processed["match"] = y
    
    if "male_id" in df_featured.columns:
        df_processed["male_id"] = df_featured["male_id"].values
    if "female_id" in df_featured.columns:
        df_processed["female_id"] = df_featured["female_id"].values
    if "event_id" in df_featured.columns:
        df_processed["event_id"] = df_featured["event_id"].values
        
    os.makedirs(os.path.dirname(processed_data_path), exist_ok=True)
    df_processed.to_csv(processed_data_path, index=False)
    logger.info(f"Saved processed dataset to {processed_data_path} with shape {df_processed.shape}")
    
    # Save preprocessor artifact
    model_dir = "models"
    os.makedirs(model_dir, exist_ok=True)
    joblib.dump(preprocessor, os.path.join(model_dir, "datezo_preprocessor.pkl"))
    logger.info("Saved preprocessor to models/datezo_preprocessor.pkl")
    
    return X_raw, X_processed, y, groups, feature_cols, all_transformed_feature_names, preprocessor

if __name__ == "__main__":
    from src.data_loader import load_raw_data
    from src.feature_engineering import create_features
    df_raw = load_raw_data()
    df_feat = create_features(df_raw)
    X_raw, X_proc, y, groups, feat_cols, trans_feat_names, prep = preprocess_and_save(df_feat)
    print(f"Preprocessed X shape: {X_proc.shape}, y shape: {y.shape}")
    print(f"Transformed features count: {len(trans_feat_names)}")
