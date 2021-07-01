import { CRUD } from "../../common/interfaces/crud.interface";
import CustomerDao from '../daos/customer.dao'
import { CreateCustomerDto } from '../dtos/create.customer.dto'
import { PutCustomerDto } from '../dtos/put.customer.dto'
import { PatchCustomerDto } from '../dtos/patch.customer.dto'
import { CustomerQueryParams } from "../customer-query-params.interface";

class CustomerService implements CRUD {
    async getAll(options: CustomerQueryParams) {
        return Promise.resolve(CustomerDao.getCustomers(options))
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