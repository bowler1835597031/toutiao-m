<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        v-if="comment.like_count === 0"
        class="like-btn"
        icon="good-job-o"
        :loading="commentLoading"
        @click="onCommentLick"
      >
        赞
      </van-button>
      <van-button
        v-else
        class="like-btn"
        :class="{ active: comment.is_liking }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :loading="commentLoading"
        @click="onCommentLick"
      >
        {{ comment.like_count }}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ commentDesc }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('click-reply', comment)"
          >回复 {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import dayjs from '@/utils/days'
import { addCommentLike, cancelCommentLike } from '@/api'

export default {
  name: 'CommentItem',

  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      commentLoading: false,
      isReplyShow: false, //回复评论的显隐
      currentComment: {} // 点击回复的那个评论对象
    }
  },
  computed: {
    commentDesc() {
      const time = dayjs(this.comment.pubdate).fromNow()
      const commentDesc = `${time}`
      return commentDesc
    }
  },
  methods: {
    async onCommentLick() {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          await cancelCommentLike(this.comment.com_id)
          this.comment.is_liking = !this.comment.is_liking
          this.comment.like_count--
        } else {
          await addCommentLike(this.comment.com_id)
          this.comment.is_liking = !this.comment.is_liking
          this.comment.like_count++
        }
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  .active {
    color: #fcc64b;
  }
}
</style>
