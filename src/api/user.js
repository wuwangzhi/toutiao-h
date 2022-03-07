import request from '../utils/request.js'
export const login = date => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}