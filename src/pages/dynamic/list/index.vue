<template>
  <div id="list">
    <van-divider
      v-if="list.length==0"
      :style="{ color: 'black', borderColor: '#FFC700', padding: '0 16px' }"
    >暂无数据</van-divider>

    <van-list v-model="loading" :finished="finished" style=" width: 100%;" @load="update">
      <dynamic-card :info="item" v-for="(item,i) in list" :key="i"></dynamic-card>
    </van-list>

    <div id="plus-btn" @click="$router.push(`/dynamic/edit`)">
      <van-icon name="plus" size="30" color="#FFF" />
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "index.scss";
</style>
