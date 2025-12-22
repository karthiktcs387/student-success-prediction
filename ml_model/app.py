import os
import joblib
from flask import Flask, request, jsonify

app = Flask(__name__)

# Absolute path (Railway + Local safe)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(BASE_DIR, "student_model.pkl"))
encoders = joblib.load(os.path.join(BASE_DIR, "encoders.pkl"))
features = joblib.load(os.path.join(BASE_DIR, "features.pkl"))

@app.route("/")
def home():
    return "Student Success Prediction API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    input_data = []

    for col in features:
        if col not in data:
            if col in encoders:
                value = encoders[col].classes_[0]
            else:
                value = 0
        else:
            value = data[col]

        if col in encoders:
            value = str(value)
            if value not in encoders[col].classes_:
                value = encoders[col].classes_[0]
            value = encoders[col].transform([value])[0]

        input_data.append(value)

    prediction = model.predict([input_data])[0]

    risk_map = {0: "Low", 1: "Medium", 2: "High"}

    return jsonify({
        "predicted_risk": risk_map.get(int(prediction), "Unknown")
    })

# ✅ THIS IS THE IMPORTANT PART
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
