import { HeaderTypes, HttpClientConfig } from '../types/HttpClient.types'

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

    constructor(config: HttpClientConfig) {
        const { server } = config
        this.server = server
    }

    public getHeaders() {
        return this.headers
    }

    public getServer() {
        return this.server
    }
}

export default HttpClient
