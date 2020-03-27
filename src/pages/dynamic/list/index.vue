<template>
  <div id="list">
    <van-divider
      v-if="list.length==0"
      :style="{ color: 'black', borderColor: '#FFC700', padding: '0 16px' }"
    >暂无数据</van-divider>

    <van-list v-model="loading" :finished="finished" style=" width: 100%;" @load="update">
      <div class="dynamic-box" v-for="(item,i) in list" :key="i">
        <van-image class="dynamic-box-img" fit="cover" width="40" height="40" :src="item.user_img" />
        <div class="dynamic-box-info">
          <div class="dynamic-box-info-name">{{item.user_name}}</div>
          <div class="dynamic-box-info-date">{{item.add_time}}</div>
          <div class="dynamic-box-info-text">{{item.contact}}</div>
          <van-row class="dynamic-box-info-img">
            <van-col
              span="7"
              v-for="(todo,index) in item.img_list"
              :key="index"
              style="padding-left: 2.5px; padding-right: 2.5px;"
            >
              <div
                @click="showImagePreview(item,index)"
                :showImagePreview="showImagePreview"
                class="dynamic-list-img"
                :style="`background-image: url('`+$getUrl(todo)+`');`"
              ></div>
            </van-col>
          </van-row>
          <div class="dynamic-box-info-comment">
            <div class="left">
              <van-icon @click="tiaozhuan(item.id)" name="other-pay" />
            </div>
            <div class="right">
              <van-icon @click="dianzan(item.id)" v-if="item.is_star==0" name="like-o" />
              <van-icon @click="dianzan(item.id)" v-else name="like" color="#FFC700" />
              {{item.star_num}}
            </div>
          </div>
          <div class="dynamic-box-info-info">
            <div style='font-size:12px;margin-bottom:3px' v-for="(item,index) in item.evaluate" :key="index">
            <span style="color:#596188;">{{item.name}}</span>:{{item.content}}
            </div>
          </div>
        </div>
      </div>
    </van-list>

    <van-image-preview v-model="show" :images="images" :startPosition="index" @change="onChange">
      <template v-slot:index>第{{ index+1 }}页</template>
    </van-image-preview>

    <div id="plus-btn" @click="$router.push(`/dynamic/edit`)">
      <van-icon name="plus" size="30" color="#FFF" />
    </div>
    <van-popup v-model="hidden" position="bottom">
      <van-field v-model="content" center   placeholder="输入您的评论">
        <template #button>
          <van-button size="small" @click="comment" type="primary">发送</van-button>
        </template>
      </van-field>
    </van-popup>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "index.scss";
</style>
