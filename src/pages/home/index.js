export default {
  name: 'home',
  data() {
    return {
      list: [],
      x: '',
      y: ''
    };
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },
    // 用于更新一些数据
    async update() {
      localStorage.jwt = "eyJpdiI6Ik1TY0l2eUZENjlPRDNuVjZsT2NjM2c9PSIsInZhbHVlIjoiUDZRZ1wveUdQcG9ISVltUTA5aXhBU1RqOWVqWW51ZjUzWHJ5TTlwZEp1cVJUd1pFcHB3SzJvYmk1ckFxeDlvc3krbWdUb3dGNXdJRTd2bm9ZUnlna2FmK2pxVUhMdHpOZHB6ZFpTSDRHUHNOWW5paWZaUnl5ZWxpbXRCYitjRFhQR25jNkMwdHVjYXhYbHl0V1JjSnZTRUdhWjYzbkpWdmIrRGJhWUl3bVJPQTR0OWVxeG9tWEwxRklCXC9Zc095VWNiQXlZRjRVUDRqTThaek5LcDlIcnhhZ0J3bmI5QVVQbHFiXC93ZlUzUkpYTFZMd2drUUFMMWdUV0pWZjVkMlArWmxWUmkxdkdUb0gxbzJ5aHBqQ25MNlNTaitPTEZDdnpZbmFqMStzYlRteGJDaDhkMWw3eWZLdVp2WDNGWmE5UVVwZTZuOFRUQXN0bFhOaU41dmNcL3laQUVOckxjTjBZbWNzaXZaQm1obWI4RjhDTU5ZXC9nT0ptT1wvdWVGbGxtdUJwSGFmd1R6ZTJQdGFldkM4dWhFb1g0VGNidTlMUlwvSFRWT2VYcnhJOFwvR3ZHVTQ5SE4xR1pjWCs3b2VUN1VWbDBDZjljRUR1eXVvankwamV4TzRmSlhRTnhCUkhBZWlDMUhKaUdxUVQ1SE1ZekZUWWtJTlk2dklmb3JwS3hFWklnWElPOFNoRjJodlRpVGR4Z0xYSVdSZ1JLTG5Rc0YreTdndzVlQjA2eFZ5MVhIYlV1WTc2M1wvbVJZTGhSWDVpOGI5a25IU1h3SU93T3BZWENpc1NXMSs3RlJpd2xhNldTeGJHZ1Y4SDIzOTRjRG5CTWJuaENEeVNUY2l1cXY1OWdOYlVrTVN6aVZmd1FkZmZUZ21TNWkrNCtvQnJrdmE3eldmZUdxT0x5U2dHVEVmMmpXXC91dzVHNzZPNkZETzdkWTRYNTlVemRqVzN0aFlRNXk5N25tNVB5TTlMbnVSbkxxWEFrUlJKSmN3aGN4U1U3a29oM1E0cHNZSStMVFAyRVRKN0pXV0pSMXlZMXBLdGlROGlmeVltVHZ2Q0p3UHltK0EwRjVYMVI1bHNQQkdBTmdkckU1a3hpcEhxbG1IeVY3U2JmZDArb0paZ3JFV3Z2TzJFUmNsamxCM1RmWjJZNGQ1b0d2SEVCb2NkUkcwOGdWVVN5cFY3UDBTeFpESUxcL1J1dE9lMjJcLzladWoyZW5BTXRBZ3BwMm9aaktvSFJIK0NmSzhKNTNWTHZmdFJ2T1JJQzhKcitYNzlwK2lCRXE1NVp0amhkNThOa3pXeUt4MkFHSW53TmFuZUt4S3JpaUpcLzIyK2RMMzZGYjA5SEZZVndvVUtzdGg5a3pIK29uK1FuV1wvQ1JGVFptbTBXTHlJVmZGM3VubEtjclVuSmVpOWY5dCswM1wvaW41Z3lyWFFOWjc3NnYyTHpZTWxUTTdybk8yYytwdlVcLzVnMThyK3RrMEJ3QlpZTlgwUGZaK3dFU1wvWG4xXC9PUElBMmxcL2tSZ2sydmFIME1NTmhUamRDRkJMckZNQW9XSlpLQ1dnMzNCc3BMUU1VanI4cnFodytJS2JBOW50TGk2aE5WVmhSa01KZ0dWd3VwdnI3Nm5QNGJZQVoxT2dVSmRSTHNHQ3ZcL1kyamI1SGdTVUVVSXZQb1JPXC9pTmRDOHk4dUcrUDZBS3hOMjgrRHA2MnZvNTBKbVVId2FhS3lsUVVSWkdOSjdvVUxUd2ZESmw2MHdBMCtlOFF6d29mSXZZVzdWWXA4cDI3QWFuTDdOOGFaK0kwMzVLOURxUkJEIiwibWFjIjoiNDNhMWIwZWEwOWFjZTBkZGQxNzcyYzcwZGMzNzczYzg1Y2Y5NTQ3ZjU2ZDRlOGU1Y2FlYmYzOTVhYzYxMGVkYiJ9"
      try {
        const res = await this.$http.post('/store/list', {});
        if (res.code >= 0) {

          this.list = res.data.map(el => {

            el.distance = this.distance(this.x, this.y, el.x, el.y)
            return el
          })

        }


      } catch (error) {}
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
    tiaozhuan(item){
      this.$router.push(`/goodsList?store_id=${item.store_id}&&domain_id=${item.domain_id}`)
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
