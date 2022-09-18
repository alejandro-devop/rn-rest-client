import HttpClient from '../rest-client-provider/HttpClient'
import { EndpointsConfigType } from '../types/HttpClient.types'
const mockedServer = 'http://some-server.com'
const mockedEndPoints: EndpointsConfigType = {
    security: {
        login: '/security/login',
        logout: '/security/logout'
    },
    categories: {
        view: '/categories/view/{id}',
        delete: '/categories/view/:id:',
        list: '/categories/list'
    },
    single: '/home/single'
}
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
                const url = client.resolvePath('security.login')
                expect(url).toBe('http://some-server.com/security/login')
            })
        })
        describe('WHEN just passing the path with only one part: ', () => {
            it('SHOULD return the url', () => {
                const url = client.resolvePath('single')
                expect(url).toBe('http://some-server.com/single')
            })
        })
        describe('WHEN passing a path that does not exists: ', () => {
            it('SHOULD return the url', () => {
                const url = client.resolvePath('security.register')
                expect(url).toBe('http://some-server.com/invalid-path')
            })
        })
        describe('WHEN passing replacements to the url', () => {
            it('SHOULD replace the value: ', () => {
                const url = client.resolvePath('categories.view', {
                    replacements: {
                        id: 1
                    }
                })
                const secondUrl = client.resolvePath('categories.delete', {
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
            const url = client.resolvePath('categories.list', {
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
    })
})
