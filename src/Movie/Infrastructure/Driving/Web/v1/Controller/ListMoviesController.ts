import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import MovieListQuery from 'src/Movie/Application/Query/MovieListQuery';
import Authentication from 'src/Movie/Application/Service/Authentication/Authentication';
import MovieReadModel from '../Model/MovieReadModel';

@Controller('/v1/movies')
export default class ListMoviesController {
    public constructor(private readonly queryBus: QueryBus) {}

    @Get()
    public async list(): Promise<MovieReadModel[]> {
        const query = new MovieListQuery(
            Authentication.currentUser().userId.value,
        );

        const movies = await this.queryBus.execute(query);

        return movies.map((movie) => MovieReadModel.fromMovie(movie));
    }
}
