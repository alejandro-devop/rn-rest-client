import 'regenerator-runtime/runtime'
import Enzime from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
Enzime.configure({ adapter: new Adapter() })

jest.mock('axios', () => {
    const responsesMock = {
        'http://some-server.com/security/login': {},
        'http://some-server.com/categories/list': require('./__mocks__/categories.json'),
        'http://some-server.com/some/post': {
            valid: true
        },
        'http://some-server.com/some/put': {
            valid: true
        },
        'http://some-server.com/some/patch': {
            valid: true
        },
        'http://some-server.com/some/delete': {
            valid: true
        }
    }

    const buildResponse = (res, status = 200) => ({
        data: res,
        status,
        statusText: '',
        headers: {
            'cache-control': 'max-age=43200',
            'content-type': 'appliation/json; charset=utf-8',
            expires: '-1',
            pragma: 'no-cache'
        },
        config: {}
    })

    return {
        post: async (url, payload, options) => {
            try {
                if (responsesMock[url]) {
                    const {} = options || {}
                    return buildResponse(payload)
                } else {
                    throw new Error('Invalid request')
                }
            } catch (e) {
                throw {
                    response: {
                        data: null,
                        status: 404
                    },
                    message: e.message
                }
            }
        },
        put: async (url, payload, options) => {
            try {
                if (responsesMock[url]) {
                    const {} = options || {}
                    return buildResponse(payload)
                } else {
                    throw new Error('Invalid request')
                }
            } catch (e) {
                throw {
                    response: {
                        data: null,
                        status: 404
                    },
                    message: e.message
                }
            }
        },
        patch: async (url, payload, options) => {
            try {
                if (responsesMock[url]) {
                    const {} = options || {}
                    return buildResponse(payload)
                } else {
                    throw new Error('Invalid request')
                }
            } catch (e) {
                throw {
                    response: {
                        data: null,
                        status: 404
                    },
                    message: e.message
                }
            }
        },
        delete: async (url, options) => {
            try {
                if (responsesMock[url]) {
                    const {} = options || {}
                    return buildResponse({
                        deleted: true
                    })
                } else {
                    throw new Error('Invalid request')
                }
            } catch (e) {
                throw {
                    response: {
                        data: null,
                        status: 404
                    },
                    message: e.message
                }
            }
        },
        get: async (url, options) => {
            try {
                if (responsesMock[url]) {
                    return buildResponse(responsesMock[url])
                } else {
                    throw new Error('Invalid request')
                }
            } catch (e) {
                throw {
                    response: {
                        data: null,
                        status: 404
                    },
                    message: e.message
                }
            }
        }
    }
})
