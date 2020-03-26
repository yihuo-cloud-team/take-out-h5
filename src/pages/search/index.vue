<template>
  <div id="search">
    <div class="search-head">
      <div class="search">
        <van-cell-group>
          <van-field v-model="name" clearable @click="search" placeholder="输入店名以搜索" />
        </van-cell-group>
      </div>
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
        @load="storeList()"
        :immediate-check="false"
        class="list"
      >
        <div class="item" @click="tiaozhuan(item)" v-for="(item,index) in list" :key="index">
          <div class="top">
            <div class="left">
              <img :src="$getUrl(item.logo)" class="img" alt />
              <div class="left-position" v-if="item.is_open ==0">商家已休息</div>
            </div>
            <div class="center">
              <div class="center-title">
                <span class="pinpai">品牌</span>
                {{item.name}}
              </div>
              <div>
                <span>
                  <van-rate allow-half readonly size="13" v-model.number="item.star" />
                </span>
                <span class="star">{{item.star}}</span>
                <span class="star">月售{{item.order_total?item.order_total:0}}单</span>
              </div>

              <div class="center-tag">
                <van-tag
                  class="tag"
                  color="#DDDDDD"
                  text-color="#666666"
                  plain
                  v-for="(item,index) in item.label"
                  :key="index"
                >{{item}}</van-tag>
              </div>
              <div class="center-info">
                <van-icon name="shop-o" />
                {{item.store_class}}
              </div>
            </div>
            <div class="right">{{item.distance | juli}}km</div>
          </div>
          <div class="bottom">
            <div class="img-box">
              <van-row gutter="10">
                <van-col v-for="(img,i) in item.store_goods" :key="i" :span="8">
                    <div
                  class="goods-img"
                  :style="`background-image: url(${$getUrl(img.goods_head_list[0])});`"
                ></div>
                </van-col>
              </van-row>
             
                
              
          
            </div>
          </div>
        </div>
      </van-list>
      <van-divider v-if="show">定位失败</van-divider>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>