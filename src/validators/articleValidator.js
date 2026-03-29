const Joi = require("joi");

const validateArticle = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().required(),
    author: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = validateArticle;