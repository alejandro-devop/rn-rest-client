import React from 'react';
import { HttpClientConfig } from '../types/HttpClient.types';
declare type ApiMockType = {
    ok?: any;
    fail?: any;
    delay?: number;
};
interface RestClientProviderProps {
    children: React.ReactNode;
    config: HttpClientConfig;
    mocks?: {
        [k: string]: ApiMockType;
    };
}
declare const RestClientProvider: React.FC<RestClientProviderProps>;
export default RestClientProvider;
