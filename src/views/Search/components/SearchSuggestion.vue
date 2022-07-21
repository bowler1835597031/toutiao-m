<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightDate"
      :key="index"
      icon="search"
      @click="searchFn(index)"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  handler: debounce((val) => {
    this.getSearchSuggestion(val)
  }, 200),
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  methods: {
    async getSearchSuggestion() {
      try {
        const res = await getSearchSuggestion(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    },
    // 跳转到搜索结果
    searchFn(index) {
      this.$emit('search', this.suggestions[index])
    }
  },
  computed: {
    highlightDate() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less"></style>
