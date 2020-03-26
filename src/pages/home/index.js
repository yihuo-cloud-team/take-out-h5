import config from '../../plugins/config'
import Map from '../../plugins/lib/Map'
import wxApis from './wxApis'


export default {
  name: 'home',
  data() {
    return {
      list: [],
      x: 0,
      y: 0,
      show: false,
      finished: false,
      loading: false,
      page: 1,
      apis: wxApis,
      shadow: 0
    };
  },
  methods: {
    // 用于初始化一些数据
    async init() {
      this.geolocation();
      this.wxConfig();
    },
    async wxConfig() {
      const res = await this.$http.post('/jdk/sign', {
        apis: this.apis,
        url: "https://h5.take-out.yihuo-cloud.com" + this.$route.fullPath
      });
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.app_id, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名z
        jsApiList: res.jsApiList // 必填，需要使用的JS接口列表
      });

      //  朋友圈分享
      wx.ready(() => { //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: '逐天外卖', // 分享标题
          link: 'https://h5.take-out.yihuo-cloud.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://api.take-out.yihuo-cloud.com/public/files/20200202/202002020250332716.jpg', // 分享图标
          success() {
            // 设置成功
          }
        });
        wx.updateAppMessageShareData({
          title: '逐天外卖', // 分享标题
          desc: '', // 分享描述
          link: 'https://h5.take-out.yihuo-cloud.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://api.take-out.yihuo-cloud.com/public/files/20200202/202002020250332716.jpg', // 分享图标
          success() {
            // 设置成功

          }
        })
      });

    },
    // 定位
    async geolocation() {

      //定位失败处理函数
      let fail = () => {
        this.$notify({
          message: '定位失败！请授权！'
        });
        this.show = true;
        this.httpStoreList();
      };

      // 打开注释可模拟定位失败
      // fail();
      // return;

      const map = new Map();
      // 注册插件
      await map.plugin('AMap.Geolocation');
      // 注册定位插件
      map.registerGeolocation();
      try {
        // 获取定位，模式：超级定位
        const result = await map.geolocation();
        // 拿到定位
        this.x = result.position.lng;
        this.y = result.position.lat;
        // 获取列表
        this.httpStoreList();
        return
      } catch (error) {
        // 报错，向下执行，尝试ip定位

      }

      // 尝试IP定位
      try {
        // 获取定位，模式：ip
        const result = await map.geolocation('ip');
        this.x = result.center[0];
        this.y = result.center[1];
        // 获取列表
        this.httpStoreList();
        // this.$notify({
        //   message: '定位失败~已切换ip定位~',
        //   type: "warning"
        // });
        return;
      } catch (error) {

      }
      // 定位失败
      fail();
    },
    async httpStoreList() {
      this.loading = true;
      const res = await this.$http.post('/v2/store/list', {
        // x: this.y,
        // y: this.x,
        x: 31.00674,
        y: 121.235348,
        page: this.page,
        page_size: 10
      })
      if (res.code > 0) {
        this.list = [...this.list, ...res.data];
        this.page++;
      } else {
        this.finished = true;
      }
      this.loading = false;
      this.page++;
    },
    scroll(e) {
      let s = document.getElementById('home').scrollTop
      if (s > 30) {
        this.shadow = 0.3
      } else {
        this.shadow = 0
      }
    }

  },
  // 计算属性
  computed: {},
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {
  },
  // 在实例创建完成后被立即调用
  created() { },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() {

  },
  // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {

    document.getElementById('home').addEventListener('scroll', this.scroll, false);


    this.$nextTick(() => {
      this.init();
    });

  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
  beforeUpdate() { },
  // keep-alive 组件激活时调用。
  activated() { },
  // keep-alive 组件停用时调用。
  deactivated() { },
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() {
    document.getElementById('home').removeEventListener("scroll", this.scroll, false);
  },
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
