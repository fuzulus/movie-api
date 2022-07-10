export default class MovieDirector {
    public constructor(private readonly _director: string) {}

    get value(): string {
        return this._director;
    }
}
