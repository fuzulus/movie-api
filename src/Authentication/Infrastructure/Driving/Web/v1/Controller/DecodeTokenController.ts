import { Controller, Get, Inject, Req } from '@nestjs/common';
import { Request } from 'express';
import Authentication from 'src/Authentication/Application/Service/Authentication';
import InvalidAuthorizationException from 'src/Authentication/Domain/Exception/InvalidAuthorizationException';
import JwtToken from 'src/Authentication/Domain/JwtToken';
import ServiceProviderEnum from 'src/Authentication/Infrastructure/Driven/Service/ServiceProviderEnum';
import JwtReadModel from '../Model/JwtReadModel';

@Controller('/v1/token')
export default class DecodeTokenController {
    public constructor(
        @Inject(ServiceProviderEnum.AUTHENTICATION)
        private readonly authentication: Authentication,
    ) {}

    @Get()
    public async validate(@Req() request: Request): Promise<JwtReadModel> {
        const authHeader = request.headers.authorization;

        if (
            undefined === authHeader ||
            false === authHeader.startsWith('Bearer')
        ) {
            throw new InvalidAuthorizationException();
        }

        const token = authHeader.slice(7);

        return JwtReadModel.fromJwt(
            await this.authentication.decodeToken(new JwtToken(token)),
        );
    }
}
