import React from 'react'
import { RequestConfigType } from '../../types/HttpClient.types'

const useGet = <UrlType extends string, ResponseType extends any>(
    url: UrlType,
    options?: RequestConfigType
) => {
    const { defaultData } = options || {}
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<ResponseType>(defaultData)
    const [requestedOnce, setRequestedOnce] = React.useState<boolean>(false)
    const [requesting, setRequesting] = React.useState<boolean>(false)

    const fetchData = React.useCallback(
        async (overrideOptions?: RequestConfigType) => {
            try {
                setRequesting(true)
                setLoading(true)
            } catch {}
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
            requestedOnce,
            requesting
        }
    ]
}

export default useGet
