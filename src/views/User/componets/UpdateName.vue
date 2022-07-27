<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="isOk"
    />
    <!-- /导航栏 -->
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  methods: {
    async isOk() {
      //优化,禁止频繁点击
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, //禁止背景点击
        duration: 0 //持续展示
      })
      try {
        const localName = this.message
        if (!localName.length) {
          this.$toast('昵称不能为空')
        }
        await editUserProfile({
          name: localName
        })
        //渲染页面
        this.$emit('input', localName)
        //关闭弹层
        this.$emit('close')
        //提示成功
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
