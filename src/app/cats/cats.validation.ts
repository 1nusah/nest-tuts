import * as Joi from 'joi';

export const catsValidationSchema = Joi.object({
  name: Joi.string().required().label('Name of cat'),
  color: Joi.string().required().label('Color of cat'),
  age: Joi.number().required().label('Age of cat').min(0),
}).options({ abortEarly: false, allowUnknown: true });
