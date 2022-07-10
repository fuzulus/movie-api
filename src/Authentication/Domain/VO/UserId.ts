export default class UserId {
    public constructor(private readonly _id: string) {}

    get value(): string {
        return this._id;
    }
}
