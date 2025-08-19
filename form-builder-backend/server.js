// server.js (JSON File DB Version)
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Path for db.json inside backend
const DB_FILE = path.join(__dirname, "db.json");
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ forms: [], submissions: [] }, null, 2));

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}
function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// File upload config
const upload = multer({ dest: path.join(__dirname, "uploads/") });

// Create Form
app.post("/api/forms", (req, res) => {
  const db = readDB();
  const newForm = { id: Date.now().toString(), createdAt: new Date(), ...req.body };
  db.forms.push(newForm);
  writeDB(db);
  res.json(newForm);
});

// Get Forms
app.get("/api/forms", (req, res) => {
  const db = readDB();
  res.json(db.forms);
});

// Get single form
app.get("/api/forms/:id", (req, res) => {
  const db = readDB();
  const form = db.forms.find(f => f.id === req.params.id);
  if (!form) return res.status(404).json({ error: "Form not found" });
  res.json(form);
});

// Save Submission
app.post("/api/forms/:id/submissions", (req, res) => {
  const db = readDB();
  const submission = { id: Date.now().toString(), formId: req.params.id, data: req.body, createdAt: new Date() };
  db.submissions.push(submission);
  writeDB(db);
  res.json(submission);
});

// Get Submissions
app.get("/api/forms/:id/submissions", (req, res) => {
  const db = readDB();
  const subs = db.submissions.filter(s => s.formId === req.params.id);
  res.json(subs);
});

// File upload
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ file: req.file });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
