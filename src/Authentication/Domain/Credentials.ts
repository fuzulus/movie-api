import Password from './VO/Password';
import Username from './VO/Username';

export default class Credentials {
  public constructor(
    private readonly _username: Username,
    private readonly _password: Password,
  ) {}

  get username(): Username {
    return this._username;
  }

  get password(): Password {
    return this._password;
  }
}
