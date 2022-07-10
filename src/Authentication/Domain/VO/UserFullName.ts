export default class UserFullName {
    public constructor(private readonly _fullName: string) {}

    get value(): string {
        return this._fullName;
    }
}
