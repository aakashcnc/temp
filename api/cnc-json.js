const { put } = require('@vercel/blob');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, plan } = req.body;

  // Validate input data if needed
  if (!name || !email || !plan) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const content = JSON.stringify({
    name,
    email,
    plan
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
    return res.status(500).json({ error: error.message });
  }
};
