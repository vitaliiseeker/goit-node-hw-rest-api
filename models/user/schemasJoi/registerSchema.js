const Joi = require("joi");
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require("../../regexp");

const registerSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(EMAIL_REGEXP)).required(),
  password: Joi.string().pattern(new RegExp(PASSWORD_REGEXP)).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = registerSchema;
