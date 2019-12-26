<template>
  <div id="home">
      <!-- 门店数据 S -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">门店数据</div>
        </div>
        <div class="data">
          <van-row>
            <van-col span="8">
              <div class="data-order">
                <div class="data-num">{{info.order}}</div>
                <div class="data-title">今日订单数</div>
              </div>
            </van-col>
            <van-col span="8">
              <div class="data-order">
                <div class="data-num">{{info.tprice | tofixed}}</div>
                <div class="data-title">今日成交额</div>
              </div>
            </van-col>
            <van-col span="8">
              <div class="data-order">
                <div class="data-num">{{info.yprice | tofixed}}</div>
                <div class="data-title">昨日成交额</div>
              </div>
            </van-col>
            <van-col span="8">
              <div class="data-order">
                <div class="data-num">16</div>
                <div class="data-title">今日访客</div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <!-- 门店数据 E -->

      <!-- 最新订单 S -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">最新订单</div>
          <div class="more" @click="$router.push('/order/list')">
            <div>更多</div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div v-if="orderList.length>0" class="panel-body">
          <div class="order"  v-for="(item,index) in orderList" :key="index">
            <div class="order-left">
                
                <div class="order-info" v-for="(i,j) in item.snapshotInfo" :key="j">
                    <div class="goods-name">{{i.title}}</div>
                    <div class="goods-num">等3件商品</div>
                </div>
            </div>
            <div class="order-right">
              <div>{{item.price}}￥</div>
            </div>
          </div>
        </div>
        <div v-if="orderList.length==0" class="panel-body">
         <van-divider>暂无数据</van-divider>
        </div>
      </div>
      <!-- 最新订单 E -->


      <!-- 热门商品 S -->
      <div class="panel">
        <div class="panel-header">
          <div class="panel-title">热门商品</div>
          <div class="more" @click="$router.push('/goods/list')">
            <div>更多</div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div v-if="goodsList.length>0" class="panel-body">
          <div class="goods" v-for="(item,index) in goodsList" :key="index">
            <div class="goods-head">
                <img :src="item.goods_head_list.length>0?item.goods_head_list[0]:''" alt="">
 
            </div>
            <div class="goods-info">
                <div class="goods-name">{{item.title}}</div>
            </div>
            <div class="price">总销量:{{item.goods_num}}</div>
          </div>
        </div>
        <div v-if="goodsList.length==0" class="panel-body">
       <van-divider>暂无数据</van-divider>
        </div>
      </div>
      <!-- 热门商品 E -->

      <!-- 门店信息 S -->
      <div class="panel">
           <div class="panel-header">
          <div class="panel-title">门店信息</div>
          <div class="more" @click="$router.push('/store/edit')">
            <div>编辑</div>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="panel-body">
          <div class="basics">
            <div class="basics-title">基础信息</div>
            <div class="basics-info">管理门店营业时间、电话和地址信息</div>
          </div>
          <div class="info">
            <div class="info-infos">
              <span class="title">商品分类：</span>
              <span >{{storeInfo.store_class}}</span>
            </div>
            <div class="info-infos">
              <span class="title">联系电话：</span>
              <span>{{storeInfo.phone}}</span>
            </div>
            <div class="info-infos">
              <span class="title">营业状态：</span>
              <span v-if="storeInfo.state==1">营业中</span>
              <span  v-if="storeInfo.state==2">打烊</span>
            </div>
            <div class="info-infos">
              <span class="title">营业时间：</span>
              <span v-for="(item,index) in storeInfo.week" :key="index">{{item}},</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 门店信息 E -->

  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>