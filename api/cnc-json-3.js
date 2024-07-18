// const { put } = require('@vercel/blob');
// require('dotenv').config();

// module.exports = async (req, res) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const content = JSON.stringify({
//     name: "Sammy",
//     email: "sammy@example.com",
//     plan: "Pro"
//   });

//   const token = process.env.CNC_READ_WRITE_TOKEN;

//   if (!token) {
//     return res.status(500).json({ error: 'Token not found' });
//   }

//   try {
//     const result = await put('json-data/home.json', content, {
//       access: 'public',
//       contentType: 'application/json',
//       token: token
//     });

//     return res.status(200).json({ message: 'File uploaded successfully', url: result.url });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return res.status(500).json({ error: error.message, token: token });
//   }
// };


const { put, get } = require('@vercel/blob');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // Handle file upload
    return handleFileUpload(req, res);
  } else if (req.method === 'GET') {
    // Handle file retrieval
    return handleFileRetrieval(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

async function handleFileUpload(req, res) {
  const content = JSON.stringify({
    name: "Sammy",
    email: "sammy@example.com",
    plan: "Pro"
  });

  const token = process.env.CNC_READ_WRITE_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Token not found' });
  }

  try {
    const filename = 'home.json'; // Specify the filename for storage

    const result = await put(`json-data/${filename}`, content, {
      access: 'public',
      contentType: 'application/json',
      token: token
    });

    return res.status(200).json({ message: 'File uploaded successfully', url: result.url });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message, token: token });
  }
}

async function handleFileRetrieval(req, res) {
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
}
