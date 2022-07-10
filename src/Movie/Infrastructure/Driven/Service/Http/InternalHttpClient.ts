import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import HttpClient from 'src/Movie/Application/Service/Http/HttpClient';
import Request from 'src/Movie/Application/Service/Http/Request';
import Response from 'src/Movie/Application/Service/Http/Response';

const baseUrl = `${process.env.INTERNAL_API_BASE_URL}:${process.env.APP_PORT}`;

@Injectable()
export default class InternalHttpClient implements HttpClient {
    public constructor(private readonly httpService: HttpService) {}

    public async send<T>(request: Request): Promise<Response<T>> {
        const response = await this.httpService.axiosRef.request({
            url: `${baseUrl}/${request.path}`,
            method: request.method,
            headers: request.headers,
        });

        return new Response(response.status, response.data);
    }
}
