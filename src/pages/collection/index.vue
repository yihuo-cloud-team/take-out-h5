<template>
  <div id="collection">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="update"
      :immediate-check="false"
      class="list"
    >
      <ol-store-card show-goods :info="item" v-for="item in list " :key="item.id"></ol-store-card>
    </van-list>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>