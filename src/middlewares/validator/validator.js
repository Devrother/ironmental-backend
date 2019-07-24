import url from 'url';
import { ValidationError } from 'lib/errors'
import { BAD_REQ_MSG } from 'messages/strings'
import Schemas from './validatorSchema';

export default (req, res, next) => {
  const supportedMethod = ['get', 'post', 'put'];
  const routePath = url.parse(req.originalUrl).pathname;
  const httpMethod = req.method.toLowerCase();

  const isInSupMethod = method => supportedMethod.includes(method);
  const hasInSchemas = path =>
    Object.prototype.hasOwnProperty.call(Schemas, path);

  if (!isInSupMethod(httpMethod) || !hasInSchemas(routePath)) {
    return next();
  }

  const schema = Schemas[routePath][httpMethod];
  const dataToValidate = httpMethod === 'get' ? req.query : req.body;

  const { error } = schema.validate(dataToValidate);
  if (error) return next(new ValidationError(BAD_REQ_MSG));
  next();
};
