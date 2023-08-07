const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const AWS = require("aws-sdk");
require("dotenv").config();

app.use(cors());
app.use(express.json());

AWS.config.update({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const s3 = new AWS.S3();
const bucketName = "pecha-audio";
const params = {
  Bucket: bucketName,
  Key: "idea.mp3",
};

// const presignedUrl = s3.getSignedUrl("getObject", params);

// console.log("Presigned URL:", presignedUrl);

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
      console.log("response ::", result);
      const fileArray = result.map((list) => {
        const key = list.audioname;
        const params = {
          Bucket: bucketName,
          Key: key,
        };
        const presignedUrl = s3.getSignedUrl("getObject", params);
        return { ...list, audioname: presignedUrl };
      });
      console.log("update array", fileArray);
      res.json(fileArray);
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
      const fileArray = result.map((list) => {
        const key = list.audioname;
        const params = {
          Bucket: bucketName,
          Key: key,
        };
        const presignedUrl = s3.getSignedUrl("getObject", params);
        return { ...list, audioname: presignedUrl };
      });
      console.log("update array", fileArray);
      res.json(fileArray);
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
