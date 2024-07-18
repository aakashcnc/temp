const { put } = require('@vercel/blob');
const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const app = express();
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const JSON_URL = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
  const JSON_FILE_PATH = path.join("/var/task/public/json-data/"", 'data.json');
  const content = JSON.stringify({
    name: "Sammy",
    email: "sammy@example.com",
    plan: "Pro"
  });

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Token not found' });
  }

  try {
    const result = await put('json-data/home.json', content, {
      access: 'public',
      contentType: 'application/json',
      token: token
    });

    return res.status(200).json({ message: 'File uploaded successfully', url: result.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message, token: JSON_FILE_PATH });
  }
};
