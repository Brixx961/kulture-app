// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


 const subscribeRoute = require('./routes/subscribe');
const youtubeRoute = require('./routes/youtube');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/subscribe', subscribeRoute);
app.use('/api/youtube', youtubeRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
