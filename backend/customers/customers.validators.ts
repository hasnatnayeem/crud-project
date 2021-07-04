import express from 'express'
import { query ,body, validationResult } from 'express-validator'
import customerService from './services/customers.service'

class CustomerValidators {
  getCustomerParamsValidationRules = () => {
    return [
      query('sortBy').optional().notEmpty().trim().escape(),
      query('filter').optional().notEmpty().escape(),
    ]
  }

  createCustomerValidationRules = () => {
    return [
      body('name').notEmpty().trim().escape(),
      body('email').isEmail().normalizeEmail(),
      body('phone').notEmpty().trim().escape(),
      body('address').exists().trim().escape(),
      body('city').exists().trim().escape(),
      body('zipCode').exists().trim().escape(),
    ]
  }

  putCustomerValidationRules = () => {
    return [
      body('name').notEmpty().trim().escape(),
      body('email').isEmail().normalizeEmail(),
      body('phone').notEmpty().trim().escape(),
      body('address').exists().trim().escape(),
      body('city').exists().trim().escape(),
      body('zipCode').exists().trim().escape(),
    ]
  }

  patchCustomerValidationRules = () => {
    return [
      body('name').optional().notEmpty().trim().escape(),
      body('email').optional().isEmail().normalizeEmail(),
      body('phone').optional().notEmpty().trim().escape(),
      body('address').optional().trim().escape(),
      body('city').optional().trim().escape(),
      body('zipCode').optional().trim().escape(),
    ]
  }

  validate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const extractedErrors: Array<unknown> = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
      errors: extractedErrors,
    })
  }
  
  validateCustomerExists = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const customer = await customerService.getById(req?.params?.customerId);
    if (customer) {
      res.locals.customer = customer;
      next();
    } else {
      res.status(404).send({
        errors: [`Customer ${req.params.customerId} not found`],
      });
    }
  }

}

export default new CustomerValidators()

