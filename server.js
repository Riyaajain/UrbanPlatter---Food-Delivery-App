const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());


// 🔐 LOGIN API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=? AND password=?",
        [username, password],
        (err, result) => {
            if (result.length > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }
    );
});


// 📦 SAVE ORDER API
app.post("/order", (req, res) => {
    const { username, total, payment, location, date } = req.body;

    db.query(
        "INSERT INTO orders (username, total, payment, location, date) VALUES (?, ?, ?, ?, ?)",
        [username, total, payment, location, date],
        (err) => {
            if (err) {
                res.json({ success: false });
            } else {
                res.json({ success: true });
            }
        }
    );
});


// 📄 GET ORDERS
app.get("/orders/:user", (req, res) => {
    db.query(
        "SELECT * FROM orders WHERE username=?",
        [req.params.user],
        (err, result) => {
            res.json(result);
        }
    );
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});