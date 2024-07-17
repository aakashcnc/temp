const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug, content } = req.body;

  if (!slug || !content) {
    return res.status(400).json({ error: 'Slug and content are required' });
  }

  try {
    const result = await put(`json-data/${slug}.json`, {
      data: JSON.stringify(content, null, 2),
      contentType: 'application/json',
    });

    return res.status(200).json({ message: 'File uploaded successfully', url: result.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message });
  }
};
