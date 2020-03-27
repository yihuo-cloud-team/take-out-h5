export default {
  name: 'list',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      page_size: 10,
      show: false,
      index: 0,
      images: [],
      down: false,
      content:"",
      hidden:false,
      dynamic_id:""
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {
      if (this.finished) return;
      this.loading = true;
      const res = await this.$http.post('/dynamic/list', {
        page: this.page,
        page_size: this.page_size,
      });
      if (res.code > 0) {
        res.data.forEach(res => {
          if (res.img_list.length == 0) return;
          res.img_list = res.img_list.split(',');
          res.check = false
        });
        this.list = [...this.list, ...res.data];
        console.log(this.list)
      }
      if (this.list.length >= res.total) {
        this.finished = true;
      }
      this.loading = false;
      this.page++;
    },
    showImagePreview(item, index) {

      this.index = index;
      this.show = true;

      var img_list = item.img_list.map((res) => {

        return this.$getUrl(res)
      })
      this.images = img_list;

    },
    onChange(index) {

      this.index = index;
    },
    shows(item, index) {
      if (this.index != index) {
        this.list.forEach((res) => {
          res.check = false;
        })
      }
      if (item.check == true) {
        item.check = false
      } else {
        item.check = true
      }
      this.index = index
    },
    async dianzan(id) {
      if (this.down) {
        return false;
      }
      this.down = true
      const res = await this.$http.post('/dynamic/star', {
        dynamic_id: id
      });
      if (res.code >= 0) {
        this.$toast('操作成功');

      } else {
        this.$toast(res.msg);
      }
      this.down = false
    },
   async comment(id) {
      const res = await this.$http.post('/dynamic/evaluate', {
        dynamic_id: this.dynamic_id,
        content: this.content
      });
      if(res.code>=0){
        this.content='';
        this.finished = false;
      }else{
        this.$toast(res.msg);
      }
      this.hidden = false;
    },
    tiaozhuan(id){
      this.dynamic_id = id
      this.hidden =true;

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
    // this.init();
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
