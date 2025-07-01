// routes/subscribe.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email } = req.body;
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const DATACENTER = API_KEY.split('-')[1]; // e.g. us21

  try {
    await axios.post(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        email_address: email,
        status: 'subscribed',
      },
      {
        headers: {
          Authorization: `apikey ${API_KEY}`,
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: error.response?.data?.detail || 'Mailchimp subscription failed',
    });
  }
});

module.exports = router;
