<template>
  <div id="get"> 
    <van-image id="head" :src='src' fit='cover' width='80' height="80" radius='40'></van-image>
    <div id="main">
        <div id="coupon">
          <img class="couponBg" src="~static/images/couponBg.png">
          <div class="text-box">
            <div class="title">外卖商家卷</div>
            <div class="value_zen">
              10元
            </div>
            <div class="condition_value">无使用门槛</div>
            <div class="time">2020.03.27-2020.04.2</div>
          </div>
        </div>
        <div id="qrcode" ref="Qrcode"></div>
        <!-- <div ref="Qrcode"></div> -->
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>