const { put } = require('@vercel/blob');
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

  if (!token) {
    return res.status(500).json({ error: 'Token not found' });
  }

  const originalFilename = 'home.json'; // Specify the original filename here
  const storageFilename = `json-data/${originalFilename}`; // Specify storage path

  try {
    const result = await put(storageFilename, content, {
      access: 'public',
      contentType: 'application/json',
      token: token
    });

    // Assuming Vercel Blob Storage appends a hash, we'll need to get the actual URL
    const uploadedFilename = result.name; // This should be the actual filename after upload

    // Construct URL with the actual uploaded filename
    const url = `https://serverless-json-test.vercel.app/json-data/${uploadedFilename}`;

    return res.status(200).json({ message: 'File uploaded successfully', url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message, token });
  }
};
