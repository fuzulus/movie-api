import UserId from 'src/Movie/Domain/VO/UserId';
import UserRole from 'src/Movie/Domain/VO/UserRole';

export default class CurrentUser {
    constructor(
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
