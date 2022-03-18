<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleItem.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleItem.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleItem.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleItem.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleItem.pubdate | relativeTime }}
          </div>
          <!-- 关注用户 -->
          <follow :articleItem="articleItem"></follow>
          <!-- 关注用户 -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          ref="article_content"
          v-html="articleItem.content"
        ></div>
        <van-divider ref="comment">正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isCommntShow = true"
            >写评论</van-button
          >

          <van-icon
            name="comment-o"
            :badge="comments"
            color="#777"
            @click="commentFn"
          />
          <!-- 文章收藏 -->
          <collect v-model="articleItem.is_collected" :art_id='articleItem.art_id'></collect>
          <!-- 文章收藏 -->
          <!-- 文章点赞 -->
          <like :articleItem="articleItem"></like>
          <!-- 文章点赞 -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <comment
          :articleItem="articleItem"
          @getCommentCount="comments = $event"
          :list="addComment"
          @click-reply="onReplyShow"
        />
        <!-- /底部区域 -->
        <van-popup v-model="isCommntShow" position="bottom">
          <post-comment :articleItem="articleItem" @postComment="onPostSuccess"
        /></van-popup>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 93%">
      <comment-reply
        :comment="currentComment"
        @click-close="isReplyShow = false"
        v-if="isReplyShow"
        :articleItem="articleItem"
      ></comment-reply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getarticle } from "@/api/home";
import Follow from "../../components/follow.vue";
import Collect from "../../components/collect.vue";
import Like from "../../components/like.vue";
import { ImagePreview } from "vant";
import Comment from "./components/comment.vue";
import PostComment from "./components/post-comment.vue";
import CommentReply from "./components/comment-reply.vue";
export default {
  name: "ArticleIndex",
  components: { Follow, Collect, Like, Comment, PostComment, CommentReply },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      articleItem: {},
      isLoading: false,
      Loading: false,
      errStatus: "",
      comments: 0,
      isCommntShow: false,
      addComment: [],
      isReplyShow: false,
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadArticleInfo();
  },
  mounted() {},
  methods: {
    commentFn() {
      this.$refs.comment.scrollIntoView({ behavior: "smooth" });
    },
    async loadArticleInfo() {
      try {
        const {
          data: { data },
        } = await getarticle(this.articleId);
        this.articleItem = data;
        this.$nextTick(() => {
          this.getImg();
        });
      } catch (err) {
        // 加载失败 404
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        }
        this.$toast("获取失败");
      }
      this.isLoading = false;
    },
    getImg() {
      const item = this.$refs.article_content;
      const img = item.querySelectorAll("img");
      const images = [];
      img.forEach((val, index) => {
        images.push(val.src);
        val.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },
    onPostSuccess(res) {
      this.isCommntShow = false;
      this.addComment.unshift(res.new_obj);
    },
    onReplyShow(comment) {
      this.currentComment = comment;

      // 展示评论回复弹层
      this.isReplyShow = true;
    },
  },
};
</script> 

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      // .follow-btn {
      //   width: 170px;
      //   height: 58px;
      // }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>