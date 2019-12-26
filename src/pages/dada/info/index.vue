<template>
  <div id="info">
    <div class="recharge">
      <div class="balance">
        <div class="balance-money">3200.00</div>
        <div class="balance-title">账户余额</div>
      </div>
      <div class="balance-btn">
        <van-button type="default" size="small">充值</van-button>
      </div>
    </div>
    <div class="title">注册信息</div>
    <div class="info">
      <van-cell-group>
        <van-cell title="注册手机号"></van-cell>
        <!-- <van-field v-model="phone" label="注册手机号" /> -->
        <van-field v-model="city" label="城市" />
        <van-field v-model="enterprise_name" label="企业全称" />
        <van-field v-model="enterprise_address" label="企业地址" />
        <van-field v-model="name" label="联系人姓名" />
        <van-field v-model="phone" label="联系人电话" />
        <van-field v-model="email" label="邮箱地址" />
        <van-field v-model="num" label="商户编号" />
      </van-cell-group>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>