<template>
  <div id="list">
  
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="loadMore()"
  class="order-list"
>
      <div @click="$router.push(`/order/info?order_id=${item.order_id}`)" class="order-item" v-for="(item,index) in list" :key="index">
        <div class="top">
          <div class="left">{{item.storeInfo.name}}</div>
          <div class="right">
            <div v-if="item.state==0">待支付</div>
            <div v-if="item.state==1">商家已接单</div>
            <div v-if="item.state==2">待取货</div>
            <div v-if="item.state==3">配送中</div>
            <div v-if="item.state==4">已完成</div>
            <div v-if="item.state==5">订单取消</div>
            <div v-if="item.state==21">待取消</div>

          </div>
        </div>
      
        <good-item :info="item"></good-item>
        <div class="footer">
          <van-button size="small" type="danger" @click.stop="$router.push(`/order/info?order_id=${item.order_id}`)" v-if="item.state==0">立即支付</van-button>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>