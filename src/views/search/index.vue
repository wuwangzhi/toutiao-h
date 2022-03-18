<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/" class="search">
      <van-search
        v-model="searchAction"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        @focus="isResultShow = false"
      />
    </form>
    <search-result
      v-if="isResultShow"
      :searchText="searchAction"
    ></search-result>
    <search-suggestion
      v-else-if="searchAction"
      :searchText="searchAction"
      @search="onSearch"
    >
    </search-suggestion>
    <search-history
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import { setItem, getItem } from "@/utils/storage.js";
import { getSearchHistories } from "@/api/search";
import searchHistory from "./components/search-history.vue";
import SearchResult from "./components/search-result.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import { mapState } from "vuex";
export default {
  components: { searchHistory, SearchSuggestion, SearchResult },
  computed: {
    ...mapState(["user"]),
  },
  name: "search-container",
  data() {
    return {
      searchAction: "",
      isResultShow: false,
      searchHistories: [],
    };
  },

  async created() {
    if (this.user) {
      this.getUserHistories();
    } else {
      this.searchHistories = getItem("serach-histories");
    }
  },

  methods: {
    onSearch(val) {
      this.searchAction = val;
      this.isResultShow = true;
      const index = this.searchHistories.indexOf(val);
      index === -1 || this.searchHistories.splice(index, 1);
      this.searchHistories.unshift(val);
      this.getUserHistories();
    },
    onCancel() {
      this.$router.go(-1);
    },
    async getUserHistories() {
      const {
        data: {
          data: { results },
        },
      } = await getSearchHistories();
      this.searchHistories = results;
    },
  },
  watch: {
    searchHistories(val) {
      // 同步到本地存储
      setItem("serach-histories", val);
    },
  },
};
</script>

<style scoped lang='less'>
.search-container {
  .van-search__action {
    color: white;
  }
  .search {
    padding-top: 106px;
    .van-search {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-search__action {
      color: #fff;
    }
  }
}
</style>