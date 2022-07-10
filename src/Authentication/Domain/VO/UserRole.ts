export default class UserRole {
    public constructor(private readonly _role: string) {}

    get value(): string {
        return this._role;
    }
}
