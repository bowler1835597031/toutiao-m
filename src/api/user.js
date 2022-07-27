import request from '@/utils/request'
// import store from '@/store'

/**
 * 登陆
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}
/**
 *发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
    // method: 'GET'
  })
}
/**
 * 请求用户自己的信息
 * @returns Promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user'
    // method: 'GET'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

/**
 * 取消关注用户
 * @param {String} target 取消关注用户的id
 * @returns Promise
 */

export const cancelUser = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 关注用户
 * @param {String} target 关注用户的id
 * @returns Promise
 */
export const addUser = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 获取用户个人资料
 * @returns Promise
 */
export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 编辑用户个人资料
 * @returns Promise
 */
export const editUserProfile = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

/**
 *编辑用户照片资料（头像、身份证照片）
 * @param {*} file 图片的FormData
 * @returns
 */
export const updateUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
