import { renderHook } from '@testing-library/react-hooks'
import { usePrevProps } from '../hooks'
describe('[usePrevPros]: ', () => {
    describe('WHEN passing props ', () => {
        it('SHOULD ', async () => {
            const { result } = renderHook(() => usePrevProps({ counter: 1 }))
            expect(result.current.counter).toBe(1)
        })
    })
})
