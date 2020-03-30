<template>
  <div class="dynamic-card" v-if="info">
    <van-image class="dynamic-box-img" fit="cover" width="40" height="40" :src="info.user_img" />
    <div class="dynamic-box-info">
      <div class="dynamic-box-info-name">{{info.user_name}}</div>
      <div class="dynamic-box-info-date">{{info.add_time}}</div>
      <div class="dynamic-box-info-text">{{info.contact}}</div>
      <van-row class="dynamic-box-info-img">
        <van-col
          span="7"
          v-for="(img,i) in imgs"
          :key="i"
          style="padding-left: 2.5px; padding-right: 2.5px;"
        >
          <div
            @click="showImagePreview(i)"
            class="dynamic-list-img"
            :style="`background-image: url('`+img+`');`"
          ></div>
        </van-col>
      </van-row>
      <div class="tool-cell-panel">
        <div class="tool-cell">
          <van-icon size="20px" @click="dianZan(info.id)" v-if="is_star==0" name="like-o" />
          <van-icon size="20px" @click="dianZan(info.id)" v-else name="like" color="#FFC700" />
          <div style="font-size:11px">{{star_num}}</div>
        </div>
        <div class="tool-cell">
          <van-icon size="20px" @click="hidden=true" name="other-pay" />
        </div>
      </div>
      <!-- 评论 -->
      <div class="dynamic-box-info-info" style="padding:3px" v-if="evaluates.length>0">
        <div
          style="font-size:12px;margin-bottom:3px"
          v-for="(evaluate,index) in evaluates"
          :key="index"
        >
          <span style="color:#596188;">{{evaluate.name}}:</span>
          <span>{{evaluate.content}}</span>
        </div>
      </div>
    </div>
    <van-popup v-model="hidden"  position="bottom" style="height:50vh">
      <van-field v-model="content" center placeholder="输入您的评论">
        <template #button>
          <van-button size="small" @click="comment" type="primary">发送</van-button>
        </template>
      </van-field>
    </van-popup>
    <van-image-preview v-model="show" :images="imgs" :startPosition="index"></van-image-preview>
  </div>
</template>


<script>
export default {
  name: "DynamicCard",
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: [],
      index: 0,
      down: false,
      content: "",
      hidden: false,
      dynamic_id: "",
      show: false,
      evaluates: [],
      star_num: 0,
      is_star: 0
    };
  },
  computed: {
    imgs() {
      if (this.info.img_list.length == 0) return;
      this.info.img_list = this.info.img_list.split(",");
      this.info.img_list = this.info.img_list.map(el => this.$getUrl(el));
      return this.info.img_list;
    }
  },
  mounted() {
    this.evaluates = this.info.evaluate;
    this.star_num = this.info.star_num;
    this.is_star = this.info.is_star;
  },
  methods: {
    showImagePreview(index) {
      this.index = index;
      this.show = true;
    },
    async dianZan(id) {
      if (this.down) {
        return false;
      }
      this.down = true;
      const res = await this.$http.post("/dynamic/star", {
        dynamic_id: id
      });
      if (res.code >= 0) {
        // this.$toast("操作成功");
        await this.httpDz();
      } else {
        // this.$toast(res.msg);
        await this.httpDz();
      }
      this.down = false;
    },
    async httpComment() {
      const res = await this.$http.post("/dynamic/evaluate/list", {
        dynamic_id: this.info.id
      });
      this.evaluates = res.data;
    },
    async httpDz() {
      const res = await this.$http.post("/dynamic/star/num", {
        dynamic_id: this.info.id
      });
      this.star_num = res.data.star_num;
      this.is_star = res.data.is_star;
    },
    async comment(id) {
      const res = await this.$http.post("/dynamic/evaluate", {
        dynamic_id: this.info.id,
        content: this.content
      });
      if (res.code >= 0) {
        this.content = "";
        this.finished = false;
      } else {
        this.$toast(res.msg);
      }
      this.hidden = false;
      await this.httpComment();
    }
  }
};
</script>
<style lang="scss" scoped>
.dynamic-card {
  padding: 10px 20px;
  border-bottom: 1px solid #f6f6f6;
  display: flex;
  .tool-cell-panel {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    .tool-cell {
      font-size: 14px;
      color: #aaa;
      display: flex;
      margin-right: 10px;
    }
  }
  .dynamic-box {
    &-img {
      border-radius: 8px;
      overflow: hidden;
      background: white;
    }

    &-info {
      flex: 1;
      padding-left: 10px;
      font-size: 16px;

      &-name {
        font-weight: bold;
      }

      &-date {
        color: #707070;
        font-size: 12px;
      }

      &-text {
        padding: 5px 0;
      }

      &-img {
        .dynamic-list-img {
          margin-bottom: 5px;
          width: 100%;
          display: block;
          padding-bottom: 100%;
          background-size: cover;
          background-position: 50%;
        }
      }

      &-comment {
        display: flex;
        flex-direction: row;

        .left {
          flex: 1;
          display: flex;
          justify-content: center;
          align-infos: center;
        }

        .right {
          flex: 1;
          display: flex;
          justify-content: center;
          align-infos: center;
        }
      }

      &-info {
        padding: 4px 0;
        background-color: #f7f7f7;
      }
    }
  }
}
</style>