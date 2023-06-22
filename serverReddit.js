const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3004;

app.use(cors());

app.get('/reddit-posts/:searchTerm', async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const options = {
      method: 'GET',
      url: 'https://google-web-search1.p.rapidapi.com/',
      params: {
        query: searchTerm,
        limit: '20',
        related_keywords: 'true',
      },
      headers: {
          'content-type': 'application/json',
          'Content-Security-Policy': "script-src 'self' 'https://ssl.google-analytics.com';",
        'X-RapidAPI-Key': '6c4153b579msh3b88fb9e42fb3dap1c3822jsn700d8fa34f4a',
        'X-RapidAPI-Host': 'google-web-search1.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const responseData = response.data;

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
