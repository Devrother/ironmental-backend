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

const confirmCodeSchema = Joi.object({
  confirmCode: Joi.string().guid()
});

export default {
  [`/${API_VERSION}/interviews`]: interviewsQuerySchema,
  [`/${API_VERSION}/subscribers`]: emailSchema,
  [`/${API_VERSION}/auth/confirm`]: confirmCodeSchema,
}