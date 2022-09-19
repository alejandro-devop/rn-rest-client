import React from 'react'
import { RestClientContextType } from '../types/RestClientProvider.types'

export const RestClientContext = React.createContext<RestClientContextType>({})
export const RestClientContextProvider = RestClientContext.Provider
export const RestclientContextConsumer = RestClientContext.Consumer
