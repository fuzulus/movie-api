import CurrentUser from '../../DTO/CurrentUser';

export default class Authentication {
    private static _currentUser: CurrentUser;

    public static setCurrentUser(currentUser: CurrentUser): void {
        Authentication._currentUser = currentUser;
    }

    public static currentUser(): CurrentUser {
        return Authentication._currentUser;
    }
}
