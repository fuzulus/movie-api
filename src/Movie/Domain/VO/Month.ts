export default class Month {
    public constructor(private readonly _month: number) {}

    get value(): number {
        return this._month;
    }
}
