// import nodemailer from 'nodemailer'
// import aws from 'aws-sdk'

// const transporter = nodemailer.createTransport({
//     SES: new aws.SES({
//         region: 'us-west-2',
//         apiVersion: '2010-12-01'
//     })
// });

// const sendMail = ({
//     email, 
//     subject, 
//     html, 
//     from = "Ironmental Manager<no-reply@ironmental.net>"
// }) => {
//     return transporter.sendMail({
//         from: from,
//         to: email,
//         subject: subject,
//         html: html
//     })
// }

// export default sendMail

import AWS from 'aws-sdk';
import striptags from 'striptags';

const ses = new AWS.SES({ region: 'us-west-2' });


const sendMail = ({
  to,
  subject,
  body,
  from = 'Ironmental Manager<no-reply@ironmental.net>',
}) => {
  return new Promise((resolve, reject) => {
    const params = {
      Destination: {
        ToAddresses: (() => {
          if (typeof to === 'string') {
            return [to];
          }
          return to;
        })(),
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: body,
          },
          Text: {
            Charset: 'UTF-8',
            Data: striptags(body),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: from,
    };

    ses.sendEmail(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export default sendMail;