import { Inject, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import CurrentUser from 'src/Movie/Application/DTO/CurrentUser';
import Authentication from 'src/Movie/Application/Service/Authentication/Authentication';
import HttpClient from 'src/Movie/Application/Service/Http/HttpClient';
import InternalRequest from 'src/Movie/Application/Service/Http/Request';
import AuthenticationException from 'src/Movie/Domain/Exception/AuthenticationException';
import UserId from 'src/Movie/Domain/VO/UserId';
import UserRole from 'src/Movie/Domain/VO/UserRole';
import ServiceProviderEnum from '../Service/ServiceProviderEnum';

export default class AuthenticationMiddleware implements NestMiddleware {
    public constructor(
        @Inject(ServiceProviderEnum.INTERNAL_HTTP_CLIENT)
        private readonly httpClient: HttpClient,
    ) {}

    public async use(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        await this.httpClient
            .send<{ userId: string; role: string }>(
                new InternalRequest('v1/token', 'get', {
                    Authorization: request.headers.authorization,
                }),
            )
            .then((response) => {
                Authentication.setCurrentUser(
                    new CurrentUser(
                        new UserId(response.body.userId),
                        new UserRole(response.body.role),
                    ),
                );

                next();
            })
            .catch((e) => {
                throw new AuthenticationException();
            });
    }
}
