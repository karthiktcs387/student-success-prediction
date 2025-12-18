import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

print("STEP 1: Loading dataset...")

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "..", "dataset", "student_success_dataset.csv")

df = pd.read_csv(DATASET_PATH)

print("Dataset Loaded Successfully")
print("Columns:", df.columns.tolist())

# ---------------------------------------------------
# STEP 2: CREATE TARGET COLUMN (IMPORTANT)
# ---------------------------------------------------

df["FinalScore"] = (
    df["PreviousGPA"] * 20 +
    df["AssignmentScore"] +
    df["MidtermScore"] +
    df["ProjectScore"] +
    df["AttendanceRate"]
) / 5

def performance_label(score):
    if score >= 70:
        return "High"
    elif score >= 50:
        return "Medium"
    else:
        return "Low"

df["PerformanceLevel"] = df["FinalScore"].apply(performance_label)

# Drop helper column
df.drop(columns=["FinalScore", "StudentID"], inplace=True)

# ---------------------------------------------------
# STEP 3: FEATURES & TARGET
# ---------------------------------------------------

X = df.drop(columns=["PerformanceLevel"])
y = df["PerformanceLevel"]

# ---------------------------------------------------
# STEP 4: ENCODE CATEGORICAL FEATURES
# ---------------------------------------------------

encoders = {}

for col in X.columns:
    if X[col].dtype == "object":
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        encoders[col] = le

target_encoder = LabelEncoder()
y = target_encoder.fit_transform(y)

features = list(X.columns)

# ---------------------------------------------------
# STEP 5: TRAIN-TEST SPLIT
# ---------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ---------------------------------------------------
# STEP 6: TRAIN SMALL MODEL (<100MB)
# ---------------------------------------------------

print("Training model...")

model = RandomForestClassifier(
    n_estimators=50,
    max_depth=10,
    min_samples_split=10,
    min_samples_leaf=5,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# ---------------------------------------------------
# STEP 7: EVALUATION
# ---------------------------------------------------

y_pred = model.predict(X_test)

print(f"\nModel Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=target_encoder.classes_))

# ---------------------------------------------------
# STEP 8: SAVE MODEL FILES
# ---------------------------------------------------

joblib.dump(model, "student_model.pkl")
joblib.dump(encoders, "encoders.pkl")
joblib.dump(features, "features.pkl")
joblib.dump(target_encoder, "target_encoder.pkl")

print("\nModel & Encoders Saved Successfully")
