import express from 'express';
import mongoose from 'mongoose';
import { mongoDbConnectionString } from '../common.config'

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
    generateFilterConfig(filterParams: Array<string>, allowedKeys: any) {
        let filterConfig: any = []
        if (filterParams) {
            filterParams.forEach(filter => {
                filter = filter.trim() // removing whitespace
                let [key, value] = filter?.split(':') // filter key value pairs are separated by ':'
                if (key in allowedKeys) { //only allowed fields are filterable
                    filterConfig.push({ [key]: { $regex: value, $options: 'i' } })
                }
            })
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
