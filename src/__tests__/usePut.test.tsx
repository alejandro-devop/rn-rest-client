import React from 'react'
import RestClientProvider from '../rest-client-provider'
import { mockedServer, mockedEndPoints } from '../__mocks__/server.mock'
import { renderHook, act } from '@testing-library/react-hooks'
import { usePut } from '../hooks'

describe('[usePut]: ', () => {
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

    describe('WHEN making a put request', () => {
        it('SHOULD return the expected payload', async () => {
            await act(async () => {
                const { result, waitForNextUpdate } = renderHook(() => usePut('tests.doPut'), {
                    wrapper
                })
                await waitForNextUpdate()
                const [sendRequest] = result.current as any
                const expectedResponse = { foo: true, bar: false }
                const response = await sendRequest(expectedResponse)
                expect(JSON.stringify(response)).toBe(JSON.stringify(expectedResponse))
            })
        })
    })
    describe('WHEN throwing an error:', () => {
        it('SHOULD throw an error', async () => {
            await act(async () => {
                const { result, waitForNextUpdate } = renderHook(
                    () => usePut('invalidZone.invalid'),
                    {
                        wrapper
                    }
                )
                await waitForNextUpdate()
                const [sendRequest] = result.current as any
                const expectedResponse = { foo: true, bar: false }
                const response = await sendRequest(expectedResponse)
                expect(JSON.stringify(response)).toBe(
                    JSON.stringify({ errorMessage: 'Invalid request' })
                )
            })
        })
    })
})
