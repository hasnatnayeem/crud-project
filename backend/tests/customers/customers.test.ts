import app from '../../app'
import supertest from 'supertest'
import { expect } from 'chai'
import mongoose from 'mongoose'

let customerId = ''

const customerData = {
    name: 'Nayeem',
    email: 'abc@gmail.com',
    phone: '123',
    address: '',
    city: 'Fulda',
    zipCode: ''
}

const newName = 'Hasnat'


describe('customers endpoints', function () {
    let request: supertest.SuperAgentTest

    before(function () {
        request = supertest.agent(app)
    })

    after(function (done) {
        // app.close(() => {
            mongoose.connection.close(done)
        // })
    })

    it('should allow a POST to /v1/customers', async function () {
        const res = await request
                .post('/v1/customers')
                .send(customerData)
        expect(res.status).to.equal(201)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.be.a('string')
        customerId = res.body.id
    })

    it('should allow a GET from /v1/customers', async function () {
        const res = await request
            .get(`/v1/customers`)
            .send()
        expect(res.status).to.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('array')
    })

    it('should allow a GET from /v1/customers/:customerId', async function () {
        const res = await request
            .get(`/v1/customers/${customerId}`)
            .send()
        expect(res.status).to.equal(200)
        expect(res.body).not.to.be.empty
        expect(res.body).to.be.an('object')
        expect(res.body.id).to.be.a('string')
        expect(res.body.id).to.equal(customerId)
        expect(res.body.name).to.equal(customerData.name)
        expect(res.body.email).to.equal(customerData.email)
    })

    it('should disallow a PUT to /v1/customers/:customerId with an nonexistent ID', async function () {
        const res = await request
            .put(`/v1/customers/invalidId`)
            .send(customerData)
        expect(res.status).to.equal(404)
    })

    it('should disallow a PUT to /v1/customers/:customerId with incomplete data', async function () {
        const res = await request
            .put(`/v1/customers/${customerId}`)
            .send({ name: 'New name' })
        expect(res.status).to.equal(422)
        expect(res.body).to.be.an('object')
        expect(res.body.errors).to.be.an('array')
    })

    it('should disallow a PUT to /v1/customers/:customerId with an nonexistent ID', async function () {
        const res = await request
            .put(`/v1/customers/invalidId`)
            .send(customerData)
        expect(res.status).to.equal(404)
    })

    it('should allow a PUT to /v1/customers/:customerId with valid data', async function () {
        const res = await request
            .put(`/v1/customers/${customerId}`)
            .send({ ...customerData, name: newName })
        expect(res.status).to.equal(204)
    })

    it('should allow a DELETE from /v1/customers/:customerId', async function () {
        const res = await request
            .delete(`/v1/customers/${customerId}`)
            .send()
        expect(res.status).to.equal(204)
    })

})
