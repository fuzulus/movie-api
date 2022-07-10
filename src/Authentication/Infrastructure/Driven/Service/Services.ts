import AuthenticationImplementation from './AuthenticationImplementation';
import HashImplementation from './HashImplementation';
import ServiceProviderEnum from './ServiceProviderEnum';

export default [
    {
        provide: ServiceProviderEnum.AUTHENTICATION,
        useClass: AuthenticationImplementation,
    },
    {
        provide: ServiceProviderEnum.HASH,
        useClass: HashImplementation,
    }
];
