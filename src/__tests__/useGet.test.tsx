import React from 'react'
import RestClientProvider from '../rest-client-provider'
import { mockedServer, mockedEndPoints } from '../__mocks__/server.mock'
import { renderHook, act } from '@testing-library/react-hooks'
import { useGet } from '../hooks'

describe('[useGet]: ', () => {
    const wrapper = ({ children }: any) => (
        <RestClientProvider
            config={{
                endpoints: mockedEndPoints,
                server: mockedServer
            }}
        >
            {children}
        </RestClientProvider>
    )
    describe('WHEN Calling use get without options', () => {
        it('SHOULD return the http client', async () => {
            await act(async () => {
                const { result, waitForNextUpdate } = renderHook(() => useGet('categories.list'), {
                    wrapper
                })
                await waitForNextUpdate()
                const [data, loading] = result.current
                expect(loading).toBe(false)
                expect(data).toBeUndefined()
            })
        })
    })
    describe('WHEN getting the context', () => {
        it('SHOULD return the http client', async () => {
            await act(async () => {
                const defaultData = [{ id: 1, name: 'some' }]
                const { result, waitForNextUpdate } = renderHook(
                    () => useGet('categories.list', { defaultData }),
                    {
                        wrapper
                    }
                )
                await waitForNextUpdate()
                const [data, loading] = result.current
                expect(loading).toBe(false)
                expect(JSON.stringify(data)).toBe(JSON.stringify(defaultData))
            })
        })
    })
})
