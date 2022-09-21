import { EndpointsConfigType } from '../types/HttpClient.types';
export declare const mockedServer = "http://some-server.com";
export declare const mockedEndPoints: EndpointsConfigType;
export declare const axiosMocker: {
    get: () => Promise<string>;
};
