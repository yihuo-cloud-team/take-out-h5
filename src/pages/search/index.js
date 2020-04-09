import Map from '../../plugins/lib/Map'

export default {
  name: 'search',
  layout: "sub",
  data() {
    return {
      name: '',
      list: [],
      title: "搜索",
      form: {
        x: 0,
        y: 0,
        orderBy: "",
        page: 1,
        page_size: 3,
        name: "",
        store_class_id: ''
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
        name: "距离优先"
      },
      {
        name: "销量优先"
      },
      ]
    };
  },
  head() {
    return {
      title: this.title
    }
  },
  methods: {
    // 用于初始化一些数据
    init() {
      if (this.$route.query.id) {
        this.form.store_class_id = this.$route.query.id
        this.title = this.$route.query.name
      }
      this.geolocation();
    },
    // 用于更新一些数据

    select(index) {
      this.index = index
      this.bindex = index;

    },


    // 定位
    async geolocation() {

      //定位失败处理函数
      let fail = () => {
        this.$notify({
          message: '定位失败！请授权！'
        });
        this.show = true;
        this.httpStoreList();
      };

      // 打开注释可模拟定位失败
      // fail();
      // return;

      const map = new Map();
      // 注册插件
      await map.plugin('AMap.Geolocation');
      // 注册定位插件
      map.registerGeolocation();
      try {
        // 获取定位，模式：超级定位
        const result = await map.geolocation();
        // 拿到定位
        this.x = result.position.lng;
        this.y = result.position.lat;
        // 获取列表
        this.httpStoreList();
        return
      } catch (error) {
        // 报错，向下执行，尝试ip定位

      }

      // 尝试IP定位
      try {
        // 获取定位，模式：ip
        const result = await map.geolocation('ip');
        this.x = result.center[0];
        this.y = result.center[1];
        // 获取列表
        this.httpStoreList();
        this.$notify({
          message: '定位失败~已切换ip定位~',
          type: "warning"
        });
        return;
      } catch (error) {

      }
      // 定位失败
      fail();
    },
    async httpStoreList() {
      this.loading = true;
      const res = await this.$http.post('/v2/store/list', this.form)
      if (res.code > 0) {
        this.list = [...this.list, ...res.data];
        this.form.page++;
      } else {
        this.finished = true;
      }
      this.loading = false;

    },
    scroll(e) {
      let s = document.getElementById('search').scrollTop
      if (s > 30) {
        this.shadow = 0.3
      } else {
        this.shadow = 0
      }
    },
    tiaozhuan(item) {
      this.$router.push(`/goodsList?store_id=${item.store_id}&distance=${item.distance}`)
    },
    async search() {
      this.form.page = 1;
      this.finished = false;
      this.list = [];
      this.httpStoreList();
    },

  },
  // 计算属性
  computed: {

  },
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {

  },
  // 在实例创建完成后被立即调用
  created() { },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() { },
  // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {
    this.init();
    this.$nextTick(() => { });
  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
  beforeUpdate() { },
  // keep-alive 组件激活时调用。
  activated() { },
  // keep-alive 组件停用时调用。
  deactivated() { },
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() { },
  //Vue 实例销毁后调用。
  destroyed() { },
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured() { },
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
      this.httpStoreList();


    }
  },
  // 组件列表
  components: {},
};
