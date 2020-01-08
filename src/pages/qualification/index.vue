<template>
  <div id="qualification">
   <div class="panel">
    <div class="title">商家从业资格</div>
    <div class="footer">
        <div class="left">
            <img @click="fangda" class="img"  :src="$getUrl(info.business)"/>
        </div>
        <div class="left">
            <img @click="fangda"  class="img"  :src="$getUrl(info.licence)"/>
        </div>
    </div>
</div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>