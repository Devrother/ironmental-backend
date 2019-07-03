import {
  Subscriber,
  validateConfirmcode
} from 'database/models';

export const confirm = async (req, res) => {
  const { confirmCode } = req.body;

  const result = validateConfirmcode(req.body)
  
  if (result.error) {
    throw new Error('VaildationError')
  }

  await Subscriber.updateByConfirmCode(confirmCode);

  res.send({ message: '인증되었습니다! ' });
};
