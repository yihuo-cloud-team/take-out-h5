<template>
  <div id="list">
    <van-tabs v-model="active" title-active-color="#1890FF" :sticky="true" color="#1890FF">
      <van-tab title="已上架" :name="1"></van-tab>
      <van-tab title="已下架" :name="0"></van-tab>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="loadMore()">
        <div class="panel" v-for="(item,index) in list" :key="index">
          <div class="panel-body" @click="$router.push('/goods/edit')">
            <div class="goodss">
              <img :src="item.goods_head_list.length>0?item.goods_head_list:''" alt />
              <div class="goods">
                <div class="goods-info">
                  <div class="goods-title">{{item.title}}</div>
                  <div class="stock">库存：{{item.stock}}</div>
                </div>
                <div class="price">￥{{item.price}}</div>
              </div>
            </div>
            <van-divider />
          </div>
          <div class="panel-footer">
            <div class="footer">
              <div class="volume">销量：{{item.goods_num}}</div>
              <div class="btn">
                <van-button
                  type="default"
                  v-if="item.is_up == 1"
                  @click="save(item)"
                  size="small"
                >下架</van-button>
                <van-button type="default" v-else @click="save(item)" size="small">上架</van-button>
                <van-button
                  type="default"
                  v-if="item.is_up == 0"
                  @click="del(item.id)"
                  size="small"
                >删除</van-button>
                <van-button
                  type="default"
                  size="small"
                  @click="$router.push(`/goods/edit?id=${item.id}`)"
                >编辑</van-button>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-tabs>
    <van-button class="fixed" @click="$router.push('/goods/edit')">发布商品</van-button>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>