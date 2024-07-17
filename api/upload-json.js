const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug, content } = req.body;



  if (!slug || !content) {
    return res.status(400).json({ error: 'Slug and content are required' });
  }
   return res.status(200).json({ 
      message: 'File uploaded successfully', 
      slug: slug, 
      content: content 
    });

};
