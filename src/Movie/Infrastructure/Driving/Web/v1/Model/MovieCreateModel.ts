import { IsNotEmpty } from 'class-validator';

export default class MovieCreateModel {
    @IsNotEmpty()
    public readonly title: string;

    public constructor(title: string) {
        this.title = title;
    }
}
