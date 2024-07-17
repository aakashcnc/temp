const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug, content } = req.body;

  // Log the slug and content
  console.log('Received slug:', slug);
  console.log('Received content:', content);

  if (!slug || !content) {
    return res.status(400).json({ error: 'Slug and content are required' });
  }

};
