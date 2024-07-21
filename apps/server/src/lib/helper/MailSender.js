const nodemailer = require('nodemailer')
const request = require('request')

// create a transporter object using Gmail
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'camformant@gmail.com',
    pass: 'tssivkwvxugrdpsk',
  },
})

const SendEmail = (receiver, subject, context, cv_url) => {
  // fetch the PDF file from Cloudinary URL
  request.get({ uri: cv_url, encoding: null }, (error, response, body) => {
    if (error) {
      throw new Error(error.message)
    } else if (response.statusCode !== 200) {
      console.error(
        `Error fetching PDF file. Status code: ${response.statusCode}`,
      )
    } else {
      // set email options
      const mailOptions = {
        from: 'camformant@gmail.com',
        to: receiver,
        subject: subject,
        text: context,
        attachments: [
          {
            filename: 'curriculumn_vitae.pdf',
            content: body,
            contentType: 'application/pdf',
          },
        ],
      }

      // send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new Error(error.message)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    }
  })
}

module.exports = SendEmail
