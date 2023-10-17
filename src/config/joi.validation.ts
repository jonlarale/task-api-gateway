import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PROJECT: Joi.string().required(),
  PORT: Joi.number().default(4001),
  HOST: Joi.string().default('localhost'),
  DOCUMENTATION_PATH: Joi.string().default('docs'),
  PREFIX: Joi.string().default('api'),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE: Joi.string().required(),
});
