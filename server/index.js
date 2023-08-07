const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "tamdin@5921",
  database: "audios",
});

// Route to fetch unaanotated data files
app.get("/unaanotated", (req, res) => {
  const sql = "SELECT * FROM files WHERE status = 'unaanotated'";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching audio files:", err);
    } else {
      res.json(result);
    }
  });
});

// Route to fetch aanotated data files
app.get("/aanotated", (req, res) => {
  const sql = "SELECT * FROM files WHERE status != 'unaanotated'";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching audio files:", err);
    } else {
      res.json(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  const transcript = req.body.transcript;
  const sql =
    "UPDATE files SET `status` = ?, `transcript` = ? WHERE (`id` = ?)";
  db.query(sql, [status, transcript, id], (err, result) => {
    if (err) {
      console.error("Error updating files:", err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3030, () => {
  console.log("your server is running");
});
