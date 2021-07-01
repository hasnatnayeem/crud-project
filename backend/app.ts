import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express from 'express'
import * as http from 'http'
import cors from 'cors'
import customersRoutes from './customers/customers.routes'

const app: express.Application = express()
const router = express.Router()
const server: http.Server = http.createServer(app)
const port = 3000

app.use(express.json()) // Adding body parser
app.use(cors()) // Enabling CORS middleware


router.use('/customers', customersRoutes)

app.use('/v1', router)


export default server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

