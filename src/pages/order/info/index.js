export default {
  name: 'info',
  layout: 'sub',
  data() {
    return {
      info: {},
      state: '',
      location: [],
      marker1: {},
      marker2: {},
      time: "",
      markerList: [],
    };
  },
  methods: {
    // 用于初始化一些数据
    async init() {
      await this.update();


    },
    // 用于更新一些数据
    async update() {
      const res = await this.$http.post('/order/info', {
        order_id: this.$route.query.order_id
      });
      if (res.code >= 0) {
        this.info = res.data;
        this.state = res.state;
      }

      await this.map(res.data);

    },
    async pay() {
      const payInfo = await this.$http.post('/order/getMini', {
        pay_id: this.info.pay_id
      });
      if (payInfo.code >= 0) {

        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": payInfo.data.appId, //公众号名称，由商户传入     
            "timeStamp": payInfo.data.timestamp, //时间戳，自1970年以来的秒数     
            "nonceStr": payInfo.data.nonceStr, //随机串     
            "package": payInfo.data.package,
            "signType": payInfo.data.signType, //微信签名方式：     
            "paySign": payInfo.data.paySign //微信签名 
          },
          (res) => {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              this.$toast("支付成功");
              this.$router.replace('/order/list');
            }
            if (res.err_msg == "get_brand_wcpay_request:cancel") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              this.$toast("取消支付");
            }
            if (res.err_msg == "get_brand_wcpay_request:fail") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              this.$toast("支付失败");
            }
          }
        );
      }

    },
    async map(info) {
      
      if (info.state == 3 || info.state == 2) {
        const res = await this.$http.post('/order/dadaMap', {
          store_id: this.info.store_id,
          order_id: this.info.order_id,
        })
        var icon = new AMap.Icon({
          size: new AMap.Size(40, 50),    // 图标尺寸
          image: 'https://api.take-out.yihuo-cloud.com/public/files/20200109/202001090420036164.jpg', // Icon的图像
    
      });
        if (res.code >= 0) {
          this.marker2 = new AMap.Marker({
            position: new AMap.LngLat(res.data.result.supplierLng, res.data.result.supplierLat),
            icon:icon
          });
        }
      }

      let map = new AMap.Map('container', {
        zoom: 15, //级别
        resizeEnable: true
      });
      var icon = new AMap.Icon({
        size: new AMap.Size(40, 50),    // 图标尺寸
        image: 'https://api.take-out.yihuo-cloud.com/public/files/20200109/202001090412575989.png', // Icon的图像
  
    });
      this.marker1 = new AMap.Marker({
        position: new AMap.LngLat(info.addressInfo.y, info.addressInfo.x),
        icon:icon
      });


      AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
          zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        })
        map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status == 'complete') {
            // this.CurrentAddress = result.addressComponent;
            // this.addressKeyword = result.addressComponent.street + result.addressComponent.streetNumber;
            this.location[0] = result.position.lat;
            this.location[1] = result.position.lng;
            map.setCenter([result.position.lat, result.position.lng]);
            // this.areaval = result.addressComponent.adcode;
            // this.addresstitle = result.addressComponent.province;
          } else {

          }
        });



      })
      let markerList = [this.marker1, this.marker2];

      if (info.state == 3 || info.state == 2) {
        this.time = setInterval(() => {
          this.dada();
        }, 3000)
      };




      map.add(markerList);
    },
    async closeOrder(){
      
      const res = await this.$http.post('/order/closeOrder', {
        order_id: this.$route.query.order_id
      })
      if(res.code>=0){
    
        this.$toast(res.msg);
      }else{
        this.$toast(res.msg);
      }
    },
    async dada() {
      const res = await this.$http.post('/order/dadaMap', {
        store_id: this.info.store_id,
        order_id: this.$route.query.order_id
      })
      if (res.code >= 0) {
        this.marker2 = new AMap.Marker({
          position: new AMap.LngLat(res.data.result.supplierLng, res.data.result.supplierLat),

        });

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
  
    this.$nextTick(() => {
      this.init();
    });
  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
  beforeUpdate() {},
  // keep-alive 组件激活时调用。
  activated() {},
  // keep-alive 组件停用时调用。
  deactivated() {},
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() {
    clearInterval(this.time)
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
