import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //声明token
    user: getToken() || {}, //防止第一次获取到null时null.token报错
    History: JSON.parse(localStorage.getItem('History')) || []
  },
  //修改数据的地方
  mutations: {
    setUser(state, payload) {
      // console.log(payload)
      state.user = payload
      //token放在本地存储
      setToken(payload)
    },
    setSearchHistory(state, val) {
      state.History = val
      localStorage.setItem('History', JSON.stringify(val) || [])
    }
  }
})
