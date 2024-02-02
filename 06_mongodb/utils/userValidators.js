import Joi from "joi";
import userRoles from "../constants/userRoles.js";

export const createUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data);

export const updateUserDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(20),
      year: Joi.number()
        .min(1900)
        .max(new Date().getFullYear() - 18),
      role: Joi.string().valid(...Object.values(userRoles)),
    })
    .validate(data);
