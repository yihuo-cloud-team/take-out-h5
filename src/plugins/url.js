import Vue from 'vue';

let Url = {
  // serverUrl: 'https://api.take-out.yihuo-cloud.cn/mini',//测试环境
  serverUrl: 'https://api.take-out.yihuo-cloud.com/mini',//生产环境
  // serverUrl: 'http://192.168.0.143:8081/mini',//李子龙 
  // serverUrl: 'http://192.168.0.152:12138/mini',//李传浩的本地
  // serverUrl: 'http://192.168.0.122:82/mini',//吴杰
  // uploadUrl: '',
  uploadUrl: 'https://api.take-out.yihuo-cloud.com',
  // imageUrl: '',
  imageUrl: 'https://api.take-out.yihuo-cloud.com',
}

Vue.prototype.$Url = Url;

export default Url;


