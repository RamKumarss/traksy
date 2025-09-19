import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

const FILE = "data.json";

// POST /save → add new data into the file
app.post("/save", (req, res) => {
  const newData = req.body;

  let existingData = [];
  if (fs.existsSync(FILE)) {
    const raw = fs.readFileSync(FILE);
    existingData = JSON.parse(raw);
  }

  // Make sure it's always an array
  if (!Array.isArray(existingData)) {
    existingData = [existingData];
  }

  // Check if a record with the same "name" already exists
  const index = existingData.findIndex(item => item.name === newData.name);

  if (index !== -1) {
    // Replace existing object
    existingData[index] = newData;
  } else {
    // Add new object
    existingData.push(newData);
  }

  // Save back to file
  fs.writeFileSync(FILE, JSON.stringify(existingData, null, 2));

  res.json({ message: "Data saved!", data: newData });
});


// GET /data → get all saved data
app.get("/data", (req, res) => {
  if (fs.existsSync(FILE)) {
    const raw = fs.readFileSync(FILE);
    const json = JSON.parse(raw);
    res.json(json);
  } else {
    res.json([]);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));