<template>
  <div id="address">
    <div class="address-head">
      <div class="location" @click="select">
        <van-icon class="icon-block" name="location-o" />
        <div class="text">{{addresstitle}}</div>
        <van-icon class="icon-block" name="arrow-down" />
      </div>
      <div class="search">
        <van-icon name="search" class="icon-block" />
        <van-field
          class="input"
          clearable
          v-model="keyword"
          @keydown.enter.native="Obtaintips"
          placeholder="请输入收货地址"
        />
      </div>
    </div>
    <div class="address-body">
      <div class="title">
        <van-icon class="icon-block" name="location-o" />
        <div class="text">附近地址</div>
      </div>
      <div class="address-list">
        <div class="item" v-for="(item,index) in TipsArr" :key="index" @click="choice(item)">
          <div class="item-title">{{item.name}}</div>
          <div class="item-text">{{item.district+item.address}}</div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-area
        :area-list="areaList"
        :value="areaval"
        @confirm="selectaddress"
        @cancel="canceladdress"
      />
    </van-popup>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>