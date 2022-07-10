export default class MovieReleaseDate {
    public constructor(private readonly _releaseDate: string) {}

    get value(): string {
        return this._releaseDate;
    }
}
