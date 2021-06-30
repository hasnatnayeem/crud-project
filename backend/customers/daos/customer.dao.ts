import { CreateCustomerDto } from '../dtos/create.customer.dto'
import { PutCustomerDto } from '../dtos/put.customer.dto'
import { PatchCustomerDto } from '../dtos/patch.customer.dto'

class CustomerDao {
    constructor() {}

    async getCustomers(limit = 25, page = 0) {
        return []
    }

    async createCustomer(customerData: CreateCustomerDto) {
        return 1
    }

    async getCustomerById(customerId: string) {
        return {}
    }

    async updateCustomerById(customerId: string, customerData: PutCustomerDto | PatchCustomerDto) {
        return `updated ${customerId}`
    }

    async deleteCustomerById(customerId: string) {
        return `deleted ${customerId}`
    }

}

export default new CustomerDao()