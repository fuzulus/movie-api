import { IsNotEmpty } from 'class-validator';

export default class AuthenticationModel {
    @IsNotEmpty()
    public readonly username: string;

    @IsNotEmpty()
    public readonly password: string;

    public constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
