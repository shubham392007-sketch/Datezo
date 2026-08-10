import os
import json
import logging
import joblib
import numpy as np
import pandas as pd

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.feature_engineering import create_features
from src.compatibility import calculate_compatibility_index, get_compatibility_category

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

REQUIRED_FIELDS = [
    "male_age", "female_age", "same_race", "same_field", "shared_interests",
    "attr_of_female", "sinc_of_female", "intel_of_female", "fun_of_female", "amb_of_female",
    "attr_of_male", "sinc_of_male", "intel_of_male", "fun_of_male", "amb_of_male",
    "male_pref_attr", "male_pref_intel", "female_pref_attr", "female_pref_intel",
    "male_self_attr", "female_self_attr", "male_goes_out", "female_goes_out"
]

ALLOWED_LIFESTYLE = ["rarely", "sometimes", "often", "very_often"]

class DatezoPredictor:
    def __init__(self, model_dir: str = "models"):
        model_path = os.path.join(model_dir, "datezo_match_model.pkl")
        prep_path = os.path.join(model_dir, "datezo_preprocessor.pkl")
        meta_path = os.path.join(model_dir, "feature_metadata.json")
        
        if not os.path.exists(model_path) or not os.path.exists(prep_path) or not os.path.exists(meta_path):
            raise FileNotFoundError("Model artifacts missing. Please train the model using src/train.py first.")
            
        self.model = joblib.load(model_path)
        self.preprocessor = joblib.load(prep_path)
        
        with open(meta_path, "r") as f:
            self.metadata = json.load(f)
            
        self.threshold = self.metadata.get("optimal_threshold", 0.50)
        self.raw_feature_names = self.metadata.get("raw_feature_names", [])

    def validate_input(self, data: dict) -> list:
        """
        Validates input dictionary fields and value ranges.
        Returns list of error messages (empty if valid).
        """
        errors = []
        
        # Check required fields
        for field in REQUIRED_FIELDS:
            if field not in data or data[field] is None:
                errors.append(f"Missing required field: '{field}'")

        if errors:
            return errors

        # Validate numeric ranges
        if not (18 <= data["male_age"] <= 100):
            errors.append("male_age must be between 18 and 100")
        if not (18 <= data["female_age"] <= 100):
            errors.append("female_age must be between 18 and 100")

        if not (0 <= data["shared_interests"] <= 10):
            errors.append("shared_interests must be between 0 and 10")

        rating_keys = [
            "attr_of_female", "sinc_of_female", "intel_of_female", "fun_of_female", "amb_of_female",
            "attr_of_male", "sinc_of_male", "intel_of_male", "fun_of_male", "amb_of_male",
            "male_self_attr", "female_self_attr"
        ]
        for key in rating_keys:
            if not (0 <= data[key] <= 10):
                errors.append(f"{key} must be between 0 and 10")

        pref_keys = ["male_pref_attr", "male_pref_intel", "female_pref_attr", "female_pref_intel"]
        for key in pref_keys:
            if not (0 <= data[key] <= 100):
                errors.append(f"{key} must be between 0 and 100")

        if data["same_race"] not in (0, 1):
            errors.append("same_race must be 0 or 1")
        if data["same_field"] not in (0, 1):
            errors.append("same_field must be 0 or 1")

        if str(data["male_goes_out"]).lower() not in ALLOWED_LIFESTYLE:
            errors.append(f"male_goes_out must be one of {ALLOWED_LIFESTYLE}")
        if str(data["female_goes_out"]).lower() not in ALLOWED_LIFESTYLE:
            errors.append(f"female_goes_out must be one of {ALLOWED_LIFESTYLE}")

        return errors

    def generate_explanations(self, df_featured: pd.DataFrame) -> tuple:
        """
        Generates dynamic positive and negative factor explanations based on actual feature values.
        """
        row = df_featured.iloc[0]
        pos_factors = []
        neg_factors = []
        
        # Shared Interests
        if row.get("shared_interests", 0) >= 7.0:
            pos_factors.append("High shared interests score")
        elif row.get("shared_interests", 0) < 4.0:
            neg_factors.append("Low shared interests rating")
            
        # Mutual Attractiveness
        if row.get("mutual_attractiveness", 0) >= 7.5:
            pos_factors.append("Strong mutual attractiveness rating")
        elif row.get("mutual_attractiveness", 0) < 5.0:
            neg_factors.append("Low mutual attractiveness rating")
            
        # Mutual Fun & Intelligence
        if row.get("mutual_fun", 0) >= 7.5:
            pos_factors.append("High mutual fun perception")
        if row.get("mutual_intelligence", 0) >= 7.5:
            pos_factors.append("High mutual intelligence perception")
            
        # Preference Alignment
        if row.get("male_attractiveness_alignment", 0) >= 7.5 and row.get("female_attractiveness_alignment", 0) >= 7.5:
            pos_factors.append("High preference alignment for attractiveness")
            
        # Background & Lifestyle
        if row.get("same_field", 0) == 1:
            pos_factors.append("Shared academic/professional field")
        if row.get("same_race", 0) == 1:
            pos_factors.append("Shared cultural/racial background")
            
        if row.get("lifestyle_gap", 0) >= 2:
            neg_factors.append("Significant difference in social going-out frequency")
        elif row.get("lifestyle_gap", 0) == 0:
            pos_factors.append("Identical social lifestyle habits")
            
        if row.get("age_gap", 0) > 8:
            neg_factors.append("Significant age difference")

        if not pos_factors:
            pos_factors.append("Moderate overall rating compatibility")
        if not neg_factors:
            neg_factors.append("No major compatibility drawbacks detected")

        return pos_factors[:4], neg_factors[:3]

    def predict(self, pair_data: dict) -> dict:
        """
        Executes complete prediction pipeline for a single speed dating pair.
        Returns production-ready JSON output structure.
        """
        # 1. Input Validation
        validation_errors = self.validate_input(pair_data)
        if validation_errors:
            return {
                "error": "Validation Error",
                "details": validation_errors
            }
            
        # 2. DataFrame Construction & Feature Engineering
        df_input = pd.DataFrame([pair_data])
        df_featured = create_features(df_input)
        
        # 3. Calculate Datezo Compatibility Index
        comp_index = calculate_compatibility_index(df_featured.iloc[0])
        
        # 4. Preprocessing & Model Prediction
        # Ensure correct column ordering
        df_model_input = df_featured[[c for c in self.raw_feature_names if c in df_featured.columns]]
        X_proc = self.preprocessor.transform(df_model_input)
        
        prob_val = float(self.model.predict_proba(X_proc)[0, 1])
        match_probability_pct = round(prob_val * 100.0, 1)
        
        prediction = 1 if prob_val >= self.threshold else 0
        label = "MATCH" if prediction == 1 else "NO MATCH"
        
        # 5. UI Category & Explanations
        comp_category = get_compatibility_category(match_probability_pct)
        pos_factors, neg_factors = self.generate_explanations(df_featured)
        
        return {
            "prediction": prediction,
            "label": label,
            "match_probability": match_probability_pct,
            "compatibility_category": comp_category,
            "compatibility_index": comp_index,
            "positive_factors": pos_factors,
            "negative_factors": neg_factors
        }

_predictor_instance = None

def predict_match(pair_data: dict) -> dict:
    """
    Module-level inference function compatible with FastAPI POST /predict endpoint.
    """
    global _predictor_instance
    if _predictor_instance is None:
        _predictor_instance = DatezoPredictor()
    return _predictor_instance.predict(pair_data)

if __name__ == "__main__":
    sample_pair = {
        "male_age": 28,
        "female_age": 27,
        "same_race": 1,
        "same_field": 0,
        "shared_interests": 8.4,
        "attr_of_female": 8.0,
        "sinc_of_female": 7.5,
        "intel_of_female": 8.2,
        "fun_of_female": 8.0,
        "amb_of_female": 7.1,
        "attr_of_male": 8.1,
        "sinc_of_male": 7.8,
        "intel_of_male": 7.9,
        "fun_of_male": 8.3,
        "amb_of_male": 7.5,
        "male_pref_attr": 30.0,
        "male_pref_intel": 25.0,
        "female_pref_attr": 28.0,
        "female_pref_intel": 27.0,
        "male_self_attr": 8.0,
        "female_self_attr": 7.8,
        "male_goes_out": "often",
        "female_goes_out": "often"
    }
    
    # We will test prediction after training
    print("Prediction module loaded successfully.")
