import request from '@/utils/request'

/**
 * 获取评论
 * @param {*} params
 * @returns Promise
 */
export const getComments = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}
/**
 * 评论或评论回复点赞
 * @param {string} target
 * @returns Promise
 */
export const addCommentLike = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消评论或评论回复点赞
 * @param {string} target
 * @returns Promise
 */
export const cancelCommentLike = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE'
  })
}
/**
 * 对文章或者评论进行评论
 * @param {*} data
 * @returns Promise
 */
export const publishComment = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
