import { Body, Controller, Inject, Post } from '@nestjs/common';
import Authentication from 'src/Authentication/Application/Service/Authentication';
import Credentials from 'src/Authentication/Domain/Credentials';
import Password from 'src/Authentication/Domain/VO/Password';
import Username from 'src/Authentication/Domain/VO/Username';
import ServiceProviderEnum from 'src/Authentication/Infrastructure/Driven/Service/ServiceProviderEnum';
import AuthenticationModel from '../Model/AuthenticationModel';
import AuthenticationReadModel from '../Model/AuthenticationReadModel';

@Controller('/v1/auth')
export default class AuthenticateUserController {
    public constructor(
        @Inject(ServiceProviderEnum.AUTHENTICATION)
        private readonly authentication: Authentication,
    ) {}

    @Post()
    public authenticate(@Body() model: AuthenticationModel) {
        return this.authentication
            .authenticate(
                new Credentials(
                    new Username(model.username),
                    new Password(model.password),
                ),
            )
            .then((jwtToken) =>
                AuthenticationReadModel.fromJwtToken(jwtToken).toObject(),
            );
    }
}
