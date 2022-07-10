export default class MovieGenre {
    constructor(private readonly _genre: string) {}

    get value(): string {
        return this._genre;
    }
}
