import { HeaderTypes, HttpClientConfig, EndpointsConfigType, ResolvePathOptions, DoRequestConfigurationType } from '../types/HttpClient.types';
import { DoRequestResponseType } from '../types/HttpClient.types';
/**
 * This class contains the logic to interact with http requests
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 */
declare class HttpClient {
    /**
     * Http headers which you can find here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
     */
    private headers;
    private token?;
    private refreshToken?;
    private readonly shouldRefreshToken?;
    private readonly onRefreshToken?;
    /**
     * Contains the server where the requests will be send
     */
    private readonly server;
    private readonly endpoints;
    constructor(config: HttpClientConfig);
    addHeaders: (headers: HeaderTypes) => void;
    setToken: (token?: string) => HttpClient;
    setRefresh: (refresh?: string) => HttpClient;
    getToken: () => string | undefined;
    /**
     * Current headers configured for the client
     * @returns HeaderTypes
     */
    getHeaders(): HeaderTypes;
    /**
     * Current configured server for the client
     * @returns string
     */
    getServer(): string | undefined;
    /**
     * Current configured endpoints for the client
     * @returns EndpointsConfigType
     */
    getEndpoints(): EndpointsConfigType;
    private findEndpoint;
    private addUrlParams;
    /**
     * Loop for every key in the replacement object and replace the found keys
     * for any assigned value
     * @param url string
     * @param options ResolvePathOptions
     * @returns string
     */
    private executingReplacements;
    private clearMethod;
    private getMethod;
    /**
     * Converts a dot notation string into a valid url to make a request
     * @param path string
     * @param options ResolvePathOptions
     * @returns [string, string]
     */
    resolvePath(path: string, options?: ResolvePathOptions): string[];
    doRequest(path: string, config?: DoRequestConfigurationType): Promise<DoRequestResponseType>;
}
export default HttpClient;
