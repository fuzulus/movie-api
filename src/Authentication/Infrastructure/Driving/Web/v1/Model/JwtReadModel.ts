import Jwt from 'src/Authentication/Application/DTO/Jwt';

export default class JwtReadModel {
    private constructor(
        private readonly userId: string,
        private readonly role: string,
    ) {}

    public static fromJwt(jwt: Jwt) {
        return new JwtReadModel(jwt.userId.value, jwt.role.value);
    }
}
