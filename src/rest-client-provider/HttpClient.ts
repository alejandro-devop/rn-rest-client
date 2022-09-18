import {
    HeaderTypes,
    HttpClientConfig,
    EndpointsConfigType,
    ResolvePathOptions
} from '../types/HttpClient.types'

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
    /**
     * Contains the server where the requests will be send
     */
    private readonly server: string | undefined

    private readonly endpoints: EndpointsConfigType

    constructor(config: HttpClientConfig) {
        const { server, endpoints } = config
        this.server = server
        this.endpoints = endpoints
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

        return [`${this.server}${url}`, urlDefinedMethod]
    }
}

export default HttpClient
