<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in list"
      :key="index"
      @click="clickSearchFn(text)"
    >
      <span slot="title" v-html="highlightText(text)"></span
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggeatins } from "@/api/search.js";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  components: {},
  props: { searchText: String },
  data() {
    return {
      list: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      // 监视的处理函数
      handler: debounce(async function (val) {
        const {
          data: { data },
        } = await getSearchSuggeatins(val);
        this.list = data.options;
      }, 200),
      // 首次监视触发
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    highlightText(text) {
      if (text) {
        const highlightStr = `<span style='color:red'>${this.searchText}</span>`;
        // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
        // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
        // RegExp 正则表达式构造函数
        //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
        //    参数2：匹配模式，要写到字符串中
        const reg = new RegExp(this.searchText, "gi");
        // text.replace(/匹配的内容/gi, highlightStr)
        return text.replace(reg, highlightStr);
      }
    },
    clickSearchFn(text) {
      this.$emit("search", text);
    },
  },
};
</script>

<style scoped lang="less"></style>