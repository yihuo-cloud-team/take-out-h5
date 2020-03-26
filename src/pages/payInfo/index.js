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
    lastPrice() {
      const coupon = this.coupons[this.chosenCoupon];
      if (coupon.type == 1) {
        return (this.totalPrice * Number(coupon.value_zen)).toFixed(2)
      }
      return (this.totalPrice - Number(coupon.value_zen)).toFixed(2)
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
      let _this = this;
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
            _res.startAt = _res.start_at;
            _res.condition_value = Number(_res.condition_value);
            _res.endAt = (new Date(_res.startAt).getDateStr(_res.startAt * 1000, 3)) / 1000;
            if (_res.type == 1) {
              _res.valueDesc = Number(_res.value_zen) * 10;
              _res.unitDesc = '折';
              _res.condition = '满' + _res.condition_value + '元\n打' + _res.valueDesc + _res.unitDesc;
            } else {
              _res.valueDesc = _res.value_zen;
              _res.unitDesc = '元';
              _res.condition = '满' + _res.condition_value + '元\n减' + _res.valueDesc + _res.unitDesc;
            }
            //判断是否本店，时间，门槛
            _res.reason = [];
            if (_res.store_id != this.$route.query.store_id) {
              _res.reason.push('非本店优惠券');
              _res.can = 1;
            }
            if (new Date() / 1000 < _res.startAt) {
              _res.reason.push('优惠券未到使用时间');
              _res.can = 1;
            }
            if (new Date() / 1000 > _res.endAt) {
              _res.reason.push('优惠券已过期');
              _res.can = 1;
            }
            if (_res.condition_value > _this.totalPrice) {
              _res.reason.push('未达到门槛');
              _res.can = 1;
            }
            if (_res.can == 1) {
              _res.reason = _res.reason.toString();
              _this.disabledCoupons.push(_res);
            } else {
              _this.coupons.push(_res);
            }
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
      if (this.chosenCoupon == -1) return
      const coupon = this.coupons[this.chosenCoupon];
      coupon.value = (this.totalPrice - this.lastPrice) * 100;

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
