<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-popup
      v-model="isshowitem"
      closeable
      position="top"
      :style="{ height: '100%' }"
    >
      <channelAditVue
        @dataup-active="changeChannel"
        :list="channels"
        :active="active"
      ></channelAditVue
    ></van-popup>
    <!-- /导航栏 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="arr.name" v-for="arr in channels" :key="arr.id"
        ><artriceListVue :channels="arr"
      /></van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="bambgFn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import artriceListVue from "./components/artrice-list";
import { getuserchannels } from "../../api/home.js";
import channelAditVue from "../../components/channel-adit.vue";
import { mapState } from "vuex";
import { getItem } from "../../utils/storage.js";

export default {
  name: "HomeIndex",
  methods: {
    bambgFn() {
      this.isshowitem = true;
    },
    changeChannel(index, isshowpopup = true) {
      this.active = index;
      this.isshowitem = isshowpopup;
    },
  },
  data() {
    return {
      active: 0,
      channels: [],
      isshowitem: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  async created() {
    if (this.user) {
      const { data } = await getuserchannels();
      this.channels = data.data.channels;
    } else {
      const itemlis = getItem("channelslist");
      this.channels = itemlis;
    }

    // console.log(this.channels);
  },
  mounted() {},
  components: {
    artriceListVue,
    channelAditVue,
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 180px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: white;
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url("../../assets/mobile.png");
        background-size: contain;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 2;
      width: 100%;
      // padding-top: 180px;
    }
  }
}
</style>