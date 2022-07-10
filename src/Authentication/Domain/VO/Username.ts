export default class Username {
    public constructor(private readonly _username: string) {}

    get value(): string {
        return this._username;
    }
}
