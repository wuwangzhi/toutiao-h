<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchresult } from "@/api/search.js";
export default {
  name: "SearchResult",
  components: {},
  props: {
    searchText: String,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const {
          data: { data },
        } = await getSearchresult({
          q: this.searchText,
          page: this.page,
          per_page: 15,
        });
        const { results } = data;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.loading = false;
        this.error = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>