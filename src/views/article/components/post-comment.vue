<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      @click="postComment"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { postComment } from "@/api/comment";
export default {
  name: "PostComment",
  components: {},
  props: {
    articleItem: Object,
    target: {
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async postComment() {
      const {
        data: { data },
      } = await postComment({
        target: this.target || this.articleItem.art_id,
        content: this.message,
        art_id: this.target ? this.articleItem.art_id : null,
      });
      this.$emit("postComment", data);
      this.message = "";
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>