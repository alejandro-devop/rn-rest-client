import React from 'react'
import { RestClientContextProvider } from './RestClientContext'
import { HttpClientConfig } from '../types/HttpClient.types'
import HttpClient from './HttpClient'
import usePrevProps from '../hooks/use-prevprops/usePrevProps'

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
    const prevProps = usePrevProps({ auth: config.auth })
    React.useEffect(() => {
        if (prevProps.auth !== config.auth) {
            httpClient.current.addHeaders({ Authorization: config.auth })
        }
    }, [prevProps.auth, config.auth])

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
