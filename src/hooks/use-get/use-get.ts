import React from 'react'

type UseGetConfigType = {
    defaultData?: any
}

const useGet = <UrlType extends string, ResponseType extends any>(
    url: UrlType,
    options?: UseGetConfigType
) => {
    const { defaultData } = options || {}
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<ResponseType>(defaultData)

    return [data, loading]
}

export default useGet
