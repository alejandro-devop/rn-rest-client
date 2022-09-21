import React from 'react'
import { RequestConfigType } from '../../types/HttpClient.types'
import useGetLazy from '../use-get-lazy/useGetLazy'

const useGet = <UrlType extends string, ResponseType extends any>(
    url: UrlType,
    options?: RequestConfigType
) => {
    const { defaultData } = options || {}
    const [sendRequest, loading] = useGetLazy(url, options)
    const [data, setData] = React.useState<ResponseType>(defaultData)
    const [requestedOnce, setRequestedOnce] = React.useState<boolean>(false)
    const [requesting, setRequesting] = React.useState<boolean>(false)

    const fetchData = React.useCallback(
        async (overrideOptions?: RequestConfigType) => {
            setRequesting(true)
            const response = await sendRequest(overrideOptions)
            setData(response)
            setRequestedOnce(true)
            setRequesting(false)
        },
        [requesting, requestedOnce]
    )

    React.useEffect(() => {
        if (!requesting && !requestedOnce) {
            fetchData()
        }
    }, [requesting, requestedOnce])

    return [
        data,
        loading,
        {
            refresh: fetchData
        }
    ]
}

export default useGet
