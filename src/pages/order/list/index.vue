<template>
  <div id="list">
    <div class="tab">
      <div class="tab-head">
        <van-tabs v-model="active" sticky>
          <van-tab name>
            <div slot="title">
              <div>全部{{active === ''?`(${total})`:''}}</div>
            </div>
          </van-tab>
          <van-tab :name="0">
            <div slot="title">
              <div>待支付{{active === 0?`(${total})`:''}}</div>
            </div>
          </van-tab>

          <van-tab :name="2">
            <div slot="title">
              <div>待取货{{active == 2?`(${total})`:''}}</div>
            </div>
          </van-tab>

          <van-tab :name="3">
            <div slot="title">
              <div>已发货{{active == 3?`(${total})`:''}}</div>
            </div>
          </van-tab>

          <van-tab :name="4">
            <div slot="title">
              <div>已完成{{active == 4?`(${total})`:''}}</div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div class="tab-body">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="LoadMore()">
          <div class="panel" @click="$router.push(`/order/info?order_id=${item.order_id}`)" v-for="(item,index) in list" :key="index">
            <div class="panel-body">
              <div class="order" v-for="(i,j) in item.snapshotInfo" :key="j">
                <div class="order-left">
                  <div class="order-info">
                    <div class="goods-name">{{i.data.title}}</div>
                    <div class="goods-num">x{{i.data.quantity}}</div>
                  </div>
                </div>
                <div class="order-right">
                  <div>{{i.data.price}}￥</div>
                </div>
              </div>
              <van-divider />

              <div class="freight">
                <div class="freight-name">配送费</div>
                <div class="freight-price">{{item.freight_price}}￥</div>
              </div>

              <van-divider />

              <div class="panel-footer">
                <div class="footer">
                  <div class="date">{{item.add_time}}</div>
                  <div class="total">总计：{{item.payInfo.price}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>