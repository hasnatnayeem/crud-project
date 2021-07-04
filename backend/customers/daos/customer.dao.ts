import { CreateCustomerDto } from '../dtos/create.customer.dto'
import { PutCustomerDto } from '../dtos/put.customer.dto'
import { PatchCustomerDto } from '../dtos/patch.customer.dto'
import mongooseService from '../../common/services/mongoose.service'
import { CustomerQueryParams } from '../customer-query-params.interface'
import { CustomersSortByEnum } from '../enums/customers-sort-by.enum'
import { CustomersFilterByEnum } from '../enums/customers-filter.enum'
mongooseService.getMongoose().set('debug', true)

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
    }, { 
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
              ret.id = ret._id
              delete ret._id;
              delete ret.__v;
            }
          }
      })

    Customer = mongooseService.getMongoose().model('Customers', this.customerSchema)

    async createCustomer(customerData: CreateCustomerDto) {
        const customerId = mongooseService.generateObjectId()
        const customer = new this.Customer({
            _id: customerId,
            ...customerData
        })

        await customer.save()
        return customerId
    }

    async getCustomers(options: CustomerQueryParams) {
        let { limit, page } = options
        const { sortBy, filterParams } = options
        let sortConfig = {}, filterConfig:Array<unknown> = []
        

        // setting default values   
        limit = limit ? limit : 100
        page = page ? page : 1

        // Allowing sorting only with the keys in enum
        if (sortBy && sortBy in CustomersSortByEnum) {
            sortConfig = { [sortBy]: 1 } // assigning value of sortBy as Object key
        }

        if (filterParams) {
            filterConfig = mongooseService.generateFilterConfig(filterParams, CustomersFilterByEnum)
        }

        const query = this.Customer.find()
                .limit(limit)
                .skip(limit * (page - 1))

        if (filterConfig.length > 0) query.or(filterConfig)
        if (sortConfig) query.sort(sortConfig)

        return query.exec()
    }

    async getCustomerById(customerId: string) {
        return this.Customer.findOne({ _id: customerId }).exec();
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