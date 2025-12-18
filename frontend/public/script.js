function predict() {
    const data = {
        Age: Number(document.getElementById("Age").value),
        Gender: document.getElementById("Gender").value,
        AttendanceRate: Number(document.getElementById("AttendanceRate").value),
        StudyHoursPerWeek: Number(document.getElementById("StudyHoursPerWeek").value),
        PreviousGPA: Number(document.getElementById("PreviousGPA").value)
    };

    fetch("https://YOUR-RENDER-BACKEND.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        document.getElementById("result").innerHTML =
            `🎯 Risk Level: <span style="color:#e74c3c">${result.predicted_risk}</span>
             <br>📊 Confidence: ${result.confidence}%`;
    })
    .catch(() => {
        document.getElementById("result").innerText =
            "❌ Unable to connect to server";
    });
}
