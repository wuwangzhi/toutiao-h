<template>
  <div style="padding: 10px">
    <van-nav-bar
      title="用户名"
      left-text="返回"
      right-text="完成"
      left-arrow
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { setprofile } from "@/api/profile";
export default {
  props: {
    profile: Object,
  },
  data() {
    return {
      message: this.profile.name,
    };
  },
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: "更新中",
        forbidClick: true,
      });
      await setprofile({ name: this.message });
      this.profile.name = this.message;
      this.$emit("close");
      this.$toast("更新成功");
    },
  },
};
</script>

<style>
</style>