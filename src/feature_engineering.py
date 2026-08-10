import pandas as pd
import numpy as np
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

LIFESTYLE_MAP = {
    "rarely": 1,
    "sometimes": 2,
    "often": 3,
    "very_often": 4
}

def create_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Creates all domain-specific engineered features for Datezo match prediction.
    Operates on a copy of the input DataFrame.
    """
    df_feat = df.copy()
    
    # 1. Age Compatibility
    if "age_gap" in df_feat.columns:
        df_feat["age_compatibility"] = np.clip(10.0 - df_feat["age_gap"], 0.0, 10.0)
    elif "male_age" in df_feat.columns and "female_age" in df_feat.columns:
        df_feat["age_gap"] = (df_feat["male_age"] - df_feat["female_age"]).abs()
        df_feat["age_compatibility"] = np.clip(10.0 - df_feat["age_gap"], 0.0, 10.0)

    # 2. Mutual Ratings (Averages of perceptions)
    df_feat["mutual_attractiveness"] = (df_feat["attr_of_female"] + df_feat["attr_of_male"]) / 2.0
    df_feat["mutual_sincerity"] = (df_feat["sinc_of_female"] + df_feat["sinc_of_male"]) / 2.0
    df_feat["mutual_intelligence"] = (df_feat["intel_of_female"] + df_feat["intel_of_male"]) / 2.0
    df_feat["mutual_fun"] = (df_feat["fun_of_female"] + df_feat["fun_of_male"]) / 2.0
    df_feat["mutual_ambition"] = (df_feat["amb_of_female"] + df_feat["amb_of_male"]) / 2.0

    # 3. Rating Gaps (Asymmetry in perceptions)
    df_feat["attractiveness_gap_rating"] = (df_feat["attr_of_female"] - df_feat["attr_of_male"]).abs()
    df_feat["sincerity_gap_rating"] = (df_feat["sinc_of_female"] - df_feat["sinc_of_male"]).abs()
    df_feat["intelligence_gap_rating"] = (df_feat["intel_of_female"] - df_feat["intel_of_male"]).abs()
    df_feat["fun_gap_rating"] = (df_feat["fun_of_female"] - df_feat["fun_of_male"]).abs()
    df_feat["ambition_gap_rating"] = (df_feat["amb_of_female"] - df_feat["amb_of_male"]).abs()

    # 4. Preference Alignments (Preferences 0-100 normalized to 0-10)
    norm_male_pref_attr = df_feat["male_pref_attr"] / 10.0
    norm_male_pref_intel = df_feat["male_pref_intel"] / 10.0
    norm_female_pref_attr = df_feat["female_pref_attr"] / 10.0
    norm_female_pref_intel = df_feat["female_pref_intel"] / 10.0

    df_feat["male_attractiveness_alignment"] = 10.0 - (norm_male_pref_attr - df_feat["attr_of_female"]).abs()
    df_feat["male_intelligence_alignment"] = 10.0 - (norm_male_pref_intel - df_feat["intel_of_female"]).abs()
    df_feat["female_attractiveness_alignment"] = 10.0 - (norm_female_pref_attr - df_feat["attr_of_male"]).abs()
    df_feat["female_intelligence_alignment"] = 10.0 - (norm_female_pref_intel - df_feat["intel_of_male"]).abs()

    # 5. Lifestyle Compatibility
    male_life = df_feat["male_goes_out"].astype(str).str.lower().map(LIFESTYLE_MAP).fillna(2)
    female_life = df_feat["female_goes_out"].astype(str).str.lower().map(LIFESTYLE_MAP).fillna(2)
    
    df_feat["male_goes_out_code"] = male_life
    df_feat["female_goes_out_code"] = female_life
    df_feat["lifestyle_gap"] = (male_life - female_life).abs()
    df_feat["lifestyle_compatibility"] = 4 - df_feat["lifestyle_gap"]

    # 6. Overall Rating Features
    df_feat["overall_female_rating"] = (
        df_feat["attr_of_female"] + df_feat["sinc_of_female"] + 
        df_feat["intel_of_female"] + df_feat["fun_of_female"] + df_feat["amb_of_female"]
    ) / 5.0

    df_feat["overall_male_rating"] = (
        df_feat["attr_of_male"] + df_feat["sinc_of_male"] + 
        df_feat["intel_of_male"] + df_feat["fun_of_male"] + df_feat["amb_of_male"]
    ) / 5.0

    df_feat["overall_rating_gap"] = (df_feat["overall_female_rating"] - df_feat["overall_male_rating"]).abs()

    logger.info(f"Feature engineering completed. Resulting shape: {df_feat.shape}")
    return df_feat

if __name__ == "__main__":
    from src.data_loader import load_raw_data
    df_raw = load_raw_data()
    df_feat = create_features(df_raw)
    print("New columns created:", [c for c in df_feat.columns if c not in df_raw.columns])
