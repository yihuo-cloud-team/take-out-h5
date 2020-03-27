function getLocalIP() {
    const os = require('os');
    const osType = os.type(); //系统类型

    const netInfo = os.networkInterfaces(); //网络信息



    let ip = '';

    if (osType === 'Windows_NT') {

        let map = ['WLAN', '本地', '以太网'];
        let index = 0;
        Object.keys(netInfo).forEach(key => {
            if (ip.length <= 0) {
                let el = netInfo[key];
                if (key.indexOf(map[index]) >= 0) {
                    let item = el.find((item) => item.family == 'IPv4');
                    ip = item.address;
                }
                index++;
            }
        })

    } else if (osType === 'Linux') {
        ip = netInfo.eth0[0].address;
    } else if (osType == 'Darwin') {
        ip = netInfo.en0[1].address;

    }

    console.warn(ip);


    return ip;
}


module.exports = {
    router: {
        middleware: 'auth',
        // scrollBehavior(to, from, savedPosition) {
        //     if (savedPosition) {
        //         return savedPosition
        //     } else {
        //         return { x: 0, y: 0 }
        //     }
        // }
    },
    head:{
        title:"逐天外卖"
    },
    mode: 'spa',
    srcDir: 'src/',
    build: {
        babel: {

        }
    },
    css: [
    ],
    build: {
    },
    plugins: [
        '~/plugins/main.js',
    ],
    server: {
        // port: 80,  
        // host: '192.168.0.107',
        // // default: 80
        // default: localhost
        // port: 8090,
        host: '192.168.2.1',
    },
}   