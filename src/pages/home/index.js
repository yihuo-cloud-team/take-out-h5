const map = new AMap.Map('container', {
  resizeEnable: true
});
export default {
  name: 'home',
  data() {
    return {
      list: [],
      x: '',
      y: '',
      show: false,
      finished: false,
      loading: false,
      page: 1,
      apis : [
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
    // 用于初始化一些数据
    async init() {
      this.update();
      this.getInfo();
      localStorage.jwt = "eyJpdiI6IjhVSFVvSzZLOEdsR2NvbGFndjUzaHc9PSIsInZhbHVlIjoiM1wvejJzTFN1dDFheHdCOXhPRzlkVlIwSmRqc0IwTFJRVXNMMzBmNm4weUlLM1dnYzR2ZzB1azY2V3Q1aWdMbFkyTTJvMDROTjFlcDZXODRDTFFkUlUzOE1YbnprQmIxK2ttYmVMYStuQlhPVVh5cjhTdDhZSFJmZG1QWGliMmw4UHhySmtiSUwrS2Y4WnZ6R1VSWEJtMzZKY1pcLzh5VXVROGV0b0FKQTV4VGZMQUt0SjkySDBiYWlQOUtmcnFhUW12UDFoS0FOM3NWbzlmYjRDaElkN2g1OVJtenNzU29vbUlUczA4SzNCNjAyS0ZzTnR6MVhud0Q4MEJ2Z3VCVFBRaDhVYkExVk5XWW14Z3p0Vkc1XC9KVzcwS3ZGVURYbWp5MlRSRmxrR3lxZitYVWtZQ0xKa2huT3FvdFgyR1JKNDJHUDFseXVpYzRJUlJ0WDJNcEdhTnI0WVBJSVFDV1wvMkJmNkZLUnpEdWhaZ2hzWm8rV0d2ZnhWenR0K1piejI1ZngwUTJSbllkeTlaUzB6aTVkZXlnblY4UFdzVHJBS2Q4Q01zXC9CNXI1N2xFOThlZTJhS0VLdDArWmk1bTJld2ludG1XUUU3aW9tbStQbDRVTVBmUXVmY1YwZklzdjVmNHdhZWU4RE8weE54Q2J2SlFJNTF2Yk41SDU2UXkxUEN3NlJqWGxlUUdpMlVaT1kyRlZobVwvYjZRK0Z0djZwNTVsQVwvelFkYUxRRkpES3NcL3lmZG1GZEV4b1lwVEV1elhtQXN1elJVVEtlTEZQMEFpYU1Ickc3QXdoYXNuZkpHcUxUaytZVWpndlN6MkhLWk1Db2FJaFBOd1ZpMUJOV21KSDFWQU42cjRmejlGSzZtaE9EUHpRZHpFQ01uSGZVc1F3NnR1RlFtQmVvSDBkNk9QTm5pZDFUd3F5aXZ1NURMTWFCUmZDelwveFc5b216eHpJUDQxRXdIOWhDNllRSDVPQm96Tm96ZGR1N014Z1JqWTAwb1h3T2hOYm95TUFiN2ttNFB4OXhjR05QZjFNOWI1NGtkbVwvU2djRjZtSDMzM29rNU1YS2xQbkE1OEpcL3ZkRFFoZlZYM0RnTWRrcnBEZFFneklYVWxEc0lCdzE4Tks2THgzQWsxMnNkM3FJeVFwb0FuNTJpTmpZSEUrZzRCa3poNmJaZjhnVUVtVWRlVlVhb0RGY2l0WUdhMEZLdVE0Q3NnTGV1ZmJQbTBtcXJPMFArQjBxeEcrSFU0WmdnVnRJeFZhSUlFK1wvR1wvNDhYN01HZlwvVWtscGdSK2R6QVJMVTJ5djhzRkRmK3JKVWNHYitOZHNLY25qdkxTTmJBaHNBMCtUMDJKTXNqNTVWa3BsNXAxcGJ5TVE1b213T0VhMkFhNjl2RnN6MFNXamk5NEVKOUorTXlHcitwWjRqZjNUUm1xOHNDdEY2UjdncjA3OFRzdTRBZHJQNzZUTHVlVTRZOEU4eU9hRjZKdVg1QzJjZHc3WTlHeHhscVwvdzRrZWdLMlo1UytvYnRvRjJWTFhTeVlcL3I5MFhqQVwvNlNjaGZ4TjJoUm9zQkRhY3BTRVd6OERhUWc0RmNYNUpsNDJ4K1wvcnQzdzUzMWQ5WTZMT0g3N3BIUklBc2lBNW8yYkc5aFBiRWFweUdHZTVoWUMyMmxCblAyV3BTc0ZkcWs4endXejc1ak9qQXRRU2MwcGYxbmlCR2JLRTJJT0QxeFwvQm1TbzE1OTNXanVEU0kzUEpRSHZscmsxSk1cL1VBSFVCNFlISDhMck9wbzkxdDlqdVpwUkk0anhEZEN6WFVNZG5EdklVOWg1Qk9LS214bW5RPT0iLCJtYWMiOiIwYTFjZDZjY2JjNzNlZjdjM2M0MjgxY2ZlZTgxYWQ1ZGU1MzRmYzA2ZjQ0ZTViNTVmMWJjNDMwYTNmYjZhOTFlIn0=";
    },
    async getInfo() {
      const res = await this.$http.post('/jdk/sign', {
        apis: this.apis,
        url:"https://h5.take-out.yihuo-cloud.com"+this.$route.fullPath
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
          success () {
            // 设置成功

          }
        });
        wx.updateAppMessageShareData({
          title: '逐天外卖', // 分享标题
          desc: '', // 分享描述
          link: 'https://h5.take-out.yihuo-cloud.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://api.take-out.yihuo-cloud.com/public/files/20200202/202002020250332716.jpg', // 分享图标
          success () {
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
        // x: this.y,
        // y: this.x,
        x: 31.00674,
        y: 121.235348,
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
    juli(val){
      return val/1000 
    }
  },
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
