<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="$emit('close')"
    @confirm="onConfirm"
  />
</template>

<script>
import moment from "moment";
import { setprofile } from "@/api/profile";
export default {
  props: { profile: Object },
  data() {
    return {
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(moment(this.profile.birthday).format("YYYY,MM,DD")),
    };
  },
  methods: {
    async onConfirm(val) {
      this.$toast.loading({
        message: "更新中",
        forbidClick: true,
      });
      const res = await setprofile({
        birthday: moment(val).format("YYYY-MM-DD"),
      });
      console.log(res);
      console.log(moment(val).format("YYYY-MM-DD"));
      this.profile.birthday = moment(val).format("YYYY-MM-DD");
      this.$emit("close");
      this.$toast("更新成功");
    },
  },
};
</script>

<style scoped lang='less'>
</style>