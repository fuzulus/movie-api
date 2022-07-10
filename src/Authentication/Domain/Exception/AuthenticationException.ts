import ResponseException from './ResponseException';

export default class AuthenticationException extends ResponseException {
    constructor() {
        super(`Invalid username or password.`, 401);
    }
}
