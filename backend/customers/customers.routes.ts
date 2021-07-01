import express from 'express'
import customerController from './controllers/customers.controllers'
import customerValidators from './customers.validators'

const router = express.Router();

router.route(`/`)
    .get(customerController.getAllCustomers)
    .post(
        customerValidators.createCustomerValidationRules(),
        customerValidators.validate,
        customerController.createCustomer
    )

router.route(`/:customerId`)
    .all(customerValidators.validateCustomerExists)
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