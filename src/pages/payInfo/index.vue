<template>
  <div id="payInfo">
    <div class="head">
      <div class="address"></div>

      <div class="goods" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img class="img" :src="$getUrl(item.goods_head_list)" alt />
        </div>
        <div class="center">
          <div class="center-top">{{item.title}}</div>
          <div class="center-footer">{{item.price}}</div>
        </div>
      </div>

      <textarea class="textarea" >  </textarea>
    </div>
    <div class="f-tool">
      <!-- <div class="price">￥{{totalPrice}}</div> -->
      <!-- <div class="btn" @click="submit">去支付</div> -->
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>