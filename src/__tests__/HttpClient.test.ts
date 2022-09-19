import HttpClient from '../rest-client-provider/HttpClient'
import { mockedEndPoints, mockedServer } from '../__mocks__/server.mock'
import mockedCategories from '../__mocks__/categories.json'

const client = new HttpClient({ server: mockedServer, endpoints: mockedEndPoints })

describe('[HttpClient]: ', () => {
    describe('[HttpClient]: Testing getters', () => {
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
        describe('WHEN getting the headers', () => {
            it('SHOULD return the current configured endpoints', () => {
                expect(JSON.stringify(client.getEndpoints())).toBe(JSON.stringify(mockedEndPoints))
            })
        })
    })
    describe('[HttpClient]: Testing the url resolver', () => {
        describe('WHEN just passing the path with multiple parts: ', () => {
            it('SHOULD return the url', () => {
                const [url] = client.resolvePath('security.login')
                expect(url).toBe('http://some-server.com/security/login')
            })
        })
        describe('WHEN just passing the path with only one part: ', () => {
            it('SHOULD return the url', () => {
                const [url] = client.resolvePath('single')
                expect(url).toBe('http://some-server.com/single')
            })
        })
        describe('WHEN passing a path that does not exists: ', () => {
            it('SHOULD return the url', () => {
                const [url] = client.resolvePath('security.register')
                expect(url).toBe('http://some-server.com/invalid-path')
            })
        })
        describe('WHEN passing replacements to the url', () => {
            it('SHOULD replace the value: ', () => {
                const [url] = client.resolvePath('categories.view', {
                    replacements: {
                        id: 1
                    }
                })
                const [secondUrl] = client.resolvePath('categories.delete', {
                    replacementConfig: {
                        startToken: ':',
                        endToken: ':'
                    },
                    replacements: {
                        id: 1
                    }
                })
                expect(url).toBe('http://some-server.com/categories/view/1')
                expect(secondUrl).toBe('http://some-server.com/categories/view/1')
            })
        })
        describe('WHEN passing the url params:', () => {
            const [url] = client.resolvePath('categories.list', {
                urlParams: {
                    page: 1,
                    pageSize: 10,
                    filter: 'some value'
                }
            })
            expect(url).toBe(
                'http://some-server.com/categories/list?page=1&pageSize=10&filter=some%20value'
            )
        })
        describe('WHEN defining the method in the url: ', () => {
            const [url, type] = client.resolvePath('product.view', {
                debugUrl: true
            })
            const [secondUrl, secondType] = client.resolvePath('product.save', {
                debugUrl: true
            })
            expect(url).toBe('http://some-server.com/products/view')
            expect(type).toBe('get')
            expect(secondUrl).toBe('http://some-server.com/products/save')
            expect(secondType).toBe('post')
        })
    })
    describe('[HttpClient]: Testing do request', () => {
        describe('WHEN calling it raw: ', () => {
            it('SHOULD return the response: ', async () => {
                const fn = client.doRequest('categories.list')
                const expectedResponse = mockedCategories
                expect(fn instanceof Promise).toBeTruthy()
                const { data } = await client.doRequest('categories.list')
                expect(data instanceof Array).toBeTruthy()
                expect(JSON.stringify(data)).toBe(JSON.stringify(expectedResponse))
            })
        })
        describe('WHEN calling a invalid request: ', () => {
            it('SHOULD raise a exception: ', async () => {
                const response = await client.doRequest('invalidZone.invalid')
                expect(JSON.stringify(response)).toBe(
                    JSON.stringify({
                        errorMessage: 'Invalid request',
                        status: undefined,
                        data: undefined
                    })
                )
            })
        })
        describe('WHEN sending wrong Method with method validation', () => {
            it('SHOULD return a invalid url method: ', async () => {
                try {
                    await client.doRequest('product.view', {
                        method: 'post'
                    })
                } catch (err) {
                    expect(err.message).toBe('Invalid method for endpoint')
                }
            })
        })
        describe('WHEN sending a simple post: ', () => {
            it('SHOULD return a simple response: ', async () => {
                const expectedPayload = { foo: true, bar: true }
                const { data, status } = await client.doRequest('tests.doPost', {
                    method: 'post',
                    payload: expectedPayload
                })
                expect(JSON.stringify(data)).toBe(JSON.stringify(expectedPayload))
                expect(status).toBe(200)
            })
        })
        describe('WHEN sending a simple put: ', () => {
            it('SHOULD return a simple response: ', async () => {
                const expectedPayload = { foo: true, bar: true }
                const { data, status } = await client.doRequest('tests.doPut', {
                    method: 'put',
                    payload: expectedPayload
                })
                expect(JSON.stringify(data)).toBe(JSON.stringify(expectedPayload))
                expect(status).toBe(200)
            })
        })
        describe('WHEN sending a simple patch: ', () => {
            it('SHOULD return a simple response: ', async () => {
                const expectedPayload = { foo: true, bar: true }
                const { data, status } = await client.doRequest('tests.doPatch', {
                    method: 'patch',
                    payload: expectedPayload
                })
                expect(JSON.stringify(data)).toBe(JSON.stringify(expectedPayload))
                expect(status).toBe(200)
            })
        })
        describe('WHEN sending a simple delete: ', () => {
            it('SHOULD return a simple response: ', async () => {
                const expectedPayload = { deleted: true }
                const { data, status } = await client.doRequest('tests.doDelete', {
                    method: 'delete'
                })
                expect(JSON.stringify(data)).toBe(JSON.stringify(expectedPayload))
                expect(status).toBe(200)
            })
        })
    })
})
