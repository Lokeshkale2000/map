const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Vercel automatically assigns PORT

app.use(cors()); // Allow cross-origin requests

// Proxy request to Nominatim API
app.get('/api/geocode', async (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ error: 'Location parameter is required.' });
  }

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch coordinates.' });
  }
});

// Start the server (Vercel will manage this part)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
