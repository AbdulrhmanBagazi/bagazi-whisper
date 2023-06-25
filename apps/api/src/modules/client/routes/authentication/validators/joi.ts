import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const Schema = {
  SignInSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  SignUpSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const validateBody = (Schema: Joi.AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = Schema.validate(req.body);

    if (valid?.error) {
      return res.status(400).send(`${valid?.error}`);
    }

    next();
  };
};
