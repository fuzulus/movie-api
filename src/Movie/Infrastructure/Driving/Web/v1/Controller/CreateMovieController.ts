import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import CreateMovieCommand from 'src/Movie/Application/Command/CreateMovieCommand';
import MovieRepository from 'src/Movie/Application/Repository/MovieRepository';
import Authentication from 'src/Movie/Application/Service/Authentication/Authentication';
import MovieTitle from 'src/Movie/Domain/VO/MovieTitle';
import RepositoryProviderEnum from 'src/Movie/Infrastructure/Driven/Persistence/Mongo/Repository/RepositoryProviderEnum';
import MovieCreateModel from '../Model/MovieCreateModel';
import MovieReadModel from '../Model/MovieReadModel';

@Controller('/v1/movies')
export default class CreateMovieController {
    public constructor(
        @Inject(RepositoryProviderEnum.MOVIE)
        private readonly movieRepository: MovieRepository,
        private readonly commandBus: CommandBus,
    ) {}

    @Post()
    public async create(
        @Body() createModel: MovieCreateModel,
    ): Promise<MovieReadModel> {
        const movieId = this.movieRepository.nextId();

        const command = new CreateMovieCommand(
            movieId.value,
            createModel.title,
        );

        await this.commandBus.execute(command);

        return MovieReadModel.fromMovie(
            await this.movieRepository.findByUserIdAndTitle(
                Authentication.currentUser().userId,
                new MovieTitle(command.title),
            ),
        );
    }
}
