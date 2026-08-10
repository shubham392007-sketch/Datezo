import numpy as np
import pandas as pd
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def calculate_compatibility_index(row: pd.Series) -> float:
    """
    Calculates the Datezo Compatibility Index (0-100) using a transparent multi-attribute utility formula.
    
    Weights Breakdown:
    - Mutual Attractiveness: 20%
    - Shared Interests: 15%
    - Mutual Intelligence & Sincerity: 15%
    - Mutual Fun & Ambition: 15%
    - Preference Alignment: 10%
    - Perception Balance (Rating Gap): 10%
    - Background Compatibility (Race, Field, Age): 10%
    - Lifestyle Compatibility: 5%
    """
    # 1. Mutual Attraction (0-100)
    mutual_attr = float(row.get("mutual_attractiveness", (row.get("attr_of_female", 5) + row.get("attr_of_male", 5)) / 2.0))
    attr_score = np.clip((mutual_attr / 10.0) * 100.0, 0.0, 100.0)

    # 2. Shared Interests (0-100)
    shared_int = float(row.get("shared_interests", 5.0))
    interest_score = np.clip((shared_int / 10.0) * 100.0, 0.0, 100.0)

    # 3. Mutual Intelligence & Sincerity (0-100)
    mutual_intel = float(row.get("mutual_intelligence", (row.get("intel_of_female", 5) + row.get("intel_of_male", 5)) / 2.0))
    mutual_sinc = float(row.get("mutual_sincerity", (row.get("sinc_of_female", 5) + row.get("sinc_of_male", 5)) / 2.0))
    intel_sinc_score = np.clip(((mutual_intel + mutual_sinc) / 20.0) * 100.0, 0.0, 100.0)

    # 4. Mutual Fun & Ambition (0-100)
    mutual_fun = float(row.get("mutual_fun", (row.get("fun_of_female", 5) + row.get("fun_of_male", 5)) / 2.0))
    mutual_amb = float(row.get("mutual_ambition", (row.get("amb_of_female", 5) + row.get("amb_of_male", 5)) / 2.0))
    fun_amb_score = np.clip(((mutual_fun + mutual_amb) / 20.0) * 100.0, 0.0, 100.0)

    # 5. Preference Alignment (0-100)
    m_attr_align = float(row.get("male_attractiveness_alignment", 7.0))
    m_intel_align = float(row.get("male_intelligence_alignment", 7.0))
    f_attr_align = float(row.get("female_attractiveness_alignment", 7.0))
    f_intel_align = float(row.get("female_intelligence_alignment", 7.0))
    pref_score = np.clip(((m_attr_align + m_intel_align + f_attr_align + f_intel_align) / 40.0) * 100.0, 0.0, 100.0)

    # 6. Perception Balance (100 - rating gap penalty)
    rating_gap = float(row.get("overall_rating_gap", 1.0))
    balance_score = np.clip(100.0 - (rating_gap / 10.0 * 100.0), 0.0, 100.0)

    # 7. Background Compatibility
    same_race = float(row.get("same_race", 0))
    same_field = float(row.get("same_field", 0))
    age_comp = float(row.get("age_compatibility", 8.0))
    background_score = np.clip((same_race * 35.0 + same_field * 35.0 + (age_comp / 10.0) * 30.0), 0.0, 100.0)

    # 8. Lifestyle Compatibility
    life_comp = float(row.get("lifestyle_compatibility", 3.0))
    lifestyle_score = np.clip((life_comp / 4.0) * 100.0, 0.0, 100.0)

    # Weighted Sum
    compatibility_index = (
        0.20 * attr_score +
        0.15 * interest_score +
        0.15 * intel_sinc_score +
        0.15 * fun_amb_score +
        0.10 * pref_score +
        0.10 * balance_score +
        0.10 * background_score +
        0.05 * lifestyle_score
    )

    return round(float(compatibility_index), 1)

def get_compatibility_category(probability: float) -> str:
    """
    Categorizes the calibrated match probability into standard UI labels.
    """
    prob_percent = probability * 100.0 if probability <= 1.0 else probability
    if prob_percent < 30.0:
        return "Low Compatibility"
    elif prob_percent < 60.0:
        return "Moderate Compatibility"
    elif prob_percent < 80.0:
        return "High Compatibility"
    else:
        return "Very High Compatibility"

if __name__ == "__main__":
    test_row = pd.Series({
        "attr_of_female": 8.0, "attr_of_male": 8.0,
        "shared_interests": 8.5,
        "intel_of_female": 8.0, "intel_of_male": 8.0,
        "sinc_of_female": 8.0, "sinc_of_male": 8.0,
        "fun_of_female": 8.0, "fun_of_male": 8.0,
        "amb_of_female": 7.0, "amb_of_male": 7.0,
        "male_attractiveness_alignment": 8.5, "female_attractiveness_alignment": 8.5,
        "male_intelligence_alignment": 8.5, "female_intelligence_alignment": 8.5,
        "overall_rating_gap": 0.2,
        "same_race": 1, "same_field": 1, "age_compatibility": 9.0,
        "lifestyle_compatibility": 4
    })
    idx = calculate_compatibility_index(test_row)
    cat = get_compatibility_category(85.0)
    print(f"Test Compatibility Index: {idx}/100, Category: {cat}")
