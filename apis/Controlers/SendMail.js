require('dotenv').config();
const NodeMailer = require('nodemailer');

const transporter = NodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Password
  }
});

async function SendMailController(username, email, password) {
  const mailOptions = {
    from: process.env.Email_User,
    to: email,
    subject: '🎉 Welcome to the Taekwondo Application!',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #d32f2f;">👋 Welcome, ${username}!</h2>
        <p>Thank you for registering with the <strong>Taekwondo Application</strong>.</p>
        <p>Here are your login credentials:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Username:</strong> ${username}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>We're excited to have you on board. 🎯 Explore the app and take full advantage of the features built for your Taekwondo journey.</p>
        <p>Wishing you all the best,</p>
        <p>The Taekwondo App Team 🥋</p>
        <hr>
        <small>If you didn't register for this account, please ignore this email.</small>
      </div>
    `
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

async function ForgotPasswordEmail(email, tempPassword) {
  const mailOptions = {
    from: process.env.Email_User,
    to: email,
    subject: '🔐 Taekwondo App - Temporary Password Reset',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h2 style="color: #d32f2f;">Hello }!</h2>
        <p>You are receiving this email because a password reset was requested for your account.</p>
        <p>Please use the following temporary password to log in:</p>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Temporary Password:</strong> ${tempPassword}</li>
        </ul>
        <p><strong>Important:</strong> Make sure to change your password immediately after logging in.</p>
        <p>If you did not request this change, please ignore this email.</p>
        <p>Best regards,<br/>The Taekwondo App Team 🥋</p>
        <hr>
        <small>This is an automated message. Please do not reply.</small>
      </div>
    `
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

module.exports = { SendMailController, ForgotPasswordEmail };
