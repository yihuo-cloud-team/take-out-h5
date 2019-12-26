<template>
  <div id="select">
    <el-card shadow="never">
      <div >
        <van-button @click="sumbit(item)" v-for="(item,index) in list" :key="index" class="btn">{{item.name}}</van-button>
      </div>
    </el-card>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>