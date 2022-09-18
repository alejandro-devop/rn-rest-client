import HttpClient from '../rest-client-provider/HttpClient'
const mockedServer = 'http://some-server.com'

const client = new HttpClient({ server: mockedServer })

describe('[HttpClient]: ', () => {
    describe('[HttpClient]: Testing headers', () => {
        describe('WHEN getting headers after instance', () => {
            it('SHOULD return default headers:', () => {
                const { Accept, 'Content-Type': contentType } = client.getHeaders()
                const headerKeys = Object.keys(client.getHeaders())
                expect(headerKeys.join()).toBe('Accept,Content-Type')
                expect(Accept).toBe('application/json')
                expect(contentType).toBe('application/json')
            })
        })
        describe('WHEN getting the configured server', () => {
            it('SHOULD return the mocked server', () => {
                expect(client.getServer()).toBe(mockedServer)
            })
        })
    })
})
