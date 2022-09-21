import React from 'react'
import useApiContext from '../use-api-context/useApiContext'
import { RequestConfigType, RequestConfigOverrideType } from '../../types/HttpClient.types'

type UseGetLazyReturnType = [(overrideOptions?: RequestConfigOverrideType) => Promise<any>, boolean]

const useGetLazy = <UrlType extends string>(
    url: UrlType,
    options?: RequestConfigType
): UseGetLazyReturnType => {
    const { onCompleted, replacements, urlParams } = options || {}
    const [loading, setLoading] = React.useState<boolean>(false)
    const { client } = useApiContext()

    const sendRequest = React.useCallback(async (overrideOptions?: RequestConfigOverrideType) => {
        try {
            setLoading(true)
            const { data } = (await client?.doRequest(url, {
                urlParams,
                replacements,
                ...overrideOptions,
                method: 'get'
            })) as any
            if (onCompleted) {
                onCompleted(data)
            }
            setLoading(false)
            return data
        } catch (err) {
            setLoading(false)
            return {
                error: true,
                ...err
            }
        }
    }, [])

    return [sendRequest, loading]
}

export default useGetLazy
