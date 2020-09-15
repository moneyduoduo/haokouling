import Vue from 'vue'
import Vuex from 'vuex'
import storage from "@/common/storage"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isLogin: false,
		token:storage.get("token") || '',
		version: storage.get("version") || '',
		systemInfo:storage.get("systemInfo") || '',
		imei:storage.get("imei") || '',
		userInfo:storage.get("userInfo") || '',
		jxConfig:storage.get("jxConfig") || '',
		jxUserInfo:storage.get("jxUserInfo") || '',
		userBindTaobaoInfo:storage.get("userBindTaobaoInfo") || '',
		userBindWeixinInfo:storage.get("userBindWeixinInfo") || '',
		pushInfo:storage.get("pushInfo") || '',
		sosoGoodsUrl:storage.get("sosoGoodsUrl") || '',
		weixinOpenId:'',
		goodsData:'',
		userLoginInfo: {
			id:false,  //用户ID
			mobile:false, // 用户手机
			avatar:false, // 用户头像
			nickName:false, //用户昵称
			inviterCode:false, //用户邀请码
			isBindWeixin:false, //绑定微信
			isBindTaobao:false, //绑定淘宝
			isBindBank:false, //绑定银行卡
			inviter:false,//邀请人
		},
		isBindSystem:{
			userSystemInfo:false, //客户端设备信息
			uniPush:false, //是否开启推送
			isImei:false,// 默认imei需要授权
		},
		
	},
	mutations: {
		systemInfo(state,opotions){ //更新客户端设备信息
			state.isBindSystem.userSystemInfo = true;
			state.systemInfo = opotions ;
			storage.set('systemInfo',opotions)
		},
		jxConfig(state,data){
			let thisConfig = storage.get("jxConfig");
			data.config = data.config.constantVersion ? data.config : thisConfig.config;
			data.iconList = data.iconList.iconListVersion ? data.iconList : thisConfig.iconList;
			data.bannerList = data.bannerList.bannerListVersion ? data.bannerList : thisConfig.bannerList;
			state.jxConfig = data;
			storage.set('jxConfig',data)
		},
		weixinOpenId(state,data){
			state.weixinOpenId = data;
		},
		sosoGoodsUrl(state,data){
			state.sosoGoodsUrl = data;
			storage.set('sosoGoodsUrl', data)
		},
		goodsData(state,data){
			state.goodsData = data;
		},
		imeiInfo(state,data){
			state.isBindSystem.isImei = true;
			state.imei = data;
			storage.set('imei', data)
		},
		pushInfo(state,data){
			state.pushInfo = data;
			storage.set('pushInfo', data)
		},
		jxUserInfo(state,opostion){
			state.jxUserInfo = opostion
			storage.set('jxUserInfo', opostion)
		},
		versionInfo(state,data){
			state.version = data;
			storage.set('version',data)
		},
		token(state,data){ //更新token
			state.token = data;
			storage.set('token', data)
			console.log(JSON.stringify(state.token));
		},
		userBindTaobaoInfo(state,data){
			state.isBindTaobao = data;
			state.userLoginInfo.isBindTaobao = true;
			storage.set('userBindTaobaoInfo', data)
		},
		login(state, opotions) {
			state.isLogin = true;
			state.userInfo = opotions;
			storage.set('userInfo',opotions)
			console.log(JSON.stringify(state.userInfo));
		},
		logout(state) {
			state.isLogin = false;
			state.token = '';
			storage.remove('token')
		}
	},
	actions: {
	
	}
})

export default store