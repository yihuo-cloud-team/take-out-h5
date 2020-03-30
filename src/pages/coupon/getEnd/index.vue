<template>
  <div id="getEnd">
      <div id="coupon-box">
        <img id="coupon-box-img" src="~static/images/couponEndBg.png" alt="">
        <div id="coupon-box-text">{{valueZen}}</div>
      </div>
      <button class="btn" @click="get">点击领取</button>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>