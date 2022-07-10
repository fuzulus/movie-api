import { Test } from '@nestjs/testing';
import Hash from 'src/Authentication/Application/Service/Hash';
import HashImplementation from 'src/Authentication/Infrastructure/Driven/Service/HashImplementation';
import ServiceProviderEnum from 'src/Authentication/Infrastructure/Driven/Service/ServiceProviderEnum';

describe('Hash', () => {
    let hash: Hash;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: ServiceProviderEnum.HASH,
                    useClass: HashImplementation,
                },
            ],
        }).compile();

        hash = moduleRef.get<Hash>(ServiceProviderEnum.HASH);
    });

    describe('Test sha256', () => {
        it('Will return valid SHA-256 value', () => {
            expect(hash.sha256('test')).toBe(
                '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
            );
        });
    });
});
