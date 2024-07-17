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
     const directoryPath = path.join(__dirname, '..', 'public', 'json-data');
    const filePath = path.join(directoryPath, `${slug}.json`);

    // Ensure the directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

    console.log(`File written to ${filePath}`);

    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error writing file:', error);
    return res.status(500).json({ error: error.message });
  }
};
