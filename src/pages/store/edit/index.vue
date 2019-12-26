<template>
  <div id="edit">
    <div class="store">
      <div class="store-image">
        <ol-upload v-model="form.logo">
          <img class="img" :src="$getUrl(form.logo)" />
        </ol-upload>
      </div>
      <div class="store-name">{{form.name}}</div>
    </div>
    <div class="store-info">
      <div class="info-title">门店信息</div>
      <div class="message">
        <van-cell-group>
          <van-field
            v-model="form.name"
            required
            clearable
            label="门店标题"
            placeholder
            @click-right-icon="$toast('question')"
          />
          <van-field
            v-model="form.info"
            required
            clearable
            label="门店描述"
            placeholder
            @click-right-icon="$toast('question')"
          />
           <van-field
            v-model="form.subsidy"
            required
            clearable
            label="门店补贴"
            placeholder
            @click-right-icon="$toast('question')"
          />
          <van-field v-model="form.store_class" label="门店分类" placeholder="快餐简餐" required />
          <van-field v-model="form.phone" label="联系电话" placeholder required />
        </van-cell-group>
      </div>
    </div>
    <!-- 多图上传 -->
    <div class="store-img">
      <div class="left">logo背景图</div>
      <div class="right">
        <div class="upload">
          <img class="img" v-if="form.store_bg" :src="$getUrl(form.store_bg)" alt />
          <ol-upload class="right" v-model="form.store_bg"></ol-upload>
        </div>
      </div>
    </div>
    <div class="store-img">
      <div class="left">商家图片</div>
      <div class="right">
        <div class="upload">
          <img
            class="img"
            v-for="(item,index) in form.store_img"
            :key="index"
            :src="$getUrl(item)"
            @click="form.store_img.splice(index,1)"
            alt
          />
          <ol-upload
            class="shangchuan"
            v-if="form.store_img.length<9"
            @success="url=>form.store_img.push(url)"
          ></ol-upload>
        </div>
      </div>
    </div>
    <div class="store-type">
      <div class="type-title">营业状态</div>
      <div class="type">
        <van-cell-group>
          <van-switch-cell v-model="form.state" :active-value="1" :inactive-value="2" title="营业状态" />
        </van-cell-group>
      </div>
    </div>
    <div class="store-date">
      <div class="date-title">营业时间</div>
      <div class="week">
        <!-- <div class="checkb">
          <div
            v-for="we in week"
            :key="we"
            @click="push(we)"
            :class="['box',{'active':form.week.indexOf(we)>=0}]"
          >{{we}}</div>
        </div> -->

        <van-checkbox-group v-model="form.week" ref="checkboxGroup" class="checkb">
          <van-checkbox :name="item" v-for="item in week" :key="item">
            <div slot="icon" slot-scope="props" :class="['box',{'active':props.checked}]">{{item}}</div>
          </van-checkbox>
        </van-checkbox-group>
      </div>
      <div class="date">
        <div class="left" @click="showPopup">
          <div class="footer-left">开始时间</div>
          <div class="footer-right" style="background-color:#AAC4FD">{{form.start_time}}</div>
        </div>

        <van-popup v-model="show" position="bottom" :style="{height:'200px'}">
          <van-datetime-picker
            v-model="start_time"
            type="time"
            :filter="filter"
            @confirm="start"
            @cancel="show=false"
          />
        </van-popup>
        <div class="left" @click="showPopup1">
          <div class="footer-left">结束时间</div>
          <div class="footer-right" style="background-color:#F885A6">{{form.end_time}}</div>
        </div>
        <van-popup v-model="show1" position="bottom" :style="{height:'200px'}">
          <van-datetime-picker
            v-model="end_time"
            type="time"
            :filter="filter"
            @confirm="end"
            @cancel="show=false"
          />
        </van-popup>
      </div>
    </div>
    <div class="store-tag">
      <div class="tag-title">门店标签</div>
      <van-field v-model="form.label" label="门店标签" placeholder="好吃的，好玩的" required />
    </div>
    <div class="footer" @click="submit">保存</div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>