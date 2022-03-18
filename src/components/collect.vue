<template>
  <van-icon
    color="#777"
    name="star"
    :class="{ collect: value }"
    @click="collectFn"
  />
</template>

<script>
import { postCollects, delCollects } from "@/api/article";
export default {
  props: {
    value: Boolean,
    art_id: String,
  },
  name: "collectArticle",
  created() {},
  methods: {
    async collectFn() {
      if (this.value) {
        await delCollects(this.art_id);
      } else {
        await postCollects(this.art_id);
      }
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style scoped lang='less'>
.collect {
  color: rgb(252, 135, 1) !important;
}
</style>