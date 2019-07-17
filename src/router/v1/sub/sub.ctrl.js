import uuidv4 from 'uuid/v4';
import sendMail from 'lib/sendMail';
import { Subscriber } from 'database/models';
import {
  MAIL_SUBJECT,
  CHK_MAIL_MSG,
  NO_CERTIFY_MSG,
  ALREDY_SUB_MSG,
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
  const uuid_v4 = uuidv4();
  const confirmLink = `${DOMAIN}/auth/confirm/${uuid_v4}`;
  const html = authMailHtml(email, confirmLink);

  const subscriber = await Subscriber.findOne({ email });
  if (!subscriber) {
    const newSubscriber = new Subscriber({
      email,
      confirmCode: uuid_v4,
      isCertify: false,
    });

    await Promise.all([
      sendMail(createMailForm(email, MAIL_SUBJECT, html)),
      newSubscriber.save()
    ]);

    return res.send(createRequest(CHK_MAIL_MSG, false, false));
  }

  const { isCertify } = subscriber;

  if (isCertify) {
    return res.send(createRequest(ALREDY_SUB_MSG, true, isCertify));
  }

  await Promise.all([
    sendMail(createMailForm(email, MAIL_SUBJECT, html)),
    Subscriber.updateSubByEmail(email, uuid_v4)
  ]);

  res.send(createRequest(NO_CERTIFY_MSG, true, isCertify));
};
