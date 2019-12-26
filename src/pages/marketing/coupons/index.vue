<template>
  <div id="coupons">
    <!-- <div class="onshow">

        <van-button @click="submit">开通</van-button>
    </div>-->
    <div class="panel">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="额度"
        />
        <van-field v-model="password" label="可用商品" required />
        <van-field v-model="password" label="开始时间" required />
        <van-field v-model="password" label="结束时间" required />
      </van-cell-group>
  <van-button class="fixed" @click="$router.push('/goods/edit')">添加优惠卷</van-button>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>