import { request } from '../utils/request.js'
export const getSearchSuggeatins = (q) => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: {
            q
        }
    })
}
export const getSearchresult = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params
    })
}
export const getSearchHistories = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/histories',

    })
}