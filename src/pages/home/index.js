export default {
  name: 'home',
  data() {
    return {
      goodsList: [],
      orderList: [],
      snapshot: [],
      total: 0,
      query: {
        page_size: 4,
        page: 1,
        is_up: '',
        title: '',
        type: 1,
        app_id: "",
      },

      info: {
        order: 0,
        tprice: 0,
        yprice: 0
      },
      storeInfo: {}
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {
      const goodsList = await this.$http.post('/goods/list', this.query);
      if (goodsList.code >= 0) {
        goodsList.data.forEach(el=>{
          el.goods_head_list =el.goods_head_list.map(item=>this.$getUrl(item))
        })
    
        this.total = goodsList.total,

          this.goodsList = goodsList.data
      };
      const orderList = await this.$http.post('/order/list', this.query);
      if (orderList.code >= 0) {
        this.total = orderList.total,
          this.orderList = orderList.data
      };
      const res = await this.$http.post('/store/data/total', {});
      if (res.code >= 0) {
        this.info = res.data
      };
      const res1 = await this.$http.post('/store/info', {});
      var week = []
      
      if (res1.code >= 0) {
        this.storeInfo = res1.data;
      };
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
