import {
    HeaderTypes,
    HttpClientConfig,
    EndpointsConfigType,
    ResolvePathOptions,
    DoRequestConfigurationType
} from '../types/HttpClient.types'
import axios from 'axios'
import { DoRequestResponseType } from '../types/HttpClient.types'
import _ from 'lodash'

/**
 * This class contains the logic to interact with http requests
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 */
class HttpClient {
    /**
     * Http headers which you can find here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
     */
    private headers: HeaderTypes = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }

    private token?: string
    private refreshToken?: string

    // private readonly onRequestDone?: () => boolean
    private readonly shouldRefreshToken?: (data?: any) => boolean
    private readonly onRefreshToken?: () => void
    /**
     * Contains the server where the requests will be send
     */
    private readonly server: string | undefined

    private readonly endpoints: EndpointsConfigType

    constructor(config: HttpClientConfig) {
        const { server, endpoints, onRefreshToken, shouldRefreshToken, auth } = config
        this.server = server
        this.endpoints = endpoints
        this.shouldRefreshToken = shouldRefreshToken?.bind(this)
        this.onRefreshToken = onRefreshToken?.bind(this)
        if (auth !== undefined) {
            this.addHeaders({ Authorization: auth })
        }
    }

    public addHeaders = (headers: HeaderTypes) => {
        this.headers = {
            ...this.headers,
            ...headers
        }
    }

    public setToken = (token?: string): HttpClient => {
        this.token = token
        return this
    }

    public setRefresh = (refresh?: string): HttpClient => {
        this.refreshToken = refresh
        return this
    }

    public getToken = () => {
        return this.token
    }

    /**
     * Current headers configured for the client
     * @returns HeaderTypes
     */
    public getHeaders() {
        return this.headers
    }

    /**
     * Current configured server for the client
     * @returns string
     */
    public getServer() {
        return this.server
    }
    /**
     * Current configured endpoints for the client
     * @returns EndpointsConfigType
     */
    public getEndpoints() {
        return this.endpoints
    }

    private findEndpoint(path: string) {
        const parts = path.split('.')
        const url =
            parts.length > 1
                ? parts
                      .reduce((result: any, pathPortion): string | {} => {
                          if (result[pathPortion]) {
                              result = result[pathPortion]
                          } else {
                              // url must be reseted if the part does not exists
                              result = '/invalid-path'
                          }
                          return result
                      }, this.endpoints)
                      .toString()
                : `/${path}`
        return url
    }

    private addUrlParams(url: string, options?: ResolvePathOptions) {
        const { urlParams = {} } = options || {}
        const params: string[] = []
        Object.keys(urlParams).forEach((currentKey: string) => {
            const value = encodeURIComponent(urlParams[currentKey])
            params.push(`${currentKey}=${value}`)
        })
        if (params.length > 0) {
            url = `${url}?${params.join('&')}`
        }
        return url
    }

    /**
     * Loop for every key in the replacement object and replace the found keys
     * for any assigned value
     * @param url string
     * @param options ResolvePathOptions
     * @returns string
     */
    private executingReplacements(url: string, options?: ResolvePathOptions) {
        const { replacements = {}, replacementConfig = {} } = options || {}
        const { startToken = '{', endToken = '}' } = replacementConfig
        Object.keys(replacements).map((currentKey) => {
            url = url.replace(
                new RegExp(`${startToken}${currentKey}${endToken}`),
                replacements[currentKey].toString()
            )
        })
        return url
    }

    private clearMethod(url: string) {
        /**
         * If the url has type definition we must clean it
         */
        if (url.includes('<') && url.includes('>')) {
            url = url.replace(new RegExp(`<.*>`, 'g'), '')
        }
        return url
    }

    private getMethod(url: string) {
        let type = ''
        const matches = url.match(new RegExp('(<[a-zA-Z]+>)', 'g'))
        const [match] = matches || []
        type = match?.replace(new RegExp('<|>', 'g'), '')
        return type
    }

    /**
     * Converts a dot notation string into a valid url to make a request
     * @param path string
     * @param options ResolvePathOptions
     * @returns [string, string]
     */
    public resolvePath(path: string, options?: ResolvePathOptions) {
        let url = this.findEndpoint(path)
        const urlDefinedMethod = this.getMethod(url)
        url = this.clearMethod(url)
        url = this.executingReplacements(url, options)
        url = this.addUrlParams(url, options)
        // Append a tailing slash to avoid conflicts for headers
        if (options?.appendSlash) {
            url = `${url}/`.replace(/\/\//g, '/')
        }
        return [`${this.server}${url}`, urlDefinedMethod]
    }

    public async doRequest(
        path: string,
        config?: DoRequestConfigurationType
    ): Promise<DoRequestResponseType> {
        const [url, methodType] = this.resolvePath(path, config)
        const { method = 'get', form, headers } = config || {}

        if (!_.isEmpty(methodType) && methodType !== method) {
            throw new Error('Invalid method for endpoint')
        }
        const mergedHeaders = {
            ...this.headers,
            ...headers
        }

        try {
            const sendRequest = async () => {
                let payload = config?.payload || {}
                let formData = new FormData()
                if (form === true && payload) {
                    mergedHeaders['Content-Type'] = 'multipart/form-data'
                    Object.keys(payload).forEach((formKey) => {
                        formData.append(formKey, payload[formKey])
                    })
                }

                if (method === 'post') {
                    const response = await axios.post(url, payload, {
                        headers: {
                            ...mergedHeaders
                        }
                    })
                    const { data, status } = response
                    return {
                        status,
                        data
                    }
                } else if (method === 'put') {
                    const response = await axios.put(url, payload, {
                        headers: mergedHeaders
                    })
                    const { data, status } = response
                    return {
                        status,
                        data
                    }
                } else if (method === 'patch') {
                    const { data, status } = await axios.patch(url, payload, {
                        headers: mergedHeaders
                    })
                    return {
                        status,
                        data
                    }
                } else if (method === 'delete') {
                    const { data, status } = await axios.delete(url, {
                        headers: mergedHeaders
                    })
                    return {
                        status,
                        data
                    }
                } else {
                    const { data, status } = await axios.get(url, {
                        headers: mergedHeaders
                    })
                    return {
                        status,
                        data
                    }
                }
            }
            if (this.shouldRefreshToken && this.onRefreshToken && this.refreshToken) {
            }
            const response = await sendRequest()
            // console.log('Some response: ', response)
            return response
        } catch (error) {
            const { data } = error.response
            // console.log('Something goes wrong: ', error)
            if (this.shouldRefreshToken && this.shouldRefreshToken(data) && this.onRefreshToken) {
                this.onRefreshToken()
            }
            throw {
                error: true,
                errorMessage: error.message,
                status: error.status,
                data: data
            }
        }
    }
}

export default HttpClient
