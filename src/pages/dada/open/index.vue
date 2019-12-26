<template>
  <div id="open">
    <div v-if="is_dada!=1">
      <div class="consum">
        <div class="title">
          <span class="dada">第三方同城配送 (达达)</span>
          <a class="explain" href>消费说明</a>
        </div>
        <div class="consum-info">
          <span class="message">开启后可以选择第三方配送帮你送餐，该服务产生的配送费用将从店铺余额中扣除，请保证店铺余额充足。 开启后表示已同意</span>
          <a class="agreement" href>《第三方配送服务协议》</a>
        </div>
      </div>
      <div class="open-dada">

        <van-cell-group>
          <van-field
            v-model="form.mobile"
            rows="1"
            autosize
            required
            label="注册手机号"
            type="textarea"
            placeholder="请输入商户手机号"
          />
          <van-field
            v-model="form.city_name"
            rows="1"
            autosize
            required
            label="城市"
            type="textarea"
            placeholder="请输入商户城市名称"
          />
          <van-field
            v-model="form.enterprise_name"
            rows="1"
            autosize
            required
            label="企业全称"
            type="textarea"
            placeholder="请输入企业全称"
          />
          <van-field
            v-model="form.enterprise_address"
            rows="1"
            autosize
            required
            label="企业地址"
            type="textarea"
            placeholder="请输入企业地址"
          />
          <van-field
            v-model="form.contact_name"
            rows="1"
            required
            autosize
            label="联系人姓名"
            type="textarea"
            placeholder="请输入联系人姓名"
          />
          <van-field
            v-model="form.contact_phone"
            rows="1"
            autosize
            required
            label="联系人电话"
            type="textarea"
            placeholder="请输入联系人电话"
          />
          <van-field
            v-model="form.email"
            rows="1"
            autosize
            required
            label="邮箱地址"
            type="textarea"
            placeholder="请输入邮箱地址"
          />
        </van-cell-group>
      </div>
      <div style="padding:15px 20px">
        <van-button type="default" @click="submit" block>开通达达</van-button>
      </div>
    </div>

    <dada-info v-if="is_dada==1" :parentQuery="parserdata" :parentYue="yue"></dada-info>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>