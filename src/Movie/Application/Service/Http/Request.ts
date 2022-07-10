export default class Request {
    public constructor(
        private readonly _path: string,
        private readonly _method: string,
        private readonly _headers: Record<string, string>,
        private readonly _params: Record<string, string> = {},
    ) {}

    get path(): string {
        return this._path;
    }

    get method(): string {
        return this._method;
    }

    get headers(): Record<string, string> {
        return this._headers;
    }

    get params(): Record<string, string> {
        return this._params;
    }
}
