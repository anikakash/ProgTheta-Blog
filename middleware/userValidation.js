const Joi = require("joi");
const { model } = require("mongoose");

// Validator for Registration
const userRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad Request->Middle", error });
  }
  next();
};

// Validator for Login:

const userLoginValidate = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).alphanum().required(),
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Bad Request->Middle", error });
  }
  next();
};

module.exports = {
  userRegisterValidate,
  userLoginValidate,
};
