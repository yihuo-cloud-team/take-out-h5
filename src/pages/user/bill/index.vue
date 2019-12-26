<template>
  <div id="bill">
    <div class="date">
      <div class="left" @click="showPopup">
        <div class="footer-left">开始时间</div>
        <div class="footer-right" style="background-color:#AAC4FD">{{currentDate.Format('yyyy-MM')}}</div>
      </div>
      <van-popup v-model="show" position="bottom" :style="{height:'200px'}">
        <van-datetime-picker
          v-model="currentDate"
         type="year-month"
          :formatter="formatter"
          @confirm="start"
          @cancel="show=false"
        />
      </van-popup>
      <div class="left">
        <van-dropdown-menu>
          <van-dropdown-item v-model="form.type" @change="select" :options="option1" />
        </van-dropdown-menu>
      </div>
    </div>
    <van-list class="panel-list" v-model="loading" :finished="finished" :offset="3000" finished-text="没有更多了" @load="loadMore()">
      <div class="panel-item" v-for="(item,index) in list" :key="index">
          <div class="top">
            <div class="top-left" v-if="item.type==1">收入</div>
            <div class="top-left" v-if="item.type==2">支出</div>
            <div class="top-center">{{item.money}}</div>
            <div class="top-right">{{item.add_time}}</div>
          </div>
          <div class="center" v-if="item.state==1">状态:成功</div>
          <div class="center" v-if="item.state==2">状态:失败</div>
          <div class="bottom" v-if="item.text">备注:{{item.text}}</div>
      </div>
    </van-list>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>