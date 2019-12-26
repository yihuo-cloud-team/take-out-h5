<template>
  <div id="pwd">
    <div class="update-pwd">
      <div class="title">修改密码</div>
      <van-cell-group>

        <van-field
          v-model="form.pwd"
          type="password"
          label="新密码"
          placeholder="请输入新密码"
          required
        />

        <van-field
          v-model="form.pwd1"
          type="password"
          label="确认密码"
          placeholder="请再次确认密码"
          required
        />

      </van-cell-group>
      <div class="btn">
        <van-button type="default" size="large" @click="submit">确定</van-button>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>