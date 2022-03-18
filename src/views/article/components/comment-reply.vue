<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`" fixed>
      <van-icon slot="left" name="cross" @click="$emit('click-close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <comments-item :comment="comment" />
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <comment :sources="comment.com_id" type="c" :list="commnetComment" />
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <van-tabbar
      ><van-button @click="postComment">发表评论</van-button></van-tabbar
    >
    <!-- /底部 -->
    <van-popup v-model="isCommntShow" position="bottom">
      <postCommentVue
        :articleItem="articleItem"
        :target="comment.com_id"
        @postComment="onPostSuccess"
    /></van-popup>
  </div>
</template>

<script>
import Comment from "./comment.vue";
import CommentsItem from "./comments-item.vue";
import postCommentVue from "./post-comment.vue";

export default {
  name: "CommentReply",
  components: { CommentsItem, Comment, postCommentVue },
  props: {
    comment: Object,
    articleItem: Object,
  },
  data() {
    return {
      isCommntShow: false,
      commnetComment: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuccess(data) {
      this.isCommntShow = false;
      console.log(data);
      this.commnetComment.unshift(data.new_obj);
    },
    postComment() {
      console.log(this.comment);
      console.log(this.articleItem);
      this.isCommntShow = true;
    },
  },
};
</script>

<style scoped>
.comment-reply {
  position: relative;
  padding-bottom: 90px;
}
</style>