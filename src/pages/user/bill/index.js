export default {
  name: 'bill',
  layout:"sub",
  data() {
    return {
      form: {
        type: "",
        page: 1,
        page_size: 10,
        times: [new Date(new Date().getFullYear(), new Date().getMonth(), 1).Format('yyyy-MM-dd'), new Date().Format('yyyy-MM-dd')],
      },
      list: [

      ],
      loading: false,
      finished: false,
      show: false,
      option1: [{
          text: '全部',
          value: ""
        },
        {
          text: '收入',
          value: 1
        },
        {
          text: '支出',
          value: 0
        }
      ],
      currentDate: new Date()
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {
      try {
        this.loading = true;
        const res = await this.$http.post('budget/list', this.form);
        if (res.code > 0) {
          this.list = [...this.list, ...res.data]
          this.loading = false
        } else {
          this.finished = true
        }
      } catch (error) {

      }
    },
    showPopup() {
      this.show = true
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;

    },
    loadMore() {
      this.finished = false
      this.form.page = ++this.form.page
      this.update()
    },
    select(e) {
      this.form.type = e;
      this.list = []
      this.form.page =1;
      this.update();
    },
    start(e) {
      this.list = []
      this.form.page =1;
      this.form.times[0] = e.Format('yyyy-MM-dd');
      this.currentDate = e;
      this.show = false;
      var monthEndDate = new Date(e.getFullYear(), e.getMonth() + 1, 0).Format('yyyy-MM-dd');
      this.form.times[1] = monthEndDate;
      this.update();
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
  watch: {

  },
  // 组件列表
  components: {},
};
