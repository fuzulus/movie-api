import ResponseException from './ResponseException';

export default class InvalidAuthorizationException extends ResponseException {
    constructor() {
        super(`Invalid authorization.`, 401);
    }
}
