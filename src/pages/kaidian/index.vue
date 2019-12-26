<template>
  <div id="kaidian">
    <el-card shadow="never">
      <div class="input-file">
        <van-cell-group>
          <van-field
            v-model="form.fr_user_name"
            :required="true"
            rows="1"
            autosize
            label="法人姓名"
            type="textarea"
            placeholder="请输入法人姓名"
          />
          <van-field
            v-model="form.fr_wx_code"
            :required="true"
            rows="1"
            autosize
            label="法人微信"
            type="textarea"
            placeholder="请输入法人微信"
          />
          <van-field
            v-model="form.enterprise_name"
            :required="true"
            rows="1"
            autosize
            label="企业名称"
            type="textarea"
            placeholder="请输入企业名称"
          />
          <van-field
            v-model="form.enterprise_code"
            :required="true"
            rows="1"
            autosize
            label="企业代码信息"
            type="textarea"
            placeholder="请输入企业代码信息"
          />

          <van-field
            v-model="form.account_name"
            :required="true"
            rows="1"
            autosize
            label="公众号名称"
            type="textarea"
            placeholder="请输入公众号名称"
          />

          <van-field
            v-model="form.account_info"
            :required="true"
            rows="1"
            autosize
            label="公众号描述"
            type="textarea"
            placeholder="请输入公众号描述"
          />
          <van-field
            v-model="form.mini_name"
            :required="true"
            rows="1"
            autosize
            label="小程序名称"
            type="textarea"
            placeholder="请输入小程序名称"
          />
          <van-field
            v-model="form.account_join"
            :required="true"
            rows="1"
            autosize
            label="关联微信公众号"
            type="textarea"
            placeholder="请输入关联微信公众号"
          />

          <van-field
            v-model="form.mini_info"
            :required="true"
            rows="1"
            autosize
            label="小程序描述"
            type="textarea"
            placeholder="请输入小程序描述"
          />
          <van-field
            v-model="form.user_email"
            :required="true"
            rows="1"
            autosize
            label="管理员邮箱"
            type="textarea"
            placeholder="请输入管理员邮箱"
          />

          <van-field
            v-model="form.user_phone"
            :required="true"
            rows="1"
            autosize
            label="管理员手机号"
            type="textarea"
            placeholder="请输入管理员手机号"
          />
          <van-field
            v-model="form.user_wx_code"
            :required="true"
            rows="1"
            autosize
            label="管理员微信号"
            type="textarea"
            placeholder="请输入管理员微信号"
          />
        </van-cell-group>
        <div class="box">
          <div class="left">管理员身份证正面</div>
          <div class="right">
            <div class="top">需拍出完整的管理员身份证正面</div>
            <div class="upload">
              <img class="img" v-if="form.idcard_positive" :src="$getUrl(form.idcard_positive)" alt />
              <ol-upload
                class="right"
                v-if="form.idcard_positive==''"
                v-model="form.idcard_positive"
              ></ol-upload>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="left">管理员身份证反面</div>
          <div class="right">
            <div class="top">请输入管理员身份证反面</div>
            <div class="upload">
              <img
                class="img"
                v-if="form.idcard_unpositive"
                :src="$getUrl(form.idcard_unpositive)"
                alt
              />
              <ol-upload
                class="right"
                v-if="form.idcard_unpositive==''"
                v-model="form.idcard_unpositive"
              ></ol-upload>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="left">营业执照</div>
          <div class="right">
            <div class="top">需拍出完整的营业执照</div>
            <div class="upload">
              <img class="img" v-if="form.qy_Business" :src="$getUrl(form.qy_Business)" alt />
              <ol-upload class="right" v-if="form.qy_Business==''" v-model="form.qy_Business"></ol-upload>
            </div>
          </div>
        </div>

        <div class="box">
          <div class="left">食品经营许可证</div>
          <div class="right">
            <div class="top">需拍出完整的食品经营许可证</div>
            <div class="upload">
              <img class="img" v-if="form.qy_licence" :src="$getUrl(form.qy_licence)" />
              <ol-upload class="right" v-if="form.qy_licence==''" v-model="form.qy_licence"></ol-upload>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="left">门面照片</div>
          <div class="right">
            <div class="top">需拍出完整的内部照片</div>
            <div class="upload">
              <img class="img" v-if="form.store_door_img" :src="$getUrl(form.store_door_img)" alt />
              <ol-upload class="right" v-if="form.store_door_img==''" v-model="form.store_door_img"></ol-upload>
            </div>
          </div>
        </div>
        <!-- 多图上传 -->
        <!-- <div class="box">
          <div class="left">门面照片</div>
          <div class="right">
            <div class="top">需拍出完整的门面照片</div>
            <div class="upload1">
              <img
                class="img"
                v-for="item in form.store_door_img"
                :key="item"
                :src="$getUrl(item)"
                alt
              />
              <ol-upload class="right" @success="url=>form.store_door_img.push(url)"></ol-upload>
            </div>
          </div>
        </div>-->
        <div class="box">
          <div class="left">内部照片</div>
          <div class="right">
            <div class="top">需拍出完整的内部照片</div>
            <div class="upload">
              <img class="img" v-if="form.store_in_img" :src="$getUrl(form.store_in_img)" alt />
              <ol-upload class="right" v-if="form.store_in_img==''" v-model="form.store_in_img"></ol-upload>
            </div>
          </div>
        </div>

        <div class="box">
          <div class="left">公众号图片</div>
          <div class="right">
            <div class="top">需拍出完整的公众号图片</div>
            <div class="upload">
              <img class="img" v-if="form.account_img" :src="$getUrl(form.account_img)" alt />
              <ol-upload class="right" v-if="form.account_img==''" v-model="form.account_img"></ol-upload>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="left">小程序图片</div>
          <div class="right">
            <div class="top">需拍出完整的小程序图片</div>
            <div class="upload">
              <img class="img" v-if="form.mini_img" :src="$getUrl(form.mini_img)" alt />
              <ol-upload class="right" v-if="form.mini_img==''" v-model="form.mini_img"></ol-upload>
            </div>
          </div>
        </div>
      </div>
      <div class="footer" @click="submit">保存</div>
    </el-card>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>