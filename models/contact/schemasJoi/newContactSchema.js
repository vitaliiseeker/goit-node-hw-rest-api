const Joi = require("joi");
const { EMAIL_REGEXP, PHONE_REGEXP } = require("../../regexp");

const newContactSchema = Joi.object({
  name: Joi.string().min(2).max(40).required(),

  email: Joi.string().pattern(new RegExp(EMAIL_REGEXP)).required(),

  phone: Joi.string().pattern(new RegExp(PHONE_REGEXP)),

  favorite: Joi.boolean(),
});

module.exports = newContactSchema;
