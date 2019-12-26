<template>
  <div id="overview">
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
   
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">账户总览</div>
      </div>
      <div class="data">
        <van-row>
          <van-col span="8">
            <div class="data-order">
              <div class="data-num">{{info.payTotal}}</div>
              <div class="data-title">营业总额</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="data-order">
              <div class="data-num">{{info.orderTotal}}</div>
              <div class="data-title">订单总额</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="data-order">
              <div class="data-num">{{info.freightCount}}</div>
              <div class="data-title">运费总额</div>
            </div>
          </van-col>
          <van-col span="8">
            <div class="data-order">
              <div class="data-num">{{info.subsidy}}</div>
              <div class="data-title">补贴总额</div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">我的余额</div>
      </div>
      <div class="data">
        <van-row>
          <van-col span="12">
            <div class="data-order">
              <div class="data-num">{{info.checkMoney}}</div>
              <div class="data-title">可提现的余额</div>
              <van-button class="btn">提现</van-button>
            </div>
          </van-col>
          <van-col span="12">
            <div class="data-order">
              <div class="data-num">{{info.canGet}}</div>
              <div class="data-title">待审核金额</div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>