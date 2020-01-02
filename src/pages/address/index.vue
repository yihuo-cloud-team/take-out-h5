<template>
  <div id="address">
    <van-divider v-if="list.length==0" :style="{ color: 'black', borderColor: '#1989fa', padding: '0 16px' }">暂无数据</van-divider>
    <div v-if="list.length>0" class="list">
      <div v-for="(item,index) in list" :key="index" class="item">
          <div class="item-top">
          <span>{{item.contacts}}</span>
          <span>{{item.phone}}</span>
          <van-tag>{{item.tag}}</van-tag>
        </div>
        <div class="item-center">{{item.address}},{{item.address_num}}</div>
        <div class="item-footer"></div>
      </div>
      
    </div>
      <van-button  class="fixed" @click="$router.push('/address/edit')">添加地址</van-button>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>