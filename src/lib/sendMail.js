import nodemailer from 'nodemailer'
import aws from 'aws-sdk'

const transporter = nodemailer.createTransport({
    SES: new aws.SES({
        region: 'us-west-2',
        apiVersion: '2010-12-01'
    })
});

const sendMail = ({
    email, 
    subject, 
    html, 
    from = "Ironmental Manager<no-reply@ironmental.net>"
}) => {
    return transporter.sendMail({
        from: from,
        to: email,
        subject: subject,
        html: html
    })
}

export default sendMail
