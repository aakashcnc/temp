const { get } = require('@vercel/blob');
require('dotenv').config();

module.exports = async (req, res) => {
  try {
    const filename = 'home.json'; // Specify the filename that was uploaded

    const token = process.env.CNC_READ_WRITE_TOKEN;

    if (!token) {
      return res.status(500).json({ error: 'Token not found' });
    }

    const blob = await get(`json-data/${filename}`, { token });

    if (!blob) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set appropriate headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Adjust caching as needed

    // Send the JSON data as the response
    res.status(200).send(blob);
  } catch (error) {
    console.error('Error retrieving file:', error);
    return res.status(500).json({ error: error.message });
  }
};
