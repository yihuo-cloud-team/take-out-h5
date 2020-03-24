const map = new AMap.Map('container', {
  resizeEnable: true
});
export default {
  name: 'home',
  data() {
    return {
      name: '',
      list: [],
      x: 0,
      y: 0,
      show: false,
      finished: false,
      loading: false,
      page: 1,
      apis: [
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
      ]
    };
  },
  methods: {
    test() {
      alert(this.name)
    },
    // 用于初始化一些数据
    async init() {
      this.update();
      this.getInfo();
      // localStorage.jwt = 'eyJpdiI6IlQ2VUlQazNJNzhMeEFaVnBcL3M3T0h3PT0iLCJ2YWx1ZSI6IjZLV3FiVHJTdFVnNktaekE1bTZqZHFmQzVodnk3SWZaeUxzRFVZYXlKc2hiSVZya1dLOWdJRVdud1FoblhEWGo2NE5kd3U3UVN0WWVONEFoOGl5ZXdXNllKdGIrSTRwN1VPY010Q3FBSDk2WjI4QTVzTWlFeHRBVVwvM2tsVkcySlZXN1VIYTdZRnRmb3BkcDBPaW9MRmQ5RGQ3T3VwOG43dHl1WHRmbFBjdUp1UlpPMzRGQ2FhNDFGdlpvVENvc21xamF0N2FhUXVvUEhkSXZYbXFPalJwTm5mK1R5bXFPMm0wdEc2eTFIVzBWWHludm11c2JOQW5rd1wvZnlaK0JiVFQ3MW4rMmZPcWpPekhKc3NaU1lxcXZ0cU01UHdnVHdhbnRYUFRuZW1rU0ZcL1RLVjRcL2ZlTnBmVGs0eWgrZEF4TGRDUlF4U3k5WnM3UitpZ0g5TWpNMGdHWkI0NVMzdDZyWHpFWFA3eTA2ckdNUTVUTFVnd0wzeGN6Tm1uT082YjJhRU84Mjd6dG05a29uTnFRVU9Ldjhvc2FIb3lqWERcL0VSWjR3akZPN2JVMFd4QlJLNENiRUc2SDQzUlppZTNGSUpFTkY4TEVTRytLdU5KZjlkaThsM0ZuK0NaMWZpYWJYZjdJKzFuMVpteUdcL0hnaW9nd25TanZzeGdyTjVDMmFnTHF6bldZNWk4YzhVbndnVG1cL1dQSzd2NjZiNW5UeU41Ukx1R05zM1YyR0FMWU81NUdPTjF5R01FSzNhMmVYXC9nXC9jOFNpdHpGZUlsNkIyT3VGNU5VODhOcWlnRXU0Q0hlMnUzRFE1N3ZyalVCa2dTYzdqbHBDR2pENHdvWEVOWU8ybklXa1FPb1dxNHhaQmtaNVhUMUhlZm1VODJ5dVg2b3c3U25IVFFFdE9CSDA3ZVczXC9pbWtKZnNLcStWOTFkKzBWU2Z4bURvNDcyMCtiNW53MWc2K2hkQkZRb3ZWVlwvU084Zkt3b2tJa0N0VEFlVDRCVisrRFhZNDRpOEhzSHRkNkZmRlVIWVF0dWcxYkJwYmxjRkRKTjNzSTJTbkxMcEVNQmNyK2NuWGNaTk1QbTE0eGNCb05seDhlN1FFSDU2Y0pDUlE4MmJ0VEVFclp5Y1pKY2FCMnd3MEJyb20zRm42ZXVZdWwxZWRvSUJpQTVtVEpJMmhldFwvbDZ4QUxhN0k4SzJIWVlnYnBwdW93SHpoSmNkSTBrKzVyT0ZQd2wxeFo4ZWttaHEzUHI2dXNFOTh0Ris2WVdqMEIyNzVJU015S0QxQzF0VVlueVNaU1pUR3ZEd2Z3eDIwYm5uYUwwWlFvRk1DdU50cXVxUklYbG82YWh3b3VaWm1cL3p6OTJWeFdna1RVZ3hLQlJERHNDdGhMWTl6ZFdsSDRYWkpvRFpUc29vcWo3MjBDUUtGQzlpYjgxVXRoU1JnV0pXM3RcL2pNdEEzS28rdnZya1hhS3E4bTgyVzJKVWtlclVSMGRCYit1cWN0Ykx3VXR5alhzSkJHcm1DdTVvSDdHblhoa2xITTlIazVWZWZ5SGFyazJXNEpweGFBdnB6d3BLY0JxbFN3bjRlUXUwa2kwdEZvNEZ6eFl2UHpcL3VQXC9lakpVODM5WUVibDdTRzlBZmlrdUFGVzN3QXB0ZFRQTDFDUEJCQWtkVlZLOXI2b2pzTW9DbDVESWJ2OFBIM0J1Q1h6SlwvTHJzZTA3WXBjcUhyRnRVZlJteEZZVldERUxSUndKZThcL1wvNnZPb3c2RThIcllCbG9RQUlocG05dE9FdTBXQ3pYNVp1bkRvODVvNVlyT2tKWGJ1cGVkSjBcL1wvMWc9PSIsIm1hYyI6IjQ5YWRhNTQzYjkyMjY0NjQ2NTdkNmY3ODkyZjllMWFlNTk4ZTNjMmQzMDAzM2M4NzY0MWNmMGQxOWU0MzViYjYifQ==';
  
    },
    async getInfo() {
      const res = await this.$http.post('/jdk/sign', {
        apis: this.apis,
        url: "https://h5.take-out.yihuo-cloud.com" + this.$route.fullPath
      });
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx5bf6a90a691706d0', // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名z
        jsApiList: res.jsApiList// 必填，需要使用的JS接口列表
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
    // 用于更新一些数据
    async update() {
      AMap.plugin('AMap.Geolocation', () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(async (status, result) => {
          if (status == 'complete') {
            this.CurrentAddress = result.addressComponent;
            this.addressKeyword = result.addressComponent.street + result.addressComponent.streetNumber;
            this.x = result.position.lng;
            this.y = result.position.lat;
            this.areaval = result.addressComponent.adcode;
            this.addresstitle = result.addressComponent.province;
            this.storeList();
          } else {
            this.$toast("无法获取位置信息，请授权");
            this.show = true;
            this.storeList();
          }
        });
      });
    },
    async storeList() {
      this.loading = true;
      const res = await this.$http.post('/store/list', {
        x: this.y,
        y: this.x,
        // x: 31.00674,
        // y: 121.235348,  
        page: this.page,
        page_size: 10
      })
      if (res.code > 0) {
        this.loading = false;
        this.list = [...this.list, ...res.data];
      } else {
        this.finished = true;
      }
    },
    loadMore() {
      this.page = ++this.page;
      this.storeList();
    },
    distance(la1, lo1, la2, lo2) {
      var La1 = la1 * Math.PI / 180.0;
      var La2 = la2 * Math.PI / 180.0;
      var La3 = La1 - La2;
      var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      s = s.toFixed(2);
      return s;
    },
    tiaozhuan(item) {
      this.$router.push(`/goodsList?store_id=${item.store_id}&distance=${item.distance}`)
    },


  },
  // 计算属性
  computed: {},
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {
    juli(val) {
      return val / 1000
    }
  },
  // 在实例创建完成后被立即调用
  created() { },
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() { },
  // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {

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
