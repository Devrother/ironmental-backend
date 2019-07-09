import sendMail from 'lib/sendMail';

const createMailForm = (email, subject, html) => {
  return { email, subject, html };
};

export const handler = async () => {
  const email = 'ondaesuk93@gmail.com'
  const subject = 'cron test'
  const html = '<p>For Cron Test</p>'
  await sendMail(createMailForm(email, subject, html));
}