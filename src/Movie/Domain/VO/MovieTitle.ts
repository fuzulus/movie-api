export default class MovieTitle {
    public constructor(private readonly _title: string) {}

    get value(): string {
        return this._title;
    }
}
