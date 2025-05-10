const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');
const router = express.Router();

router.post('/get-transcript', async (req, res) => {
    const { url } = req.body;
  console.log('run')
    try {
      const videoId = getVideoIdFromUrl(url);
      const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
      const transcriptText = transcriptArray.map(item => item.text).join(' ');
      res.json({ transcript: transcriptText });
    } catch (err) {
      console.error('Transcript fetch error:', err);
      res.status(500).json({ error: err});
    }
  });
  
  // Helper function to extract video ID from URL
  function getVideoIdFromUrl(url) {
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    if (match && match[1]) return match[1];
    throw new Error('Invalid YouTube URL');
  }

module.exports = router;


// const express = require('express');
// const { YoutubeTranscript } = require('youtube-transcript');
// const router = express.Router();

// router.post('/get-transcript', async (req, res) => {
//   const { url } = req.body;
//   console.log('Incoming URL:', url);

//   try {
//     const videoId = getVideoIdFromUrl(url);
//     console.log('Extracted video ID:', videoId);

//     const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
//     const transcriptText = transcriptArray.map(item => item.text).join(' ');
//     res.json({ transcript: transcriptText });

//   } catch (err) {
//     console.error('Transcript fetch error:', err);
//     res.status(500).json({ error: err.message });
//   }
// });

// function getVideoIdFromUrl(url) {
//   const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/;
//   const match = url.match(regex);
//   if (match && match[1]) return match[1];
//   throw new Error('Invalid YouTube URL');
// }

// module.exports = router;
