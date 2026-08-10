import os
import nbformat as nbf

def build_notebook_1():
    nb = nbf.v4.new_notebook()
    nb.cells = [
        nbf.v4.new_markdown_cell("# 01. Datezo - Exploratory Data Analysis\n\nThis notebook performs comprehensive exploratory data analysis on the Speed Dating dataset for **Datezo**, evaluating target distributions, participant demographics, ratings, preference alignments, and feature relationships."),
        nbf.v4.new_code_cell("""import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Set style
sns.set_theme(style="whitegrid")
%matplotlib inline

# Load raw data
raw_path = os.path.join("..", "data", "raw", "speed_dating.csv")
if not os.path.exists(raw_path):
    raw_path = os.path.join("data", "raw", "speed_dating.csv")

df = pd.read_csv(raw_path)
print("Dataset Shape:", df.shape)
df.head()"""),
        nbf.v4.new_markdown_cell("## Data Quality & Summary Statistics"),
        nbf.v4.new_code_cell("""print("Missing Values per Column:")
print(df.isnull().sum()[df.isnull().sum() > 0])

print("\\nDuplicate Rows:", df.duplicated().sum())
print("Unique Male Participants:", df["male_id"].nunique())
print("Unique Female Participants:", df["female_id"].nunique())
df.describe()"""),
        nbf.v4.new_markdown_cell("## Target Variable Distribution (`match`)"),
        nbf.v4.new_code_cell("""match_counts = df["match"].value_counts()
match_pct = df["match"].value_counts(normalize=True) * 100

print(f"No Match (0): {match_counts[0]} ({match_pct[0]:.2f}%)")
print(f"Mutual Match (1): {match_counts[1]} ({match_pct[1]:.2f}%)")

plt.figure(figsize=(6, 4))
sns.countplot(data=df, x="match", palette="viridis")
plt.title("Target Distribution: Mutual Match vs No Match")
plt.xlabel("Match Status (0 = No Match, 1 = Mutual Match)")
plt.ylabel("Count")
plt.show()"""),
        nbf.v4.new_markdown_cell("## Age & Demographics Analysis"),
        nbf.v4.new_code_cell("""fig, axes = plt.subplots(1, 2, figsize=(12, 4))
sns.histplot(df["male_age"], kde=True, ax=axes[0], color="blue", bins=20)
axes[0].set_title("Male Age Distribution")

sns.histplot(df["female_age"], kde=True, ax=axes[1], color="pink", bins=20)
axes[1].set_title("Female Age Distribution")
plt.tight_layout()
plt.show()

plt.figure(figsize=(6, 4))
sns.boxplot(data=df, x="match", y="age_gap", palette="Set2")
plt.title("Age Gap Distribution by Match Outcome")
plt.show()"""),
        nbf.v4.new_markdown_cell("## Ratings & Perceptions vs Match Outcome"),
        nbf.v4.new_code_cell("""rating_cols = ["attr_of_female", "attr_of_male", "shared_interests", "intel_of_female", "intel_of_male"]
fig, axes = plt.subplots(1, len(rating_cols), figsize=(18, 4))

for idx, col in enumerate(rating_cols):
    sns.boxplot(data=df, x="match", y=col, ax=axes[idx], palette="mako")
    axes[idx].set_title(col)

plt.tight_layout()
plt.show()""")
    ]
    return nb

def build_notebook_2():
    nb = nbf.v4.new_notebook()
    nb.cells = [
        nbf.v4.new_markdown_cell("# 02. Datezo - Feature Engineering & Preprocessing\n\nThis notebook handles domain feature creation (mutual ratings, perception gaps, preference alignment, lifestyle compatibility, age compatibility) and sets up the leakage-free preprocessing pipeline."),
        nbf.v4.new_code_cell("""import os
import sys
import pandas as pd
import numpy as np

sys.path.insert(0, os.path.abspath(".."))

from src.data_loader import load_raw_data
from src.feature_engineering import create_features
from src.preprocessing import preprocess_and_save

raw_data_path = os.path.join("..", "data", "raw", "speed_dating.csv")
if not os.path.exists(raw_data_path):
    raw_data_path = os.path.join("data", "raw", "speed_dating.csv")

df_raw = pd.read_csv(raw_data_path)
print("Raw Dataset Shape:", df_raw.shape)"""),
        nbf.v4.new_markdown_cell("## Creating Domain Compatibility Features"),
        nbf.v4.new_code_cell("""df_feat = create_features(df_raw)
print("Featured Dataset Shape:", df_feat.shape)
new_cols = [c for c in df_feat.columns if c not in df_raw.columns]
print("\\nNewly Engineered Features:", new_cols)
df_feat[new_cols].head()"""),
        nbf.v4.new_markdown_cell("## Preprocessing & Scaling Pipeline"),
        nbf.v4.new_code_cell("""processed_path = os.path.join("..", "data", "processed", "processed_speed_dating.csv")
if not os.path.exists(os.path.dirname(processed_path)):
    processed_path = os.path.join("data", "processed", "processed_speed_dating.csv")

X_raw, X_proc, y, groups, feat_cols, trans_feat_names, preprocessor = preprocess_and_save(df_feat, processed_data_path=processed_path)

print("Preprocessed Matrix Shape:", X_proc.shape)
print("Transformed Feature Names Count:", len(trans_feat_names))
print("Sample Transformed Features:", trans_feat_names[:10])""")
    ]
    return nb

