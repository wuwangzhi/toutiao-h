<template>
  <div class="likes">
    <van-icon
      color="#777"
      name="good-job"
      :class="{ like: articleItem.attitude === 1 }"
      @click="likeFn"
    />
    <van-icon
      name="good-job"
      color="#777777"
      class="onlike"
      :class="{ like: articleItem.attitude === 0 }"
      @click="disLikeFn"
    />
  </div>
</template>



<script>
import { postLike, delLike, postDislike, delDislike } from "@/api/article";
export default {
  props: {
    articleItem: Object,
  },
  created() {},
  methods: {
    async likeFn() {
      if (this.articleItem.attitude === 1) {
        await delLike(this.articleItem.art_id);
        this.articleItem.attitude = -1;
      } else {
        await postLike(this.articleItem.art_id);
        this.articleItem.attitude = 1;
      }
    },
    async disLikeFn() {
      if (this.articleItem.attitude === 0) {
        await delDislike(this.articleItem.art_id);
        this.articleItem.attitude = -1;
      } else {
        await postDislike(this.articleItem.art_id);
        this.articleItem.attitude = 0;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.likes {
  margin: 0;
  width: 115px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .van-icon {
    font-size: 40px !important;
  }
  .like {
    color: red !important;
  }
  .onlike {
    transform: rotate(180deg);
    margin-top: 10px;
  }
}
</style>