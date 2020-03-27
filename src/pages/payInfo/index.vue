<template>
  <div id="payInfo">
    <div class="head">
      <div class="address" @click="show=true">
        <div v-if="!addressInfo.address" class="address-title">选择收货地址</div>
        <div v-else class="address-info">
          <div class="address-title">
            <div class="address-top">{{addressInfo.address}},{{addressInfo.address_num}}</div>
            <div class="address-content">
              <span>{{addressInfo.contacts}}</span>
              <span v-if="addressInfo.gender==1">男士</span>
              <span v-if="addressInfo.gender==0">女士</span>
              <span>{{addressInfo.phone}}</span>
            </div>
          </div>
          <div></div>
        </div>
        <van-icon color="#777" name="arrow" />
      </div>
      <div class="goods">
        <div class="goods-item" v-for="(item,index) in list" :key="index">
          <img-text-card
            :img="item.goods_head_list[0]"
            :price="item.price"
            :title="item.title"
            :oldPrice="item.o_price"
            :select_value="item.select_value"
          ></img-text-card>
        </div>
      </div>

      <!-- 优惠券单元格 -->
      <van-coupon-cell
        class="coupon-cell"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <!-- 优惠券列表 -->
      <van-popup v-model="showList" round position="bottom" style="padding-top: 4px;">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="couponChange"
          :show-exchange-bar="false"
        />
      </van-popup>

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
      <div class="price">
        <div class="left">
          <div v-if="oldPrice1!=0" class="top">原价{{oldPrice1}}</div>
          <div class="bottom">
            <span v-if="totalPrice!=0">优惠价</span>
            <span v-if="chosenCoupon<0">{{totalPrice}}</span>
            <span v-if="chosenCoupon>=0">{{lastPrice}}</span>
          </div>
        </div>
        <div v-if="youhui!=0" class="right">已优惠{{youhui}}元</div>
      </div>
      <div class="btn" @click="submit">去支付</div>
    </div>
    <van-popup position="bottom" style="height:90vh" v-model="show">
      <div id="select">
        <van-divider
          v-if="address.length==0"
          :style="{ color: 'black', borderColor: '#1989fa', padding: '0 16px' }"
        >暂无数据</van-divider>
        <div v-if="address.length>0" class="list">
          <div v-for="(item,index) in address" :key="index" class="item" @click="change(item)">
            <div class="item-top">
              <span>{{item.contacts}}</span>
              <span>{{item.phone}}</span>
              <van-tag class="tags">{{item.tag}}</van-tag>
            </div>
            <div class="item-center">{{item.address}},{{item.address_num}}</div>
            <div class="item-footer">
              <div class="footer-left btn-color" v-if="item.is_default == 1">默认地址</div>
              <div @click.stop="save(item)" v-else class="footer-left">设为默认</div>
              <div class="footer-right">
                <div class="operate">
                  <van-icon
                    name="edit"
                    @click.stop="$router.push(`/address/edit?id=${item.id}`)"
                    style="font-size: 18px;"
                  />编辑
                </div>
                <div class="operate">
                  <van-icon name="delete" @click="del(item)" style="font-size: 18px;" />删除
                </div>
              </div>
            </div>
          </div>
        </div>
        <van-button class="fixed" @click="$router.push('/address/edit')">添加地址</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "index.scss";
</style>
