<template>
  <div id="prizedraw">
    <div class="bg">
      <img class="title-img" src="../../static/images/文字@2x.png" alt />
      <div class="rotator">
        <transition-group
          tag="div"
          :class="classMap"
          name="list"
          :style="[{'transform':`rotateZ(-${(default_rotate+1)*36}deg)`}]"
        >
          <div
            v-for="(item,index) in list"
            class="item"
            :style="[{'transform':`rotate(${rotateNum(index)}deg)`}]"
            :key="item.id"
          >
            <span class="title">{{item.title}}</span>
            <van-image fit="contain" width="30" height="30" radius="4" :src="$getUrl(item.img)" />
          </div>
        </transition-group>
        <img class="img" @click="httpJx" src="../../static/images/转盘中心@3x.png" alt />
      </div>
      <div class="tiems">我的积分：{{number_tiems * 10}}</div>
      <img class="prize-logo" src="../../static/images/奖杯@2x.png" alt />
      <div class="prize-namelist">
        <div class="title">中奖名单</div>
        <div class="viewable">
          <div class="namelist-box" :style="[{'margin-top':`${0-number}px`}]">
            <div class="item" v-for="(item,index) in prize_namelist" :key="index">
              <div class="user-num">{{item.phone}}</div>
              <div class="text">获得{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <img style="width: 100%; height: 100%;" src="../../static/images/share_help.png" alt />
    </van-overlay>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>