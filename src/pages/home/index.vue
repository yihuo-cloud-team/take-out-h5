<template>
  <div id="home">
    <div @click="$router.push('search')" class="search-box">
      <div
        class="search-input"
        :style="`box-shadow: 0 0 20px rgba(0, 0, 0, ${shadow});`"
      >输入关键字以搜索美食～</div>
    </div>

    <div class="home-body">
      <ol-icon-nav @fnc='routers' :list='menuList'></ol-icon-nav>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="httpStoreList()"
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