import request from '@/utils/request'
/**
 *
 * @param {*} channelId 频道id
 * @param {*} timestamp 获取第一页的文章，传当前时间戳，获取s上一页文章，传pre_time
 * @returns Promise
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
