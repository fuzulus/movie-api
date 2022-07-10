import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import MovieRepository from 'src/Movie/Application/Repository/MovieRepository';
import MovieNotFoundException from 'src/Movie/Domain/Exception/MovieNotFoundException';
import Movie from 'src/Movie/Domain/Movie';
import Month from 'src/Movie/Domain/VO/Month';
import MovieDirector from 'src/Movie/Domain/VO/MovieDirector';
import MovieGenre from 'src/Movie/Domain/VO/MovieGenre';
import MovieId from 'src/Movie/Domain/VO/MovieId';
import MovieReleaseDate from 'src/Movie/Domain/VO/MovieReleaseDate';
import MovieTitle from 'src/Movie/Domain/VO/MovieTitle';
import UserId from 'src/Movie/Domain/VO/UserId';
import { v4 as uuid } from 'uuid';
import { MovieDocument, MovieModel } from '../Definition/Movie';

@Injectable()
export default class MongoMovieRepository implements MovieRepository {
    public constructor(
        @InjectModel(MovieModel.name)
        private readonly movieModel: Model<MovieDocument>,
    ) {}

    public nextId(): MovieId {
        return new MovieId(uuid());
    }

    public async get(id: MovieId): Promise<Movie> {
        const doc = await this.movieModel.findOne({ id: id.value }).exec();

        if (null === doc) {
            throw new MovieNotFoundException();
        }

        return new Movie(
            new MovieId(doc.id),
            new UserId(doc.userId),
            new MovieTitle(doc.title),
            new MovieReleaseDate(doc.releaseDate),
            new MovieGenre(doc.genre),
            new MovieDirector(doc.director),
            new Month(doc.createdInMonth),
        );
    }

    public async save(movie: Movie): Promise<void> {
        const model = await this.movieModel.create({
            id: movie.id.value,
            userId: movie.userId.value,
            title: movie.title.value,
            titleLower: movie.title.value.toLocaleLowerCase(),
            releaseDate: movie.releaseDate.value,
            genre: movie.genre.value,
            director: movie.director.value,
            createdInMonth: movie.createdInMonth.value,
        });

        await model.save();
    }

    public async countMoviesForUserInMonth(
        userId: UserId,
        month: Month,
    ): Promise<number> {
        return await this.movieModel
            .find({ userId: userId.value, createdInMonth: month.value })
            .count()
            .exec();
    }

    public async findByUserIdAndTitle(
        userId: UserId,
        title: MovieTitle,
    ): Promise<Movie | null> {
        const doc = await this.movieModel
            .findOne({
                userId: userId.value,
                titleLower: title.value.toLocaleLowerCase(),
            })
            .exec();

        if (null === doc) {
            return null;
        }

        return new Movie(
            new MovieId(doc.id),
            new UserId(doc.userId),
            new MovieTitle(doc.title),
            new MovieReleaseDate(doc.releaseDate),
            new MovieGenre(doc.genre),
            new MovieDirector(doc.director),
            new Month(doc.createdInMonth),
        );
    }
}
