const { put } = require("@vercel/blob");
require("dotenv").config();

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const content = JSON.stringify({
    name: "Sammy",
    email: "sammy@example.com",
    plan: "Pro",
  });

  const token = process.env.CNC_READ_WRITE_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "Token not found" });
  }

  try {
    const result = await put("json-data/home.json", content, {
      access: "public",
      contentType: "application/json",
      token: token,
      headers: {
        'content-security-policy': 'default-src "none"' 
      }
    });

    return res
      .status(200)
      .json({ message: "File uploaded successfully", url: result.url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: error.message, token: token });
  }
};
