<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
    :immediate-check="false"
  >
    <!-- :immediate-check="false" 关闭初始化时立即执行滚动位置检查，避免回复数据重复渲染 -->
    <CommentItem
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @click-reply="$emit('click-reply', $event)"
    />
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
    },
    type: {
      type: String,
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
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
    //因为关闭了初始化时立即执行滚动位置检查，不会自动初始化loading转圈，所以手动开启加载loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        //1.请求获取数据
        const { data } = await getComments({
          type: this.type,
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
