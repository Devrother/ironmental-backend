import Joi from '@hapi/joi';

const { API_VERSION } = process.env;

const interviewsQuerySchema = Joi.object({
  tag: Joi.string().regex(/^[a-zA-Z]+$/),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
  search: Joi.string()
});

const emailSchema = Joi.object({
  email: Joi.string().email()
});

const subscribeIdSchema = Joi.object({
  subscriberId: Joi.string().regex(/^[0-9a-fA-F]{24}$/)
});

export default {
  [`/${API_VERSION}/interviews`]: {
    'get': interviewsQuerySchema
  },
  [`/${API_VERSION}/subscribers`]: {
    'post': emailSchema,
    'put': subscribeIdSchema
  },
  [`/${API_VERSION}/auth/confirm`]: {
    'post': subscribeIdSchema
  },
};
