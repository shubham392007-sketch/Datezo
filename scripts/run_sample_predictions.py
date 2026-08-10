import sys
import json
from pathlib import Path

# Fix Windows console UTF-8 output encoding
if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Add project root to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.predict import predict_match

sample_pairs = [
    {
        "name": "Sample 1: Perfect Match (High Interest & Mutual Attraction)",
        "data": {
            "male_age": 28,
            "female_age": 27,
            "same_race": 1,
            "same_field": 1,
            "shared_interests": 9.0,
            "attr_of_female": 8.8,
            "sinc_of_female": 8.5,
            "intel_of_female": 8.5,
            "fun_of_female": 9.0,
            "amb_of_female": 8.0,
            "attr_of_male": 8.5,
            "sinc_of_male": 8.8,
            "intel_of_male": 8.7,
            "fun_of_male": 8.9,
            "amb_of_male": 8.2,
            "male_pref_attr": 30.0,
            "male_pref_intel": 20.0,
            "female_pref_attr": 25.0,
            "female_pref_intel": 25.0,
            "male_self_attr": 8.0,
            "female_self_attr": 8.5,
            "male_goes_out": "often",
            "female_goes_out": "often"
        }
    },
    {
        "name": "Sample 2: Low Compatibility (Mismatched Ratings & Lifestyle)",
        "data": {
            "male_age": 36,
            "female_age": 22,
            "same_race": 0,
            "same_field": 0,
            "shared_interests": 2.5,
            "attr_of_female": 4.0,
            "sinc_of_female": 5.0,
            "intel_of_female": 6.0,
            "fun_of_female": 3.5,
            "amb_of_female": 4.0,
            "attr_of_male": 3.5,
            "sinc_of_male": 4.5,
            "intel_of_male": 5.5,
            "fun_of_male": 4.0,
            "amb_of_male": 5.0,
            "male_pref_attr": 40.0,
            "male_pref_intel": 10.0,
            "female_pref_attr": 35.0,
            "female_pref_intel": 15.0,
            "male_self_attr": 5.0,
            "female_self_attr": 6.0,
            "male_goes_out": "rarely",
            "female_goes_out": "very_often"
        }
    },
    {
        "name": "Sample 3: Great Chemistry, Minor Lifestyle Difference",
        "data": {
            "male_age": 29,
            "female_age": 28,
            "same_race": 1,
            "same_field": 0,
            "shared_interests": 7.5,
            "attr_of_female": 7.5,
            "sinc_of_female": 8.0,
            "intel_of_female": 7.8,
            "fun_of_female": 8.2,
            "amb_of_female": 7.0,
            "attr_of_male": 7.8,
            "sinc_of_male": 7.5,
            "intel_of_male": 8.0,
            "fun_of_male": 7.9,
            "amb_of_male": 7.5,
            "male_pref_attr": 25.0,
            "male_pref_intel": 25.0,
            "female_pref_attr": 20.0,
            "female_pref_intel": 30.0,
            "male_self_attr": 7.5,
            "female_self_attr": 7.5,
            "male_goes_out": "rarely",
            "female_goes_out": "very_often"
        }
    },
    {
        "name": "Sample 4: Intellectual Connection, Moderate Physical Attraction",
        "data": {
            "male_age": 31,
            "female_age": 30,
            "same_race": 0,
            "same_field": 1,
            "shared_interests": 5.5,
            "attr_of_female": 5.5,
            "sinc_of_female": 9.0,
            "intel_of_female": 9.2,
            "fun_of_female": 6.5,
            "amb_of_female": 8.5,
            "attr_of_male": 5.8,
            "sinc_of_male": 9.2,
            "intel_of_male": 9.0,
            "fun_of_male": 6.0,
            "amb_of_male": 8.8,
            "male_pref_attr": 15.0,
            "male_pref_intel": 45.0,
            "female_pref_attr": 15.0,
            "female_pref_intel": 40.0,
            "male_self_attr": 6.0,
            "female_self_attr": 6.5,
            "male_goes_out": "sometimes",
            "female_goes_out": "sometimes"
        }
    },
    {
        "name": "Sample 5: High Physical Attraction, Low Shared Interests",
        "data": {
            "male_age": 26,
            "female_age": 25,
            "same_race": 1,
            "same_field": 0,
            "shared_interests": 3.0,
            "attr_of_female": 9.2,
            "sinc_of_female": 6.0,
            "intel_of_female": 6.5,
            "fun_of_female": 8.0,
            "amb_of_female": 5.5,
            "attr_of_male": 9.0,
            "sinc_of_male": 5.8,
            "intel_of_male": 6.2,
            "fun_of_male": 8.5,
            "amb_of_male": 5.0,
            "male_pref_attr": 50.0,
            "male_pref_intel": 10.0,
            "female_pref_attr": 45.0,
            "female_pref_intel": 10.0,
            "male_self_attr": 9.0,
            "female_self_attr": 9.0,
            "male_goes_out": "very_often",
            "female_goes_out": "often"
        }
    }
]

def run_samples():
    print("================================================================================")
    print("                       DATEZO AI MATCH PREDICTION ENGINE                        ")
    print("================================================================================")
    
    for idx, sample in enumerate(sample_pairs, start=1):
        print(f"\n--------------------------------------------------------------------------------")
        print(f"PAIR #{idx}: {sample['name']}")
        print("--------------------------------------------------------------------------------")
        
        result = predict_match(sample["data"])
        
        if "error" in result:
            print("ERROR:", result)
            continue
            
        print("+------------------------------------------------------------------+")
        print(f"| MATCH PROBABILITY:       {result['match_probability']:>5.1f}%                           |")
        print(f"| CATEGORY:                {result['compatibility_category']:<38} |")
        print(f"| COMPATIBILITY INDEX:     {result['compatibility_index']:>5.1f} / 100                          |")
        print(f"| PREDICTION:              {result['label']:<38} |")
        print("+------------------------------------------------------------------+")
        
        print("\nWhy this match?")
        for pos in result["positive_factors"]:
            print(f"  + {pos}")
            
        print("\nPotential differences:")
        for neg in result["negative_factors"]:
            print(f"  - {neg}")
            
        print("\nRaw JSON Response:")
        print(json.dumps(result, indent=2))

if __name__ == "__main__":
    run_samples()
