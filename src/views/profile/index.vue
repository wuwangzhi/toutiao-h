<template>
  <div class="profile">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="头像" is-link @click="setAvatar">
        <template #right-icon>
          <van-image round width="30px" height="30px" :src="profile.photo" />
        </template>
      </van-cell>
      <van-cell
        title="昵称"
        @click="isShowUpdateName = true"
        :value="profile.name"
        is-link
      />
      <van-cell title="简介" :value="profile.intro" is-link />
      <van-cell
        title="性别"
        :value="profile.gender ? '女' : '男'"
        is-link
        class="gander"
        @click="isShowUpdateGender = true"
      />
      <van-cell
        title="生日"
        :value="profile.birthday"
        is-link
        @click="isShowUpdateBirthdy = true"
      />
    </van-cell-group>
    <input type="file" ref="input" v-show="false" @change="postfile" />
    <!-- 编辑昵称弹层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <updataName @close="isShowUpdateName = false" :profile="profile" />
    </van-popup>
    <!-- 编辑昵称弹层 /-->
    <!-- 编辑性别弹层 -->
    <van-popup
      v-model="isShowUpdateGender"
      style="height: 40%"
      position="bottom"
    >
      <updataGender @close="isShowUpdateGender = false" :profile="profile" />
    </van-popup>
    <!-- 编辑性别弹层 /-->
    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy" position="bottom">
      <updata-birthday
        @close="isShowUpdateBirthdy = false"
        :profile="profile"
      />
    </van-popup>
    <!-- 编辑生日弹层 -->
  </div>
</template>
<script>
import moment from "moment";
import updataName from "./components/updata-name.vue";
import updataGender from "./components/updata-gender.vue";
import { getprofile, setphoto } from "../../api/profile.js";
import UpdataBirthday from "./components/updata-birthday.vue";
export default {
  name: "ProfileIndex",
  components: {
    updataName,
    updataGender,
    UpdataBirthday,
  },
  data() {
    return {
      profile: {},
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
    };
  },
  methods: {
    async postfile() {
      this.$toast.loading({
        message: "更新中",
        forbidClick: true,
      });
      const flies = this.$refs.input.files[0];
      const formData = new FormData();
      formData.append("photo", flies);
      try {
        const {
          data: {
            data: { photo },
          },
        } = await setphoto(formData);
        this.profile.photo = photo;
        this.$toast("更新成功");
      } catch (err) {
        console.log(err);
      }
    },
    setAvatar() {
      this.$refs.input.click();
    },
  },
  async created() {
    const res = await getprofile();
    this.profile = res.data.data;
  },
};
</script>

<style scoped lang='less'>
.profile {
  .van-popup {
    background: #f5f7f9;
  }
  .van-nav-bar {
    font-size: 32px !important;
  }
  /deep/ .van-cell-group {
    background-color: #f5f7f9;
    .gander {
      margin-top: 20px !important;
    }
  }
}
</style>