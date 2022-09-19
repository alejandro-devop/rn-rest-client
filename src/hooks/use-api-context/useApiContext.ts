import React from 'react'
import { RestClientContext } from '../../rest-client-provider/RestClientContext'

const useApiContext = () => {
    const { client } = React.useContext(RestClientContext)
    return {
        client
    }
}

export default useApiContext
