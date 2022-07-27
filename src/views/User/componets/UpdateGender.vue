<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    :default-index="value"
    @cancel="$emit('close')"
    @change="onChange"
    @confirm="onConfirm"
  />
</template>

<script>
import { editUserProfile } from '@/api'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    onChange(picker, value, index) {
      console.log(picker, value, index)
      this.localGender = index
    },
    async onConfirm() {
      //优化,禁止频繁点击
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, //禁止背景点击
        duration: 0 //持续展示
      })
      try {
        const localGender = this.localGender
        await editUserProfile({
          gender: localGender
        })
        //渲染页面
        this.$emit('input', localGender)
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

<style scoped lang="less"></style>
