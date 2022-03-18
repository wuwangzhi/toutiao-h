import { request } from '../utils/request.js'
// 获取评论 
export const getComments = (params) => {
        return request({
            method: 'get',
            url: '/v1_0/comments',
            params
        })
    }
    // 对评论或评论回复点赞
export const postCommentsLike = (target) => {
        return request({
            method: 'post',
            url: '/v1_0/comment/likings',
            data: {
                target
            }
        })
    }
    // 取消对评论或评论回复点赞
export const delCommentsLike = (target) => {
        return request({
            method: 'delete',
            url: '/v1_0/comment/likings/' + target,
        })
    }
    // 对文章进行评论
export const postComment = (data) => {
    return request({
        method: 'post',
        url: '/v1_0/comments',
        data
    })
}