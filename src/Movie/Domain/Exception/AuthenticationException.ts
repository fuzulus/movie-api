import ResponseException from './ResponseException';

export default class AuthenticationException extends ResponseException {
    constructor() {
        super(`Unauthorized.`, 401);
    }
}
