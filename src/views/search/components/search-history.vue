<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <van-icon name="delete" @click="delIsShow = false" v-if="delIsShow" />
      <span v-else>
        <span @click="searchHistories.splice(0)">全部删除</span> &emsp;
        <span @click="delIsShow = true">完成</span>
      </span>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="delItem(item, index)"
    >
      <van-icon name="close" v-show="!delIsShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  components: {},
  props: { searchHistories: Array },
  data() {
    return {
      delIsShow: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delItem(val, index) {
      if (this.delIsShow) {
        this.$emit("search", val);
      } else {
        this.searchHistories.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped lang="less"></style>