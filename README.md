# 🎓 Student Success Prediction System

A full-stack Machine Learning project that predicts **student academic risk (High / Medium)** using academic, demographic, and behavioral data.  
This system helps educational institutions identify at-risk students early and take preventive actions.

---

## 📌 Project Overview

Educational institutions often struggle to identify students who may face academic difficulties.  
This project uses **Machine Learning and Web Technologies** to predict student success risk based on historical student data.

The system consists of:
- A **Machine Learning model (Python)**
- A **Node.js backend**
- A **Web-based frontend interface**

---

## 🎯 Problem Statement

Manual evaluation of student performance is time-consuming and inaccurate.  
Early identification of at-risk students is essential to:
- Reduce dropout rates
- Improve academic performance
- Provide timely support

This project automates risk prediction using **predictive analytics**.

---

## 📂 Project Structure

student-success-prediction/
│
├── dataset/
│ └── student_success_dataset.csv
│
├── ml_model/
│ ├── train_model.py
│ ├── predict.py
│ └── student_model.pkl
│
├── backend/
│ └── server.js
│
├── frontend/
│ ├── public/
│ │ ├── style.css
│ │ └── script.js
│ └── views/
│ └── index.html
│
├── README.md
└── .gitignore

yaml
Copy code

---

## 📊 Dataset Description

The dataset includes the following attributes:

| Feature | Description |
|------|------------|
| Age | Student age |
| Gender | Male / Female |
| AttendanceRate | Attendance percentage |
| StudyHoursPerWeek | Weekly study hours |
| PreviousGPA | Previous academic performance |
| AssignmentScore | Assignment marks |
| EntranceExamScore | Entrance exam score |
| FamilyIncome | Socio-economic factor |
| Absences | Number of absences |
| Risk (Target) | High / Medium |

---

## 🧠 Machine Learning Model

- **Algorithm Used:** Random Forest Classifier
- **Why Random Forest?**
  - High accuracy
  - Handles both numerical and categorical data
  - Reduces overfitting
  - Ideal for classification problems

### 📈 Model Performance
- Accuracy: **~99%**
- Output Classes: **High Risk / Medium Risk**

---

## ⚙️ Technologies Used

### 🔹 Backend
- Node.js
- Express.js
- Python (child process execution)

### 🔹 Machine Learning
- Python
- Pandas
- Scikit-learn
- Joblib

### 🔹 Frontend
- HTML
- CSS
- JavaScript

### 🔹 Tools
- Visual Studio Code
- Git & GitHub
- Windows PowerShell

---

## 🚀 How to Run the Project

### 1️⃣ Train the Machine Learning Model
```bash
cd ml_model
python train_model.py
This will generate the trained model file.

2️⃣ Start Backend Server
bash
Copy code
cd backend
node server.js
Backend will run at:

arduino
Copy code
http://localhost:5000
3️⃣ Run Frontend
Open the following file in a browser:

bash
Copy code
frontend/views/index.html
Enter student details and click Predict Risk.

🖥️ Application Workflow
User enters student details in the web form

Frontend sends data to backend

Backend calls Python ML model

Model predicts student risk

Result displayed with confidence score

🌍 Real-World Applications
Student performance monitoring

Dropout prevention systems

Academic counseling support

Educational analytics platforms

🔮 Future Enhancements
Add more risk levels (Low / Medium / High)

Store predictions in a database

Admin dashboard for institutions

Cloud deployment (AWS / Azure)

Mobile app integration

👨‍🎓 Academic Relevance
Ideal for Final Year / Capstone Projects

Covers:

Machine Learning

Full-stack development

Real-world problem solving

Industry-ready project structure

✅ Conclusion
This project demonstrates how Machine Learning and Web Development can be combined to solve real-world educational problems effectively and accurately.

⭐ If you like this project, give it a star on GitHub!

yaml
Copy code

---

### ✅ Next step (do this now)
1. Paste this into `README.md`
2. Save the file  
3. Run:
```bash
git add README.md
git commit -m "Added project README"
