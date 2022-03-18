import { request } from '../utils/request.js'
// 获取所有频道
export const getchannels = () => {
        return request({
            method: 'GET',
            url: '/v1_0/channels',
        })
    }
    // 获取文章列表
export const getarticles = params => {
        return request({
            method: 'GET',
            url: '/v1_0/articles',
            params
        })
    }
    // 获取用户频道
export const getuserchannels = () => {
        return request({
            method: 'GET',
            url: '/v1_0/user/channels',
        })
    }
    // 添加用户频道
export const adduserchannels = (channel) => {
        return request({
            method: 'PATCH',
            url: '/v1_0/user/channels',
            data: {
                channels: [channel]
            }
        })
    }
    // 删除用户频道
export const deluserchannels = (channel) => {
        return request({
            method: 'DELETE',
            url: '/v1_0/user/channels/' + channel,

        })
    }
    // 获取文章详情
export const getarticle = (id) => {
    return request({
        method: 'get',
        url: '/v1_0/articles/' + id,

    })
}