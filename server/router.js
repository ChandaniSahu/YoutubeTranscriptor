// server.js or your Express route
const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.post('/get-transcript', (req, res) => {
    try{
        const youtubeUrl = req.body.url;
    console.log('rebody',youtubeUrl)
    const videoId = new URL(youtubeUrl).searchParams.get("v");

    exec(`python getTranscript.py ${videoId}`, (err, stdout, stderr) => {
        if (err) {
            console.log('errorif',err)
            return res.json({ error: stderr || err.message });
        }
        res.json({ transcript: stdout });
    });
    }
    catch(e){
        console.log('error',e)
        return res.json({ error: e.message });
    }
    
});


module.exports = router;
