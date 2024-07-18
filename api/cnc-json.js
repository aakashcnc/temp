const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const JSON_URL = 'https://microsoftedge.github.io/Demos/json-dummy-data/64KB.json';
const JSON_FILE_PATH = path.join(__dirname, 'data.json');

