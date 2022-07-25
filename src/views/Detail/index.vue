<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="backToPrePage"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articleDesc }}</div>
          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="followLoading"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="followLoading"
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <CommentList
          :source="article.art_id"
          @loading-success="totalCommentCounts = $event.total_count"
          :list="commentList"
        ></CommentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPopupShow = true"
            >写评论
          </van-button>
          <van-icon name="comment-o" :info="totalCommentCounts" color="#777" />

          <ArticleCollect
            class="btn-item"
            v-model="article.is_collected"
            :article-id="article.art_id"
          ></ArticleCollect>

          <van-button class="btn-item" icon="good-job-o"></van-button>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isPopupShow" position="bottom">
          <CommentPopup
            :target="article.art_id"
            @publishCommentSuccess="onpublishCommentSuccess"
          ></CommentPopup>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleDetail">
          点击重试
        </van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleDetail, cancelUser, addUser } from '@/api'
import dayjs from '@/utils/days'
import ArticleCollect from './components/ArticleCollect.vue'
import CommentList from './components/CommentList.vue'
import CommentPopup from './components/CommentPopup.vue'
export default {
  name: 'ArticleIndex',
  components: {
    ArticleCollect,
    CommentList,
    CommentPopup
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      article: {},
      loading: true, //转圈
      errorStatus: 0, //失败的状态码
      followLoading: false, //网速慢时点击按钮转圈
      totalCommentCounts: 0, //底部评论角标
      isPopupShow: false, //弹出层的显隐
      commentList: [] //评论列表
    }
  },
  computed: {
    articleDesc() {
      const time = dayjs(this.article.pubdate).fromNow()
      const articleDesc = `${time}`
      return articleDesc
    }
  },
  created() {
    this.getArticleDetail()
  },
  methods: {
    async getArticleDetail() {
      try {
        this.loading = true
        const { data } = await getArticleDetail(this.articleId)
        this.article = data.data
        // console.log(this.article)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
        }
        console.log('获取数据失败', error)
      }
      this.loading = false
    },
    backToPrePage() {
      this.$router.go(-1)
    },
    async onFollow() {
      try {
        this.followLoading = true
        if (this.article.is_followed) {
          await cancelUser(this.article.aut_id)
        } else {
          await addUser(this.article.aut_id)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        this.$toast.fail('操作失败，请重试')
      }
      this.followLoading = false
    },
    onpublishCommentSuccess(data) {
      //关闭弹出层
      this.isPopupShow = false
      //讲发布的评论显示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      :deep(p) {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    :deep(.van-icon) {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
