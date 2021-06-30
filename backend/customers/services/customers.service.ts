import { CRUD } from "../../common/interfaces/crud.interface";
import CustomerDao from '../daos/customer.dao'
import { CreateCustomerDto } from '../dtos/create.customer.dto'
import { PutCustomerDto } from '../dtos/put.customer.dto'
import { PatchCustomerDto } from '../dtos/patch.customer.dto'

class CustomerService implements CRUD {
    async getAll(limit: number, page: number) {
        Promise.resolve(CustomerDao.getCustomers(limit, page))
    }

    create(resource: CreateCustomerDto){
        return Promise.resolve(CustomerDao.createCustomer(resource))
    }

    putById(id: string, resource: PutCustomerDto){
        return Promise.resolve(CustomerDao.updateCustomerById(id, resource))
    }

    patchById(id: string, resource: PatchCustomerDto){
        return Promise.resolve(CustomerDao.updateCustomerById(id, resource))
    }

    getById(id: string) {
        return Promise.resolve(CustomerDao.getCustomerById(id))
    }

    deleteById(id: string) {
        return Promise.resolve(CustomerDao.deleteCustomerById(id))
    }
}

export default new CustomerService()