import MongoMovieRepository from './MongoMovieRepository';
import RepositoryProviderEnum from './RepositoryProviderEnum';

export default [
    {
        provide: RepositoryProviderEnum.MOVIE,
        useClass: MongoMovieRepository,
    },
];
