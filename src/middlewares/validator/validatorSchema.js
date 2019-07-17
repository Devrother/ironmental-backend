import Joi from '@hapi/joi';

const { API_VERSION } = process.env;

const interviewsQuerySchema = Joi.object({
  tag: Joi.string(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer()
});

const emailSchema = Joi.object({
  email: Joi.string().email()
});

const subscribeIdSchema = Joi.object({
  subscriberId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

module.exports = {
  [`/${API_VERSION}/interviews`]: interviewsQuerySchema,
  [`/${API_VERSION}/subscribers`]: emailSchema,
  [`/${API_VERSION}/auth/confirm`]: subscribeIdSchema,
};