import os
import logging
import pandas as pd
import numpy as np

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

RAW_DATA_PATH = os.path.join("data", "raw", "speed_dating.csv")

def load_raw_data(data_path: str = RAW_DATA_PATH) -> pd.DataFrame:
    """
    Loads raw speed dating dataset from CSV.
    """
    if not os.path.exists(data_path):
        raise FileNotFoundError(f"Raw data file not found at {data_path}")
    
    df = pd.read_csv(data_path)
    logger.info(f"Successfully loaded dataset from {data_path} with shape {df.shape}")
    return df

def validate_data_quality(df: pd.DataFrame) -> dict:
    """
    Performs data quality checks and statistics reporting.
    """
    report = {
        "num_rows": int(df.shape[0]),
        "num_columns": int(df.shape[1]),
        "columns": df.columns.tolist(),
        "missing_values": df.isnull().sum().to_dict(),
        "duplicate_rows": int(df.duplicated().sum()),
        "data_types": {col: str(dtype) for col, dtype in df.dtypes.items()},
        "target_distribution": df["match"].value_counts(normalize=True).to_dict() if "match" in df.columns else {},
        "range_violations": {}
    }
    
    # Range validations
    rating_cols = [
        "shared_interests", "attr_of_female", "sinc_of_female", "intel_of_female", "fun_of_female", "amb_of_female",
        "attr_of_male", "sinc_of_male", "intel_of_male", "fun_of_male", "amb_of_male",
        "male_self_attr", "female_self_attr"
    ]
    for col in rating_cols:
        if col in df.columns:
            invalid_count = int(((df[col] < 0) | (df[col] > 10)).sum())
            if invalid_count > 0:
                report["range_violations"][col] = f"{invalid_count} values outside [0, 10]"

    pref_cols = ["male_pref_attr", "male_pref_intel", "female_pref_attr", "female_pref_intel"]
    for col in pref_cols:
        if col in df.columns:
            invalid_count = int(((df[col] < 0) | (df[col] > 100)).sum())
            if invalid_count > 0:
                report["range_violations"][col] = f"{invalid_count} values outside [0, 100]"

    binary_cols = ["same_race", "same_field", "match"]
    for col in binary_cols:
        if col in df.columns:
            invalid_vals = set(df[col].dropna().unique()) - {0, 1, 0.0, 1.0}
            if invalid_vals:
                report["range_violations"][col] = f"Invalid binary values: {invalid_vals}"

    logger.info(f"Data validation completed. Duplicate rows: {report['duplicate_rows']}")
    return report

if __name__ == "__main__":
    df = load_raw_data()
    report = validate_data_quality(df)
    print("--- Data Quality Report Summary ---")
    print(f"Shape: {report['num_rows']} rows, {report['num_columns']} columns")
    print(f"Duplicates: {report['duplicate_rows']}")
    print(f"Target match distribution: {report['target_distribution']}")
