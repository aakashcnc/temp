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

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  try {
    const result = await put('json-data/home.json', content, {
      access: 'public', // Set access to public
      contentType: 'application/json',
      token: token // Pass the token
    });

    return res.status(200).json({ message: 'File uploaded successfully', url: result.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message });
  }
};
