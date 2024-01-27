const Joi = require("joi");
const validIdValues = ["dui", "passport"];
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  idNumber: Joi.string().min(8).max(30).required(),
  idType: Joi.string().valid(...validIdValues),
  department: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(30).required(),
  image: Joi.string().required(),
  monthRevenue: Joi.number().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

module.exports = {
  userSchema,
};
