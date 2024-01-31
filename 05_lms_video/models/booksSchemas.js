import Joi from "joi";
import { genreList } from "./modelsEquip.js";

export const createBookSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "Missing required title field" }),

  author: Joi.string()
    .required()
    .messages({ "any.required": "Missing required author field" }),
  favorite: Joi.boolean(),
  genre: Joi.string().validate(...genreList),
  date: Joi.string().required().pattern(datePattern),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
});
