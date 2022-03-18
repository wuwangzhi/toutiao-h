<template>
  <van-picker
    title="性别"
    show-toolbar
    :columns="columns"
    @cancel="$emit('close')"
    @confirm="onConfirm"
    :default-index="this.profile.gender"
  />
</template>

<script>
import { setprofile } from "@/api/profile";
export default {
  props: { profile: Object },
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  methods: {
    async onConfirm(val, index) {
      this.$toast.loading({
        message: "更新中",
        forbidClick: true,
      });
      await setprofile({ gender: index });
      this.profile.gender = index;
      this.$emit("close");
      this.$toast("更新成功");
    },
  },
};
</script>

<style scoped lang='less'>
</style>