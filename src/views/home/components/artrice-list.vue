<template>
  <div class="artrice">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="refresh_text"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <artrice-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></artrice-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getarticles } from "../../../api/home";
import artriceItem from "../../../components/artrice-item.vue";
export default {
  components: { artriceItem },
  name: "ArtriceList",
  props: {
    channels: Object,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      refresh_text: "刷新成功",
    };
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getarticles({
          channel_id: this.channels.id,
          // timestamp: 1647823991673,
          timestamp: this.timestamp || Date.now(),
          // with_top: 1,
        });
        // Math.random() > 0.5 && JSON.parse("asdasdasd");
        const { results } = data.data;
        // console.log(results);
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = false;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      try {
        const { data } = await getarticles({
          channel_id: this.channels.id,
          timestamp: Date.now(),
          // with_top: 1,
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.loading = false;
        this.isLoading = false;
        this.refresh_text = `刷新成功,更新${results.length}条数据`;
      } catch (error) {
        this.refresh_text = `刷新失败`;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.artrice {
  height: 79vh;
  overflow: auto;
}
</style>