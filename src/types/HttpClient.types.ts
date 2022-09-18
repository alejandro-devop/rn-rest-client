export type ContentTypesType = 'application/json'

/**
 * Http headers which can be found here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */
export type HeaderTypes = {
    Accept?: ContentTypesType
    'Content-Type'?: ContentTypesType
}

export type HttpClientConfig = {
    /** Url to the server where the api is allocated */
    server: string
}
