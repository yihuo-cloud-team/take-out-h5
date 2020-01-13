export default {
  name: 'edit',
  layout: "sub",
  data() {
    return {
      show: false,
      shows: 0,
      isEdit: false,
      form: {
        tag: '', //标签
        contacts: '', //联系人
        gender: 1, //性别
        phone: '', //手机号
        address_num: '', //具体门牌号
        address: '', //收货地址
        x:"",
        y:""
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
      if (!this.isAdd) {
        this.isEdit = true;
        const res = await this.$http.post('/address/info', {
          id: this.$route.query.id
        });
        if (res.code >= 0) {
          this.form = res.data;
        }

      }

      if(localStorage.addressinfo){
        this.form.address = JSON.parse(localStorage.addressinfo).name;
        this.form.x = JSON.parse(localStorage.addressinfo).x;
        this.form.y = JSON.parse(localStorage.addressinfo).y;
      }
      

    },
    del() {
      this.$dialog.confirm({
        message: '确认删除',
      }).then(async () => {
        const res = await this.$http.post('/address/del', {
          id: this.$route.query.id
        });
        if (res.code >= 0) {
          this.$toast("删除成功");
          this.$router.go(-1);
        } else {
          this.$toast(res.msg);
        }
      }).catch(() => {

      })
    },
    async save() {
      if (this.TagName == '') {
        this.$toast('未选择收货地址');
        return false;
      }
      if (this.form.contacts == '') {
        this.$toast('联系人姓名未填写');
        return false;
      }
      if (this.form.phone == '') {
        this.$toast('联系人手机号未填写');
        return false;
      }
      const res = await this.$http.post('/address/save', this.form);
      if (res.code >= 0) {
        this.$toast('添加成功');
        localStorage.addressinfo= '';
        this.$router.go(-1);
      } else {
        this.$toast(res.msg);
      }
    },
    select(e) {
      if (e == 1) {
        this.show = true;
        this.form.gender = 1;
      }
      if (e == 0) {
        this.show = false;
        this.form.gender = 0;
      }
    },
    select1(e) {
      if (e == '家') {
        this.shows = 1;
        this.form.tag = "家";
      }
      if (e == '公司') {
        this.shows = 2;
        this.form.tag = "公司";
      }
      if (e == '学校') {
        this.shows = 3;
        this.form.tag = "学校";
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
  beforeDestroy() {
    localStorage.addressinfo="";
  },
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
