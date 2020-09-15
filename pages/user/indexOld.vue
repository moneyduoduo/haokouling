<template>
	<view>
		<view v-if="!show" class="yj-bg-main yj-pad-l-big yj-pad-t-super yj-pad-b-super">
			<!-- <view class="yj-text-right yj-pad-t yj-pad-r"><img class="xiaoxi" src="../../static/img/xiaoxi@2x.png" mode="widthFix"
				 @tap="xiaoxi"></view> -->
			<view class="yj-pad-tb-big">
				<view class="yj-text-biger">Hi~欢迎来到集享</view>
				<view class="yj-mar-tb">愿您购物愉快</view>
				<view class="yj-btn yj-bg-fff yj-color-main yj-circle yj-sm" @click="login">注册/登录</view>
			</view>
		</view>

		<view v-else>
			<view class="yj-user-header-bg">
				<image class="yj-user-header-bgpic" src="../../static/img/user/user_header_bg.png" mode=""></image>
				<view class="yj-user-bg yj-border-box ">
					<view class="yj-display-flex yj-middle">
						<view class="yj-display-flex yj-middle yj-flex-1 yj-pad-l">
							<navigator class="yj-user-photo" url="./set">
								<image class="yt-headimg" :src="userData.avatar||'/static/img/taobao-icon.png'"></image>
							</navigator>
							<view class="yj-user-baseinfo yj-pad-l-sm">
								<view class="yj-clearfix">
									<text class="yj-text-bold yj-text-biglotter yj-left">{{userData.nickName}}</text>
									<view :class="'yt-grade-type grade_'+vipgrade">
										<image :src="'../../static/img/grade_'+vipgrade+'.png'" mode="widthFix"></image>
										{{vipgradename}}
									</view>
								</view>
								<view class="yj-color-gray"  @longpress="copyinfo(userData.inviterCode)">
									邀请码：{{userData.inviterCode}}
								</view>
							</view>
						</view>
						<!-- <navigator class="yt-huiyuannote" :url="'./gradenote?gradetype='+vipgrade">
							<image class="yj-mar-r-min" src="../../static/img/user/star.png" style="width:36upx;height: 36upx;"></image>
							<text>会员等级</text>
						</navigator> -->
					</view>
					
					<view class="yj-display-flex yj-between yj-pad-lr-big yj-pad-b yj-text-center yj-mar-t-biger">
						<view class="" @click="tixian">
							<view class="yj-jinqian">{{moneyData.withdrawMoney}}</view>
							<view class="yj-text-min yj-color-main yj-mar-t-min yj-color-gray-light" v-if="!isReview">可提现<image class="yj-mar-l-min" src="../../static/img/user/goarraw.png" style="width:14upx;height: 21upx;" ></image></view>
						</view>
						<view class="">
							<view class="yj-jinqian">{{prevmoney.toFixed(2)}}</view>
							<view class="yj-text-min yj-mar-t-min yj-color-gray-light">上月预估 (元)</view>
						</view>
						<view class="">
							<view class="yj-jinqian">{{nowmoney.toFixed(2)}}</view>
							<view class="yj-text-min yj-mar-t-min yj-color-gray-light">本月预估 (元)</view>
						</view>
					</view>				
				</view>		
			</view>
		
			<view class="yj-pad-b  yj-radius yj-mar-lr yj-bg-fff" v-if="!isReview">
				<view class="yj-pad-lr yj-pad-tb-sm yj-text-bold yj-text-big">
					主要工具
				</view>
				<view class="yj-display-flex yj-middle yj-text-center yj-user-meau-main">
					<navigator class="yj-flex-1" url="./order" hover-class="none">
						<view class="yt-user-icon">
							<image src="../../static/img/dingdan.png" mode="widthFix"></image>
						</view>
						<view class="yj-color-gray-light">订单</view>
					</navigator>
					<navigator class="yj-flex-1" url="./market" hover-class="none">
						<view class="yt-user-icon">
							<image src="../../static/img/shichang.png" mode="widthFix"></image>
						</view>
						<view class="yj-color-gray-light">粉丝</view>
					</navigator>
					<!-- <navigator class="yj-flex-1" :url="'./invite?code='+userData.code" hover-class="none">
						<view class="yt-user-icon">
							<image src="../../static/img/yaoqing.png" mode="widthFix"></image>
						</view>
						<view class="yj-color-gray-light">邀请</view>
					</navigator> -->
					<navigator class="yj-flex-1" url="./income" hover-class="none">
						<view class="yt-user-icon">
							<image src="../../static/img/shouyi.png" mode="widthFix"></image>
						</view>
						<view class="yj-color-gray-light">收益</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="yj-mar" @tap="menu('/pages/detail/index?itemId=599975928512')" v-if="isReview">
			<image src="../../static/img/user/user_ad1.png" style="width: 690rpx; height:170rpx"></image>
		</view>
		<view class="yj-mar" v-else>
			<image src="../../static/img/user/user_ad.png" style="width: 690rpx; height:170rpx"></image>
		</view>
		<view class=" yj-radius yj-mar-lr yj-mar-t yj-mar-b-super yj-bg-fff">
			<view class="yj-pad-lr yj-pad-tb-sm yj-text-bold yj-text-big">
				常用工具
			</view>
			<view class="yj-grid yj-four yj-middle yj-text-center">
				<view class="yj-grid-item" @click="urlShop" hover-class="none" v-if="!isReview">
					<image class="yj-grid-icon" src="../../static/img/user/user_cart.png" mode="widthFix"></image>
					<view class="yj-grid-title">购物车</view>
				</view>
				<!-- <view class="yj-grid-item" @click="urlOrder">
					<image class="yj-grid-icon" src="../../static/img/user/user_taobao.png" mode="widthFix"></image>
					<view class="yj-grid-title">淘宝订单</view>
				</view> -->
				<!-- <navigator class="yj-grid-item" url="./drawgoods" hover-class="none" v-if="!show">
					<image class="yj-grid-icon" src="../../static/img/user/user_shop.png" mode="widthFix"></image>
					<view class="yj-grid-title">0元购</view>
				</navigator> -->
				<view class="yj-grid-item" @tap="goCollection" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/star.png" mode="widthFix"></image>
					<view class="yj-grid-title">收藏</view>
				</view>
				<!-- <navigator class="yj-grid-item" url="./contactus" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_contact.png" mode="widthFix"></image>
					<view class="yj-grid-title">寻求帮助</view>
				</navigator> -->
				<!-- <navigator class="yj-grid-item" :url="'../index/webview?url='+rooturl+'index/App/hand'"
				 hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_new.png" mode="widthFix"></image>
					<view class="yj-grid-title">新手教程</view>
				</navigator> -->
				<!-- <navigator class="yj-grid-item" :url="'../index/webview?url='+rooturl+'index/App/about'"
				 hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_about.png" mode="widthFix"></image>
					<view class="yj-grid-title">关于我们</view>
				</navigator> -->
				<navigator class="yj-grid-item" url='/pages/detail/index?itemId=600561786164' hover-class="none" v-if="isReview">
					<image class="yj-grid-icon" src="../../static/img/user/user_question.png" mode="widthFix"></image>
					<view class="yj-grid-title">必买商品</view>
				</navigator>
				<navigator class="yj-grid-item" url="./set" hover-class="none" v-if="isReview">
					<image class="yj-grid-icon" src="../../static/img/user/user_set.png" mode="widthFix"></image>
					<view class="yj-grid-title">设置</view>
				</navigator>
				<view class="yj-grid-item" @tap="checkVersion">
					<image class="yj-grid-icon" src="../../static/img/user/version.png" mode="widthFix"></image>
					<view class="yj-grid-title">版本:{{version}}</view>
				</view>
				<!--<navigator class="yj-grid-item" url="../video/my" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_set.png" mode="widthFix"></image>
					<view class="yj-grid-title">我的视频</view>
				</navigator>
				<navigator class="yj-grid-item" url="../video/shaiform" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_set.png" mode="widthFix"></image>
					<view class="yj-grid-title">晒单</view>
				</navigator>
				 <navigator class="yj-grid-item" url="../video/videolist" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_set.png" mode="widthFix"></image>
					<view class="yj-grid-title">videolist</view>
				</navigator> -->
				<!-- <navigator class="yj-grid-item" url="../video/videoswiper" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_set.png" mode="widthFix"></image>
					<view class="yj-grid-title">videoSwiper</view>
				</navigator>
				<navigator class="yj-grid-item" url="../video/videotaobao" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_set.png" mode="widthFix"></image>
					<view class="yj-grid-title">视频单</view>
				</navigator>
				<navigator class="yj-grid-item" url="../video/index" hover-class="none">
					<image class="yj-grid-icon" src="../../static/img/user/user_set.png" mode="widthFix"></image>
					<view class="yj-grid-title">my</view>
				</navigator> -->
			</view>
		</view>
		<!-- <authtip :show="isauth"></authtip> -->
	</view>
