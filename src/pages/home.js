import React, { useState } from 'react';

const Homepage = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('/api/upload-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log('Success:', data);
      setUploadStatus('File uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Error uploading file');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <br />
        <label>Plan:</label>
        <input
          type="text"
          name="plan"
          value={formData.plan}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Upload JSON</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Homepage;
