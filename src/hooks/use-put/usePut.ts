import React from 'react'
import useApiContext from '../use-api-context/useApiContext'

type UsePutReturnType = []
type OverrideOptionsType = any

const usePut = <UrlType extends string>(url: UrlType) => {
    const [loading, setLoading] = React.useState(false)
    const { client } = useApiContext()
    const sendRequest = async <PayloadType = any>(
        payload?: PayloadType,
        overrideOptions?: OverrideOptionsType
    ) => {
        try {
            setLoading(true)
            const response = await client?.doRequest(url, {
                payload: payload,
                ...overrideOptions,
                method: 'put'
            })
            setLoading(false)
            const { data } = response as any
            // ToDo: handle response for 500 errors
            return data
        } catch (err) {
            return {
                ...err
            }
        }
    }
    return [sendRequest, loading]
}

export default usePut
