import React, { useState, useEffect } from 'react';

const Homepage = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: ''
  });

  useEffect(() => {
    if (uploadStatus === 'File uploaded successfully') {
      // Set initial form data to what was last uploaded successfully
      setFormData({
        name: 'Sammy',
        email: 'sammy@example.com',
        plan: 'Pro'
      });
    }
    // You can add more conditions or dependencies to customize further
  }, [uploadStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpload = () => {
    fetch('https://serverless-json-test.vercel.app/api/upload-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setUploadStatus('File uploaded successfully');
      })
      .catch(error => {
        console.error('Error:', error);
        setUploadStatus('Error uploading file');
      });
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
