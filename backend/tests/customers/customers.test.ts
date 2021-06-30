import app from '../../app'
import supertest from 'supertest'
import { expect } from 'chai'

const customerData = {}

describe('customers endpoints', function () {
    let request: supertest.SuperAgentTest;

    before(function () {
        request = supertest.agent(app);
    })

    after(function (done) {
        app.close()
        done()
    })

    it('should allow a POST to /customers', async function () {
        const res = await request.post('/customers').send(customerData);
        expect(res.status).to.equal(201);
    })

});
