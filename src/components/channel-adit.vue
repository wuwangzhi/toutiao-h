<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isset = !isset"
        >{{ isset ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channelItem, index) in list"
        :key="index"
        @click="changeChannel(channelItem, index)"
      >
        <span class="text" :class="{ active: active === index }" slot="text">{{
          channelItem.name
        }}</span>
        <!-- 通过插槽自定义图标 -->
        <van-icon v-show="isset && index !== 0" slot="icon" name="close" />
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="(value, i) in getallchannel"
        :key="i"
        :text="value.name"
        icon="plus"
        @click="addFn(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { setItem } from "../utils/storage.js";
import { getchannels, adduserchannels, deluserchannels } from "../api/home.js";
import { mapState } from "vuex";
export default {
  props: {
    list: Array,
    active: Number,
  },
  data() {
    return {
      allchannels: [],
      isset: false,
    };
  },
  methods: {
    async addFn(val) {
      this.list.push(val);
      if (this.user) {
        try {
          await adduserchannels({
            id: val.id,
            seq: this.list.length,
          });
          this.$toast("添加成功");
        } catch (error) {
          this.$toast("添加失败");
          console.log(error);
        }
      } else {
        setItem("channelslist", this.list);
      }
    },
    async changeChannel(val, index) {
      if (this.isset) {
        if (index === 0) {
          return;
        }
        if (index <= this.active) {
          this.$emit("dataup-active", this.active - 1);
        }
        this.list.splice(index, 1);
        if (this.user) {
          await deluserchannels(val.id);
        } else {
          setItem("channelslist", this.list);
        }
      } else {
        this.$emit("dataup-active", index, false);
      }
    },
  },
  async created() {
    try {
      const {
        data: { data },
      } = await getchannels();
      this.allchannels = data.channels;
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    ...mapState(["user"]),
    getallchannel() {
      return this.allchannels.filter((val) => {
        return !this.list.find((value) => value.id === val.id);
      });
    },
  },
};
</script>

<style scoped lang='less'>
.channel-edit {
  padding-top: 90px;
  .channel-item {
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 24px;
        margin-top: 0;
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 24px;
      }

      .van-grid-item__text {
        font-size: 24px;
      }
    }
  }

  /deep/ .van-icon-close {
    position: absolute;
    right: -105px;
    top: -35px;
    font-size: 36px;
    color: orange;
  }
  /deep/ .van-grid-item__content {
    background-color: #f5f5f6;
    .van-grid-item__text,
    .text {
      color: #222;
      font-size: 24px;
      white-space: nowrap;
    }
    .active {
      color: red;
    }
  }
}
</style>