<template>
  <div id="list">
    <div v-for="(item,index) in list" :key="index" class="p-list">
        <div class="info-btn">
          <div class="num">
            <span>{{item.item_sn}}</span>
            <van-tag plain>前台</van-tag>
          </div>
          <div class="binding" @click="del(item)">解绑</div>
        </div>
        <div class="message">{{item.printer_status}}</div>
        <van-divider />
    </div>
    <div style="padding:15px 20px" @click="$router.push('/printer/edit')">
      <van-button type="default" block>添加打印机</van-button>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>