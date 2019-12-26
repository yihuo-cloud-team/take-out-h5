export default {
  name: 'kaidian',
  layout: "sub",
  data() {
    return {
      form: {
        fr_user_name: "", //法人姓名
        fr_wx_code: "", //法人微信
        enterprise_name: "", //企业名称
        enterprise_code: "", //企业代码信息
        qy_Business: "", //营业执照
        qy_licence: "", //食品经营许可证
        store_door_img: '', //门面照片
        store_in_img: '', //内部照片
        account_name: "", //公众号名称
        account_img: "", //公众号图片（平台设计）
        account_info: "", //公众号描述
        mini_name: "", //小程序名称
        account_join: "", //关联微信公众号（复用公众号）
        mini_img: "", //小程序图片（平台设计）
        mini_info: "", //小程序描述
        user_email: "", //管理员邮箱（管理员等同于法人）
        idcard_positive: "", //管理员身份证正面
        idcard_unpositive: "", //管理员身份证反面
        user_phone: "", //管理员手机号
        user_wx_code: "", //管理员微信号
      }
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {

    },
    async submit() {
      if (this.form.fr_user_name == "" 
        || this.form.fr_wx_code == ""
        || this.form.enterprise_name == "" 
        || this.form.enterprise_code == "" 
        || this.form.qy_Business == "" 
        || this.form.qy_licence == "" 
        || this.form.store_door_img == "" 
        || this.form.store_in_img == "" 
        || this.form.account_name == "" 
        || this.form.account_img == "" 
        || this.form.account_info == "" 
        || this.form.mini_name == "" 
        || this.form.account_join == "" 
        || this.form.mini_img == ""
        || this.form.mini_info == ""
        || this.form.user_email == ""
        || this.form.idcard_positive == ""
        || this.form.idcard_unpositive == ""
        || this.form.user_phone == ""
        || this.form.user_wx_code == ""){
            this.$toast("请填写完整的资料")
            return false
        }
        const res = await this.$http.post('/store/open', this.form);
      if (res.code >= 0) {
        this.$toast("添加成功")
        this.$router.push('/home')
      }
    }
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
