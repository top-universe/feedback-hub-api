const { Module } = require("module");
const nodemailer = require("nodemailer");

/**
 * Send an email with a template using Google SMTP.
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The email subject.
 * @param {string} template - The HTML email template.
 */
exports.sendEmailHandler = async (to, subject, template) => {
  // Create a Nodemailer transporter for Gmail SMTP.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USERNAME, //Gmail email address
      pass: process.env.GMAIL_SMTP_PASSWORD, // An app-specific password
    },
  });

  // Email data
  const mailOptions = {
    from: process.env.GMAIL_SMTP_USERNAME, // Gmail email address
    to: to,
    subject: subject,
    html: template,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};

module.export = sendEmailHandler;
