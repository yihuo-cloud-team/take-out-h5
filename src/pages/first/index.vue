<template>
 <div id="first">
    <div class="home-head">
      <div class="search">
        <van-cell-group>
          <van-field v-model="name" clearable @click="$router.push('/search')" placeholder="搜索店名" />
        </van-cell-group>
      </div>
    </div>
    <div class="home-body">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="storeList()"
        :immediate-check="false"
        class="list"
      >
             <ol-store-card show-goods :info="item" v-for="item in list " :key="item.id"></ol-store-card>
      </van-list>
      <van-divider v-if="show">定位失败</van-divider>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>