<template>
  <div id="info">
    <div id="container" v-if="info.state!=4 && info.state!=5 && info.state !=0 &&info.state !=1 &&info.state != 21" style="height:400px"></div>
    <div class="goods">
      <div class="goods-item">
        <div class="top">
          <div class="left" v-if="info.storeInfo">{{info.storeInfo.name}}</div>
          <div class="right">
            <div v-if="info.state==0">待支付</div>
            <div v-if="info.state==1">商家已接单</div>
            <div v-if="info.state==2">待取货</div>
            <div v-if="info.state==3">配送中</div>
            <div v-if="info.state==4">已完成</div>
            <div v-if="info.state==5">订单取消</div>
            <div v-if="info.state==21">待取消</div>
          </div>
        </div>

        <div class="goods-item" v-for="(item,index) in info.snapshotInfo" :key="index">
          <template v-if="item.data">
            <img-text-card
              :img="item.data.goods_head_list[0]"
              :price="item.data.price"
              :title="item.title"
              :select_value="item.data.quantity"
            ></img-text-card>
          </template>
        </div>
        <div class="money">
          <div class="title">配送费</div>
          <div v-if="info.freight_price==0" class="content">商家免运费</div>
          <text v-if="info.freight_price>0">￥{{info.freight_price}}</text>
        </div>
        <div class="totalPrice">
          总计
          <div class="info-price">￥{{info.price}}</div>
        </div>
      </div>
    </div>
    <div class="address">
      <div class="top">
        <div class="left">配送信息</div>
      </div>
      <div class="content">
        <div class="give-info">
          <div class="left">配送地址</div>
          <div v-if="info.addressInfo" class="right">
            {{info.addressInfo.contacts}}
            {{info.addressInfo.gender==1?"(先生)":"(女士)"}}
            {{info.addressInfo.contacts}}
          </div>
        </div>
        <div class="text-align" v-if="info.addressInfo">{{info.addressInfo.address_num}}</div>
        <div class="text-align" v-if="info.addressInfo">{{info.addressInfo.address}}</div>
      </div>
    </div>
    <div class="order">
      <div class="top">
        <div class="left">订单信息</div>
      </div>
      <div class="content">
        <div class="give-info">
          <div class="left">订单号</div>
          <div class="right">{{info.order_id}}</div>
        </div>
        <div class="give-info">
          <div class="left">下单时间</div>
          <div class="right">{{info.add_time}}</div>
        </div>
        <div class="give-info">
          <div class="left">支付方式</div>
          <div class="right">在线支付</div>
        </div>
        <div class="give-info">
          <div class="left">订单备注</div>
          <div class="right">{{info.remarks}}</div>
        </div>
      </div>
    </div>
    <div class="pay" @click="pay">立即支付</div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>