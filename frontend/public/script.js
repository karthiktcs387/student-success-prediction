let chart;

async function predict() {
  const gpa = document.getElementById("gpa").value;
  const attendance = document.getElementById("attendance").value;
  const studyHours = document.getElementById("studyHours").value;

  const response = await fetch(
    "https://student-success-prediction-1-733v.onrender.com/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        PreviousGPA: parseFloat(gpa),
        Attendance: parseInt(attendance),
        StudyHours: parseInt(studyHours)
      })
    }
  );

  const data = await response.json();
  showResult(data.predicted_risk);
  updateChart(data.predicted_risk);
  addHistory(gpa, attendance, studyHours, data.predicted_risk);
}

function showResult(risk) {
  const result = document.getElementById("result");
  result.className = risk.toLowerCase();
  result.innerText = "Predicted Risk: " + risk;
}

function updateChart(risk) {
  const values = {
    Low: [70, 20, 10],
    Medium: [30, 50, 20],
    High: [10, 30, 60]
  };

  const ctx = document.getElementById("riskChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Low", "Medium", "High"],
      datasets: [{
        data: values[risk],
        backgroundColor: ["green", "orange", "red"]
      }]
    }
  });
}

function addHistory(gpa, attendance, study, risk) {
  const row = `
    <tr>
      <td>${gpa}</td>
      <td>${attendance}</td>
      <td>${study}</td>
      <td class="${risk.toLowerCase()}">${risk}</td>
    </tr>
  `;
  document.getElementById("history").innerHTML += row;
}
