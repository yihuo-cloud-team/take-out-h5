<template>
  <div id="home">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadMore()"
      :immediate-check="false"
      class="list"
    >
      <div class="item" @click="tiaozhuan(item)" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="$getUrl(item.logo)" class="img" alt />
        </div>
        <div class="center">
          <div class="center-title">{{item.name}}</div>
          <div class="center-info">{{item.info}}</div>
          <div class="center-tag">  
            <van-tag class="tag" v-for="(item,index) in item.label" :key="index">{{item}}</van-tag>
          </div>
        </div>
        <div class="right">{{item.distance}}米</div>
      </div>
    </van-list>
    <van-divider v-if="show">定位失败</van-divider>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>