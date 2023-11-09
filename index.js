// index.js
const express = require('express');
const multer = require('multer');
const csvtojson = require('csvtojson');

const app = express();
const port = 3000;

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('csvFile'), (req, res) => {
  // Check if a file is uploaded
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Convert CSV to JSON
  csvtojson()
    .fromString(req.file.buffer.toString())
    .then((jsonArray) => res.status(200).json(jsonArray))
    .catch((err) => res.status(500).send('Error converting CSV to JSON.'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
