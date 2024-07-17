const { put } = require('@vercel/blob');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  //const { slug, content } = req.body;
 const  content = {
  name: "Sammy",
  email: "sammy@example.com",
  plan: "Pro"
};

  if (!content) {
    return res.status(400).json({ error: 'Slug and content are required' });
  }

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const result = await put(`json-data/home.json`, {
      data: JSON.stringify(content), // Convert the content object to a JSON string
      contentType: 'application/json',
    });

    return res.status(200).json({ message: 'File uploaded successfully', url: result.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message });
  }
};
