<template>
  <div id="info">
    <div class="mini-set-title">小程序配置</div>
    <div class="mini-set">
      <van-cell-group>
       <van-cell title="微信appid:" :value="form.wx_appid" />
         <van-cell title="微信密钥:" :value="form.wx_secret" />
      </van-cell-group>
    </div>
    <div class="wx-set-title">微信商户配置</div>
    <div class="vx-set">
      <van-cell-group>
        <van-cell title="微信商户号:" :value="form.wx_mch_id" />
         <van-cell title="微信密钥:" :value="form.wx_mch_secret" />
      </van-cell-group>
    </div>
    <div style="padding:15px 20px" @click="$router.push('/develop/edit')">
      <van-button type="default" block>修改信息</van-button>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>