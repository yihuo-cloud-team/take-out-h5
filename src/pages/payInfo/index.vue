<template>
  <div id="payInfo">
    <div class="head">
      <div class="address">
        <div class="address-title">选择收货地址</div>
        <div class="address-info"></div>
        <van-icon color="#777" name="arrow" />
      </div>

      <div class="goods">
        <div class="goods-item" v-for="(item,index) in list" :key="index">
          <div class="left">
            <img class="img" :src="$getUrl(item.goods_head_list)" alt />
          </div>
          <div class="center">
            <div class="center-top">{{item.title}}</div>
            <div class="center-footer">X{{item.select_value}}</div>
          </div>
          <div class="right">
            <div>{{item.price}}</div>
          </div>
        </div>
      </div>
      <div class="center-box">
        <van-cell-group>
          <van-field
            v-model="message"
            rows="1"
            :autosize="{ maxHeight: 200, minHeight: 50}"
            label="备注信息"
            type="textarea"
            placeholder="请输入备注信息"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="f-tool">
      <div class="price">￥{{totalPrice}}</div>
      <div class="btn" @click="submit">去支付</div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>