<template>
  <div id="text-card">
    <div class="box">
      <div class="left">
        <img class="img" :src="$getUrl(img)" alt />
      </div>
      <div class="center">
        <div class="center-top">{{title}}</div>
        <div class="center-footer">
          <div class="left">X{{select_value}}</div>
          <div class="right">
            <div>
              <span style="color:grey;font-size:12px">原价{{oldPrice}}</span>
              优惠价 {{price}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./imgTextCard.js"></script>
<style lang="scss" scoped>
@import "imgTextCard.scss";
</style>