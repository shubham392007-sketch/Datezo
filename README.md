# Datezo – AI Speed Dating Match Prediction System

**Datezo** is a production-grade machine learning system designed to predict mutual match outcomes in speed-dating events. By combining supervised match classification, calibrated match probability estimation, an interpretable multi-attribute **Datezo Compatibility Index** (0–100), and dynamic feature-based explanations, Datezo delivers robust compatibility insights for modern dating platforms.

---

## 🏗️ Project Architecture & Structure

```text
Datezo/
│
├── data/
│   ├── raw/
│   │   └── speed_dating.csv             # Raw speed dating interaction dataset
│   │
│   └── processed/
│       └── processed_speed_dating.csv   # Preprocessed & feature-engineered dataset
│
├── notebooks/
│   ├── 01_data_exploration.ipynb        # EDA, demographics & target distributions
│   ├── 02_feature_engineering.ipynb     # Feature creation & preprocessing pipeline
│   ├── 03_model_training.ipynb          # GroupKFold cross-validation & model tuning
│   └── 04_model_evaluation.ipynb        # SHAP explainability & held-out test evaluation
│
├── src/
│   ├── data_loader.py                   # Data ingestion & range quality validation
│   ├── preprocessing.py                 # Imputation, scaling & leakage prevention
│   ├── feature_engineering.py           # Domain compatibility feature creation
│   ├── train.py                         # Group-aware CV, calibration & serialization
│   ├── evaluate.py                      # Confusion matrix, test metrics & SHAP report
│   ├── predict.py                       # FastAPI-compatible production inference module
│   └── compatibility.py                 # Derived Datezo Compatibility Index formula
│
├── models/
│   ├── datezo_match_model.pkl           # Calibrated production match classifier
│   ├── datezo_preprocessor.pkl          # Serialized sklearn preprocessor pipeline
│   └── feature_metadata.json            # Model metadata, optimal threshold & feature names
│
├── reports/
│   ├── model_comparison.csv             # Cross-validation comparison leaderboard
│   ├── feature_importance.csv           # SHAP global feature importance rankings
│   └── evaluation_report.json           # Comprehensive evaluation report artifact
│
├── requirements.txt                     # Project dependencies
└── README.md                            # Project documentation
```

---

## 🎯 ML Objective & Target Definition

The primary machine learning objective is to predict whether two speed-dating participants will **mutually want a second date**:

```text
Target: match
0 = No Match (One or both participants said NO)
1 = Mutual Match (Both participants said YES)
```

---

## 🛡️ Critical Data Leakage & ID Handling Rules

1. **Target Leakage Prevention**: `male_decision` and `female_decision` are **strictly excluded** from all feature sets as they directly determine the target (`match = male_decision AND female_decision`).
2. **Participant Identifier Exclusion**: `male_id`, `female_id`, and `event_id` are excluded from the model feature matrix to prevent participant memorization. They are preserved purely for pair tracking, evaluation grouping, and recommendations.
3. **Scenario A (Post-Date Prediction)**: The primary model uses post-date ratings (`attr_of_female`, `sinc_of_female`, etc.) to predict match probability after participants interact. It cannot predict pre-date mutual matches prior to participants meeting.

---

## 💡 Feature Engineering Pipeline

The system constructs domain-specific features measuring mutual attraction and compatibility asymmetry:

- **Age Compatibility**: Smooth compatibility score derived from absolute age gap.
- **Mutual Ratings**: Average perceptions across 5 dimensions (`mutual_attractiveness`, `mutual_sincerity`, `mutual_intelligence`, `mutual_fun`, `mutual_ambition`).
- **Rating Gaps (Perception Asymmetry)**: Absolute differences in ratings (`attractiveness_gap_rating`, `sincerity_gap_rating`, etc.).
- **Preference Alignment**: Scale-normalized comparison between participant preferences (0–100) and partner traits (0–10).
- **Lifestyle Compatibility**: Behavioral similarity derived from social going-out frequencies (`rarely`=1 to `very_often`=4).
- **Overall Perception Metrics**: `overall_female_rating`, `overall_male_rating`, and `overall_rating_gap`.

---

## 📊 Datezo Compatibility Index (0–100)

In addition to model match probability, Datezo calculates an interpretable, transparent **Datezo Compatibility Index** using a multi-attribute utility formula:

$$\text{Compatibility Index} = \sum w_i \cdot S_i$$

### Dimension Weights:
- **Mutual Attractiveness**: 20%
- **Shared Interests**: 15%
- **Mutual Intelligence & Sincerity**: 15%
- **Mutual Fun & Ambition**: 15%
- **Preference Alignment**: 10%
- **Perception Balance (Rating Gap)**: 10%
- **Background Compatibility (Race, Field, Age)**: 10%
- **Lifestyle Compatibility**: 5%

---

## 🚀 Model Performance & Comparison

Models were trained and benchmarked using **5-Fold GroupKFold Cross-Validation** grouped on participant ID (`male_id`) to prevent participant leakage between training and validation folds.

| Model | Accuracy | Precision | Recall | F1 Score | ROC-AUC | PR-AUC | Log Loss | Brier Score |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Logistic Regression** | **0.7623** | **0.4066** | **0.3501** | **0.3762** | **0.7173** | **0.3866** | **0.4608** | **0.1470** |
| **Random Forest** | 0.7601 | 0.4012 | 0.3450 | 0.3710 | 0.7083 | 0.3693 | 0.4650 | 0.1485 |
| **SVM** | 0.7610 | 0.4020 | 0.3465 | 0.3722 | 0.7172 | 0.3865 | 0.4612 | 0.1472 |
| **XGBoost** | 0.7589 | 0.3980 | 0.3410 | 0.3673 | 0.7019 | 0.3659 | 0.4701 | 0.1492 |
| **LightGBM** | 0.7595 | 0.3995 | 0.3430 | 0.3691 | 0.6979 | 0.3621 | 0.4720 | 0.1498 |
| **Decision Tree** | 0.7410 | 0.3650 | 0.3210 | 0.3415 | 0.6592 | 0.3105 | 0.5210 | 0.1620 |
| **KNN** | 0.7250 | 0.3100 | 0.2850 | 0.2969 | 0.6221 | 0.2883 | 0.5530 | 0.1740 |

*Optimal Decision Threshold selected via PR-AUC / F1 tuning: **0.30***

---

## ⚡ FastAPI Production Inference API

Datezo provides a production inference module `src/predict.py` compatible with `POST /predict`.

### Sample Inference Request

```json
{
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
```

### Sample Response

```json
{
  "prediction": 1,
  "label": "MATCH",
  "match_probability": 79.1,
  "compatibility_category": "High Compatibility",
  "compatibility_index": 77.8,
  "positive_factors": [
    "High shared interests score",
    "Strong mutual attractiveness rating",
    "High mutual fun perception",
    "High mutual intelligence perception"
  ],
  "negative_factors": [
    "No major compatibility drawbacks detected"
  ]
}
```

---

## 💻 How to Run

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Data Processing & Model Training
```bash
python src/train.py
```

### 3. Run Evaluation & Generate Reports
```bash
python src/evaluate.py
```

### 4. Test Production Inference
```bash
python src/predict.py
```
