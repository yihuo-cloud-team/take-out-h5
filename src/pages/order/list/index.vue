<template>
  <div id="list">
      <div class="order-list">
        <div class="order-item" v-for="(item,index) in list" :key="index">
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
          <div class="center">
            <div class="img">
                
            </div>
            <div class="img">

            </div>
          </div>
          <div class="footer"></div>
        </div>
      </div>
        
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>