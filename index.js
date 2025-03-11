const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 4000;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});
app.get('/sendemail', async (req, res) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: ['your-email@example.com', 'venugopal.burli@masaischool.com'],
            subject: 'Testing Mail',
            text: 'This is a testing Mail sent by NEMB43 student, no need to reply.'
        });

        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Email sending failed', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
