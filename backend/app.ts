import express from 'express'
import * as http from 'http'
import cors from 'cors'
import { CommonRoutesConfig } from './common/common.routes.config'
import { CustomersRoutes } from './customers/customers.routes.config'
import debug from 'debug'

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app')


app.use(express.json()) // Adding body parser
app.use(cors()) // Enabling CORS middleware

routes.push(new CustomersRoutes(app))


server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    })

    console.log(`Server running at http://localhost:${port}`);
});