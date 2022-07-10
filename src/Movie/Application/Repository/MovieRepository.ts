import Movie from 'src/Movie/Domain/Movie';
import Month from 'src/Movie/Domain/VO/Month';
import MovieId from 'src/Movie/Domain/VO/MovieId';
import MovieTitle from 'src/Movie/Domain/VO/MovieTitle';
import UserId from 'src/Movie/Domain/VO/UserId';

export default interface MovieRepository {
    nextId(): MovieId;

    get(id: MovieId): Promise<Movie>;

    save(movie: Movie): Promise<void>;

    countMoviesForUserInMonth(userId: UserId, month: Month): Promise<number>;

    findByUserIdAndTitle(
        userId: UserId,
        title: MovieTitle,
    ): Promise<Movie | null>;
}
