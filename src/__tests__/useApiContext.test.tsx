import React from 'react'
import RestClientProvider from '../rest-client-provider'
import { mockedServer, mockedEndPoints } from '../__mocks__/server.mock'
import { renderHook, act } from '@testing-library/react-hooks'
import { useApiContext } from '../hooks'
import HttpClient from '../rest-client-provider/HttpClient'

describe('[useApiContext]: ', () => {
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
    describe('WHEN getting the context', () => {
        it('...', async () => {
            await act(async () => {
                const { result, waitForNextUpdate } = renderHook(() => useApiContext(), { wrapper })
                await waitForNextUpdate()
                const { client } = result.current || {}
                expect(client instanceof HttpClient).toBeTruthy()
            })
        })
        it('Some', () => {
            expect(true).toBeTruthy()
        })
    })
})
