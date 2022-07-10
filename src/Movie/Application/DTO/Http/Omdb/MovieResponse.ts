interface MovieFoundResponse {
    Title: string;
    Released: string;
    Genre: string;
    Director: string;
}

interface MovieNotFoundResponse {
    Response: string;
    Error: string;
}

type MovieResponse = MovieFoundResponse & MovieNotFoundResponse;

export default MovieResponse;
