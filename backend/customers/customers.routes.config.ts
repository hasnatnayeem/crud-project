import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'
import customerController from './controllers/customers.controllers'


export class CustomersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CustomerRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route(`/customers`)
            .get(customerController.getAllCustomers)
            .post(customerController.createCustomer);

        this.app.route(`/customers/:customerId`)
            .get(customerController.getCustomerById)
            .put(customerController.put)
            .patch(customerController.patch)
            .delete(customerController.deleteCustomer);

        return this.app
    }

}