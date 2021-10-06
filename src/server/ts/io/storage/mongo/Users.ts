import {Schema, model, Model} from 'mongoose';

interface User {
    githubUserId: number,
    githubToken: string,
    authKey: string,
}

const schema = new Schema<User>({
    githubUserId: Number,
    githubToken: String,
    authKey: String,
});

export class Users {

    model: Model<User>

    constructor() {
        this.model = model('users', schema);
    }

    async findByGithubUserId(githubUserId: number): Promise<User|null> {
        return this.model.findOne({githubUserId});
    }

    async findByAuthKey(authKey: string): Promise<User|null> {
        return this.model.findOne({authKey});
    }

    async insert(user: User) {
        let userRecord = await this.model.create(user);
        //console.log(user22.id);
    }
}