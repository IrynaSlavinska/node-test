import Joi from "joi";
import { genreList, datePattern } from "./modelsEquip.js";

export const createBookSchema = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "Missing required title field" }),

  author: Joi.string()
    .required()
    .messages({ "any.required": "Missing required author field" }),
  favorite: Joi.boolean(),
  genre: Joi.string().valid(...genreList),
  date: Joi.string().required().pattern(datePattern),
});

export const updateBookSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
