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

export const getprofile = token => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile',
        headers: {
            Authorization: token
        }
    })
}

export const getpre = token => {
    return request({
        method: 'GET',
        url: '/v1_0/user',
        headers: {
            Authorization: token
        }
    })
}

// export const setprofile = profile => {
//     return request({
//         method: 'PATCH',
//         url: '/v1_0/user/profile',
//         headers: {
//             Authorization: token,
//             'Content-Type': 'application',
//         },
//         Body: {
//             name: profile.name,
//             gender: profile.gender,
//             brithday: profile.brithday,
//             intro: profile.intro
//         },
//     })
// }