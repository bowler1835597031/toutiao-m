<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collected: value }"
    @click="onCollect"
    :loading="loading"
  >
  </van-button>
</template>

<script>
import { addCollect, cancelCollect } from '@/api'
export default {
  name: 'ArticleCollect',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      try {
        if (this.value) {
          await cancelCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)

        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #fcc64b;
  }
}
</style>
