<template>
  <div id="text-card">
    <div class="box">
      <div class="left">
        <img class="img" :src="$getUrl(img)" alt />
      </div>
      <div class="center">
        <div class="center-top">{{title}}</div>
        <div class="center-footer">X{{select_value}}</div>
      </div>
      <div class="right">
        <div>{{price}}</div>
      </div>
    </div>
  </div>
</template>
<script src="./imgTextCard.js"></script>
<style lang="scss" scoped>
@import "imgTextCard.scss";
</style>