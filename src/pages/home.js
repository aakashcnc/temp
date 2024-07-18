import React, { useState } from 'react';

const Homepage = () => {
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleUpload = () => {
    fetch('https://serverless-json-test.vercel.app/api/upload-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Sammy',
        email: 'sammy@example.com',
        plan: 'Pro'
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setUploadStatus('File uploaded successfully');
        // Handle success response from server
      })
      .catch(error => {
        console.error('Error:', error);
        setUploadStatus('Error uploading file');
        // Handle error
      });
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload JSON</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default Homepage;
