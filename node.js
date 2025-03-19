const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Proxy endpoint
app.post('/proxy', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    res.json({
      status: 'success',
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
