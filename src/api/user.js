import { request } from '../utils/request.js'

export const login = data => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data
    })
}

export const codes = (mobile) => {
    return request({
        method: 'GET',
        url: '/v1_0/sms/codes/' + mobile,
    })
}



export const getpre = () => {
        return request({
            method: 'GET',
            url: '/v1_0/user',
        })
    }
    // 关注用户
export const addFollow = (target) => {
    return request({
        method: 'post',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

//取消关注
export const delFollow = (target) => {
    return request({
        method: 'delete',
        url: '/v1_0/user/followings/' + target,

    })
}