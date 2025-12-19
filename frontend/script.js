let chart;

async function predict() {
  const gpa = document.getElementById("gpa").value;
  const attendance = document.getElementById("attendance").value;
  const studyHours = document.getElementById("studyHours").value;
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  // Validation
  if (!gpa || !attendance || !studyHours) {
    alert("Please fill all fields");
    return;
  }

  loading.style.display = "block";
  result.innerHTML = "";

  try {
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

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    showResult(data.predicted_risk);
    updateChart(data.predicted_risk);
    addHistory(gpa, attendance, studyHours, data.predicted_risk);

  } catch (error) {
    alert("Backend is sleeping or unreachable. Try again in 30 seconds.");
  } finally {
    loading.style.display = "none";
  }
}

function showResult(risk) {
  const result = document.getElementById("result");
  result.className = "result " + risk.toLowerCase();
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
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

function addHistory(gpa, attendance, study, risk) {
  const row = `
    <tr>
      <td>${gpa}</td>
      <td>${attendance}%</td>
      <td>${study}</td>
      <td class="${risk.toLowerCase()}">${risk}</td>
    </tr>
  `;
  document.getElementById("history").innerHTML += row;
}
