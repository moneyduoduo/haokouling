import http from "./request.js";
import store from "@/store/index.js"
import storage from './storage.js'
import config from './config.js'
import msgAlert from './msg'
import common from './common'
export default {
	async init() {
		//获取app版本号
		let version = await this.getVersion();
		//获取设备信息
		let systemInfo = await this.getPlatform()
		this.getDeviceInfo()

		//初始化请求
		//#ifdef APP-PLUS
		let obj = {
			mobileBrand: systemInfo.brand,
			mobileModel: systemInfo.model,
			mobileOSVersion: systemInfo.system,
			MobileSysVersion: systemInfo.version,
		}
		// #endif
		//#ifdef H5
		let obj = { //h5调试
			mobileBrand: '华为',
			mobileModel: 'Android',
			mobileOSVersion: '12.1',
			MobileSysVersion: 'Android 6.0',
		}
		//#endif

		//读取常量配置信息
		obj.constantVersion = '';
		obj.iconListVersion = '';
		obj.bannerListVersion = '';

		let configObj = store.state.jxConfig
		if (configObj && configObj.config && configObj.iconList && configObj.bannerList) {
			obj.constantVersion = configObj.config.constantVersion;
			obj.iconListVersion = configObj.iconList.iconListVersion;
			obj.bannerListVersion = configObj.bannerList.bannerListVersion;
		}
		http.post('/api/index/getIndex', obj).then(res => {
			/* if (res.data.config.checkImei == 1) {
				let imei = store.state.imei
				if (!imei) {
					this.getDeviceInfo()
				}
			} */
			//app更新中的状态标识
			/* storage.set('isReview',0);
			console.log(storage.get("version"));
			if(res.data.config.appReviewVersion == storage.get("version")){
				storage.set('isReview',1);
			} */
			store.commit("jxConfig", res.data)
		}).catch(err => {
			console.log('初始化接口失败' + err)
		})
	},
	getPushClientId() {
		let pushInfo = null
		//#ifdef APP-PLUS
		pushInfo = plus.push.getClientInfo();
		console.log(JSON.stringify(tuisonInfo))
		// #endif

		//模拟调试数据
		// #ifdef H5 
		pushInfo = {
			"id": "unipush",
			"token": "d59b1ac5a612b0123b0aac8f2d9d361e",
			"clientid": "d59b1ac5a612b0123b0aac8f2d9d361e",
			"appid": "PJvuA6hpVY7h5hE1xa9qU6",
			"appkey": "vjmrNDa1T96SsaxtFG66f3"
		}
		// #endif
		store.commit("pushInfo", pushInfo)
	},
	getVersion() { //获取应用版本号
		return new Promise((resolve, reject) => {
			// #ifdef H5
			//html调试
			let version = '1.0.0';
			store.commit("versionInfo", version)
			resolve()
			// #endif
			//#ifdef APP-PLUS
			//读取资源manifest.json的版本号
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				store.commit("versionInfo", inf.version)
				resolve()
			});
			//#endif
		});
	},
	getPlatform() { //获取 客户端信息 //
		// 手机品牌 brand, 手机型号 model ,手机版本号 version, 客户端平台 platform, 操作系统版本 system
		return new Promise((resolve, reject) => {
			let _this = this
			uni.getSystemInfo({
				success: function(res) {
					store.commit("systemInfo", res)
					resolve(res)
				}
			});
		});
	},

	getDeviceInfo() { // 获取IMEI
		let _this = this
		//#ifdef H5
		let imei = this.getImei()
		store.commit("imeiInfo", imei)
		//#endif

		//#ifdef APP-PLUS
		let imei = plus.device.uuid
		if (!imei) {
			imei = this.getImei()
		}
		console.log(imei)
		store.commit("imeiInfo", imei)
		//#endif
	},
	getImei() { // 随机生成imei
		let now = new Date()
		let year = now.getFullYear();
		let month = now.getMonth() + 1;
		let day = now.getDate();
		let hour = now.getHours();
		let minutes = now.getMinutes();
		let seconds = now.getSeconds();
		String(month).length < 2 ? (month = Number("0" + month)) : month;
		String(day).length < 2 ? (day = Number("0" + day)) : day;
		String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
		String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
		String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
		const time = `${year}${month}${day}${hour}${minutes}${seconds}`;
		return time + Math.random().toString(36).substr(2, 9);
	},
	serialize: function(obj) { // 转换json格式传参为getUrl传参
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		return str.join("&");
	},
	checkBindTaoBao: function(backURL, opstion) { //检测淘宝授权
		return new Promise(resolve => {
			let token = store.state.token
			if (opstion) {
				let meter = this.serialize(opstion)
				backURL = `${backURL}?${meter}`
			}
			if (!token) {
				msgAlert.confirm({
					title: '提示',
					content: '请先登录'
				}, () => {
					uni.navigateTo({
						url: '/pages/pass/login?back=' + encodeURIComponent(backURL)
					});
				})
				return
			}

			let userInfo = store.state.userInfo
			let jxUserInfo = store.state.jxUserInfo
			let isBindTaobao = jxUserInfo.buyerInfo.isBindTaobao
			let userId = userInfo.id
			let taobaoInfo = null

			if (isBindTaobao == 1) {
				if (opstion.gotoURL) {
					uni.navigateTo({
						url: '/' + opstion.gotoURL
					});
				} else {
					resolve()
				}
				return
			}
			msgAlert.confirm({
				title: '授权提示',
				content: '该功能需要淘宝授权！'
			}, () => {
				this.baiChuan.login().then(res => {
					taobaoInfo = res.userinfo
					return this.baiChuan.taobaoOauth(userId)
				}).then(res => {
					return http.post('/api/taobao/doAuth', {
						code: res.code,
						avatar: taobaoInfo.avatar
					})
				}).then(res => {
					jxUserInfo.buyerInfo.isBindTaobao = 1
					if (jxUserInfo.buyerInfo.isBindWeixin == 0) {
						userInfo.nickName = taobaoInfo.nick
						userInfo.avatar = common.qiniuCdnUrl(taobaoInfo.avatar)
						store.commit('userInfo', userInfo)
					}
					store.commit('jxUserInfo', jxUserInfo)
					msgAlert.toast('淘宝授权成功！')
					if (opstion.gotoURL) {
						setTimeout(() => {
							uni.navigateTo({
								url: '/' + opstion.gotoURL
							});
						}, 1500)
					} else {
						resolve()
					}
				}).catch(err => {
					console.log(err)
				})

			})
		})
	},
	baiChuan: {
		plug: uni.requireNativePlugin('Html5app-Baichuan'),
		login: function() { //授权登录
			return new Promise(resolve => {
				this.plug.login({}, result => {
					if (result.code == 0) {
						resolve(result)
						store.commit("userBindTaobaoInfo", result.userinfo)
					} else {
						msgAlert.toast(result.msg)
					}
					console.log(JSON.stringify(result))

				});
			});
		},
		logout: function() { //退出授权登录
			this.plug.logout({}, result => {
				console.log(result)
			});
		},
		detail: function(itemid) { //跳转商品详情
			this.plug.detailPage({
				"itemid": itemid,
				"openType": 1
			}, result => {
				console.log(result)
			});
		},
		goodsUrl: function(url) { //跳转商品链接
			this.plug.detailPage({
				"url": url,
				"openType": 0
			}, result => {
				console.log(result)
			});
		},
		checkSession: function() { // 检测是否登录    0 、已登录 2、登录失效
			return new Promise(resolve => {
				this.plug.checkSession({}, result => {
					//let data = JSON.stringify(result)
					resolve(result)
					console.log(result)
				});
			});
		},
		getUserInfo: function() { //获取用户信息
			this.plug.getUserInfo({}, result => {
				console.log(result);
			});
		},
		OpenMyCart: function() { //打开我的购物车
			this.plug.OpenMyCart({
				"openType": 1
			}, result => {});
		},
		openCoupon: function(url) { //打开优惠券
			console.log(url)
			this.plug.openCoupon({
				"url": url,
				"openType": 1
			}, ret => {
				console.log(result);
			});
		},
		taobaoOauth: function(userId) { //淘宝授权
			let jxConfig = store.state.jxConfig
			let bckey = jxConfig.config.taobaoAppKey
			return new Promise(resolve => {
				console.log(userId)
				let url =
					`https://oauth.taobao.com/authorize?response_type=code&client_id=${bckey}&redirect_uri=${config.couponeBaseUrl}/&state=${userId}&view=wap`
				console.log(url)
				this.plug.taobaoOauth({
					"url": url
				}, result => {
					resolve(result);
				});
			});
		}
	},
	isOpenPush() { // 检测手机是否开启推送 返回Boolean
		if ('iOS' == plus.os.name) {
			var result = false;
			var UIApplication = plus.ios.import("UIApplication");
			var app = UIApplication.sharedApplication();
			var enabledTypes = 0;
			if (app.currentUserNotificationSettings) {
				var settings = app.currentUserNotificationSettings();
				enabledTypes = settings.plusGetAttribute("types");
				console.log("enabledTypes1:" + enabledTypes);
				if (enabledTypes == 0) {
					console.log("推送权限没有开启");
				} else {
					result = true;
					console.log("已经开启推送功能!")
				}
				plus.ios.deleteObject(settings);
			} else {
				enabledTypes = app.enabledRemoteNotificationTypes();
				if (enabledTypes == 0) {
					console.log("推送权限没有开启!");
				} else {
					result = true;
					console.log("已经开启推送功能!")
				}
				console.log("enabledTypes2:" + enabledTypes);
			}
			plus.ios.deleteObject(app);
			plus.ios.deleteObject(UIApplication);
			return result
		} else {
			var main = plus.android.runtimeMainActivity();
			var NotificationManagerCompat = plus.android.importClass("android.support.v4.app.NotificationManagerCompat");
			var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
			return areNotificationsEnabled
		}

	},
	//请求权限
	// getPush() {
	// 	if('iOS' != plus.os.name) {
	// 		 plus.android.requestPermissions()
	// 	}
	// },
	
	gotoAppPermissionSetting() { // 转跳到设置开启推送
		
		if ('iOS' == plus.os.name) {
			var NSURL2 = plus.ios.import("NSURL");
			var setting2 = NSURL2.URLWithString("app-settings:");
			var application2 = UIApplication.sharedApplication();
			application2.openURL(setting2);
			plus.ios.deleteObject(setting2);
			plus.ios.deleteObject(NSURL2);
			plus.ios.deleteObject(application2);
		} else {
			var main = plus.android.runtimeMainActivity();  
			var pkName = main.getPackageName();
			var uid = main.getApplicationInfo().plusGetAttribute("uid");
			var Intent = plus.android.importClass('android.content.Intent');
			var Build = plus.android.importClass("android.os.Build");
			if (Build.VERSION.SDK_INT >= 26) {
				//android 8.0引导  
				var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
				intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
			} else if (Build.VERSION.SDK_INT >= 21) {
				//android 5.0-7.0  
				var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
				intent.putExtra("app_package", pkName);
				intent.putExtra("app_uid", uid);
			} else {
				//(<21)其他--跳转到该应用管理的详情页  
				intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
				var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
				intent.setData(uri);
			}
			// 跳转到该应用的系统通知设置页  
			main.startActivity(intent);
		}
	},
	bindAlias(){
		var isAndorid, PushManager, context, Instance, GeTuiSdk;
		if(plus.os.name == 'Android') {
			isAndorid = true;
		} else {
			isAndorid = false;
		}
		if(isAndorid) {
			PushManager = plus.android.importClass("com.igexin.sdk.PushManager");
			context = plus.android.runtimeMainActivity().getContext();
			Instance = PushManager.getInstance();
		} else {
			GeTuiSdk = plus.ios.importClass("GeTuiSdk");
		}
		return {isAndorid,context,Instance,GeTuiSdk}
	},
	unbindAlias(alias) { //绑定别名个推送  alias 字符串
		//#ifdef APP-PLUS
		let {isAndorid,context,Instance,GeTuiSdk} = this.bindAlias()
		if(isAndorid) {
			Instance.unBindAlias(context, alias, true);
		} else {
			GeTuiSdk.unbindAliasandSequenceNumandIsSelf(alias, alias, true);
		}
		//#endif
	},
	bindAliasAndTag(alias, tags) { //绑定别名个推送  alias 字符串
		//#ifdef APP-PLUS
		let {isAndorid,context,Instance,GeTuiSdk} = this.bindAlias()
		if (isAndorid) {
			console.log('获取到cid==', Instance.getClientid(context));
			console.log('获取到版本号==', Instance.getVersion(context));
			console.log('获取到tags==', JSON.stringify(tags));
			console.log('获取到alias==', alias);
			let  data = Instance.bindAlias(context, alias);
			console.log(data)
			//绑定标签
			var Tag = plus.android.importClass("com.igexin.sdk.Tag");
			console.log(Tag)
			var tagParam = new Array();
			for (let i = 0; i < tags.length; i++) {
				var tag = new Tag();
				tag.setName(tags[i]);
				tagParam[i] = tag;
				console.log('tags[' + i + ']==', tags[i]);
			}
			console.log('tagParam==', JSON.stringify(tagParam));
			Instance.setTag(context, tagParam, Date.now() + "");
		} else {
			GeTuiSdk.bindAliasandSequenceNum(alias, alias);
			GeTuiSdk.setTags(tags);
		}
		//#endif
	},
	changeNetwork() { //监听设备网络
		uni.getNetworkType({
			success: function(res) {
				if (res.networkType == 'none') {
					msgAlert.toast('当前网络不可用,请检查网络。')
				}
			},
			fail: function() {
				msgAlert.toast('当前网络不可用,请检查网络。')
			}
		});
		uni.onNetworkStatusChange((res) => {
			if (!res.isConnected) {
				msgAlert.toast('网络连接已断开！')
			}
		})
	}
}
