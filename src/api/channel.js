import request from '@/utils/request'
import storage from '@/utils/storage'

/**
 * 获取我的频道列表
 * @returns Promise
 */

export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道列表
 * @returns Promise
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/**
 *
 * @param {String|Number} target 删除用户频道的id
 * @returns Promise
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {Number} id  频道的id
 * @param {Number} seq  添加频道的索引下标
 * @returns
 */
export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)

export const setMyChannelsByLocal = (channel) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
