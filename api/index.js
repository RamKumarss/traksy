import express from "express";
import fs from "fs";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

const FILE = "data.json";

// POST /api/save
app.post("/save", (req, res) => {
  const newData = req.body;

  let existingData = [];
  if (fs.existsSync(FILE)) {
    const raw = fs.readFileSync(FILE);
    existingData = JSON.parse(raw);
  }

  if (!Array.isArray(existingData)) {
    existingData = [existingData];
  }

  existingData.push(newData);

  fs.writeFileSync(FILE, JSON.stringify(existingData, null, 2));
  res.json({ message: "Data saved!", data: newData });
});

// GET /api/data
app.get("/data", (req, res) => {
  if (fs.existsSync(FILE)) {
    const raw = fs.readFileSync(FILE);
    res.json(JSON.parse(raw));
  } else {
    res.json([]);
  }
});

// Export serverless handler
export default serverless(app);
