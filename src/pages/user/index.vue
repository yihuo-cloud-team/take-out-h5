<template>
  <div id="user">
    <div class="user-info">
      <img class="user-img" :src="userInfo.head_img" alt />
      <div class="user-name">{{userInfo.name}}</div>
    </div>
    <van-cell-group>
      <van-cell is-link to="/address" title="收货地址" />
       <van-cell is-link to="/collection" title="我的收藏" />
      <van-cell is-link to="/coupon/list" title="优惠券" />
      <van-cell is-link to="/prizedraw" title="抽奖" />
      <van-cell is-link @click="signOut" title="退出登录" />
    </van-cell-group>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>