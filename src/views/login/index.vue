<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      class="page-nav-bar"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-form @submit="submitFn" ref="uselogin">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="rulesMobile"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="rulesCode"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

        <template #button>
          <van-button
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="codeFn"
            v-if="show"
          >
            发送验证码
          </van-button>
          <van-count-down
            :time="60000"
            format="ss s"
            v-else
            ref="countd"
            @finish="show = true"
          />
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>     

<script>
import { login, codes } from "../../api/user.js";
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
      rulesMobile: [
        { required: true, message: "手机号不能为空" },
        { pattern: /^1[3|3|5|7|8]\d{9}$/, message: "手机号格式不正确" },
      ],
      rulesCode: [
        { required: true, message: "验证码不能为空" },
        { pattern: /^\d{6}$/, message: "验证码格式不正确" },
      ],
      show: true,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 登录
    async submitFn(val) {
      const user = this.user;
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "登录中",
      });
      try {
        const { data } = await login(user);
        console.log(data);
        this.$store.commit("setUser", data.data);
        this.$toast.success("登录成功");
        this.$router.push("/");
      } catch (err) {
        console.dir(err);
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("登录失败，请稍后重试");
        }
      }
    },
    // 验证手机号
    async codeFn() {
      try {
        this.$refs.uselogin.validate("mobile");
      } catch (err) {
        return console.log(err);
      }
      this.show = false;
      try {
        await codes(this.user.mobile);
        this.$toast("发送成功");
      } catch (err) {
        this.show = true;
        console.dir(err);
        if (err.response.status === 429) {
          this.$toast("发送太频繁了，请稍后重试");
        } else {
          this.$toast("发送失败，请稍后重试");
        }
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
  .van-form {
    .van-count-down {
      font-style: 22px;
      color: #666;
    }
  }
}
</style>