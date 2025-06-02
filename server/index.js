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
html: `
<div style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
  <p style="margin: 0 0 15px 0;">Hi , Dear User</p>

  <p style="margin: 0 0 20px 0;">Here are the results of your quiz :</p>

  ${htmlContent}
  <!-- Place your dynamic quiz question blocks here -->

  <p style="margin: 30px 0 10px 0; color: #777; font-size: 14px;">
    If you're not the intended recipient, please ignore this email.
  </p>

  <p style="margin: 0; font-size: 16px;">
    Best regards,<br/>
    <strong style="color: #555;">Tech Experts </strong>
  </p>
</div>`

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
