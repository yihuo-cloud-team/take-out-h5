<template>
  <div id="qrcode">
    <div class="box">
      <div class="title">
        <div class="img">
          <img :src="$getUrl(info.logo)" alt />
        </div>
        <div class="right">
           <div class="name">{{info.name}}</div>

        </div>
       
      </div>
      <div ref="Qrcode"></div>
    </div>
    <div class="button">
    
      <van-icon name="down" @click="show=true"/>
      <div>  保存到相册</div>
    </div>
    <van-popup >
      
    </van-popup>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>