import config from "./config";
import msgAlert from './msg'
import bindSystem from "./bindSystem";
import storage from './storage'
import store from "@/store/index.js"
export default{
	config:{
		header:{
			"Content-Type":"application/x-www-form-urlencoded"
		},
		data: {},
		method: "POST",
	},
	request(options = {}){
		return new Promise((resolve,reject)=>{
			options.header = options.header || this.config.header;
			options.method = options.method || this.config.method;
			options.dataType = options.dataType || this.config.dataType;
			options.url = options.url;
			let systemInfo = store.state.systemInfo
			let token = store.state.token
			let version = store.state.version
			token ? options.header.token = token : options.header.token = '';
			systemInfo ? options.header.platform = systemInfo.platform : options.header.platform = '';
			version ? options.header.version = version : options.header.version = '';
			let formData = options.formData
			options.success = (res) => {
					
					if (res.data.status==1) {
						if(res.data.data.hasOwnProperty('versionInfo')){
							this.updata(res.data.data.versionInfo)
						}
						return resolve(res.data)
					}
					if (res.data.status==0||res.data.status==40000) {
						msgAlert.toast(res.data.msg);
						return reject(res.data);
					}
					if(res.data.status==40001){
						this.updata(res.data.data)
					}
					if(res.data.status==40002||res.data.status==40004){
						msgAlert.alert({ title:'提示',content: '请先登录'},()=>{
							uni.navigateTo({
								url: '/pages/pass/login'
							});
						})
					}
					if(res.data.status==40003){
						msgAlert.alert({ title:'提示',content: '请先绑定手机号码'},()=>{
							uni.navigateTo({
								url:'/pages/pass/sharpCode'
							});
						})
					}
			}
			uni.request(options)
			
			
		});
	},
	post(url,data,options={}){
		options.url = config.couponeBaseUrl+url;
		options.data = data;
		options.method = 'POST';
		return this.request(options)
		
	},
	
	posts(url,data,options={}){
		options.url = config.superBackBaseUrl+url;
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	},
	updata(res){
		if(!res.downloadUrl&&!res.wgtUrl){
			return false;
		}
		//#ifdef APP-PLUS
		plus.webview.open(
			'hybrid/html/popup/popup.html?data=' + encodeURIComponent(JSON.stringify(res)),
			'genxinpopup', {
				background: 'transparent',
				top: 0, 
				bottom: 0,
				zindex: 998
			},
			'fade-in',
			500
		);
		// #endif
		/*

		let version = parseInt(store.state.version.replace(/\./g,''))
		let server = parseInt(res.version.replace(/\./g,''))
		 if(server>version){
			if(res.isForce==0){
				plus.webview.open(
					'hybrid/html/popup/popup.html?data=' + encodeURIComponent(res),
					'genxinpopup', {
						background: 'transparent',
						top: 0, 
						bottom: 0,
						zindex: 998
					},
					'fade-in',
					500
				);
			}else{
				plus.nativeUI.showWaiting("正在下载更新包...");
				let wgtUrl = res.wgtUrl
				uni.downloadFile({
					url: wgtUrl,
					success: (downloadResult) => {
						if (downloadResult.statusCode === 200) {
							plus.nativeUI.closeWaiting();
							plus.nativeUI.showWaiting("正在更新应用...");
							plus.runtime.install(downloadResult.tempFilePath, {
								force: false
							}, function() {
								plus.nativeUI.closeWaiting();
								uni.clearStorageSync();
								plus.runtime.restart();
							}, function(e) {
								//console.error('install fail...');
								uni.showToast({
									title: e,
									duration: 5000
								});
							});
						}
					}
				})
			}
			
		}
		*/
	} 
}