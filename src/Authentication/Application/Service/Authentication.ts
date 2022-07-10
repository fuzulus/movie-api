import Credentials from 'src/Authentication/Domain/Credentials';
import JwtToken from 'src/Authentication/Domain/JwtToken';
import Jwt from '../DTO/Jwt';

export default interface Authentication {
    authenticate(credentials: Credentials): Promise<JwtToken>;

    decodeToken(token: JwtToken): Promise<Jwt>;
}
