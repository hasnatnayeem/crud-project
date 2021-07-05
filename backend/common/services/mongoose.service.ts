import mongoose from 'mongoose';
import { mongoDbConnectionString } from '../common.config'

// Common service for mongodb interation
// Follows singleton design pattern
// The same instance is delivered to different components

class MongooseService {
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    constructor() {
        this.connect();
    }

    getMongoose() {
        return mongoose;
    }

    generateObjectId() {
        return mongoose.Types.ObjectId()
    }

    // process array of filter parameters in order to generate filter configuration for mongoose
    // Used for search operation
    // Returns mongoose configuration based on key value passed with http getAll request
    // Request example: filter=name:nayeem,email:gmail
    generateFilterConfig(filterParams: Array<string>, allowedKeys = {}) {
        const filterConfig: Array<unknown> = []
        try {
            if (filterParams.length) {
                filterParams.forEach(filter => {
                    if (!filter) return
                    filter = filter.trim() // removing whitespace
                    const [key, value] = filter?.split(':') // filter key value pairs are separated by ':'
                    if (key in allowedKeys) { //only allowed fields are filterable
                        filterConfig.push({ [key]: { $regex: value, $options: 'i' } })
                    }
                })
            }
        }
        catch(err) {
            console.log('Error processing filter config')
        }
        
        return filterConfig
    }

    connect = () => {
        mongoose
            .connect(mongoDbConnectionString, this.mongooseOptions)
            .then(() => {
                console.log('MongoDB is connected');
            })
            .catch((err) => {
                console.log('MongoDB connection was unsuccessful')
                console.log(err)
            });
    }
}

export default new MongooseService();
