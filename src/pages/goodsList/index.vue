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
              <div v-if="item.id==active" v-for="(item,bindex) in classTree" :key="bindex">
                <div v-for="(item,index) in item.child" :key="index">
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
        <van-tab title="店铺">
          <div class="panel-store">
            <div class="store-img">
              <div class="store-title">商家信息</div>
              <div class="store-imgs">
                <img v-for="(item,index) in info.store_img" :key="index" :src="$getUrl(item)" />
              </div>
              <div class="store-content">{{info.info}}</div>
            </div>
            <div class="store-info">
              <van-cell-group>
                <van-cell title="商家名称" :value="info.name" />
                <van-cell title="商家地址" :value="info.address" />
                <van-cell title="商家电话" :value="info.phone" />
          
                  <van-panel  title="营业时间"  :status="info.start_time+'--'+info.end_time">
                  <div class="tag-box" >
                       <van-tag class="tag" v-for="(item,index) in info.week" :key="index">{{item}}</van-tag>
                  </div>
                
                </van-panel>
                <van-cell title="标签">
                  <div>
                    <van-tag
                      v-for="(item,index) in info.label"
                      color="#f2826a"
                      :key="index"
                    >{{item}}</van-tag>
                  </div>
                </van-cell>
              
              </van-cell-group>
            </div>
            <div class="store-qualification">
              <van-cell-group>
                <van-cell title="营业资质" @click="router(info)" is-link />
              </van-cell-group>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>