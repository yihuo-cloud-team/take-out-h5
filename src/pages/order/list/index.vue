<template>
  <div id="list">
      <div class="order-list">
        <div class="order-item" v-for="(item,index) in list" :key="index">
          <div class="top">
            <div class="left"></div>
            <div class="right"></div>
          </div>
          <div class="center"></div>
          <div class="footer"></div>
        </div>
      </div>
        
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>