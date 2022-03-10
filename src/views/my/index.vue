<template>
  <div class="my-container">
    <div class="card">
      <!-- 已登录头部 -->
      <div class="header user-info" v-if="user">
        <div class="base-info">
          <div class="left">
            <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
            <span class="name">{{ userInfo.name }}</span>
          </div>
          <div class="right">
            <van-button size="mini" round @click="setFn">个人信息</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <!-- /已登录头部 -->

      <!-- 未登录头部 -->
      <div class="header not-login" v-else>
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
          <span class="text">登录 / 注册</span>
        </div>
      </div>
      <!-- /未登录头部 -->
      <!-- 宫格 -->
      <van-grid
        class="nav-grid"
        :column-num="4"
        clickable
        square
        :border="false"
      >
        <van-grid-item text="消息通知" icon="comment-o" />
        <van-grid-item text="我的收藏" icon="like-o" />
        <van-grid-item text="阅读历史" icon="clock-o" />
        <van-grid-item text="我的作品" icon="label-o" />
      </van-grid>
      <!-- 单元格导航 -->
    </div>
    <div class="more">
      <p>更多服务</p>
      <van-grid clickable square :border="false">
        <van-grid-item text="用户反馈" icon="question-o" />
        <van-grid-item text="小智同学" icon="service" />
      </van-grid>
    </div>
    <van-cell
      class="logout-cell"
      title="退出登录"
      center
      @click="escFn"
      v-if="user"
    />
  </div>
</template>

<script>
import { getprofile, getpre } from "../../api/user.js";
import { mapState } from "vuex";
export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {}, // 用户信息
      profile: {}, //个人资料
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  // 加载信息
  async created() {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      try {
        const res = await getprofile(`Bearer ${this.user.token}`);
        const { data } = await getpre(`Bearer ${this.user.token}`);
        this.profile = res.data.data;
        this.userInfo = data.data;
        // console.log(res);
        // console.log(data);
      } catch (error) {
        console.dir(error);
      }
    }
  },

  methods: {
    escFn() {
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "确定退出",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          console.log("嘿害嗨~");
        });
    },
    setFn() {
      // setprofile();
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  .card {
    height: 450px;
    background: linear-gradient(318deg, #b2b5db, #565482 70%, #494675) no-repeat;
    background-size: 100%;
    border-bottom-left-radius: 120px 40px;
    border-bottom-right-radius: 120px 40px;
  }
  .header {
    height: 361px;
    // background: url("~@/assets/banner.png");
    // background-size: cover;
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .nav-grid {
    margin: auto;
    width: 90%;
    border-radius: 30px;
    background-color: #fff;
    overflow: hidden;
  }
  .more {
    margin: 92px auto;
    margin-bottom: 165px;
    width: 90%;
    border-radius: 30px;
    background-color: #fff;
    overflow: hidden;
    p {
      font-size: 30px;
      margin: 10px 20px;
    }
    .van-grid {
      border-top: 1px dashed #bbb;
      .van-grid-item {
        // background-color: red;
        div {
          background-color: red;
          i.van-icon.van-icon-service.van-grid-item__icon {
            color: #fff;
            background-color: #fc6627;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .logout-cell {
    height: 100px;
    text-align: center;
    color: #eb5253;
    // margin: 10px 0;
    // margin-top: 60px;
    font-size: 30px;
  }
}
</style>
