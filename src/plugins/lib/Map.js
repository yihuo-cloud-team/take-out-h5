export default class Map {

    _geolocation = null;

    constructor() {
        this.map = new AMap.Map('container', {
            resizeEnable: true
        });
    }

    /**
     * 注册插件
     */
    plugin(plugin) {
        return new Promise((resolve, reject) => {
            AMap.plugin(plugin, () => {
                resolve();
            });
        });
    }

    /**
     * 注册定位插，仅注册一次
     */
    registerGeolocation() {
        if (!this._geolocation) {
            this._geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 300, //超过10秒后停止定位，默认：5s
                GeoLocationFirst: true,
            });
            this.map.addControl(this._geolocation);
        }
    }


    async geolocation(mod = 'geolocation') {

        return new Promise((resolve, reject) => {
            if (mod == 'geolocation') {
                this._geolocation.getCurrentPosition((status, result) => {
                    if (status == 'error') {
                        reject();
                    } else {
                        resolve(result);
                    }
                });
            }
            if (mod == 'ip') {

                this._geolocation.getCityInfo(function (status, result) {
                    if (status == 'error') {
                        reject();
                    } else {
                        resolve(result);
                    }
                })
            }


        });
    }

}