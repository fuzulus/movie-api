import UserId from 'src/Authentication/Domain/VO/UserId';
import UserRole from 'src/Authentication/Domain/VO/UserRole';

export default class Jwt {
    public constructor(
        private readonly _userId: UserId,
        private readonly _role: UserRole,
    ) {}

    get userId(): UserId {
        return this._userId;
    }

    get role(): UserRole {
        return this._role;
    }
}
