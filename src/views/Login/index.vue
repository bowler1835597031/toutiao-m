<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar
      class="navbar"
      title="登陆"
      left-arrow
      @click-left="backToPrePage"
    >
      <template #left>
        <!-- #v-slot left插槽名 -->
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 手机号/验证码表单 -->
    <!-- form里的input必须给name，原生要求，用于表示 -->
    <van-form ref="form" @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            >发送验证码
          </van-button>
        </template>
      </van-field>
      <!-- 登陆按钮 -->
      <div style="margin: 16px">
        <van-button
          class="van-button-denglu"
          block
          type="info"
          native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
//引入api
import { login, sendCode } from '@/api/user'
//引入校验规则
import { mobileRules, codeRules } from './rules'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    backToPrePage() {
      //返回来之前的页面
      console.log(this)
      this.$router.back()
    },
    //登陆
    async login() {
      this.$toast.loading({
        message: '正在火速加载中',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // console.log(res)
        //存储token
        this.$store.commit('setUser', res.data.data)
        console.log(res)
        //跳转页面
        this.$router.push('/profile')
        //提示成功
        this.$toast.success('登陆成功')
      } catch (error) {
        const status = error.response.status
        let message = '登陆错误，请刷新'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // const status = error.response.status
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     //服务器端的错误
        //     this.$toast.fail('登陆错误，请刷新')
        //     break
        //   default:
        //     this.$toast.fail('登陆错误，请刷新')
        //     break
        // }
      }
    },
    //发送验证码
    async sendCode() {
      try {
        //验证手机号
        await this.$refs.form.validate('mobile')
        //显示倒计时
        this.isShowCountDown = true
        //发送请求，获取验证码
        await sendCode(this.mobile)
      } catch (error) {
        //1.表单校验失败
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }

    // form表单域里，任意的button点击都可以触发submit
    // 提交表单，需要给input绑定name
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  //   自定义导航样式
  // :deep() 穿透scoped样式
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
//表单域样式
.form {
  :deep(.van-field__label) {
    flex: 1;
  }

  :deep(.van-field__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  :deep(.van-button-denglu) {
    width: 9.25333rem;
    height: 1.17333rem;
    border-radius: 0.13333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
