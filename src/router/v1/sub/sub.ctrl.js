import sendMail from 'lib/sendMail';
import { Subscriber } from 'database/models';
import {
  MAIL_SUBJECT,
  CHK_MAIL_MSG,
  NO_CERTIFY_MSG,
  ALREADY_SUB_MSG,
} from 'messages/strings';
import { authMailHtml } from 'messages/htmlMail';

const { DOMAIN } = process.env;
const createRequest = (message, isSub, isCertify) => {
  return { message, isSub, isCertify };
};

const createMailForm = (email, subject, html) => {
  return { email, subject, html };
};

export const subscribe = async (req, res) => {
  const { email } = req.body;
  const newSubscriber = new Subscriber({
    email,
    isCertify: false,
  });

  const subscriber = await Subscriber.findOne({ email });
  const subscriberId = subscriber ? subscriber.id : newSubscriber.id;
  const confirmLink = `${DOMAIN}/auth/confirm/${subscriberId}`;
  const html = authMailHtml(email, confirmLink);

  if (!subscriber) {
    await Promise.all([
      sendMail(createMailForm(email, MAIL_SUBJECT, html)),
      newSubscriber.save()
    ]);

    return res.send(createRequest(CHK_MAIL_MSG, false, false));
  }

  const { isCertify } = subscriber;

  if (isCertify) {
    return res.send(createRequest(ALREADY_SUB_MSG, true, isCertify));
  }

  await sendMail(createMailForm(email, MAIL_SUBJECT, html));

  res.send(createRequest(NO_CERTIFY_MSG, true, isCertify));
};
