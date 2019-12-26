<template>
  <div id="edit">
    <div class="header">
      <div class="image1" v-if="form.goods_head_list.length>0">
        <img class="img-nav" v-for="item in form.goods_head_list" :key="item" :src="$getUrl(item)" alt />
      </div>
      <div class="btn">
        <ol-upload @success="url=>form.goods_head_list.push(url)">
          <van-icon name="photograph" />
        </ol-upload>
      </div>
      <!-- <div class="num">1/5</div> -->
    </div>
    <div v-if="form.goods_head_list.length==0" class="image">
      <div class="info-image">
        <ol-upload @success="url=>form.goods_head_list.push(url)">
          <van-icon class="img" name="photograph" />
        </ol-upload>
      </div>
      <div class="upload-title">最多可以上传5张照片</div>
    </div>

    <div class="input-file">
      <van-cell-group>
        <van-field
          v-model="form.title"
          :required="true"
          rows="1"
          autosize
          label="商品名称"
          type="textarea"
          placeholder="请输入商品名称"
        />
        <van-field
          v-model="form.sub_title"
          :required="true"
          rows="1"
          autosize
          label="副标题"
          type="textarea"
          placeholder="请输入商品名称"
        />
        <van-field
          v-model="form.o_price"
          :required="true"
          rows="1"
          autosize
          label="原价"
          type="textarea"
          placeholder="请输入价格"
        />
        <van-field
          v-model="form.price"
          :required="true"
          rows="1"
          autosize
          label="优惠价"
          type="textarea"
          placeholder="请输入价格"
        />
        <van-field
          v-model="form.sort"
          :required="true"
          rows="1"
          autosize
          label="排序"
          type="textarea"
          placeholder="请输入排序"
        />
        <van-field
          v-model="form.stock"
          :required="true"
          rows="1"
          autosize
          label="库存"
          type="textarea"
          placeholder="请输入库存量"
        />
        <van-cell :required="true" title="分类" is-link :value="value" @click="open" />
        <van-popup v-model="show" position="bottom" :style="{ height: '300px' }">
          <van-picker
            show-toolbar
            title="菜品分类"
            :columns="list"
            :default-index="index"
            value-key="name"
            @cancel="onCancel"
            @confirm="onConfirm"
          />
        </van-popup>
      </van-cell-group>
    </div>
    <div class="remarks">
      <div class="box">
        <van-checkbox v-model="checked" shape="square"></van-checkbox>
      </div>
      <div class="remarks-info">商家承诺：我方郑重承诺，严格遵守平台使用要求，并确保提供所有信息的真实性。</div>
    </div>
    <div class="footer" @click="submit">保存</div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>