const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('rate-limit-express');
const helmet = require('helmet');
const fs = require('fs');
const https = require('https');

// Initialize Express app
const app = express();
const port = 3000;

// Security headers
app.use(helmet());

// Allow cross-origin requests from the frontend (CORS)
app.use(cors());

// Enable parsing JSON requests
app.use(express.json());

// Rate limiting setup (100 requests per 10 minutes)
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,  // 10 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
}));

// Proxy endpoint
app.post('/proxy', async (req, res) => {
  const { url } = req.body;

  // Validate the URL
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL provided' });
  }

  try {
    // Forward the request to the target URL
    const response = await axios.get(url);

    // Return the response data back to the frontend
    res.json({
      status: 'success',
      data: response.data,
    });
  } catch (error) {
    console.error(`Proxy Error: ${error.message}`);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// URL validation function (checks for valid protocol)
function isValidUrl(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

// Create HTTPS server (you need SSL certificates)
const options = {
  key: fs.readFileSync('path/to/your/ssl/key.pem'),
  cert: fs.readFileSync('path/to/your/ssl/cert.pem'),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Secure Proxy Server running at https://localhost:${port}`);
});
