// updateJson.js

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001'; // Replace with your server URL

const updateJson = async (slug, content) => {
  const url = `${BASE_URL}/api/update`; // Replace with your server API endpoint
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ slug, content }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error updating JSON: ${error.message}`);
  }
};

export default updateJson;
