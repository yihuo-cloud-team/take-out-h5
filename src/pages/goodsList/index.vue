<template>
  <div id="goodsList">
    <div class="head">
      <div class="head-title">
        <div
          class="head-bg"
          :style="{backgroundImage: 'url(' + $getUrl(info.store_bg) + ')', backgroundSize:'100% 100%',}"
        ></div>
        <div class="store-info">
          <img class="img" :src="$getUrl(info.logo)" alt />
        </div>
      </div>
    </div>
    <div class="tabs">
      <van-tabs v-model="activeIndex">
        <van-tab title="点餐">
          <div class="panel">
            <div class="class-list">
              <div
                :class="active==item.id?'active':''"
                class="class-item"
                v-for="(item,index) in goodsclass"
                :key="index"
                @click="select(item)"
              >{{item.name}}</div>
            </div>
            <div class="goods-list">
              <div  v-if="item.id==active" v-for="(item,bindex) in classTree" :key="bindex" >
                <div v-for="(item,index) in item.child"  :key="index">
                    <div class="goods-item">
                  <div class="left">
                    <img
                      class="img"
                      :src="item.goods_head_list?$getUrl(item.goods_head_list[0]):''"
                      alt
                    />
                  </div>
                  <div class="center">
                    <div class="center-top">{{item.title}}</div>
                    <div class="center-footer">{{item.price}}</div>
                  </div>
                  <div class="right">
                    <van-stepper
                      class="stepper"
                      @change="xuan(item),setTotal()"
                      v-model="item.select_value"
                      :min="0"
                      :show-minus="item.shows"
                      :input-width="0"
                    />
                  </div>
                </div>
                </div>
              
              </div>
            </div>
            <div class="f-tool">
              <div class="price">￥{{totalPrice}}</div>
              <div class="btn" @click="submit">去支付</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="店铺"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>