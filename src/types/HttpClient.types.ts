export type ContentTypesType = 'application/json' | 'multipart/form-data'

/**
 * Structure that must be followed to define endpoints
 */
export type SingleEndpointConfigtype =
    | string
    | {
          /** Url or endpoint for the api */
          path: string
          /** Http method used by the endpoint */
          method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'
          /** Url params (This can be defined only for information purporses) */
          params?: { [k: string]: 'number' | 'string' }
          /** If the method supports payload */
          payload?: { [k: string]: any }
      }

/**
 * Configuration which must to be defined for the application endpoints
 */
export type EndpointsConfigType = {
    [key: string]: SingleEndpointConfigtype | { [k: string]: SingleEndpointConfigtype }
}

/**
 * Http headers which can be found here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
 */
export type HeaderTypes = {
    Accept?: ContentTypesType
    Authorization?: string
    'Content-Type'?: ContentTypesType
}

export type HttpClientConfig = {
    /** Url to the server where the api is allocated */
    server: string
    endpoints: EndpointsConfigType
    auth?: string
    onRequestDone?: () => boolean
    onRefreshToken?: (data?: any) => void
    shouldRefreshToken?: (data?: any) => boolean
}

export type HttpMethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type ReplacementsConfigType = {
    startToken?: string
    endToken?: string
}

export type ResolvePathOptions = {
    method?: HttpMethodType
    replacements?: { [k: string]: number | string }
    urlParams?: { [k: string]: number | string }
    replacementConfig?: ReplacementsConfigType
    debugUrl?: boolean
    appendSlash?: boolean
}

export type DoRequestConfigurationType = ResolvePathOptions & {
    method?: HttpMethodType
    payload?: { [k: string]: any }
    form?: boolean
    headers?: HeaderTypes
}

export type DoRequestResponseType = {
    status: number
    data: any
    error?: boolean
    errorMessage?: string
}

export type RequestConfigType = {
    defaultData?: any
    onCompleted?: (data: any, config: any) => Promise<any>
} & ResolvePathOptions

export type RequestConfigOverrideType = {
    replacements?: { [k: string]: number | string }
    urlParams?: { [k: string]: number | string }
    replacementConfig?: ReplacementsConfigType
}
