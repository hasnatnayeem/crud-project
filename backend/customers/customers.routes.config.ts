import { CommonRoutesConfig } from '../common/common.routes.config'
import express from 'express'


export class CustomersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CustomerRoutes')
    }

    configureRoutes(): express.Application {
        this.app.route(`/customers`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('GET all')
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send(`POST create new`);
            });

        this.app.route(`/customers/:customerId`)
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send(`GET id ${req.params.customerId}`);
            })

            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT id ${req.params.customerId}`);
            })

            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH id ${req.params.customerId}`);
            })

            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE id ${req.params.customerId}`);
            });


        return this.app
    }

}