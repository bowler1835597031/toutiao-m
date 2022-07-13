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
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号', trigger: 'onChange' }
        ]"
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
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
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
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: ''
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
      const res = await login(this.mobile, this.code)
      console.log(res)
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
