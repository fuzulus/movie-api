import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import UserRoleEnum from 'src/Movie/Domain/Enum/UserRoleEnum';
import MovieLimitForBasicUserException from 'src/Movie/Domain/Exception/MovieLimitForBasicUserException';
import MovieNotFoundException from 'src/Movie/Domain/Exception/MovieNotFoundException';
import Movie from 'src/Movie/Domain/Movie';
import Month from 'src/Movie/Domain/VO/Month';
import MovieDirector from 'src/Movie/Domain/VO/MovieDirector';
import MovieGenre from 'src/Movie/Domain/VO/MovieGenre';
import MovieId from 'src/Movie/Domain/VO/MovieId';
import MovieReleaseDate from 'src/Movie/Domain/VO/MovieReleaseDate';
import MovieTitle from 'src/Movie/Domain/VO/MovieTitle';
import RepositoryProviderEnum from 'src/Movie/Infrastructure/Driven/Persistence/Mongo/Repository/RepositoryProviderEnum';
import ServiceProviderEnum from 'src/Movie/Infrastructure/Driven/Service/ServiceProviderEnum';
import CreateMovieCommand from '../Command/CreateMovieCommand';
import MovieResponse from '../DTO/Http/Omdb/MovieResponse';
import MovieRepository from '../Repository/MovieRepository';
import Authentication from '../Service/Authentication/Authentication';
import HttpClient from '../Service/Http/HttpClient';
import Request from '../Service/Http/Request';
import Clock from '../Service/Time/Clock';

@CommandHandler(CreateMovieCommand)
export default class CreateMovieCommandHandler
    implements ICommandHandler<CreateMovieCommand>
{
    public constructor(
        @Inject(ServiceProviderEnum.OMDB_HTTP_CLIENT)
        private readonly httpClient: HttpClient,
        @Inject(ServiceProviderEnum.CLOCK)
        private readonly clock: Clock,
        @Inject(RepositoryProviderEnum.MOVIE)
        private readonly movieRepository: MovieRepository,
    ) {}

    public async execute(command: CreateMovieCommand): Promise<void> {
        const currentUser = Authentication.currentUser();
        const title = new MovieTitle(command.title);

        let movie = await this.movieRepository.findByUserIdAndTitle(
            currentUser.userId,
            title,
        );

        if (null === movie) {
            const month = new Month(this.clock.currentMonth());

            if (currentUser.role.value === UserRoleEnum.BASIC) {
                const movieCountInCurrentMonth =
                    await this.movieRepository.countMoviesForUserInMonth(
                        currentUser.userId,
                        month,
                    );

                if (5 === movieCountInCurrentMonth) {
                    throw new MovieLimitForBasicUserException();
                }
            }

            const response = await this.httpClient.send<MovieResponse>(
                new Request('', 'get', {}, { t: command.title }),
            );

            if ('False' === response.body.Response) {
                throw new MovieNotFoundException();
            }

            movie = new Movie(
                new MovieId(command.id),
                Authentication.currentUser().userId,
                new MovieTitle(response.body.Title),
                new MovieReleaseDate(response.body.Released),
                new MovieGenre(response.body.Genre),
                new MovieDirector(response.body.Director),
                month,
            );

            await this.movieRepository.save(movie);
        }
    }
}
