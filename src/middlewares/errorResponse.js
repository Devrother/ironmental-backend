import mongoose from 'mongoose';
import {
  NotFoundError,
  ValidationError,
  UnauthorizedError
} from 'lib/errors'
import {
  HTTP_400_MSG,
  HTTP_403_MSG,
  HTTP_404_MSG,
  HTTP_500_MSG,
} from 'messages/httpErrorMsg';
import {
  SERVER_ERROR_MSG
} from 'messages/strings'

const { CastError } = mongoose.Error;

export default (err, req, res, next) => {
  const { message } = err;
  switch (true) {
    case err instanceof CastError:
      return res.status(404).send(HTTP_404_MSG());
    case err instanceof NotFoundError:
      return res.status(404).send(HTTP_404_MSG(message));
    case err instanceof UnauthorizedError:
      return res.status(403).send(HTTP_403_MSG(message));
    case err instanceof ValidationError:
      return res.status(400).send(HTTP_400_MSG(message));
    default:
      return res.status(500).send(HTTP_500_MSG(SERVER_ERROR_MSG))
  }
};
