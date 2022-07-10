import Request from './Request';
import Response from './Response';

export default interface HttpClient {
    send<T>(request: Request): Promise<Response<T>>;
}
