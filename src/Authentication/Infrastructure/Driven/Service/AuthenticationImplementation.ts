import Authentication from 'src/Authentication/Application/Service/Authentication';
import * as jwt from 'jsonwebtoken';
import Credentials from 'src/Authentication/Domain/Credentials';
import JwtToken from 'src/Authentication/Domain/JwtToken';
import { Inject, Injectable } from '@nestjs/common';
import UserRepository from 'src/Authentication/Application/Repository/UserRepository';
import RepositoryProviderEnum from '../Persistence/RepositoryProviderEnum';
import Hash from 'src/Authentication/Application/Service/Hash';
import ServiceProviderEnum from './ServiceProviderEnum';
import AuthenticationException from 'src/Authentication/Domain/Exception/AuthenticationException';
import Jwt from 'src/Authentication/Application/DTO/Jwt';
import UserId from 'src/Authentication/Domain/VO/UserId';
import UserRole from 'src/Authentication/Domain/VO/UserRole';

@Injectable()
export default class AuthenticationImplementation implements Authentication {
    public constructor(
        @Inject(RepositoryProviderEnum.USER)
        private readonly userRepository: UserRepository,
        @Inject(ServiceProviderEnum.HASH)
        private readonly hash: Hash,
    ) {}

    public async authenticate(credentials: Credentials): Promise<JwtToken> {
        const { JWT_SECRET: secret } = process.env;

        const user = await this.userRepository.findByUsername(
            credentials.username,
        );

        if (
            null === user ||
            this.hash.sha256(credentials.password.value) !== user.password.value
        ) {
            throw new AuthenticationException();
        }

        return new JwtToken(
            jwt.sign(
                {
                    userId: user.id.value,
                    name: user.fullName.value,
                    role: user.role.value,
                },
                secret,
                {
                    issuer: 'https://www.netguru.com/',
                    subject: `${user.id.value}`,
                    expiresIn: 30 * 60,
                },
            ),
        );
    }

    public async decodeToken(token: JwtToken): Promise<Jwt> {
        const { JWT_SECRET: secret } = process.env;

        try {
            jwt.verify(token.value, secret);

            const decodedToken = jwt.decode(token.value, { json: true });

            return new Jwt(
                new UserId(decodedToken.userId),
                new UserRole(decodedToken.role),
            );
        } catch (e) {
            throw new AuthenticationException();
        }
    }
}
