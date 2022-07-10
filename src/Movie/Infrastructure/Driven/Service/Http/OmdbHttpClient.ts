import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import HttpClient from 'src/Movie/Application/Service/Http/HttpClient';
import Request from 'src/Movie/Application/Service/Http/Request';
import Response from 'src/Movie/Application/Service/Http/Response';

const baseUrl = process.env.OMDB_API_BASE_URL;
const apiKey = process.env.OMDB_API_KEY;

@Injectable()
export default class OmdbHttpClient implements HttpClient {
    public constructor(private readonly httpService: HttpService) {}

    public async send<T>(request: Request): Promise<Response<T>> {
        const response = await this.httpService.axiosRef.request({
            url: `${baseUrl}/${request.path}`,
            method: request.method,
            params: {
                apiKey,
                ...request.params,
            },
        });

        return new Response(response.status, response.data);
    }
}
