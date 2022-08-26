const nodemailer = require('nodemailer');

async function sendMail(reciever, template) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
  console.log('receiver', reciever);
  console.log('template', template);
  console.log('transporter', transporter);

  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: process.env.EMAIL, // sender address
      to: reciever, // list of receivers
      subject: 'Notification Baladiti ✔',
      html: template,
    },
    function (err, info) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(info);
    }
  );
}
module.exports = sendMail;
