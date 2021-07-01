import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'
import customerController from './controllers/customers.controllers'
import customerValidators from './customers.validators'


export class CustomersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CustomerRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route(`/customers`)
            .get(customerController.getAllCustomers)
            .post(
                customerValidators.createCustomerValidationRules(),
                customerValidators.validate,
                customerController.createCustomer
            )

        this.app.route(`/customers/:customerId`)
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

        return this.app
    }

}