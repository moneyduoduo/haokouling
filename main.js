import Vue from 'vue'
import App from './App'
import store from './store'
import msg from './common/msg' 
import config from "./common/config.js"
import request from "./common/request.js";
import bindSystem from "./common/bindSystem.js";
import checkForm from './common/checkForm.js'
import storage from "./common/storage.js"
import common from "./common/common.js"
Vue.config.productionTip = false
//Vue.prototype.$jsencrypt = JSEncrypt;

/* 超级返  */
/* import Json from './jsonTemp' //测试数据 */
import loadMore from './components/uni-pro/load-more'
import loadding from "./components/loadding";
import topBar from './components/superBack/topBar'
/* const json = (url,time)=>{
	//模拟异步请求数据
	if(time==='undefined'){
		time = 30
	}
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[url]);
		}, time)
		
	})
} */

App.mpType = 'app'
Vue.prototype.$storage = storage;
Vue.prototype.$store = store;
Vue.prototype.$config=config;
Vue.prototype.$http = request;
Vue.prototype.$bindSystem = bindSystem;
Vue.prototype.$msg = msg;
Vue.prototype.$checkForm = checkForm;
/* Vue.prototype.$api = {json}; */
Vue.component('load-more',loadMore);
Vue.component('loadding',loadding);
Vue.component('top-bar',topBar);
Vue.prototype.$common = common;
const app = new Vue({
    ...App
})
app.$mount()