</template>
<script>
/* 	var _self;
	var baseurl = ''; */
	import ytHeader from '../../components/header.vue';
	//var bctaobao = require("../../static/js/my.js");
	// require插件名称  
	export default {
		components: {
			ytHeader
		},
		data() {
			return {
				isauth:true,
				header: '',
				rooturl:'',
				show: false,
				userData: '',
				moneyData:0,
				storage: '0.3',
				version: '',
				vipgrade: 0, //0 普通会员 1 金牌会员 2合伙人 3 VIP
				vipgradename: '普通会员',
				prevmoney: 0, //上次存储的 本月预估
				nowmoney: 0, // 现在的金额 本月预估
				isReview:0,
			}
		},
		onLoad: function() {
			let isLogin = this.$store.state.token
			this.version = this.$store.state.version
			this.show = isLogin
			if(isLogin){
				this.getdata()
			}
			this.isReview = this.$storage.get('isReview');
		},
		onShow: function() {
			let jxUserInfo = this.$store.state.jxUserInfo
			if(jxUserInfo){
				this.userData = jxUserInfo.buyerInfo
				this.moneyData = jxUserInfo.buyerDetailInfo
				this.prevmoney = jxUserInfo.statInfo.month.lastTotalCommissionBalance
				this.nowmoney =  jxUserInfo.statInfo.month.thisTotalCommissionBalance
			}
		},
		methods: {
			login: function() {
				uni.navigateTo({
					url: '../pass/index'
				});
			},
			menu: function(e) {
				uni.navigateTo({
					url: e
				})
			},
			async getdata(){
				let data = await this.$http.post('/api/buyer/getIndex')
				data.data.buyerInfo.avatar = this.$common.qiniuCdnUrl(data.data.buyerInfo.avatar)
				this.userData = data.data.buyerInfo
				this.moneyData = data.data.buyerDetailInfo
				this.prevmoney = data.data.statInfo.month.lastTotalCommission
				this.nowmoney =  data.data.statInfo.month.thisTotalCommission
				this.$store.commit('jxUserInfo',data.data)
			},
			goCollection(){
				let topken = this.$store.state.token
				if(!topken){
					this.$msg.confirm({title:'温馨提示',content:'请先登录后操作！'},function(){
						uni.navigateTo({
							url: "/pages/pass/login"
						});
					})
					
				}else{
					uni.navigateTo({
						url: "./collection"
					});
				}
			},
			copyinfo:function(e) {
				this.$common.copy(e)
			},
			xiaoxi: function() {
				uni.navigateTo({
					url: "../index/news"
				})
			},
			tixian:function(){
				this.$http.post('/api/alipay/getDetail')
				.then(res=>{
					if(res.code<0){
						this.$msg.confirm({
							title:'温馨体系',
							content:'请先绑定支付宝账号！'
						},function(){
							uni.navigateTo({
								url: "./addZhiFuBao"
							})
						})
						
					}else{
						uni.navigateTo({
							url: "./fetchMoney"
						})
					}
				})
			},
			
			checkVersion(){
				let version = this.$store.state.version
				let config = this.$store.state.jxConfig
				if(config.hasOwnProperty('versionInfo')){
					this.$msg.confirm({title:'更新提示',content:`发现新版本${config.versionInfo.version}`,confirmText:'马上更新'},()=>{
						this.openUpLoadPage(config.versionInfo)
					})
				}else{
					this.$msg.toast(`当前最新版本${version}`)
				}
				
			},
			openUpLoadPage(res){
				
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
				//#endif
			},
			//打开我的购物车
			urlShop: function() {
				this.$bindSystem.baiChuan.OpenMyCart()
			},
			//我的订单
			urlOrder: function() {
				//bctaobao.myorder();
			},
			sound: function() {
				console.log("进入了sound1");
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = '../../static/sound/money.mp3';
				innerAudioContext.autoplay = true;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
			},
			sound2: function() {
				
				var p = plus.audio.createPlayer(baseurl + "public/static/Home/pc/static/sound/money.mp3");
				console.log(p);
				p.play(function() {
					console.log("Audio play success!");
				}, function(e) {
					console.log("Audio play error: " + e.message);
				});
			},
		}

	}
