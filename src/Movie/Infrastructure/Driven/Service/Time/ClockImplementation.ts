import { Injectable } from '@nestjs/common';
import Clock from 'src/Movie/Application/Service/Time/Clock';

@Injectable()
export default class ClockImplementation implements Clock {
    public currentMonth(): number {
        return new Date().getMonth() + 1;
    }
}
