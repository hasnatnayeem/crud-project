import express from 'express'
import { body, validationResult } from 'express-validator'

export const createCustomerValidationRules = () => {
  return [
    body('name').notEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').notEmpty().trim().escape(),
    body('address').optional().notEmpty().trim().escape(),
    body('city').optional().notEmpty().trim().escape(),
    body('zipCode').optional().notEmpty().trim().escape(),
  ]
}

export const putCustomerValidationRules = () => {
    return [
      body('name').notEmpty().trim().escape(),
      body('email').isEmail().normalizeEmail(),
      body('phone').notEmpty().trim().escape(),
      body('address').exists().trim().escape(),
      body('city').exists().trim().escape(),
      body('zipCode').exists().trim().escape(),
    ]
}


export const patchCustomerValidationRules = () => {
    return [
      body('name').optional().notEmpty().trim().escape(),
      body('email').optional().isEmail().normalizeEmail(),
      body('phone').optional().notEmpty().trim().escape(),
      body('address').optional().trim().escape(),
      body('city').optional().trim().escape(),
      body('zipCode').optional().trim().escape(),
    ]
  }
  

export const validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors:Array<Object> = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

