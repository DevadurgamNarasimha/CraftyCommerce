require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 4000;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
app.get("/sendemail", async (req, res) => {
    try {
        let info = await transporter.sendMail({
            from: `"NEMB43 Student" <${process.env.EMAIL_USER}>`,
            to: ["devadurgam.nara@gmail.com", "venugopal.burli@masaischool.com"], // Replace with your email
            subject: "Test Email from NEMB43 Student",
            text: "This is a testing Mail sent by NEMB43 student, no need to reply."
        });

        res.json({ message: "Email sent successfully!", info });
    } catch (error) {
        res.status(500).json({ message: "Email sending failed", error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
