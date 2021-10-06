import * as mongoose from 'mongoose';

export default class Db {

    async connect(url: string) {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    }

    async insert() {

    }
}