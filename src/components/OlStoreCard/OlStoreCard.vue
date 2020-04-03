<template>
  <div class="ol-store-card" v-if="info">
    <div class="top-box" @click="$router.push(`/goodsList?store_id=${info.store_id}`)">
      <!-- 主体信息 -->
      <div class="left-box">
        <div class="img-box">
          <van-image width="20vw" height="20vw" fit="cover" :src="$getUrl(info.logo)" />
          <div class="tag" v-if="state">{{state}}</div>
        </div>
      </div>
      <div class="center-box">
        <div class="title">
          <!-- 
门店的推广标签
0:无
1:品牌
2:星选
3:推荐
4:火爆
5:品质
          -->
          <div class="brand-tag t1" v-if="info.store_head_tag==1">品牌</div>
          <div class="brand-tag t2" v-if="info.store_head_tag==2">星选</div>
          <div class="brand-tag t3" v-if="info.store_head_tag==3">推荐</div>
          <div class="brand-tag t4" v-if="info.store_head_tag==4">
            <i>火爆</i>
          </div>
          <div class="brand-tag t5" v-if="info.store_head_tag==5">品质</div>

          <div>{{info.name}}</div>
        </div>
        <div class="cell">
          <div class="stars">
            <van-rate
              void-icon="star"
              color="#FED363"
              size="14px"
              void-color="#eee"
              allow-half
              readonly
              :value="star_value"
            />
          </div>
          <div class="fraction">{{star}}</div>
          <div class="sales_volume">月售{{info.order_total}}单</div>
        </div>
        <div class="cell">
          <div>{{info.minimum_price?info.minimum_price:0}}¥起送</div>
          <div class="distance">{{distance}}</div>
        </div>
        <div class="cell tag-cell">
          <div class="store-tag" v-for="label in info.label" :key="label">{{label}}</div>
          <!-- <div class="store-tag" v-for="i in 7" :key="i">好吃的饭好吃的饭好吃的饭</div> -->
        </div>
         <template>
              <template v-if="info.is_dada==0">
                <span style="color:red;font-size:14px">商家暂未开通达达配送</span>
              </template>
              <template v-if="info.is_dada==1">
                <template v-if="info.dada_money==0">
                  <span style="color:red;font-size:14px">商家余额不足，无法配送</span>
                </template>
              </template>
            </template>
        <div class="cell">
          <van-icon name="shop-o" />
          <div class="store_class" v-if="info.store_class">
            {{info.store_class}}
           
          </div>
          <div class="store_class" v-else-if="info.info">{{info.info}}</div>
        </div>
      </div>
    </div>
    <div class="goods-panel" v-if="showGoods && info.store_goods&&info.store_goods.length>0">
      <div class="goods-card" v-for="goods in info.store_goods" :key="goods.id">
        <div class="goods-img-box">
          <van-image
            width="30vw"
            height="30vw"
            fit="cover"
            :src="$getUrl(goods.goods_head_list[0])"
          />
        </div>
        <div class="goods-title">{{goods.title}}</div>
        <div class="goods-price">¥{{goods.price}}</div>
      </div>
    </div>
  </div>
</template>
<script src="./OlStoreCard.js"></script>
<style lang="scss" scoped>
@import "OlStoreCard.scss";
</style>