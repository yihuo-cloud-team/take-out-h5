export default {
    name: 'OlStoreCard',
    props: {
        info: {
            type: Object,
            default: null
        },
        showGoods: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    methods: {
        // 用于初始化一些数据
        init() { },
        // 用于更新一些数据
        update() { },
    },
    // 计算属性
    computed: {
        star() {
            return parseFloat(this.info.star).toFixed(1);
        },
        star_value() {
            return parseFloat(parseFloat(this.info.star).toFixed(1));
        },
        distance() {
            let v = this.info.distance
            v = v / 1000;
            if (v <= 0.1) {
                return '<100m';
            }
            if (v < 10) {
                return parseFloat(v).toFixed(1) + 'km';
            }

            if (v < 100) {
                return parseFloat(v).toFixed(0) + 'km';
                // return '5+km'
            }

            if (v >= 100) {
                return '距离过远';
            }
        },
        distance_value() {
            let v = this.info.distance
            v = v / 1000;
            return v;
        },
        state() {
            // // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
            return this.info.is_open == 0 ? '商家已休息' : '';
            let week = this.info.week;
            if (typeof week == 'string') {
                week = JSON.parse(week);
            }
            let is_open = this.info.is_open;
            let start_time = this.info.start_time;
            let end_time = this.info.end_time;

            let date = new Date();


            /**
             * 判断是否开店
             */
            if (this.is_open == 0) {
                return "商家已休息";
            }

            /**
             * 开始计算星期
             */
            let toWeek = date.getDay();
            let weekMap = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
            let weekKey = weekMap[toWeek - 1];
            if (week.indexOf(weekKey) >= 0) {
                // console.warn('周存在');
            } else {
                // console.warn('周不存在');
                return "商家已休息";
            }

            /**
             * 开始计算时间
             */


            let toTime = date.Format('hh:m');
            if (toTime > start_time && toTime < end_time) {
                // 当前时间大于开始时间，代表在开店之后
                // 当前时间小于结束时间，代表在关店之前
                return "1"

            } else {
                return "商家已休息"
            }


            return "商家已休息"
        }
    },
    // 包含 Vue 实例可用过滤器的哈希表。
    filters: {},
    // 在实例创建完成后被立即调用
    created() { },
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    beforeMount() { },
    // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
    mounted() {
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