</script>
<style lang="less">
	@import "../../static/css/mycss.less";

	.yt-header {
		position: relative !important;
	}

	.yj-user-photo {
		background-color: #eee;
		border-radius: 50%;
		box-shadow: 2px 2px 27px rgba(209, 209, 209, .22);
		margin-top: -35upx;
	}

	page {
		//background-color: #fff;
	}

	.xiaoxi {
		width: 40upx;
		height: 40upx;
	}

	.yj-user-yue {
		margin: 0 60upx;
		background-color: #333;
		color: #FFD647;
		font-size: 30upx;
		border-radius: 30upx 30upx 0 0;
		padding: 20upx 30upx;
	}

	.yj-tixian {
		width: 166upx;
		height: 48upx;
		line-height: 48upx;
		text-align: center;
		background-image: linear-gradient(to right, #FED892, #FFCE60);
		color: #333;
		border-radius: 4upx;
	}

	.yj-user-bg {
		/* background-image: url('../../static/img/user_bg.png');
		width: 750upx;
		//height: 347upx;
		background-size: 100% 100%;
		color: #fff; */
		/* height: 290upx; */
		margin: 0 30upx 30upx;
		background-color: #fff;
		border-radius: 15upx;
		position: relative;
	}
	
	.yt-grade-type {
		margin-left: 14upx;
		display: inline-block;
		background-image: linear-gradient(to right,#9f9f9f,#828282);
		padding: 0 20upx 0 5upx;
		height: 34upx;
		line-height: 34upx;
		color: #fff;
		border-radius: 34upx;
		font-size: 20upx;
		font-weight: bold;
	}

	.yt-grade-type image {
		width: 34upx;
		height: 34upx;
		float: left;
		margin-right: 5upx;
		/* vertical-align: middle; */
	}

	.yt-userbaseinfo .title {
		width: auto;
		max-width: 400upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.grade_3 {
		/* color:#FFF427; */
		padding-left: 15upx;
	}

	.grade_2 {
		/* color:#FF343D; */
		padding-left: 15upx;
	}

	/* .grade_1{
		color:#FFF427;
	}
	.grade_0{
		color:#BEBEBE;
	} */

	.yj-user-meau-main .yt-user-icon image {
		width: 70upx;
		height: 70upx;
	}

	.yt-headimg {
		width: 120upx;
		height: 120upx;
		border:5upx solid #FFF1F3;
		border-radius: 50%;
	}

	.yt-huiyuannote {
		height: 56upx;
		/* line-height: 56upx; */
		padding: 0 24upx;
		background-color: #FFEAEB;
		/* background-image: linear-gradient(90deg, #FFD059, #FF9F23); */
		font-size: 26upx;
		color: #FC3251;
		border-top-left-radius: 56upx;
		border-bottom-left-radius: 56upx;
		display: flex;
		align-items: center;
	}

	.yj-box-shadow {
		box-shadow: 2px 2px 27px rgba(209, 209, 209, .22), -2px -2px 27px rgba(209, 209, 209, .22);
	}
	
	
	
	.yj-user-header-bg{
		padding-top: 160upx;
		background-image: url('../../static/img/user/user_header_bg.png');
		background-size: 750upx 361upx;
		background-repeat: no-repeat;
		position: relative;
	}
	.yj-user-header-bgpic{
		position: absolute;
		width: 750upx;
		height: 361upx;
		top: 0;
		left: 0;
	}
	.yj-jinqian{
		font-size: 52upx;
		font-weight: bold;
		color: #333;
	}
</style>
