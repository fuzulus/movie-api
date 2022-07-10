import InternalHttpClient from './Http/InternalHttpClient';
import OmdbHttpClient from './Http/OmdbHttpClient';
import ServiceProviderEnum from './ServiceProviderEnum';
import ClockImplementation from './Time/ClockImplementation';

export default [
    {
        provide: ServiceProviderEnum.INTERNAL_HTTP_CLIENT,
        useClass: InternalHttpClient,
    },
    {
        provide: ServiceProviderEnum.OMDB_HTTP_CLIENT,
        useClass: OmdbHttpClient,
    },
    {
        provide: ServiceProviderEnum.CLOCK,
        useClass: ClockImplementation,
    },
];
