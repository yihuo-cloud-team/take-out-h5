export default {
  name: 'goodsList',
  layout: "sub",
  data() {
    return {
      goodsclass: [],
      classTree: [],
      active: 0,
      info: {},
      activeIndex: 0,
      tab: 0,
      totalPrice: 0,

    };
  },
  methods: {
    // 用于初始化一些数据
    async init() {

      await this.update();
      await this.httpGoods();
      await this.httpstore();
    },


    // 用于更新一些数据
    async update() {
      
      const time = await this.$http.post('/order/checkOpen', {
        store_id: this.$route.query.store_id
      });
      if (time.code == 0) {
        this.$toast(time.msg);
      }
      if (time.code == -1) {
        this.$toast(time.msg);
      }
      try {
        const res = await this.$http.post('/class/list', {
          store_id: this.$route.query.store_id
        });
        if (res.code >= 0) {
          let list = res.data;
          let classTree = list.map(el => ({
            id: el.id,
            name: el.name,
            child: []
          }));
          this.goodsclass = list;
          this.classTree = classTree;

          this.active = res.data[0].id;
        } else {
          this.goodsclass = [];
          this.active = '';
        }
      } catch (error) {}
    },
    async httpGoods() {
      try {
        const res = await this.$http.post('/goods/list', {
          store_id: this.$route.query.store_id
        });
        if (res.code < 0) return;
        const list = res.data;
        const classTree = this.classTree;

        list.forEach(el => {


          el.select_value = 0;
          el.shows = false;
          let classi = classTree.find(classItem => classItem.id == el.class_id);

          if (classi) {

            classi.child.push(el);

          }


        });


        this.classTree = classTree
      } catch (e) {

      }
    },
    async httpstore() {
      try {
        const res = await this.$http.post('/store/info', {
          store_id: this.$route.query.store_id
        });
        if (res.code >= 0) {
          this.info = res.data
        }
      } catch (error) {

      }
    },
    select(e) {
      this.active = e.id
    },
    xuan(item) {
      if (item.select_value == 0) {
        item.shows = false
      } else {
        item.shows = true
      }
    },
    submit() {
      //去支付
      // if (!this.$isLogin()) {
      //   this.$router.push('/pages/auth/auth');
      //   return;
      // }

      const classTree = this.classTree;
      let select = [];
      classTree.forEach(el => {
        let list = el.child.filter(el => el.select_value > 0);
        select = [...select, ...list];
      });
      if (select.length > 0) {
        // wx.setStorageSync('select', select);
        localStorage.setItem('select', JSON.stringify(select));
        this.$router.push(`/payInfo?store_id=${this.$route.query.store_id}`);
      } else {
        this.$toast("请至少选择一件商品");
      }
    },
    setTotal() {
      // let total = data.list.filter(el => el.select_value > 0).map(el => el.o_price * el.select_value).reduce((total, el) => total + el, 0);
      const classTree = this.classTree;
      let total = 0;
      let totalText = 0;
      classTree.forEach(el => {

        total += el.child.map(goods => goods.price * goods.select_value).reduce((total, el) => total + el, 0);
        totalText += el.child.map(goods => goods.select_value).reduce((total, el) => total + el, 0);
      });
      // this.setData({
      //   totalPrice: total.toFixed(2),
      //   totalText: totalText
      // });
      this.totalPrice = total.toFixed(2)
      this.totalText = totalText.toFixed(2)
    },
    router(info) {
      this.$router.push(`/qualification?store_id=${info.store_id}`)
    },
    ToQrcode(info) {
      this.$router.push(`/qrcode?store_id=${info.store_id}&&name=${info.name}`)
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
    this.$nextTick(() => {

    });
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
