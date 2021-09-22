const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  return Joi.object({
    name: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  }).validate({ name: data.name, email: data.email, password: data.password });
};

//login validation
const loginValidation = (data) => {
  return Joi.object({
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  }).validate({ email: data.email, password: data.password });
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
