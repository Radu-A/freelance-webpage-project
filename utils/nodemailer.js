const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
        user: process.env.MAILTRAP_EMAIL_DIRECTION,
        pass: process.env.MAILTRAP_EMAIL_PASS
    }
});



module.exports = transporter;

