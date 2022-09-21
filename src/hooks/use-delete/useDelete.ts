import React from 'react'
import useApiContext from '../use-api-context/useApiContext'

type UseDeleteReturnType = []
type OverrideOptionsType = any

const useDelete = <UrlType extends string>(url: UrlType) => {
    const [loading, setLoading] = React.useState(false)
    const { client } = useApiContext()
    const sendRequest = async (overrideOptions?: OverrideOptionsType) => {
        try {
            setLoading(true)
            const response = await client?.doRequest(url, {
                ...overrideOptions,
                method: 'delete'
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

export default useDelete
