<template>
  <div class="ol-icon-nav">
    <van-swipe class="my-swipe" :loop="false" indicator-color="#FED363">
      <van-swipe-item>
        <van-grid icon-size="12vw" :border="false" square :column-num="5">
          <van-grid-item v-for="i in 10" :key="i" icon="/images/navicon/能量西餐.png" text="能量西餐"></van-grid-item>
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid icon-size="12vw" :border="false" square :column-num="5">
          <van-grid-item v-for="i in 4" :key="i" icon="/images/navicon/能量西餐.png" text="能量西餐"></van-grid-item>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script src="./OlIconNav.js"></script>
<style lang="scss" scoped>
@import "OlIconNav.scss";
</style>