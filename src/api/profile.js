import { request } from '../utils/request.js'
export const getprofile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',
    })
}
export const setphoto = formData => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/photo',
        data: formData

    })
}

export const setprofile = data => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/profile',
        data
    })
}