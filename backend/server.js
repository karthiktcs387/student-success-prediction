const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/predict", (req, res) => {
    const inputData = JSON.stringify(req.body);

    const python = spawn("python3", [
        "ml_model/predict.py"
    ]);

    let result = "";
    let error = "";

    python.stdin.write(inputData);
    python.stdin.end();

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        error += data.toString();
    });

    python.on("close", () => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(JSON.parse(result));
        }
    });
});

app.listen(5000, () => {
    console.log("✅ Backend running on http://localhost:5000");
});
