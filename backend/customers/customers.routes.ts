import express from 'express'
import customerController from './controllers/customers.controllers'
import customerValidators from './customers.validators'

const router = express.Router();

router.route(`/`)
    .get(
        customerValidators.getCustomerParamsValidationRules(), // Rules are  returned as array, no validation done 
        customerValidators.validate, // It calls the actual validation method on the returned rules
        customerController.getAllCustomers // At last controller function takes over
    )
    .post(
        customerValidators.createCustomerValidationRules(),
        customerValidators.validate,
        customerController.createCustomer
    )

router.route(`/:customerId`)
    .all(customerValidators.validateCustomerExists) // making sure resource exists for all request in this endpoint
    .get(customerController.getCustomerById)
    .put(
        customerValidators.putCustomerValidationRules(),
        customerValidators.validate,
        customerController.put)
    .patch(
        customerValidators.patchCustomerValidationRules(),
        customerValidators.validate,
        customerController.patch
    )
    .delete(customerController.deleteCustomer)

export default router