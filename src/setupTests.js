import 'regenerator-runtime/runtime'

jest.mock('axios', () => {
    const responsesMock = {
        'http://some-server.com/security/login': {},
        'http://some-server.com/categories/list': require('./__mocks__/categories.json'),
        'http://some-server.com/some/post': {
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
