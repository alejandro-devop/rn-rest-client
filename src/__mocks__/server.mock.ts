import { EndpointsConfigType } from '../types/HttpClient.types'

export const mockedServer = 'http://some-server.com'
export const mockedEndPoints: EndpointsConfigType = {
    security: {
        login: '/security/login',
        logout: '/security/logout'
    },
    categories: {
        view: '/categories/view/{id}',
        delete: '/categories/view/:id:',
        list: '/categories/list'
    },
    tests: {
        doPost: '<post>/some/post',
        doPut: '<put>/some/put',
        doPatch: '<patch>/some/patch',
        doDelete: '<delete>/some/delete'
    },
    product: {
        view: '<get>/products/view',
        save: '<post>/products/save'
    },
    invalidZone: {
        invalid: '/invalid/endpoint'
    },
    single: '/home/single'
}

export const axiosMocker = {
    get: async () => {
        return 'Some value'
    }
}
