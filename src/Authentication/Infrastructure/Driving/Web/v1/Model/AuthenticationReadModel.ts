import JwtToken from 'src/Authentication/Domain/JwtToken';

export default class AuthenticationReadModel {
    private constructor(private readonly _jwtToken: string) {}

    public static fromJwtToken(jwtToken: JwtToken) {
        return new AuthenticationReadModel(jwtToken.value);
    }

    public toObject(): Record<string, string> {
        return {
            token: this._jwtToken,
        };
    }
}
