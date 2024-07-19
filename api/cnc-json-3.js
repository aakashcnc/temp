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

const { kv } = require('@vercel/kv');
require('dotenv').config();

module.exports = async (req, res) => {
  const token = process.env.CNC_REST_API_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Token not found' });
  }

  let kvClient;
  try {
    console.log('Initializing KV client with token:', token);
    kvClient = kv(token);  // Correct initialization
    console.log('KV client initialized successfully');
  } catch (error) {
    console.error('Error initializing KV client:', error);
    return res.status(500).json({ error: 'Error initializing KV client' });
  }

  if (req.method === 'POST') {
    // Handle POST request to store data in KV
    try {
      const data = {
        name: "Sammy",
        email: "sammy@example.com",
        plan: "Pro"
      };

      // Store data in KV with a specific key
      await kvClient.put('home.json', JSON.stringify(data), {
        ttl: 0, // Optionally set a time-to-live (TTL) for the data
      });

      // Generate a URL-like response to indicate where to retrieve the data
      const getDataUrl = `${process.env.CNC_REST_API_URL}/api/getData?key=home.json`;

      return res.status(200).json({ message: 'Data stored successfully', url: getDataUrl });
    } catch (error) {
      console.error('Error storing data:', error);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET') {
    // Handle GET request to retrieve data from KV
    const key = req.query.key;

    if (!key) {
      return res.status(400).json({ error: 'Key parameter is required' });
    }

    try {
      // Retrieve data from KV based on the provided key
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
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
