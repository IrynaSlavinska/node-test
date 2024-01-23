import Joi from 'joi';

const createUserDataValidator = (data) => 
  Joi
    .object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(3).max(12).required(),
      year: Joi.number().min(1900).max(new Date().getFullYear() - 18).required()
    }).validate(data);

export default createUserDataValidator;
