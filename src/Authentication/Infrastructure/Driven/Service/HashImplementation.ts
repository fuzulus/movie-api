import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import Hash from 'src/Authentication/Application/Service/Hash';

@Injectable()
export default class HashImplementation implements Hash {
    public sha256(v: string): string {
        return createHash('sha256').update(v).digest('hex');
    }
}
