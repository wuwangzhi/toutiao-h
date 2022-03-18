<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <comments-item
      :comment="item"
      v-for="(item, index) in list"
      :key="index"
      @click-reply="$emit('click-reply', $event)"
    />
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import commentsItem from "./comments-item.vue";
export default {
  components: { commentsItem },
  props: {
    articleItem: Object,
    list: {
      type: Array,
      default: () => [],
    },
    sources: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "a",
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
    };
  },
  created() {
    this.onLoad();
    this.loading = true;
  },
  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: this.type,
        source: this.sources || this.articleItem.art_id,
        offset: this.offset,
      });
      const { results } = data.data;
      this.list.push(...results);
      this.loading = false;
      if (results.length) {
        this.offset = data.data.last_id; // 更新获取下一页数据的页码
      } else {
        this.finished = true; // 没有数据了，关闭加载更多
      }
      this.$emit("getCommentCount", data.data.total_count);
    },
  },
};
</script>

<style>
</style>