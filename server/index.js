const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config()
app.use(cors());
app.use(express.json());


app.post('/sendResult', async (req, res) => {
  console.log('Received request:', req.body);
  const {gmail,htmlContent} = req.body;
  

   const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           user: 'rrrsahu2005@gmail.com',
           pass:process.env.EMAIL_PASS
        }
     });

     const mailOptions = {
        from: 'rrrsahu2005@gmail.com',
        to: gmail,
        subject: 'YouTube Transcriptor Result',
html: htmlContent

     };

     const response = await transporter.sendMail(mailOptions, (error) => {
        if (error) {
           console.error(error);
        } else {
           console.log('Email sent: ' );
           res.json({msg:'success'})
        }

     });

    })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
