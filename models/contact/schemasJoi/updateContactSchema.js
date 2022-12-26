const Joi = require("joi");
const { EMAIL_REGEXP, PHONE_REGEXP } = require("../../regexp");

const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(40),

  email: Joi.string().pattern(new RegExp(EMAIL_REGEXP)),

  phone: Joi.string().pattern(new RegExp(PHONE_REGEXP)),

  favorite: Joi.boolean(),
}).min(1);

module.exports = updateContactSchema;
