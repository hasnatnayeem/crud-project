import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}

import express from 'express'
import * as http from 'http'
import cors from 'cors'
import { CommonRoutesConfig } from './common/common.routes.config'
import { CustomersRoutes } from './customers/customers.routes.config'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3000;
const routes: Array<CommonRoutesConfig> = []


app.use(express.json()) // Adding body parser
app.use(cors()) // Enabling CORS middleware

routes.push(new CustomersRoutes(app))


export default server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

