<template>
  <div id="login">
    <div class="box">
      <h1 class="box-title">商家登录系统</h1>
      <div class="sub-title">账户</div>
      <van-cell-group class="inp">
        <van-field v-model="form.phone" placeholder="请输入用户名" />
      </van-cell-group>
      <div class="sub-title">密码</div>
      <van-cell-group class="inp"> 
        <van-field type="password" v-model="form.user_pwd" placeholder="请输入用户名" />
      </van-cell-group>
      <div class="footer">
        <van-button type="default" class="left" @click="submit">登录</van-button>
      </div>
   

    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>