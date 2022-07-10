import MongoUserRepository from './Mongo/Repository/MongoUserRepository';
import RepositoryProviderEnum from './RepositoryProviderEnum';

export default [
    {
        provide: RepositoryProviderEnum.USER,
        useClass: MongoUserRepository,
    },
];
