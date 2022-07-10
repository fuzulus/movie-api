import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
    UserModel,
    UserSchema,
} from './Infrastructure/Driven/Persistence/Mongo/Definition/User';
import Repositories from './Infrastructure/Driven/Persistence/Repositories';
import Services from './Infrastructure/Driven/Service/Services';
import v1Controllers from './Infrastructure/Driving/Web/v1/Controller/Controllers';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            { name: UserModel.name, schema: UserSchema },
        ]),
    ],
    controllers: [...v1Controllers],
    providers: [...Services, ...Repositories],
})
export default class AuthenticationModule {}
