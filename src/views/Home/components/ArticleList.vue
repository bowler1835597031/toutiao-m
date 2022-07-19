<template>
  <div>
    <!-- 每一篇文章的结构 -->
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功~"
    >
      <van-list
        @load="loadNextPage"
        offset="1"
        :immediate-check="false"
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        ><ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem
      ></van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  props: {
    //频道id
    id: {
      type: [String, Number],
      require: true
    }
  },
  data() {
    return {
      //文章
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    //获取频道的文章并处理文章数据
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        // console.log(data)

        this.articles = data.data.results
        //保存第一次页码
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        // console.log(error)
        //1.获取状态码
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async loadNextPage() {
      try {
        // if (Math.random() < 0.7) {
        //   throw new Error('错误了')
        // }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        //将第n页数据，放在articles，因为data.data.results是数组[[]]会报错，所以...解构
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        //更新页数
        this.pre_timestamp = data.data.pre_timestamp
        //loading设置为false
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
