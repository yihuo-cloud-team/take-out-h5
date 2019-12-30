export default {
    name: 'list',
    data() {
        return {
            page: 1,
            list: [],
            total: 1,
            userInfo: null,
        }
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.update();
        },
        // 用于更新一些数据
        async update() {
            const res = await this.$http.post('/order/list', {
                page_size: 5,
                page: this.page
              });
          
              if (res.code > 0) {
                // 有数据
                const list = res.data;
          
                list.forEach(el => {
                  // 0 预订单
                  // 1 待支付
                  // 2 已支付
                  // 3 已完成
          
                  if (el.state == 0) {
                    el.state_label = '待支付';
                  }
                  if (el.state == 1) {
                    el.state_label = '商家已接单';
                  }
                  if (el.state == 2) {
                    el.state_label = '待取货';
                  }
                  if (el.state == 3) {
                    el.state_label = '配送中';
                  }
                  if (el.state == 4) {
                    el.state_label = '已完成';
                  }
                  if (el.state == 5) {
                    el.state_label = '订单取消';
                  }
                  let infos = []
                  infos.push("下单时间：" + el.add_time)
          
                  var num = 0
                  el.snapshotInfo.forEach(els => {
          
                    num = num + els.data.quantity
                    els.data.goods_head_list =  els.data.goods_head_list.map(item => this.$getUrl(item))
                  })
          
                  infos.push(el.snapshotInfo[0].title + "..." + "等" + num + "件商品")
          
                  infos.push("总价：￥" + (el.price * 1 + el.freight_price * 1))
                  // console.log(infos)
                  el.infos = infos
                });
          
                this.list = [...this.data.list, ...list]
                this.total = res.total
                this.page =  ++this.page
                // this.setData({
                //   list: [...this.data.list, ...list],
                //   total: res.total,
                //   page: ++this.data.page,
                // });
              } else {
                // 没有数据了
              }
           
          
        },
    },
    // 计算属性
    computed: {},
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