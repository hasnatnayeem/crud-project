import express from 'express'
import customerService from '../services/customers.service'

class CustomerController {
    async getAllCustomers(req: express.Request, res: express.Response) {
        const customers = await customerService.getAll(100, 0)
        res.status(200).send(customers)
    }

    async getCustomerById(req: express.Request, res: express.Response) {
        const customer = await customerService.getById(req.body.id)
        res.status(200).send(customer)
    }

    async createCustomer(req: express.Request, res: express.Response) {
        const userId = await customerService.create(req.body)
        res.status(201).send({ id: userId })
    }


    async patch(req: express.Request, res: express.Response) {
        await customerService.patchById(req.body.id, req.body)
        res.status(204).send()
    }

    async put(req: express.Request, res: express.Response) {
        await customerService.putById(req.body.id, req.body)
        res.status(204).send()
    }

    async deleteCustomer(req: express.Request, res: express.Response) {
        await customerService.deleteById(req.body.id)
        res.status(204).send()
    }
}

export default new CustomerController()