import Http from '../plugins/Http'
import config from '../plugins/config'

export default function (context) {

    // console.warn(context.from.query);
    // return;
    if (typeof config.jwt() == 'undefined') {
        // 未登录
        if (location.search.indexOf('store_id') != -1) {
            localStorage.location = location.search;
        }

        if (context.route.name != 'login') {
            context.app.router.replace('/login');
        }

    } else {

        return new Promise(async (next) => {
            try {
                next();
            } catch (e) {
                console.warn(e);
                console.warn('验证失败！');
                context.app.router.replace('/login');
            }
        });


    }
}