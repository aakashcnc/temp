const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const app = express();
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return res.status(500).json({ error: test" });
};

