const fetch = require('node-fetch');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const content = JSON.stringify({
    name: "Sammy",
    email: "sammy@example.com",
    plan: "Pro"
  });

  const token = process.env.CNC_READ_WRITE_TOKEN;
  //const projectId = process.env.VERCEL_PROJECT_ID; // Add your project ID

  if (!token) {
    return res.status(500).json({ error: 'Token not found' });
  }

  try {
    const response = await fetch(`https://api.vercel.com/v8/artifacts/home.json`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': content.length
      },
      body: content
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const result = await response.json();
    return res.status(200).json({ message: 'File uploaded successfully', url: result.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message });
  }
};
