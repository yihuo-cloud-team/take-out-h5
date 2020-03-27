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
            <div class="left"></div>
            <div class="right"  @click="shows(item,i)">
              <div class="dian">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="btn-box"  :class="item.check==true?'active':'hidden'">
                  <div class="box" @click="dianzan(item.id)">
                    <van-icon class="left-margin" name="like-o"  />赞
                  </div>
                  <div class="box">
                    <van-icon class="left-margin" name="other-pay" @click="comment()" />评论
                    <div class="sanjiaoxing"></div>
                  </div>
                </div>
              </div>
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
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "index.scss";
</style>
