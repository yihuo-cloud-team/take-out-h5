<template>
  <div id="search">
    <div class="search-head">
      <div class="search">
        <van-cell-group>
          <van-field  clearable v-model="form.name" placeholder="输入店名以搜索" />
      
        </van-cell-group>
      </div>
      <div class="btn" @click='search'>搜索</div>
    </div>
    <div class="select-box">
      <div class="item" v-for="(item,index) in paixuList" @click="select(index)" :key="index">
        {{item.name}}
        <span class="sanjiaoxing" v-if="index==bindex"></span>
      </div>
    </div>
    <div class="search-body">
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