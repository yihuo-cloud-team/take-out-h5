export default {
  name: 'open',
  layout: 'sub',
  data() {
    return {
      form: {
        mobile: '', //商户手机号
        city_name: '', //商户城市名称
        enterprise_name: '', //企业全称
        enterprise_address: '', //企业地址
        contact_name: '', //联系人姓名
        contact_phone: '', //联系人电话
        email: '', //邮箱地址
        // is_up: ''//是否上下架
      },
      is_dada: "",
      money: 0.00,
      yue: 0,
      parserdata: null
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {
      const res = await this.$http.post('/domain/info', {});
      if (res.code >= 0) {
        this.is_dada = res.data.domain_info.is_dada;
        this.parserdata = res.data.domain_info
   
      }

      const res1 = await this.$http.post('/domain/dadaBalance', {});
      if (res1.code >= 0) {

        this.yue = res1.data.deliverBalance;
      }
    },
    async submit() {
      // try {
      //     await this.$refs['form'].validate();
      // } catch (error) {
      //     return;
      // }

      try {
        const res = await this.$http.post('/domain/addDada', this.form);
        if (res.code >= 0) {
          if (this.isAdd) {
            await this.$alert(`操作成功！`, '成功', {
              showClose: false,
              type: 'success'
            });
          } else {
            this.$message.success('保存成功~');
          }
          this.$router.go(-1);
        }
      } catch (error) {
        return;
      }



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
