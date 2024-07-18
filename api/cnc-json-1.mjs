import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const content = JSON.stringify({
    name: "Sammy",
    email: "sammy@example.com",
    plan: "Pro"
  });

  const token = "29uotxp2OU3tzr0LeiLjFCCM";

  if (!token) {
    return res.status(500).json({ error: 'Token not found' });
  }

  console.log('Using token:', token); // Add this line to verify the token

  try {
    const fileName = 'home.json';
    const url = `https://api.vercel.com/v8/artifacts/${fileName}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/octet-stream',
        'Content-Length': content.length.toString(),
      },
      body: Buffer.from(content, 'utf-8')
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload file: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    return res.status(200).json({ message: 'File uploaded successfully', url: result.urls[0] });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: error.message, token: token });
  }
};
