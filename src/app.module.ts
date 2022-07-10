import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import AuthenticationModule from './Authentication/AuthenticationModule';
import MovieModule from './Movie/MovieModule';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_DB_URL),
        AuthenticationModule,
        MovieModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
