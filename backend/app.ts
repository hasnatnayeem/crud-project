import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express from 'express'
import cors from 'cors'
import customersRoutes from './customers/customers.routes'

const app: express.Application = express()
const router = express.Router()

app.use(express.json()) // Adding body parser
app.use(cors()) // Enabling CORS middleware

router.use('/customers', customersRoutes)

app.use('/v1', router)


export default app
