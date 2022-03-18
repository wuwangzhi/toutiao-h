import { request } from '../utils/request.js'
// 关注文章
export const postCollects = (target) => {
        return request({
            method: 'post',
            url: '/v1_0/article/collections',
            data: {
                target
            }
        })
    }
    // 取消收藏文章
export const delCollects = (target) => {
        return request({
            method: 'delete',
            url: '/v1_0/article/collections/' + target,
        })
    }
    // 对文章点赞
export const postLike = (target) => {
        return request({
            method: 'post',
            url: '/v1_0/article/likings',
            data: {
                target
            }
        })
    }
    // 取消对文章点赞
export const delLike = (target) => {
        return request({
            method: 'delete',
            url: '/v1_0/article/likings/' + target,
        })
    }
    //  对文章不喜欢
export const postDislike = (target) => {
        return request({
            method: 'post',
            url: '/v1_0/article/dislikes',
            data: {
                target
            }
        })
    }
    // 取消对文章不喜欢
export const delDislike = (target) => {
    return request({
        method: 'delete',
        url: '/v1_0/article/dislikes/' + target,
    })
}