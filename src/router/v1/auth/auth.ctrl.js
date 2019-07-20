import { Subscriber } from 'database/models';

export const confirm = async (req, res) => {
  const { subscriberId } = req.body;

  await Subscriber.updateById(subscriberId);

  res.send({ message: '인증되었습니다! ' });
};
