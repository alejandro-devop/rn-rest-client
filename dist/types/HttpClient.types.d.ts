export declare type ContentTypesType = 'application/json';
/**
 * Structure that must be followed to define endpoints
 */
export declare type SingleEndpointConfigtype = string | {
    /** Url or endpoint for the api */
    path: string;
    /** Http method used by the endpoint */
    method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
    /** Url params (This can be defined only for information purporses) */
    params?: {
        [k: string]: 'number' | 'string';
    };
    /** If the method supports payload */
    payload?: {
        [k: string]: any;
    };
};
/**
 * Configuration which must to be defined for the application endpoints
 */
export declare type EndpointsConfigType = {
    [key: string]: SingleEndpointConfigtype | {
        [k: string]: SingleEndpointConfigtype;
    };
};
/**
 * Http headers which can be found here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */
export declare type HeaderTypes = {
    Accept?: ContentTypesType;
    'Content-Type'?: ContentTypesType;
};
export declare type HttpClientConfig = {
    /** Url to the server where the api is allocated */
    server: string;
    endpoints: EndpointsConfigType;
};
export declare type HttpMethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';
export declare type ReplacementsConfigType = {
    startToken?: string;
    endToken?: string;
};
export declare type ResolvePathOptions = {
    method?: HttpMethodType;
    replacements?: {
        [k: string]: number | string;
    };
    urlParams?: {
        [k: string]: number | string;
    };
    replacementConfig?: ReplacementsConfigType;
    debugUrl?: boolean;
};
export declare type DoRequestConfigurationType = ResolvePathOptions & {
    method?: HttpMethodType;
    payload?: {
        [k: string]: any;
    };
};
export declare type DoRequestResponseType = {
    status: number;
    data: any;
    error?: boolean;
    errorMessage?: string;
};
export declare type RequestConfigType = {
    defaultData?: any;
    onCompleted?: (data: any) => Promise<any>;
} & ResolvePathOptions;
export declare type RequestConfigOverrideType = {
    replacements?: {
        [k: string]: number | string;
    };
    urlParams?: {
        [k: string]: number | string;
    };
    replacementConfig?: ReplacementsConfigType;
};