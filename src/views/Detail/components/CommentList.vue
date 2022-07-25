<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <CommentItem v-for="(item, index) in list" :key="index" :comment="item" />
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 85%">
      评论回复
    </van-popup>
    <!-- /评论回复 -->
  </van-list>
</template>

<script>
import { getComments } from '@/api'
import CommentItem from './CommentItem.vue'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [String, Number],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    CommentItem
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //用来获取下一页的标记
      limit: 10,
      error: false,
      isReplyShow: false //回复弹出层的显隐
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        //1.请求获取数据
        const { data } = await getComments({
          type: 'a',
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        //2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        //将文章评论的总数量
        this.$emit('loading-success', data.data)
        //3.取消加载，停止转圈
        this.loading = false
        //4.判断是否还有数据，以便渲染下一页
        if (results.length > 0) {
          //有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          //没有就将finished结束
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
