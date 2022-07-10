export default class Response<T> {
    public constructor(
        private readonly _statusCode: number,
        private readonly _body: T,
    ) {}

    get statusCode(): number {
        return this._statusCode;
    }

    get body(): T {
        return this._body;
    }
}
