import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UserRepository from 'src/Authentication/Application/Repository/UserRepository';
import User from 'src/Authentication/Domain/User';
import Password from 'src/Authentication/Domain/VO/Password';
import UserFullName from 'src/Authentication/Domain/VO/UserFullName';
import UserId from 'src/Authentication/Domain/VO/UserId';
import Username from 'src/Authentication/Domain/VO/Username';
import UserRole from 'src/Authentication/Domain/VO/UserRole';
import { UserDocument, UserModel } from '../Definition/User';

@Injectable()
export default class MongoUserRepository implements UserRepository {
    public constructor(
        @InjectModel(UserModel.name)
        private readonly userModel: Model<UserDocument>,
    ) {}

    public async findByUsername(username: Username): Promise<User | null> {
        const doc = await this.userModel
            .findOne({ username: username.value })
            .exec();

        if (null === doc) {
            return null;
        }

        return new User(
            new UserId(doc.id),
            new UserRole(doc.role),
            new UserFullName(doc.fullName),
            new Username(doc.username),
            new Password(doc.password),
        );
    }
}
