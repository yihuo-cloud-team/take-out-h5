<template>
  <div id="list">
    <van-list>
      <div class="panel" v-for="(item,index) in list" :key="index">
        <div class="panel-body">
          <div class="goodss">
            <div class="goods">
              <div class="goods-info">
                <div class="goods-title">名称:{{item.name}}</div>
                <div class="stock">排序:{{item.sort}}</div>
              </div>
            </div>
          </div>
          <van-divider />
        </div>
        <div class="panel-footer">
          <div class="footer">
            <div class="left"></div>
            <div class="btn">
              <van-button
                type="default"
                size="small"
                @click="$router.push(`/class/edit?id=${item.id}`)"
              >编辑</van-button>
                  <van-button
                type="default"
                size="small"
                @click="del(item)"
              >删除</van-button>
            </div>
          </div>
        </div>
      </div>
    </van-list>

    <van-button class="fixed" @click="$router.push('/class/edit')">添加分类</van-button>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>