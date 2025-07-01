const express = require('express');
const axios = require('axios');
const router = express.Router();

const CHANNEL_ID = 'UCGy87gS-fERIEJK_xLcqGvw';
const API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/videos', async (req, res) => {
  try {
    const searchRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );

    const videos = searchRes.data.items.filter(
      (item) => item.id.kind === 'youtube#video'
    );

    const videoIds = videos.map((v) => v.id.videoId).join(',');

    if (!videoIds) {
      return res.status(200).json({ videos: [], details: [] });
    }

    const detailsRes = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails`
    );

    return res.status(200).json({
      videos,
      details: detailsRes.data.items,
    });
  } catch (error) {
    console.error('YouTube API error:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
});

module.exports = router;
