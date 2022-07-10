export default class ResponseException extends Error {
    public readonly statusCode: number;

    constructor(public readonly message: string, statusCode?: number) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode = statusCode || 500;
    }
}
