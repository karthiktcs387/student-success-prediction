import os
import joblib
from flask import Flask, request, jsonify

app = Flask(__name__)

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
            value = encoders[col].classes_[0] if col in encoders else 0
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

    return jsonify({"predicted_risk": risk_map[int(prediction)]})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
