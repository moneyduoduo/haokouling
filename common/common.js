import storage from './storage'
import request from "./request.js"
import msg from "./msg.js"
import store from "@/store/index.js"
export default {
	
	getCopy () {
		var _this = this
		try {
			//获取剪贴板内容
			uni.getClipboardData({
				success: function(res) {
					try {
						if (typeof(res.data) === 'object') {
							var Context = plus.android.importClass("android.content.Context");
							var main = plus.android.runtimeMainActivity();
							var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
							res.data = plus.android.invoke(clip, "getText").toString();
						}
						//如果剪贴板内容和缓存的剪贴板内容一致不做弹窗
						if(res.data == store.state.sosoGoodsUrl){
							return false;
						}
						// if(uni.getStorageSync('clipboardContent') == res.data){
						// 	return false;
						// }
						//全部数字不弹窗
						if(!isNaN(res.data)){
							return false;
						}
						var pipei = res.data.match(/[\w|\d]{11}/g);
						//少于15位字符的不弹窗
						if(res.data.length<15&&!pipei){
							return false;
						}
						
						//如果匹配到淘宝商品id
						var matchIdParam = res.data.match(/id=(\d+)/);
						console.log(res.data)
						store.commit("sosoGoodsUrl", res.data)
						if(matchIdParam){
							return request.post('/api/goods/getDetail',{itemId:matchIdParam[1]}).then((r)=>{
								if(r.data.itemTitle){
									_this.goSoso({itemTitle:r.data.itemTitle,itemId:r.data.itemId,itemPic:common.imgThumbAli(r.data.itemPic)});
								}else{
									_this.goSoso({itemTitle:res.data});
								}
							});
						}
						//关闭已有的搜索弹窗
						if(plus.webview.getWebviewById('sousuo') !== null){
							plus.webview.getWebviewById('sousuo').close();
						}
						if(storage.get('jxConfig').config.isTpwdConvert == "1" && pipei){
							request.post('/api/goods/tpwdConvert',{tpwd:'￥'+pipei+'￥'}).then((v)=>{
								_this.goSoso(v.data);
							})
						}else{
							_this.goSoso({itemTitle:res.data});
						}
					} catch (e) {
						console.log(e)
					}
				}
			});
		} catch (e) {
			uni.showToast({
				title: '获取剪切板失败:' + e,
				icon: 'none'
			})
		}
	},
	goSoso:function(data){
		console.log(123)
		var topH = 0;
		if (plus.device.vendor == "Apple") {
			topH = -20
		};
		
		plus.webview.open('/hybrid/html/popup/sousuo.html?' + encodeURIComponent(JSON.stringify(data)),
			'sousuo', {
			background: 'transparent',
			top: topH,
			bottom: 0,
			zindex: 997
		});
	
	},
	
	
	//获取当前时间戳（服务器时间为准）
	getTime:function(){
		return parseInt(new Date().getTime()/1000) + storage.get('timeDistance');
	},
	//推客宝客服
	getKefu:function(){
		let url = storage.get('cjfConfig').cjfKefu+'&token='+storage.get('token');
		return this.goPage('/pages/common/webView?url='+url+'&title=在线客服');
	},
	//好口令客服
	getJXKefu:function(){
		
		let url = storage.get('jxConfig').config.jxshKefu+'&token='+storage.get('token');
		if(!storage.get('jxConfig').config.jxshKefu) {
			request.post('/api/index/getIndex').then(res => {
				store.commit("jxConfig", res.data)
				console.log(res.data)
				this.goPage('/pages/common/webView?url='+res.data.config.jxshKefu+'&title=在线客服');
			})
		}else {
			this.goPage('/pages/common/webView?url='+url+'&title=在线客服');
		}
		
	},
	//下单流程
	getTaskArticle:function(){
		let id = storage.get('cjfConfig').article.cjfTaskArticleId;
		return this.goPage('/pages/superBack/noticeDetail?id='+id+'&title=下单流程');
	},
	//页面跳转
	goPage:function(url,type){
		//返回上一页
		if(url==-1){
			return uni.navigateBack();
		}
		//返回好口令首页
		if(url==0){
			return uni.switchTab({
				url: '/pages/index/index'
			});
		}
		//具体跳转页面
		return uni.navigateTo({
			url: url,
			animationType: type?type:'pop-in',
			animationDuration: 200
		});
	},
	//倒计时，timestamp:时间戳（返款，抢购倒计时）
	countDown : function (timestamp) {
		let nowTime = this.getTime();
		let distance = timestamp - nowTime;
		if (distance > 0) {
			let dd = Math.floor(distance / 60 / 60 / 24);
			let hh = Math.floor((distance / 60 / 60) % 24);
			let mm = Math.floor((distance / 60) % 60);
			let ss = Math.floor(distance % 60);
			return `${dd}天${hh}小时${mm}分${ss}秒`;
		}else{
			return false;
		}
	},
	//发送短信倒计时
	countDownSms : function(obj){
		let th = this;
		if(storage.get('sendCodeTime')>th.getTime()){
			obj.time = storage.get('sendCodeTime') - th.getTime();
			var smsInterval = setInterval(function(){
				obj.time = storage.get('sendCodeTime') - th.getTime();
				if(obj.time<1){
					storage.remove('sendCodeTime');
					clearInterval(smsInterval);
				}
			},1000);
		}
	},
	//时间戳格式化，t:时间戳，format:格式
	timeFormat : function(t,format) {
		let time = new Date()
		time.setTime(t * 1000)
		let Year = time.getFullYear(),
			Month = time.getMonth() + 1,
			Data = time.getDate(),
			Hours = time.getHours(),
			Minutes = time.getMinutes(),
			Seconds = time.getSeconds();
		Month = Month < 10 ? 0 + '' + Month : Month;
		Data = Data < 10 ? 0 + '' + Data : Data;
		Hours = Hours < 10 ? 0 + '' + Hours : Hours;
		Minutes = Minutes < 10 ? 0 + '' + Minutes : Minutes;
		Seconds = Seconds < 10 ? 0 + '' + Seconds : Seconds;
		if(format == 'yyyy-mm-dd'){
			return Year + "-" + Month + "-" + Data;
		}
		if(format == 'mmddhhii'){
			return Month + "-" + Data + " " + Hours + ":" + Minutes;
		}
		if(format == 'mmdd'){
			return Month + "-" + Data;
		}
		return Year + "-" + Month + "-" + Data + " " + Hours + ":" + Minutes + ":" +Seconds;
	},
	//七牛云图片格式化，url：路径，size:尺寸
	imgThumb : function(url,size) {
		//已经是七牛压缩格式直接返回
		if(url.indexOf('?imageView2')>0||url.indexOf('http')>0){
			return url;
		}
		let baseUrl = storage.get('cjfConfig')['qiniuCdnUrl']+url;
		switch(size){
			case '50':
				return baseUrl+'?imageView2/0/w/50/h/50/q/75';
				break;
			case '100':
				return baseUrl+'?imageView2/0/w/100/h/100/q/75';
				break;
			case '300':
				return baseUrl+'?imageView2/0/w/300/h/300/q/75';
				break;
			case '750':
				return baseUrl+'?imageView2/0/w/750/h/750/q/75';
				break;
			default:
				return baseUrl+'?imageView2/0/w/200/h/200/q/75';
				break;
		}
	},
	//阿里云
	imgThumbAli:function(url,size,quality){
		if(!url){
			return url;
		}
		if(url.indexOf('haodanku')>-1){
			return url;
		}
		let q = 80;
		if(quality){
			q = quality;
		}
		switch(size){
			case '50':
				return url+'_50x50q'+q+'.jpg';
				break;
			case '100':
				return url+'_100x100q'+q+'.jpg';
				break;
			case '300':
				return url+'_300x300q'+q+'.jpg';
				break;
			case '750':
				return url+'_750x750q'+q+'.jpg';
				break;
			default:
			
				return url+'_200x200q'+q+'.jpg';
				break;
		}
		console.log()
	},
	//去除图片前缀
	imgRemovePre:function(urls){
		let qiniuCdnUrl = storage.get('cjfConfig').qiniuCdnUrl;
		if(Array.isArray(urls)){
			let temp = [];
			urls.map((item)=>{
				temp.push(item.replace(qiniuCdnUrl, ''));
			});
			return temp;
		}else{
			let temp = urls.replace(qiniuCdnUrl, '');
			return temp;
		}
	},
	sendCode : function(option,callBack){
		if(this.getTime()<storage.get('sendCodeTime')){
			let wait = storage.get('sendCodeTime')-this.getTime();
			msg.toast('请'+wait+'s后再试');
			callBack({status:0});
			return true;
		}
		option.userType = 1;
		return request.posts("/api/sms/doSend",option)
		.then(res=>{
			//可发送短信时间
			if(res.status == 1){
				msg.toast(res.msg);
				storage.set('sendCodeTime',this.getTime()+60);
			}else{
				msg.toast(res.msg);
			}
			callBack(res.status);
		})

	},
	//复制
	copy:function(content,callback){
		uni.setClipboardData({
			data: content,
			success: () => {
				msg.toast('复制成功');
				if(callback){
					callback();
				}
			},
			fail: () => {
				msg.toast('复制失败');
			}
		});
	},
	//粘贴
	paste:function(callBack){
		uni.getClipboardData({
			success: (res) => {
				console.log(res);
				callBack(res.data);
			},
			fail: () => {
				msg.toast('粘贴失败');
			}
		});
	},
	previewImage:function(url,urls){
		if(!urls){
			var showImgs = [url.split('?')[0]];
		}else{
			var showImgs = [];
			urls.map((item)=>{
				showImgs.push(item.split('?')[0]);
			})
		}
		//图片预览
		uni.previewImage({
			current: url.split('?')[0],
			urls: showImgs,
		});
	},

	qiniuCdnUrl:function(url){
			if(url==''){
				return
			}
			let jxConfig = storage.get('jxConfig')
			let qiniuCdnUrl = jxConfig.config.qiniuCdnUrl
			if(url.includes('http')){
				return url
			}
			return `${qiniuCdnUrl}${url}`
	},
	//手机号码格式化  153****1212
	telFormat(tel) {
		if(tel==''){
			return
		}
		return tel.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
	},
	/* 
	base64Fn:{ //base64编码转换
		fs:require('fs'), //导入fs
		base64ToString:function(base64str){ //base64解码字符串
			return new Buffer(base64str).toString('base64'); 
			// 调用 this.$common.base64Fn.base64ToString(base64Data)
		},
		stringToBase64:function(str){//字符串转base64
			return  new Buffer(str,'base64').toString('utf8');
			// 调用 this.$common.base64Fn.stringToBase64(str)
		},
		base64ToFile:function(base64str, file){ //base64转文件格式
			 var fs = require('fs');
			 let bitmap = new Buffer(base64str, 'base64');
			 fs.writeFileSync(file, bitmap);
			 // 调用 this.$common.base64Fn.base64ToFile(base64Data,'定义文件名.png')
		},
		fileTobase64:function(file){
			
			let bitmap = this.fs.readFileSync(file);
			return new Buffer(bitmap).toString('base64');
			// 调用 this.$common.base64Fn.fileTobase64('文件路径')
		}
	} */
}