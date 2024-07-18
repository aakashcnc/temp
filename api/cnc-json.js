const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const JSON_URL = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
const JSON_FILE_PATH = path.join(__dirname, 'data.json');

app.get('/api/data', async (req, res) => {
  try {
    let jsonData;

    // Check if JSON file already exists locally
    try {
      jsonData = await fs.readFile(JSON_FILE_PATH, 'utf-8');
      console.log('Data loaded from local file');
    } catch (error) {
      // If file doesn't exist, fetch from URL
      const response = await axios.get(JSON_URL);
      jsonData = response.data;

      // Save JSON data to local file
      await fs.writeFile(JSON_FILE_PATH, JSON.stringify(jsonData));
      console.log('Data saved to local file');
    }

    res.json(jsonData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
