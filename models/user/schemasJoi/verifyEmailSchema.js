const Joi = require("joi");

const verifyEmailSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }).required(),
});

module.exports = verifyEmailSchema;