import Joi from 'joi';

export const createPaymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    number: Joi.number().required(),
    name: Joi.string().required(),
    issuer: Joi.string().required(),
    cvv: Joi.number().required(),
    expirationDate: Joi.string().required(),
  }).required(),
});
