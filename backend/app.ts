import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express from 'express'
import cors from 'cors'
import customersRoutes from './customers/customers.routes'
import { transformIdProperty } from './common/middlewares/id.middleware';

const app: express.Application = express()
const router = express.Router()

app.use(express.json()) // Adding body parser
app.use(cors()) // Enabling CORS middleware
app.use(transformIdProperty) // converting 'id' to '_id' for mongoose


router.use('/customers', customersRoutes)

app.use('/v1', router)


export default app
