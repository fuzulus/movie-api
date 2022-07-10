export default class JwtToken {
  public constructor(private readonly _jwtToken: string) {}

  get value(): string {
    return this._jwtToken;
  }
}
