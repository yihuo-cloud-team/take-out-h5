<template>
  <div id="edit">
    <van-field v-model="form.message" rows="3" autosize type="textarea" placeholder="在这里输入内容..." />
    <van-uploader v-model="form.fileList" :after-read="afterRead" :max-count="9" />
    <van-button class="themeColorBtn" @click="submitFun" block>发布</van-button>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "index.scss";
</style>
