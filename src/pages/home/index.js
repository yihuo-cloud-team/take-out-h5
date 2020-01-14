const map = new AMap.Map('container', {
  resizeEnable: true
});
export default {
  name: 'home',
  data() {
    return {
      list: [],
      x: '',
      y: '',
      show: false,
      finished: false,
      loading: false,
      page: 1
    };
  },
  methods: {
    // 用于初始化一些数据
    async init() {
      this.update();

    },
    // 用于更新一些数据
    async update() {
      AMap.plugin('AMap.Geolocation', () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(async (status, result) => {
          if (status == 'complete') {
            this.CurrentAddress = result.addressComponent;
            this.addressKeyword = result.addressComponent.street + result.addressComponent.streetNumber;
            this.x = result.position.lng;
            this.y = result.position.lat;
            this.areaval = result.addressComponent.adcode;
            this.addresstitle = result.addressComponent.province;
            this.storeList();
          } else {
            this.$toast("无法获取位置信息，请授权");
            this.show = true;
                   this.storeList();
          }
        });
      });
    },
   async storeList() {
      this.loading = true;
      const res = await this.$http.post('/store/list', {
        // x: this.y,
        // y: this.x,
        x: 31.00674,
        y: 121.235348,
        page: this.page,
        page_size: 10
      })
      if (res.code > 0) {
        this.loading = false;
        this.list = [...this.list, ...res.data];
      } else {
        this.finished = true;
      }
    },
    loadMore() {
      this.page = ++this.page;
      this.storeList();
    },
    distance(la1, lo1, la2, lo2) {
      var La1 = la1 * Math.PI / 180.0;
      var La2 = la2 * Math.PI / 180.0;
      var La3 = La1 - La2;
      var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      s = s.toFixed(2);
      return s;
    },
    tiaozhuan(item) {
      this.$router.push(`/goodsList?store_id=${item.store_id}&&domain_id=${item.domain_id}`)
    },


  },
  // 计算属性
  computed: {},
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {},
  // 在实例创建完成后被立即调用
  created() {},
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() {},
  // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {
    this.init();
    this.$nextTick(() => {});


  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
  beforeUpdate() {},
  // keep-alive 组件激活时调用。
  activated() {},
  // keep-alive 组件停用时调用。
  deactivated() {},
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() {},
  //Vue 实例销毁后调用。
  destroyed() {},
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured() {},
  // 包含 Vue 实例可用指令的哈希表。
  directives: {},
  // 一个对象，键是需要观察的表达式，值是对应回调函数。
  watch: {},
  // 组件列表
  components: {},
};
