export default {
    name: 'prizedraw',
    layout: "sub",
    data() {
        return {
            click: true,
            default_rotate: 100,
            bl_index: 0,
            classMap: ['box'],
            list: [],
            blArr: []
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.update();
        },
        // 用于更新一些数据
        async update() {
            const res = await this.$http.post('/prize/list', {});
            if (res.code > 0) {
                this.list = res.data
            }
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
        async httpJx() {
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
                    let res = await this.$http.post('/prize/save', {
                        id: this.list[this.default_rotate].id
                    });
                    loading.clear()
                    if (res.code > 0) {
                        let title, message;
                        if (item.indexOf('谢谢惠顾') < 0) {
                            title = '中奖了！！';
                            message = `获得${item}一个！！`
                        } else {
                            title = item;
                        }
                        let pd = await this.$dialog.alert({
                            title: title,
                            message: message
                        })
                        if (this.list[this.default_rotate].type == 1) {
                            window.location.href = this.list[this.default_rotate].url
                        }

                    }
                } catch (error) {

                }
                this.click = true
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
        }
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