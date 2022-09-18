import React from 'react'
type RestClientContextType = {}

export const RestClientContext = React.createContext<RestClientContextType>({})
export const RestClientContextProvider = RestClientContext.Provider
export const RestclientContextConsumer = RestClientContext.Consumer
