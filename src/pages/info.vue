<template>
  <div>
    <h1 v-for="i in 20" :key="i">详情{{i}}</h1>
  </div>
</template>

<script>
export default {
  layout: "sub",
  mounted() {
    console.warn("info");
  }
};
</script>

<style>
</style>