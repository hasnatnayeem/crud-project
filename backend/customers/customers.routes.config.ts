import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'
import customerController from './controllers/customers.controllers'
import { 
    createCustomerValidationRules, 
    patchCustomerValidationRules, 
    putCustomerValidationRules, 
    validate 
} from './customers.validators'


export class CustomersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CustomerRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route(`/customers`)
            .get(customerController.getAllCustomers)
            .post(createCustomerValidationRules(), validate, customerController.createCustomer);

        this.app.route(`/customers/:customerId`)
            .get(customerController.getCustomerById)
            .put(putCustomerValidationRules(), validate, customerController.put)
            .patch(patchCustomerValidationRules(), validate, customerController.patch)
            .delete(customerController.deleteCustomer);

        return this.app
    }

}