<template>
  <div id="info">
    <div class="order-type">
      <div v-if="orderInfo.state==0" class="type">待支付</div>
      <div v-if="orderInfo.state==1" class="type">已接单</div>
      <div v-if="orderInfo.state==2" class="type">待取货</div>
      <div v-if="orderInfo.state==3" class="type">送货中</div>
      <div v-if="orderInfo.state==4" class="type">已完成</div>
      <div v-if="orderInfo.state==5" class="type">订单取消</div>
      <div class="date">下单时间:{{orderInfo.add_time}}</div>
    </div>
    <div class="goods-list">
      <div v-for="item in orderInfo.snapshotInfo" :key="item" class="goods-info">
        <div class="info">
          <div class="name">{{item.data.title}}</div>
          <div class="copies">x{{item.data.quantity}}</div>
        </div>
        <div class="price">{{item.data.price}}￥</div>
      </div>

      <van-divider />
      <div class="freight">
        <div class="freight-name">配送费</div>
        <div class="freight-price">{{orderInfo.freight_price}}￥</div>
      </div>
    </div>
    <div class="address-info">
      <div class="address-title">地址信息</div>
      <div class="address">
        <van-cell-group :border="false">
          <van-cell :border="false" title="收货地址" value="中山中路99弄99号平高世贸大厦1711" />
          <van-cell :border="false" title="联系人" value="孙辉" />
          <van-cell :border="false" title="手机号" value="17674007036" />
        </van-cell-group>
        <!-- <div class="address-name">：</div>  -->
        <!-- <div class="a-info">{{orderInfo.addressInfo.address_num}}</div> -->
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>