import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "Missing required title field" }),

  author: Joi.string()
    .required()
    .messages({ "any.required": "Missing required author field" }),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
});
