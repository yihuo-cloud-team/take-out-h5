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
          <div class="name">
            {{info.name}}
            <van-icon v-if="info.is_store_star==0" @click="save(info)" size="20" name="like-o" />
            <van-icon
              v-if="info.is_store_star==1"
              @click="save(info)"
              size="20"
              color="#feb81c"
              name="like"
            />
          </div>
          <div class="tag">
            <van-tag v-for=" (item,index) in info.label" :key="index">{{item}}</van-tag>
          </div>
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
                    <div class="left"   @click.stop="$router.push(`/imgInfo?id=${item.id}`)">
                      <img
           
                        class="img"
                        :src="item.goods_head_list?$getUrl(item.goods_head_list[0]):''"
                        alt
                      />
                    </div>
                    <div class="center">
                      <div class="center-top">{{item.title}}</div>
                      <div class="center-footer">
                        <div class="old">原价{{item.o_price}}</div>
                        <div class="new">优惠价{{item.price}}</div>
                      </div>
                      <div class="right">
                        <van-stepper
                          :disabled="juli"
                          :disable-input="true"
                          class="stepper"
                          @change="xuan(item),setTotal()"
                          @overlimit="bukexuan()"
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
            </div>

            <div class="f-tool">
              <div class="price">
                <div v-show="totalPrice!=0" class="left">
                  <div class="top">原价{{oldPrice}}</div>
                  <div class="bottom">
                    <span>优惠价</span>
                    {{totalPrice}}
                  </div>
                </div>
                <div v-show="oldPrice!=0" class="right">已优惠{{youhui}}元</div>
              </div>

              <div
                :class="info.is_dada==1?'btn':'btn1'"
                v-if="totalPrice>=info.minimum_price"
                @click="submit"
              >去支付</div>

              <div
                class="btn1"
                v-if="totalPrice==0 && info.minimum_price != 0"
              >￥{{jiage?jiage:'--'}}元起送</div>
              <div
                class="btn1"
                v-if="totalPrice!=0 && totalPrice < info.minimum_price"
              >差￥{{jiage | tofixed}}起送</div>
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
                <van-panel title="营业时间" :status="info.start_time+'--'+info.end_time">
                  <div class="tag-box">
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
                <van-cell title="商家二维码" @click="ToQrcode(info)" is-link />
                <van-cell title="营业资质" @click="router(info)" is-link />
              </van-cell-group>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div @click="$router.replace('/home')" class="position">
      <van-icon size="25" name="arrow-left" color="white"></van-icon>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>