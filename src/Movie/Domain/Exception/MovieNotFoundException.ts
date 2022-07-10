import ResponseException from './ResponseException';

export default class MovieNotFoundException extends ResponseException {
    public constructor() {
        super(`Movie not found.`, 404);
    }
}
