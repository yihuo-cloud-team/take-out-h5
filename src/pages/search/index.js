const map = new AMap.Map('container', {
  resizeEnable: true
});
export default {
  name: 'search',
  layout: "sub",
  data() {
    return {
      name: '',
      list: [],

      form: {
        x: 0,
        y: 0,
        orderBy: "",
        page: 1,
        page_size: 10
      },
      show: false,
      finished: false,
      loading: false,
      index: 0,
      bindex: 0,
      paixuList: [{
          name: "综合排序"
        },
        {
          name: "距离最近"
        },
        {
          name: "销量最高"
        },
      ]
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
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
    select(index) {
      this.index = index
      this.bindex = index;

    },
    async storeList() {
      if (this.finished) return;
      this.loading = true;
      const res = await this.$http.post('/v2/store/list', this.form)
      if (res.code > 0) {
        this.list = [...this.list, ...res.data];
      }
      if (this.list.length >= res.total) {
        this.finished = true;
      }
      this.loading = false;
      this.form.page++;
    },
    tiaozhuan(item) {
      this.$router.push(`/goodsList?store_id=${item.store_id}&distance=${item.distance}`)
    },
    async search() {

    },

  },
  // 计算属性
  computed: {

  },
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {
    juli(val) {
      return (val / 1000).toFixed(1)
    }
  },
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
  watch: {
    index(newspass) {
      if (newspass == 0) {
        this.form.orderBy = '';
      } else if (newspass == 1) {
        this.form.orderBy = 'distance';
      } else if (newspass == 2) {
        this.form.orderBy = 'order_total';
      }
      this.list = [];
      this.finished = false;
      this.form.page = 1;
      this.storeList();


    }
  },
  // 组件列表
  components: {},
};
