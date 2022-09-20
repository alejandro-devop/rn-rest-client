import { useEffect, useRef } from 'react'

/**
 * Hook to store the previous value for the props passed to a component
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param value
 * @returns
 */
const usePrevProps = <R extends { [key: string]: any }>(value: R): R => {
    const valuesRef = useRef(value)
    useEffect(() => {
        valuesRef.current = value
    })
    return valuesRef.current
}

export default usePrevProps
