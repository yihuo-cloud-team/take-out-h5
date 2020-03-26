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
            <van-image width="30" height="30" radius="4" fit="cover" :src="$getUrl(item.img)" />
          </div>
        </transition-group>
        <img class="img" @click="httpJx" src="../../static/images/转盘中心@3x.png" alt />
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>