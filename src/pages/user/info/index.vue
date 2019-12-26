<template>
  <div id="user">
    <div class="user-info">
      <div class="info-image">
        <img class="img" :src="$getUrl(info.qrCode)" alt />
      </div>
      <div class="user-name">{{name}}</div>
    </div>
    <div class="security">
      <van-cell @click="$router.push('/user/pwd')" title="账户与安全" is-link />
      <van-cell @click="$router.push('/marketing/list')" title="营销" is-link />
      <van-cell @click="$router.push('/user/overview')" title="账户总览" is-link />
      <van-cell @click="$router.push('/user/bill')" title="账单" is-link />
    </div>

    <div class="btn" @click="signOut">退出登录</div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>