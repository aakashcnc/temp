const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug, content } = req.body;

  if (!slug || !content) {
    return res.status(400).json({ error: 'Slug and content are required' });
  }

  try {
    const filePath = path.join('/tmp', `${slug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content));

    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};