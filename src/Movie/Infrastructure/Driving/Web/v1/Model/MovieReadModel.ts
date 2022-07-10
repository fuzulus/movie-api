import Movie from 'src/Movie/Domain/Movie';

export default class MovieReadModel {
    private constructor(
        private readonly id: string,
        private readonly userId: string,
        private readonly title: string,
        private readonly releaseDate: string,
        private readonly genre: string,
        private readonly director: string,
    ) {}

    public static fromMovie(movie: Movie): MovieReadModel {
        return new MovieReadModel(
            movie.id.value,
            movie.userId.value,
            movie.title.value,
            movie.releaseDate.value,
            movie.genre.value,
            movie.director.value,
        );
    }
}
