<template>
  <div id="imgInfo" v-if="info">
    <div class="img-box">
      <van-swipe >
        <van-swipe-item  v-for="(image, index) in info.goods_head_list" :key="index">
          <div class="house-img" :style="`background-image: url(${$getUrl(image )});`"></div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="info">
      
    <div class="title">{{info.title}}</div>
    <div class="price">￥{{info.price}}</div>
    <div class="info">{{info.sub_title}}</div>

    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>