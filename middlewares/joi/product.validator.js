const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer().required(),
  description: Joi.string().required(),
});

module.exports = { productSchema };
