import Password from './VO/Password';
import UserFullName from './VO/UserFullName';
import UserId from './VO/UserId';
import Username from './VO/Username';
import UserRole from './VO/UserRole';

export default class User {
    public constructor(
        private _id: UserId,
        private _role: UserRole,
        private _fullName: UserFullName,
        private _username: Username,
        private _password: Password,
    ) {}

    get id(): UserId {
        return this._id;
    }

    get role(): UserRole {
        return this._role;
    }

    get fullName(): UserFullName {
        return this._fullName;
    }

    get username(): Username {
        return this._username;
    }

    get password(): Password {
        return this._password;
    }
}
