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
