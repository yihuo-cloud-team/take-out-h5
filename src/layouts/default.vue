<template>
  <div class="default">
    <nuxt class="view-body" keep-alive />
    <van-tabbar route v-model="active" active-color="#FFC700" :fixed="false">
      <van-tabbar-item replace to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/order/list" icon="orders-o">订单</van-tabbar-item>
      <van-tabbar-item replace to="/dynamic/list" icon="browsing-history-o">发现</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  layout: "root",
  data() {
    return {
      active: 0
      // url: localStorage.location
    };
  },
  mounted() {},
  methods: {
    signOut() {
      localStorage.clear();
      this.$store.commit("user/set", null);
      this.$store.commit("power/set", []);
      this.$router.replace("/login");
    }
  },

  computed: {},
  watch: {
    $route(to) {},
    active(v) {}
  }
};
</script>
<style lang="scss" scoped>
@import "default.scss";
</style>
