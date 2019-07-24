import { Subscriber } from 'database/models';
import { SUCCESS_AUTH_MSG } from 'messages/strings'

export const confirm = async (req, res) => {
  const { subscriberId } = req.body;

  await Subscriber.updateCertifyValueById(subscriberId, true);

  res.send({ message: SUCCESS_AUTH_MSG });
};
