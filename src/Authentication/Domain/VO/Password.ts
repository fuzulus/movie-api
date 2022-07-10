export default class Password {
  public constructor(private readonly _password: string) {}

  get value(): string {
    return this._password;
  }
}
