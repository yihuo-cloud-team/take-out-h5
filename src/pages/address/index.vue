<template>
  <div id="Address">
    <van-divider
      v-if="list.length==0"
      :style="{ color: 'black', borderColor: '#1989fa', padding: '0 16px' }"
    >暂无数据</van-divider>
    <div v-if="list.length>0" class="list">
      <div v-for="(item,index) in list" :key="index" class="item">
        <div class="item-top">
          <span>{{item.contacts}}</span>
          <span>{{item.phone}}</span>
          <van-tag class="tags">{{item.tag}}</van-tag>
        </div>
        <div class="item-center">{{item.address}},{{item.address_num}}</div>
        <div class="item-footer">
          <div class="footer-left btn-color" v-if="item.is_default == 1">默认地址</div>
          <div @click.stop="save(item)" v-else class="footer-left">设为默认</div>
          <div class="footer-right">
            <div class="operate">
              <van-icon
                name="edit"
                @click="$router.push(`/address/edit?id=${item.id}`)"
                style="font-size: 18px;"
              />编辑
            </div>
            <div class="operate">
              <van-icon name="delete" @click="del(item)" style="font-size: 18px;" />删除
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-button class="fixed" @click="$router.push('/address/edit')">添加地址</van-button>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>