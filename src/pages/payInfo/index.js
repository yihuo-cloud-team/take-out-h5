export default {
  name: 'payInfo',
  layout: "sub",
  data() {
    return {
      list: [],
      address: [],
      message: "",
      show: false,
      addressInfo: {},
      remarks: "",
      address_id: "",
      store_id: "",

      showList: false,
      chosenCoupon: -1,
      couponList: [],
      coupons: [],
      disabledCoupons: [],
    };
  },
  computed: {
    total() {
      return this.list.map(el => el.select_value).reduce((total, el) => total + el, 0);
    },
    totalPrice() {
      let total = this.list.filter(el => el.select_value > 0).map(el => el.price * el.select_value).reduce((total, el) => total + el, 0);
      return total.toFixed(2);
    },
    oldPrice1() {
      let old = this.list.filter(el => el.select_value > 0).map(el => el.o_price * el.select_value).reduce((old, el) => old + el, 0);
      return old.toFixed(2);
    },
    youhui() {
      return parseFloat(this.oldPrice1 - this.totalPrice).toFixed(2);
    }

  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {
      this.list = JSON.parse(localStorage.getItem('select'));
      try {
        const res = await this.$http.post('/address/list', {});
        if (res.code >= 0) {
          this.address = res.data
          this.address.forEach((el) => {
            if (el.is_default == 1) {
              this.addressInfo = el
              return false
            }
          })
        }

        let params = new FormData(); //创建form对象
        const couponRes = await this.$http.post('/coupon/list', {});
        if (couponRes.code >= 0) {
          this.couponList = couponRes.data;
          console.log(this.couponList);
          this.couponList.forEach((_res, i) => {


// condition	满减条件	string
// startAt	卡有效开始时间 (时间戳, 单位秒)	number
// endAt	卡失效日期 (时间戳, 单位秒)	number
// description	描述信息，优惠券可用时展示	string
// reason	不可用原因，优惠券不可用时展示	string
// value	折扣券优惠金额，单位分	number
// valueDesc	折扣券优惠金额文案	string
// unitDesc	单位文案	string
            _res.startAt=_res.start_at;
            _res.endAt=new Date(_res.startAt).getDateStr(3);
            _res.value=Number(_res.value);
            _res.valueDesc=_res.value/100;
            _res.unitDesc='元';
            //store_id店铺

            //判断是否本店，时间，门槛







          })
        }
      } catch (error) {

      }
    },
    async submit() {
      if (!this.addressInfo.id) {
        this.$toast("请填写收货地址")
        return false
      }
      //提交订单设置缓存清空tabbar右上角数字
      let data = {
        address_id: this.addressInfo.id,
        goods: this.list.map(el => ({
          id: el.id,
          quantity: el.select_value,
          sku_id: ''
        })),
        buy_type: 'TAKE',
        remarks: this.remarks,
        store_id: this.$route.query.store_id
        // id:this.data.coupons.id,
        // price:this.data.coupons.price
      }
      const res = await this.$http.post('/order/create', data);

      /**调用接口获取支付参数 */
      if (res.code >= 0) {
        const payInfo = await this.$http.post('/order/getH5', {
          pay_id: res.data.pay_id
        });
        if (payInfo.code >= 0) {
          const order_id = res.data.order_id;
          this.$router.replace(`/order/info?order_id=${order_id}`);
        } else {
          this.$toast(res.msg);
        }

      } else {
        this.$toast(res.msg);
      }
    },
    async save(item) {
      item.is_default = 1
      const res = await this.$http.post('/address/save', item);
      if (res.code >= 0) {
        this.$toast("修改成功");
        this.update();
      } else {
        this.$toast(res.msg);
      }
    },
    del(item) {
      this.$dialog.confirm({
        message: '确认删除',
      }).then(async () => {
        const res = await this.$http.post('/address/del', {
          id: item.id
        });
        if (res.code >= 0) {
          this.$toast("删除成功");
          this.update();
        } else {
          this.$toast(res.msg);
        }
      }).catch(() => {

      })
    },
    change(item) {
      this.show = false;
      this.addressInfo = item
    },
    couponChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
  },
  // 计算属性
  // computed: {},
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {},
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
  watch: {},
  // 组件列表
  components: {},
};
