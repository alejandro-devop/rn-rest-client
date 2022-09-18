import React from 'react';
declare type ApiMockType = {
    ok?: any;
    fail?: any;
    delay?: number;
};
interface RestClientProviderProps {
    children: React.ReactNode;
    config: {
        server: string;
        endpoints: {
            [k: string]: string | {
                [k: string]: string;
            };
        };
    };
    mocks?: {
        [k: string]: ApiMockType;
    };
}
declare const RestClientProvider: React.FC<RestClientProviderProps>;
export default RestClientProvider;
