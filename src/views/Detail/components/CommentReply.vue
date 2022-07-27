<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    />
    <!-- /导航栏 -->

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <CommentItem :comment="comment"></CommentItem>
      <!-- /当前评论项 -->
      <van-cell title="全部回复" />
      <!-- 评论的回复列表 -->
      <CommentList
        :source="comment.com_id"
        type="c"
        :list="commentList"
      ></CommentList>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部 -->
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPopup
        :target="comment.com_id"
        @publishCommentSuccess="onpublishCommentSuccess"
      ></CommentPopup>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import CommentList from './CommentList.vue'
import CommentPopup from './CommentPopup.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPopup
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onpublishCommentSuccess(data) {
      // console.log(data)
      //更新回复的数值
      this.comment.reply_count++
      //关闭弹出层
      this.isPostShow = false
      //讲发布的评论显示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  height: 88px;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 80%;
  }
}
</style>
