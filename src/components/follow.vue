<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-if="!articleItem.is_followed"
    @click="onFollow"
    :loading="Loading"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    v-else
    @click="onFollow"
    :loading="Loading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, delFollow } from "@/api/user";
export default {
  props: { articleItem: Object },
  data() {
    return {
      Loading: false,
    };
  },
  methods: {
    async onFollow() {
      console.log(this.articleItem);
      this.Loading = true;
      try {
        if (this.articleItem.is_followed) {
          await delFollow(this.articleItem.aut_id);
        } else {
          await addFollow(this.articleItem.aut_id);
        }
        this.articleItem.is_followed = !this.articleItem.is_followed;
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.Loading = false;
          return this.$toast.fail("不能关注自己");
        }
        this.$toast.fail("操作失败");
      }
      this.Loading = false;
    },
  },
};
</script>

<style scoped lang='less'>
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>