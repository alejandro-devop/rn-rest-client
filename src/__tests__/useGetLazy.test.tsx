import React from 'react'
import RestClientProvider from '../rest-client-provider'
import { mockedServer, mockedEndPoints } from '../__mocks__/server.mock'
import { renderHook, act } from '@testing-library/react-hooks'
import { useGetLazy } from '../hooks'
import categories from '../__mocks__/categories.json'

describe('[useGetLazy]: ', () => {
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
                const { result, waitForNextUpdate } = renderHook(
                    () => useGetLazy('categories.list'),
                    {
                        wrapper
                    }
                )
                await waitForNextUpdate()
                const [, loading] = result.current
                expect(loading).toBe(false)
            })
        })
    })
    describe('WHEN getting the context', () => {
        it('SHOULD return the http client', async () => {
            await act(async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useGetLazy('categories.list'),
                    {
                        wrapper
                    }
                )
                await waitForNextUpdate()
                const [sendRequest, loading] = result.current as any
                const response = await sendRequest()
                expect(JSON.stringify(response)).toBe(JSON.stringify(categories))
                expect(loading).toBe(false)
            })
        })
    })
    describe('WHEN fetching data:', () => {
        const dataFetched = jest.fn()
        it('SHOULD get the endpoint data', async () => {
            await act(async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useGetLazy('categories.list', { onCompleted: dataFetched }),
                    { wrapper }
                )
                await waitForNextUpdate()
                const [sendRequest, loading] = result.current as any
                const response = await sendRequest()
                expect(loading).toBeFalsy()
                expect(JSON.stringify(response)).toBe(JSON.stringify(categories))
                expect(dataFetched).toBeCalled()
            })
        })
    })
    describe('WHEN calling wrong endpoint data:', () => {
        const dataFetched = jest.fn()
        it('SHOULD get the endpoint data', async () => {
            await act(async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => useGetLazy('invalidZone.invalid', { onCompleted: dataFetched }),
                    { wrapper }
                )
                await waitForNextUpdate()
                const [sendRequest] = result.current as any
                const { error, errorMessage } = await sendRequest()
                expect(error).toBeTruthy()
                expect(errorMessage).toBe('Invalid request')
            })
        })
    })
})
