const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');
const router = express.Router();

router.post('/get-transcript', async (req, res) => {
    const { url } = req.body;
  
    try {
      const videoId = getVideoIdFromUrl(url);
      const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
      const transcriptText = transcriptArray.map(item => item.text).join(' ');
      res.json({ transcript: transcriptText });
    } catch (error) {
      console.error('Transcript fetch error:', error);
      res.status(500).json({ error: 'Failed to fetch transcript' });
    }
  });
  
  // Helper function to extract video ID from URL
  function getVideoIdFromUrl(url) {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    if (match && match[1]) return match[1];
    throw new Error('Invalid YouTube URL');
  }

module.exports = router;
