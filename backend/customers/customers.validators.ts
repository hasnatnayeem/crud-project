import express from 'express'
import { body, validationResult } from 'express-validator'

export const createCustomerValidationRules = () => {
  return [
    body('name').not().isEmpty().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('phone').not().isEmpty().trim().escape(),
    body('address').optional().not().isEmpty().trim().escape(),
    body('city').optional().not().isEmpty().trim().escape(),
    body('zipCode').optional().not().isEmpty().trim().escape(),
  ]
}

export const putCustomerValidationRules = () => {
    return [
      body('name').not().isEmpty().trim().escape(),
      body('email').isEmail().normalizeEmail(),
      body('phone').not().isEmpty().trim().escape(),
      body('address').not().isEmpty().trim().escape(),
      body('city').not().isEmpty().trim().escape(),
      body('zipCode').not().isEmpty().trim().escape(),
    ]
}


export const patchCustomerValidationRules = () => {
    return [
      body('name').optional().not().isEmpty().trim().escape(),
      body('email').optional().isEmail().normalizeEmail(),
      body('phone').optional().not().isEmpty().trim().escape(),
      body('address').optional().not().isEmpty().trim().escape(),
      body('city').optional().not().isEmpty().trim().escape(),
      body('zipCode').optional().not().isEmpty().trim().escape(),
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

