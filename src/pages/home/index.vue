<template>
  <div id="home">
    <div class="list">
      <div
        class="item"
        @click="$router.push(`/goodsList?store_id=${item.store_id}`)"
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="left">
          <img :src="$getUrl(item.logo)" class="img" alt />
        </div>
        <div class="center">
          <div class="center-title">{{item.name}}</div>
          <div class="center-info">{{item.info}}</div>
          <div class="center-tag">
            <van-tag class="tag" v-for="(item,index) in list.tag" :key="index">{{item}}</van-tag>
          </div>
        </div>
        <div class="right">2.51km</div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>