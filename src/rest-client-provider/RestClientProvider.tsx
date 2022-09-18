import React from 'react'
import { RestClientContextProvider } from './RestClientContext'

type ApiMockType = {
    ok?: any
    fail?: any
    delay?: number
}

interface RestClientProviderProps {
    children: React.ReactNode
    config: {
        server: string
        endpoints: {
            [k: string]:
                | string
                | {
                      [k: string]: string
                  }
        }
    }
    mocks?: {
        [k: string]: ApiMockType
    }
}
const RestClientProvider: React.FC<RestClientProviderProps> = ({ children }) => {
    return <RestClientContextProvider value={{}}>{children}</RestClientContextProvider>
}

export default RestClientProvider
