<template>
  <div class="item">
    <div class="img">
      <img :src="$getUrl(info.snapshotInfo[0].data.goods_head_list[0])" alt />
    </div>
    <div class="content">
      <div>下单时间:{{info.add_time}}</div>
      <div>{{info.snapshotInfo[0].title}}...等{{info.snapshotInfo.length}}件商品</div>
      <div>总计:{{info.price}}</div>
    </div>
  </div>
</template>
<script src="./goodItem.js"></script>
<style lang="scss" scoped>
@import "goodItem.scss";
</style>