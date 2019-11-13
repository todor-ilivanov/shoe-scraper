const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

var mailOptions = {
  from: 'script.scraper123@gmail.com',
  to: 't.ilivanov@gmail.com',
  subject: 'ladies and gentlemen... we got \'em'
};

const sendEmail = (price) => {
  mailOptions.text = `The shoes are now reduced at ${price}!`;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.sendEmail = sendEmail;