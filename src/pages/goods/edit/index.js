export default {
  name: 'edit',
  layout: 'sub',
  data() {
    return {
      checked: '',
      show: false,
      qie: false,
      form: {
        title: '', //商品名称
        sub_title: '', //副标题
        goods_head_list:[],
        o_price: '', //原价
        price: '', //优惠价
        stock: '', //库存
        class_id: '', //关联的分类
        is_up: 1, //是否上下架
        sort: 0,
        
      },
      value:"",
      list: [],
      totle: "",
      index: 0
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {

      if (!this.isAdd) {
        const res1 = await this.$http.post('/goods/info', {
          id: this.$route.query.id
        });
        if (res1.code >= 0) {
          this.form = res1.data;
        }
        const res = await this.$http.post('/class/list', {})
        if (res.code >= 0) {
          this.list = res.data;
          this.index = this.list.findIndex(el => this.form.class_id == el.id);
          this.value = this.list[this.index].name
        }
     
      } else {
        const res = await this.$http.post('/class/list', {})
        if (res.code >= 0) {
          this.list = res.data; 
        }
      }
    },
    open() {
      this.show = true
    },
    onConfirm(value) {
      this.value = value.name;
      this.show = false;
      this.form.class_id = value.id
    },
    onCancel() {
      this.show = false
    },
    async submit() {
      try {
        const res = await this.$http.post('/goods/save', this.form);
        if (res.code >= 0) {
          this.$toast("添加成功")
          this.$router.go(-1);
        }
      } catch (error) {
        return;
      }
    }
  },
  // 计算属性
  computed: {
    isAdd() {
      return typeof this.$route.query.id == 'undefined';
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
  watch: {},
  // 组件列表
  components: {},
};
