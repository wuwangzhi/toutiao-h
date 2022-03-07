<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar"></van-nav-bar>
    <van-form @submit="submitFn">
      <van-field
        name="用户名"
        placeholder="请输入手机号"
        v-model="user.mobile"
        required
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="验证码"
        placeholder="请输入验证码"
        v-model="user.code"
        required
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      </van-field>
      <template #button>
        <van-button class="send-sms-btn" round size="small" type="default">
          发送验证码
        </van-button>
      </template>
      <div class="login-btn-wrap">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>     

<script>
import login from "../../api/user.js";
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async submitFn(val) {
      const user = this.user;
      try {
        const res = await login(user);
        console.log("登陆成功", res);
      } catch (error) {
        console.log("登陆失败", error);
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>