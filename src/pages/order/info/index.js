export default {
  name: 'info',
  data() {
    return {
      info: {},
      state: '',
      location: [],
      marker2: {},
      time:""
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
        if (this.state==3 || this.state ==2) {
        this.time = setInterval(() => {
          this.dada();
        }, 5000)
      };
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
    pay() {

    },
    map(info) {
      let map = new AMap.Map('container', {
        zoom: 11, //级别
        viewMode: '3D' //使用3D视图
      });
      let marker1 = new AMap.Marker({
        position: new AMap.LngLat(info.addressInfo.y, info.addressInfo.x),
      });
   
      let markerList = [marker1, this.marke2];
      map.add(markerList);
      AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })
        map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status == 'complete') {
            // this.CurrentAddress = result.addressComponent;
            // this.addressKeyword = result.addressComponent.street + result.addressComponent.streetNumber;
            this.location[0] = result.position.lat;
            this.location[1] = result.position.lng;
            // this.areaval = result.addressComponent.adcode;
            // this.addresstitle = result.addressComponent.province;
          } else {
            console.log(result);
          }
        });
        // AMap.event.addListener(geolocation, 'complete', onComplete)
        // AMap.event.addListener(geolocation, 'error', onError)

        // function onComplete (data) {
        //     this.setCenter()
        // }


      })
    },
   async dada() {
      const res = await this.$http.post('/order/dadaMap', {
        store_id: this.info.store_id,
        order_id: this.$route.query.order_id
      })
      if(res.code>=0){
        // this.marker2 = new AMap.Marker({
        //     position: new AMap.LngLat(info.addressInfo.y, info.addressInfo.x),
        //   });
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
