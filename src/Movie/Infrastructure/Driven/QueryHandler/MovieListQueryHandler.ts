import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import MovieListQuery from 'src/Movie/Application/Query/MovieListQuery';
import Movie from 'src/Movie/Domain/Movie';
import Month from 'src/Movie/Domain/VO/Month';
import MovieDirector from 'src/Movie/Domain/VO/MovieDirector';
import MovieGenre from 'src/Movie/Domain/VO/MovieGenre';
import MovieId from 'src/Movie/Domain/VO/MovieId';
import MovieReleaseDate from 'src/Movie/Domain/VO/MovieReleaseDate';
import MovieTitle from 'src/Movie/Domain/VO/MovieTitle';
import UserId from 'src/Movie/Domain/VO/UserId';
import {
    MovieDocument,
    MovieModel,
} from '../Persistence/Mongo/Definition/Movie';

@QueryHandler(MovieListQuery)
export default class MovieListQueryHandler
    implements IQueryHandler<MovieListQuery>
{
    public constructor(
        @InjectModel(MovieModel.name)
        private readonly movieModel: Model<MovieDocument>,
    ) {}

    public async execute(query: MovieListQuery): Promise<Movie[]> {
        return this.movieModel
            .find({ userId: query.userId })
            .then((movies) =>
                movies.map(
                    (doc) =>
                        new Movie(
                            new MovieId(doc.id),
                            new UserId(doc.userId),
                            new MovieTitle(doc.title),
                            new MovieReleaseDate(doc.releaseDate),
                            new MovieGenre(doc.genre),
                            new MovieDirector(doc.director),
                            new Month(doc.createdInMonth),
                        ),
                ),
            );
    }
}
