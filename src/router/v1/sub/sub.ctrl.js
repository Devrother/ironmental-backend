import uuidv4 from 'uuid/v4';
import sendMail from 'lib/sendMail';
import { 
  Subscriber,
  validateEmail 
} from 'database/models';
import {
  MAIL_SUBJECT,
  CHK_MAIL_MSG,
  NO_CERTIFY_MSG,
  ALREDY_SUB_MSG,
} from 'messages/strings';
import { authMailHtml } from 'messages/htmlMail';
// import Errors from '@hapi/joi/lib/errors'

// const { ValidationError } = Errors.Err
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
  
  const result = validateEmail(req.body)
  
  if (result.error) {
    throw new Error('VaildationError')
  }


  const subscriber = await Subscriber.findOne({ email });
  if (!subscriber) {
    const sub = new Subscriber({
      email,
      confirmCode: uuid_v4,
      isCertify: false,
    });

    await sendMail(createMailForm(email, MAIL_SUBJECT, html));
    await sub.save();

    return res.send(createRequest(CHK_MAIL_MSG, false, false));
  }

  const { isCertify } = subscriber;

  if (isCertify) {
    return res.send(createRequest(ALREDY_SUB_MSG, true, isCertify));
  }

  await sendMail(createMailForm(email, MAIL_SUBJECT, html));

  await Subscriber.updateSubByEmail(email, uuid_v4);

  res.send(createRequest(NO_CERTIFY_MSG, true, isCertify));
};

// TODO: 확인용
export const show = async (req, res) => {
  const subscribers = await Subscriber.find();
  res.send(subscribers);
};
