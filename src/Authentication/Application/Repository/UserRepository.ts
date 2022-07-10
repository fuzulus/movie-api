import User from 'src/Authentication/Domain/User';
import Username from 'src/Authentication/Domain/VO/Username';

export default interface UserRepository {
    findByUsername(username: Username): Promise<User | null>;
}
