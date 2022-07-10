import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import CommandHandlers from './Application/CommandHandler/CommandHandlers';
import AuthenticationMiddleware from './Infrastructure/Driven/Middleware/AuthenticationMiddleware';
import {
    MovieModel,
    MovieSchema,
} from './Infrastructure/Driven/Persistence/Mongo/Definition/Movie';
import Repositories from './Infrastructure/Driven/Persistence/Mongo/Repository/Repositories';
import QueryHandlers from './Infrastructure/Driven/QueryHandler/QueryHandlers';
import Services from './Infrastructure/Driven/Service/Services';
import v1Controllers from './Infrastructure/Driving/Web/v1/Controller/Controllers';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forFeature([
            { name: MovieModel.name, schema: MovieSchema },
        ]),
        CqrsModule,
        HttpModule,
    ],
    controllers: [...v1Controllers],
    providers: [
        ...Services,
        ...Repositories,
        ...CommandHandlers,
        ...QueryHandlers,
    ],
})
export default class MovieModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthenticationMiddleware).forRoutes(...v1Controllers);
    }
}
