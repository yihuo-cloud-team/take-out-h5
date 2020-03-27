<template>
  <div class="ol-icon-nav">

    <van-swipe class="my-swipe" :loop="false" indicator-color="#FED363">
      <van-swipe-item>
        <van-grid icon-size="12vw" :border="false" square :column-num="5">
          <template  v-for="(i,index) in list">
            <van-grid-item @click="tiaozhuang(i.id)" v-if="index<10" :key="index" :icon="$getUrl(i.img)" :text="i.name"></van-grid-item>
          </template>
        </van-grid>
      </van-swipe-item>
      <van-swipe-item>
        <van-grid icon-size="12vw" :border="false" square :column-num="5">
          <template v-for="(i,index) in list">
            <van-grid-item v-if="index>=10" @click="tiaozhuang(i.id)" :key="index" :icon="$getUrl(i.img)" :text="i.name"></van-grid-item>
          </template>
        </van-grid>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script src="./OlIconNav.js"></script>
<style lang="scss" scoped>
@import "OlIconNav.scss";
</style>