def build_notebook_3():
    nb = nbf.v4.new_notebook()
    nb.cells = [
        nbf.v4.new_markdown_cell("# 03. Datezo - Model Training & Cross-Validation\n\nThis notebook executes Group-Aware train/test splitting, trains 7 ML models via 5-Fold GroupKFold cross-validation, calibrates match probabilities, tunes decision thresholds, and serializes the production model."),
        nbf.v4.new_code_cell("""import os
import sys
import pandas as pd

sys.path.insert(0, os.path.abspath(".."))

from src.train import train_and_evaluate_models

print("Executing complete model training pipeline...")
df_comp, calibrated_model, metadata = train_and_evaluate_models()"""),
        nbf.v4.new_markdown_cell("## Model Comparison Leaderboard"),
        nbf.v4.new_code_cell("""print("--- Datezo Model Comparison Leaderboard ---")
display(df_comp)"""),
        nbf.v4.new_markdown_cell("## Selected Best Model & Metadata"),
        nbf.v4.new_code_cell("""print("Best Selected Model:", metadata["model_name"])
print("Optimal Decision Threshold:", metadata["optimal_threshold"])
print("Test ROC-AUC:", metadata["test_roc_auc"])
print("Test F1 Score:", metadata["test_f1"])""")
    ]
    return nb

def build_notebook_4():
    nb = nbf.v4.new_notebook()
    nb.cells = [
        nbf.v4.new_markdown_cell("# 04. Datezo - Model Evaluation & Explainability\n\nThis notebook evaluates the serialized Datezo production model on the held-out test set, performs SHAP feature importance analysis, and tests the end-to-end inference prediction interface."),
        nbf.v4.new_code_cell("""import os
import sys
import json
import pandas as pd

sys.path.insert(0, os.path.abspath(".."))

from src.evaluate import evaluate_production_model
from src.predict import predict_match

print("Executing production model evaluation...")
report = evaluate_production_model()"""),
        nbf.v4.new_markdown_cell("## Classification Metrics & Confusion Matrix"),
        nbf.v4.new_code_cell("""print("Held-out Test Metrics:")
for k, v in report["classification_metrics"].items():
    print(f"  {k:<15}: {v}")

print("\\nConfusion Matrix Breakdown:")
for k, v in report["confusion_matrix"].items():
    if k != "interpretation":
        print(f"  {k:<15}: {v}")"""),
        nbf.v4.new_markdown_cell("## SHAP Feature Importances"),
        nbf.v4.new_code_cell("""feat_imp_path = os.path.join("..", "reports", "feature_importance.csv")
if not os.path.exists(feat_imp_path):
    feat_imp_path = os.path.join("reports", "feature_importance.csv")

df_imp = pd.read_csv(feat_imp_path)
print("Top 10 Most Important Features:")
display(df_imp.head(10))"""),
        nbf.v4.new_markdown_cell("## End-to-End Prediction Interface Demo"),
        nbf.v4.new_code_cell("""sample_pair = {
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

res = predict_match(sample_pair)
print(json.dumps(res, indent=2))""")
    ]
    return nb

if __name__ == "__main__":
    os.makedirs("notebooks", exist_ok=True)
    
    nbf.write(build_notebook_1(), os.path.join("notebooks", "01_data_exploration.ipynb"))
    nbf.write(build_notebook_2(), os.path.join("notebooks", "02_feature_engineering.ipynb"))
    nbf.write(build_notebook_3(), os.path.join("notebooks", "03_model_training.ipynb"))
    nbf.write(build_notebook_4(), os.path.join("notebooks", "04_model_evaluation.ipynb"))
    print("All 4 Jupyter Notebooks generated successfully in notebooks/")
