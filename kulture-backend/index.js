const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const subscribeRoute = require('./routes/subscribe');
const youtubeRoute = require('./routes/youtube');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API routes
// app.use('/api/subscribe', subscribeRoute);
app.use('/api/youtube', youtubeRoute);

// Serve static frontend *only in production*
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client-dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
