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

const express = require('express');
const { kv } = require('@vercel/kv');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/cnc-json-3', async (req, res) => {
  const token = process.env.KV_REST_API_TOKEN;

  if (!token) {
    console.error('Token not found');
    return res.status(500).json({ error: 'Token not found' });
  }

  let kvClient;
  try {
    kvClient = kv(token);
    console.log('KV client initialized successfully');
  } catch (error) {
    console.error('Error initializing KV client:', error);
    return res.status(500).json({ error: 'Error initializing KV client' });
  }

  try {
    const data = {
      name: "Sammy",
      email: "sammy@example.com",
      plan: "Pro"
    };

    await kvClient.put('home.json', JSON.stringify(data), {
      ttl: 0,
    });

    const getDataUrl = `${process.env.KV_REST_API_URL}/api/getData?key=home.json`;

    return res.status(200).json({ message: 'Data stored successfully', url: getDataUrl });
  } catch (error) {
    console.error('Error storing data:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.get('/api/cnc-json-3', async (req, res) => {
  const token = process.env.KV_REST_API_TOKEN;

  if (!token) {
    console.error('Token not found');
    return res.status(500).json({ error: 'Token not found' });
  }

  let kvClient;
  try {
    kvClient = kv(token);
    console.log('KV client initialized successfully');
  } catch (error) {
    console.error('Error initializing KV client:', error);
    return res.status(500).json({ error: 'Error initializing KV client' });
  }

  const key = req.query.key;

  if (!key) {
    return res.status(400).json({ error: 'Key parameter is required' });
  }

  try {
    const storedData = await kvClient.get(key);

    if (!storedData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    const parsedData = JSON.parse(storedData);

    return res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
