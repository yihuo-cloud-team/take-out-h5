<template>
  <div id="list">
   <div class="user-info">
      <div class="info-image">
        <img class="img" :src="$getUrl(info.qrCode)" alt />
      </div>
      <div class="user-name">{{name}}</div>
    </div>
    <div class="security">
      <van-cell @click="$router.push('/marketing/coupons')" title="优惠卷" is-link />
    
    </div>


  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>