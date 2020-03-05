<template>
  <div id="user">
    <div class="user-info">
      <img class="user-img" :src="userInfo.head_img" alt />
      <div class="user-name">{{userInfo.name}}</div>
    </div>
    <van-cell-group>
      <van-cell is-link to="/address" title="收货地址" />
    </van-cell-group>

  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>