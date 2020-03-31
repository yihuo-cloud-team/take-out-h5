<template>
  <div id="list">
    <div class="card" v-for="(item,i) in list" :key="i">
      <div class="card-left">
        <div>
          <div class="value_zen">
            <span v-if="item.type==1">{{item.value_zen*10}}折</span>
            <span v-if="item.type==2">&yen;{{item.value_zen}}</span>
          </div>
          <div class="text">优惠券</div>
        </div>
      </div>
      <div class="card-mid">
        <div style="width:100%">
          <div class="title">
            <div>商家券：</div>
            <div class="shop_name">{{item.storeInfo.name}}</div>
          </div>
          <div class="condition_value">满{{item.condition_value}}可用</div>
          <div class="endTime">{{item.edit_time}}到期</div>
        </div>
      </div>
      <div class="card-right">
        <button class="btn" @click="$router.push(`/goodsList?store_id=${item.store_id}&distance=0`)">立即使用</button>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>