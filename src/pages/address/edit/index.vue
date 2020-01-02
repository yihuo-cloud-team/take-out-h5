<template>
  <div id="edit">
    <van-cell-group>
      <van-field v-model="form.address" label="收货地址:" readonly right-icon="arrow" @click="$router.push('/address/search')" placeholder="请选择地址" />
      <van-field v-model="form.address_num" label="门牌号:" placeholder="请填写门牌号" />
      <van-field v-model="form.contacts" label="联系人:" placeholder="请填写收货人姓名" />
      <van-field v-model="form.gender" label>
        <div slot="input">
          <van-button :class="show?'active':''" @click="select(1)">男</van-button>
          <van-button :class="!show?'active':''" @click="select(0)">女</van-button>
        </div>
      </van-field>
      <van-field v-model="form.phone" label="手机号:" placeholder="请填写收货人手机号" />
      <van-field v-model="form.tag" label="标签:">
           <div slot="input">
          <van-button :class="shows==1?'active':''" @click="select1('家')">家</van-button>
          <van-button :class="shows==2?'active':''" @click="select1('公司')">公司</van-button>
          <van-button :class="shows==3?'active':''" @click="select1('学校')">学校</van-button>
        </div>
      </van-field>
    </van-cell-group>
    <div class="box">
       <van-button class="bottom-btn " size="large" color="#FFC700" @click="save">保存</van-button>
    </div>
      <div v-if="isEdit" class="box">
       <van-button class="bottom-btn " size="large" color="#FFC700" @click="del">删除</van-button>
    </div>   
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>