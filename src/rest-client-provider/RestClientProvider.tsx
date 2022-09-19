import React from 'react'
import { RestClientContextProvider } from './RestClientContext'
import { HttpClientConfig } from '../types/HttpClient.types'
import HttpClient from './HttpClient'

type ApiMockType = {
    ok?: any
    fail?: any
    delay?: number
}

interface RestClientProviderProps {
    children: React.ReactNode
    config: HttpClientConfig
    mocks?: {
        [k: string]: ApiMockType
    }
}
const RestClientProvider: React.FC<RestClientProviderProps> = ({ children, config }) => {
    const httpClient = React.useRef(new HttpClient(config))

    return (
        <RestClientContextProvider
            value={{
                client: httpClient.current
            }}
        >
            {children}
        </RestClientContextProvider>
    )
}

export default RestClientProvider
