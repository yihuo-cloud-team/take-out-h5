import Http from '../plugins/Http'

export default function (context) {
   
    if (typeof localStorage.jwt == 'undefined') {
        // 未登录
        if(location.search.indexOf('store_id') != -1){
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