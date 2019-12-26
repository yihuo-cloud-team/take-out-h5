export default {
  name: 'list',
  data() {
    return {
      active: '',
      loading: false,
      finished: false,
      total: 0,
      query: {
        app_id: '',
        is_up: '',
        page: 1,
        page_size: 10,
        store_id: 'S_WLs3pkrBJu5fYJ',
        title: '',
        type: 1,
        state: ''
      },
      list: []
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      if (!this.isAdd) {
        this.active = parseFloat(this.$route.query.state);
        this.query.state = this.active;
        return false;
      }
        this.update();
    },
    // 用于更新一些数据
    async update() {
      try {
        this.loading = true
        const res = await this.$http.post('/order/list', this.query);
        if (res.code > 0) {
          this.loading = false
          this.list = [...this.list, ...res.data]
          this.total = res.total
          return false
        } 
        this.finished = true;
      } catch (error) {}
    },
    LoadMore() {
      this.query.page = ++this.query.page
      this.update();
    }
  },
  // 计算属性
  computed: {
    isAdd() {
      return typeof this.$route.query['state'] == 'undefined'
    }
  },
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
  watch: {
    active(newval) {
      this.query.state = newval
      this.query.page = 1
      this.finished = false
      this.list = []
      this.total = 0
      this.update()
    }
  },
  // 组件列表
  components: {},
};
