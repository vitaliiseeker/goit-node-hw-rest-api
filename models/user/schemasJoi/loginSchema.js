const Joi = require("joi");
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require("../../regexp");

const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(EMAIL_REGEXP)).required(),
  password: Joi.string().pattern(new RegExp(PASSWORD_REGEXP)).required(),
});

module.exports = loginSchema;
