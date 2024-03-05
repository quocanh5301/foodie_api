const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using your email service provider's details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'quanhphan5301@gmail.com', // replace with your Gmail email address
    pass: 'esds zjlq pauy iaux',    // replace with your Gmail app password
  },
});

// Function to send a verification email
const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: 'quanhphan5301@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `
      <p>Click the following link to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

exports.sendVerificationEmail = async (email, verificationLink) => {
    await sendVerificationEmail(email, verificationLink)
    .then(() => {
      console.log('Verification email sent successfully.');
    })
    .catch((error) => {
      console.error('Error sending verification email:', error);
    });
}


