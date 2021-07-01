import mongoose from 'mongoose';
import { mongoDbConnectionString } from '../common.config'

class MongooseService {
    private mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
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
    };
}

export default new MongooseService();
