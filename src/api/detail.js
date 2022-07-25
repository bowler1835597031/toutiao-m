import request from '@/utils/request'

/**
 *获取文章详情
 * @param {*} articleId 文章id
 * @returns Promise
 */
export const getArticleDetail = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}

/**
 * 收藏文章
 * @param {*} target 收藏的目标文章id
 * @returns Promise
 */
export const addCollect = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 * @param {*} target 取消收藏文章id
 * @returns Promise
 */
export const cancelCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
