export default {
    name: 'prizedraw',
    layout: "sub",
    data() {
        return {
            number: -5,
            times: '',
            number_tiems: 0,
            click: false,
            default_rotate: 100,
            bl_index: 0,
            classMap: ['box'],
            list: [],
            blArr: [],
            prize_namelist: [],
            apis: [

            ],
            shareurl: '',
            show: false,
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.update();
            this.wxFx();
        },
        // 用于更新一些数据
        async update() {
            const userInfo = await this.$http.post('/user/info');
            if (userInfo.code > 0) {
                this.shareurl = `https://h5.take-out.yihuo-cloud.com/?id=${userInfo.data.id}`
            }
            const res = await this.$http.post('/prize/list', {});
            if (res.code > 0) {
                this.list = res.data
            }
            this.httpitems()
            this.times = setInterval(() => {
                this.number += 1
                if (this.number > 116) {
                    this.number = 0
                }
            }, 100);
            this.getMoble()
        },
        build() { // 将从接口拿的概率进行百分比化
            this.blArr = [];
            this.list.forEach(el => {
                let max = el.bl;
                for (let i = 0; i < max; i++) {
                    this.blArr.push(el.title)
                }
            })
        },
        rotateNum(index) {
            return (360 / this.list.length) * (index + 1)
        },
        async httpitems() {
            const res = await this.$http.post('/prize/prize_num', {});
            if (res.code > 0) {
                this.number_tiems = res.data.num
                if (res.data.num > 0) {
                    this.click = true
                }
            }
        },
        async httpJx() {
            if (this.number_tiems <= 0) {
                let pd = await this.$dialog.confirm({
                    title: '积分不足!!',
                    message: '邀请好友注册获取更多积分'
                })
                if (pd == 'confirm') {
                    this.show = true
                }
            }
            if (!this.click) return //判断是否正在抽奖
            this.build()
            await this.setDefault(); //上一轮抽奖完毕转动角度归零
            let index = Math.ceil(Math.random() * 100); //随机生成奖项
            this.bl_index = index;
            let item = this.blArr[index]; // 中奖奖项名称
            this.default_rotate = this.list.findIndex(el => el.title == item); // 获取中奖项的下标
            setTimeout(async () => {
                try {
                    let loading = this.$toast.loading({
                        message: '奖励生成中...',
                        overlay: true,
                    });
                    let title, message;
                    if (item.indexOf('谢谢惠顾') < 0) {
                        title = '中奖了！！';
                        message = `获得${item}一个！！`
                    } else {
                        title = item;
                    }
                    let res = await this.$http.post('/prize/save', {
                        id: this.list[this.default_rotate].id
                    });
                    loading.clear()
                    let pd = await this.$dialog.alert({
                        title: title,
                        message: message
                    })
                    if (this.list[this.default_rotate].type == 1) {
                        window.location.href = this.list[this.default_rotate].url
                    }

                } catch (error) {

                }
                this.httpitems()
            }, 3000);


        },
        setDefault() {
            this.click = false
            return new Promise(e => {
                this.classMap = ['box'];
                this.default_rotate = 100;
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.classMap = ['box', 'transform'];
                        e();
                    }, 300);
                })
            })
        },
        getMoble() {
            let prefixArray = ["130", "131", "132", "133", "135", "137", "138", "170", "187", "189"];
            this.prize_namelist = prefixArray.map(el => {
                let home = ''
                for (let index = 0; index < 4; index++) {
                    home = home + Math.floor(Math.random() * 10);
                }
                return {
                    phone: `${prefixArray[Math.floor(Math.random() * 10)]}****${home}`,
                    name: `${this.list[Math.floor(Math.random() * 10)].title}`
                }
            })
        },
        async wxFx() { // 微信分享
            const res = await this.$http.post('/jdk/sign', {
                apis: this.apis,
                url: "https://h5.take-out.yihuo-cloud.com" + this.$route.fullPath
            });
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx5bf6a90a691706d0', // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名
                jsApiList: res.jsApiList // 必填，需要使用的JS接口列表
            });
            //  朋友圈分享
            wx.ready(() => { //需在用户可能点击分享按钮前就先调用
                wx.updateAppMessageShareData({
                    title: '逐天外卖', // 分享标题
                    link: this.shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://api.take-out.yihuo-cloud.com/public/files/20200202/202002020250332716.jpg', // 分享图标
                    success: () => {
                        // 设置成功
                        this.show = false

                    }
                });
                wx.updateAppMessageShareData({
                    title: '逐天外卖', // 分享标题
                    desc: '', // 分享描述
                    link: this.shareurl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: 'https://api.take-out.yihuo-cloud.com/public/files/20200202/202002020250332716.jpg', // 分享图标
                    success: () => {
                        // 设置成功
                        this.show = false

                    }
                })
            });
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