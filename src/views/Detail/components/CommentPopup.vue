<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <div class="btn">
      <van-button @click="onpublishComment" :disabled="!message.length">
        发布
      </van-button>
    </div>
  </div>
</template>

<script>
import { publishComment } from '@/api'
export default {
  name: 'CommentPopup',
  //子组件接收父组件共享的articleId
  inject: {
    articleId: {
      type: [Number, String],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onpublishComment() {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      try {
        const { data } = await publishComment({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        this.message = ''
        this.$emit('publishCommentSuccess', data.data)
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
  .btn {
    margin: 0 auto;
    .van-button {
      padding: 0 0.4rem;
      font-size: 0.37333rem;
      color: #6ba3d8;
    }
  }
}
</style>
