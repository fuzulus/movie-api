import ResponseException from './ResponseException';

export default class MovieLimitForBasicUserException extends ResponseException {
    public constructor() {
        super(`Movie limit for basic user account reached.`, 400);
    }
}
