import { CreateCustomerDto } from '../dtos/create.customer.dto'
import { PutCustomerDto } from '../dtos/put.customer.dto'
import { PatchCustomerDto } from '../dtos/patch.customer.dto'
import mongooseService from '../../common/services/mongoose.service'

class CustomerDao {
    Schema = mongooseService.getMongoose().Schema

    customerSchema = new this.Schema({
        _id: String,
        name: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        zipCode: String,
    }, { timestamps: true  })

    Customer = mongooseService.getMongoose().model('Customers', this.customerSchema)

    constructor() {}

    async createCustomer(customerData: CreateCustomerDto) {
        const customerId = mongooseService.generateObjectId()
        const customer = new this.Customer({
            _id: customerId,
            ...customerData
        })

        await customer.save()
        return customerId
    }

    async getCustomers(limit: number, page: number) {
        return this.Customer.find()
            .limit(limit)
            .skip(limit * (page - 1))
            .exec()
    }

    async getCustomerById(customerId: string) {
        return this.Customer.findOne({ _id: customerId }).populate('Customer').exec();
    }

    async updateCustomerById(
        customerId: string, 
        customerData: PutCustomerDto | PatchCustomerDto
    ) {
        const existingCustomer = await this.Customer.findOneAndUpdate(
            { _id: customerId },
            { $set: customerData },
            { new: true }
        ).exec();

        return existingCustomer;
    }
    
    
    async deleteCustomerById(customerId: string) {
        return this.Customer.deleteOne({ _id: customerId }).exec();
    }

}

export default new CustomerDao()