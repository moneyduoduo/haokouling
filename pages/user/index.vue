<template>
	<view class="homeContent">
		<view class='hederBar' :style="{paddingTop: statusBarHeight+'px',background: 'rgba(255, 227, 0,'+ percentScorll +')'}">
			<view class="iconLaft"></view>
			<view class="title">我的</view>
			<view class="iconRight">
				<view class="iconsize" @tap="goSet">
					<image src="/static/image/home/manage.png"></image>
				</view>
				<view class="iconsize" @tap="goMessage">
					<image src="/static/image/home/massge.png"></image>
				</view>
			</view>
		</view>
		<view class="topBar" :style="{paddingTop: (statusBarHeight*2+108)+'upx'}" >

			<view class="userInfoBar">
				<view class="userBox">
					<view class="userPic" @tap="goUserInfo">
						<image :src="userData.avatar||'/static/image/home/user-icon.png'"></image>
					</view>
					<view class="userName" v-if="isLogin">
						<view class="name">{{userData.nickName}}</view>
						<view class="invite" >
							<view class="invite_code">
								邀请码：{{userData.inviterCode}}
							</view>
							<view class="copy_code" @tap="copyinfo(userData.inviterCode)">
								复制邀请码
							</view>
						</view>
					</view>
					<view class="userName" v-else>
						<view class="name">Hi~欢迎来到好口令</view>
						<view class="login" @click="login">注册/登录</view>
					</view>
				</view>
			</view>

			<view class="moneyInfoBar">
				<view class="moneyInfo">
					<image class="userLevel" :src="gradeIcon" v-if="isLogin">
					</image>
					<view class="balance" @click="tixian">
						<view class="balance_num">
							{{withdrawMoney}}
						</view>
						<view class="balance_title">
							账户余额
						</view>
					</view>
					<view class="income">
						<!-- <view class="left-income " @click="tixian">
							<view class="left-text">
								账户余额	&gt;
							</view>
							<view class="left-num">
								{{withdrawMoney}}
							</view>
						</view> -->
						<!-- <view class="right-income"> -->
							<view class="row" @tap="goShouyi">
								<view class="income-num">
									{{todayTotalCommission}}
								</view>
								<view class="income-text">
									今日预估收入（元）
								</view>
								
							</view>
							<view class="row" @tap="goShouyi">
								<view class="income-num">
									{{thisTotalCommissionBalance}}
								</view>
								<view class="income-text">
									本月预估收入（元）
								</view>
							</view>
						<!-- </view> -->
					</view>
					<view class="coupon">
						<view class="coupon-balance">
							<text class="balance-text">
								优惠额度：
							</text>
							<text class="num">{{couponMoney}}</text>
							<text class="coupon-btn" @click="goCharge">
								充值
							</text>
						</view>
						<view class="coupon-history">
							<text class="balance-text">
								累计充值：
							</text>
							<text class="num">{{totalCouponMoney}}</text>
							<text class="coupon-btn" @click="goRecord">
								明细
							</text>
						</view>
					</view>
					<view class="govip" @tap="goVip()">
						<image class="vip-icon" src="../../static/image/home/vip_icon.png">
						</image>
						<view class="vip-text">
							升级vip会员最高返现奖励100%</text>
						</view>
						<view class="right-text">
							去升级&gt;
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="homeContentMain" :style="{marginTop: (statusBarHeight*2+240)+'upx'}">
			<view class="home_nav1">
				<view class="nav1_list" @tap="goShouyi">
					<image class="nav1_icon" src="../../static/image/home/nav1_1.png">
					</image>
					<view class="nav1_text">
						我的收益
					</view>
				</view>
				<view class="nav1_list"  @tap="goOrder(0,0,1)">
					<image class="nav1_icon" src="../../static/image/home/nav1_2.png">
						
					</image>
					<view class="nav1_text">
						订单明细
					</view>
				</view>
				<view class="nav1_list" @tap="goFans">
					<image class="nav1_icon" src="../../static/image/home/nav1_3.png">
						
					</image>
					<view class="nav1_text">
						我的粉丝
					</view>
				</view>
				<view class="nav1_list"  @tap="shareFc">
					<image class="nav1_icon" src="../../static/image/home/nav1_4.png">
						
					</image>
					<view class="nav1_text">
						分享好友
					</view>
				</view>
			</view>
			<view class="home_nav2">
				<view class="nav2_list"  >
					<view class="nav2_title">
						地推物料
					</view>
					<view class="nav2_text">
						为你准备
					</view>
				</view>
				<view class="nav2_list" @tap="goOrder(2,0,2)">
					<view class="nav2_title">
						粉丝订单
					</view>
					<view class="nav2_num">
						{{orderCount}}个
					</view>
				</view>
			</view>
			<view class="homeBannerBar" @tap="goVip()">
				<view class="homeBanner">
					
					<!-- <image src="/static/image/home/homeBanner.png"> -->
					<image src="http://img.jixiangshenghuo.com/shengjivip.gif">
				</view>
			</view>

			<view class="linkIconListBar">
				<view class="linkIconList">
					<view class="iconBox" @tap="goOrder(0,1,1)">
						<view class="icon">
							<image src="/static/image/home/homeIconList_01.png"></image>
						</view>
						<view class="text">淘宝订单</view>
					</view>
					<view class="iconBox" @tap="goOrder(0,2,1)">
						<view class="icon">
							<image src="/static/image/home/homeIconList_02.png"></image>
						</view>
						<view class="text">京东订单</view>
					</view>
					<view class="iconBox">
						<view class="icon" @tap="goOrder(0,3,1)">
							<image src="/static/image/home/homeIconList_03.png"></image>
						</view>
						<view class="text">拼多多订单</view>
					</view>
				
					<view class="iconBox" @tap="goBill">
						<view class="icon">
							<image src="/static/image/home/homeIconList_04.png"></image>
						</view>
						<view class="text">账单明细</view>
					</view>
					
					<view class="iconBox" @tap="fetchMoney">
						<view class="icon">
							<image src="/static/image/home/homeIconList_05.png"></image>
						</view>
						<view class="text">奖励提取</view>
					</view>
					<view class="iconBox" @tap="shareFc">
						<view class="icon">
							<image src="/static/image/home/homeIconList_06.png"></image>
						</view>
						<view class="text">邀请好友</view>
					</view>
					<view class="iconBox" @tap="goMyCode">
						<view class="icon">
							<image src="/static/image/home/homeIconList_07.png"></image>
						</view>
						<view class="text">二维码邀请</view>
					</view>
					<view class="iconBox" @tap="goCollection">
						<view class="icon">
							<image src="/static/image/home/homeIconList_08.png"></image>
						</view>
						<view class="text">收藏夹</view>
					</view>
					<view class="iconBox" @tap="goHistory">
						<view class="icon">
							<image src="/static/image/home/homeIconList_09.png"></image>
						</view>
						<view class="text">浏览足迹</view>
					</view>
					<view class="iconBox"  @tap="goSetCode">
						<view class="icon ">
							<image src="/static/image/home/homeIconList_10.png"></image>
						</view>
						<view class="text">定制邀请码</view>
					</view>
					<view class="iconBox" @tap="goChangeTel">
						<view class="icon ">
							<image src="/static/image/home/homeIconList_11.png"></image>
						</view>
						<view class="text">修改手机号</view>
					</view>
					<view class="iconBox" @tap="resetPassword">
						<view class="icon">
							<image src="/static/image/home/homeIconList_12.png"></image>
						</view>
						<view class="text">重置密码</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10px">
					<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button type="warn" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<button type="warn" size="mini" @tap.prevent.stop="share()">分享图片</button>
				</view>
			</view>
		</view>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>


	</view>
</template>
<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	import _app from '@/common/QS-SharePoster/app.js';
	import getSharePoster from '@/common/QS-SharePoster/QS-SharePoster.js';
	export default {
		components: {

		},
		data() {
			return {
				headerTran:false,
				statusBarHeight,
				isScorll: false,
				isLogin: false,
				myMoney: 0,
				nowMoney: 0,
				prevMoney: 0,
				userData: '',
				moneyData: 0,
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				sharePic: '/static/image/home/shareBg.jpg',
				canvasIndex: 0,
				orderCount: 0,
				fansCount: 0,
				grade: 1,
				gradeName: '',
				gradeIcon: '',
				percentScorll: 0,
				todayTotalCommission: 0.00,
				couponMoney:0,
				totalCouponMoney:0,
				thisTotalCommissionBalance:0,
			}
		},

		onLoad: function() {
			
		},
		onShow: function() {
			let isLogin = this.$store.state.token;
			if (isLogin) {
				this.getdata()
			}
			uni.hideLoading()
		},
		onPageScroll: function(obj) {
			
			this.percentScorll = obj.scrollTop/80
			// this.headerTran = true
			// if (obj.scrollTop < 3) {
			// 	this.isScorll = false
			// } else {
			// 	this.isScorll = true
			// }
		},
		methods: {
			goRecord() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: 'coupon/couponRecord?totalCouponMoney='+this.totalCouponMoney
				})
				
			},
			goCharge() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: 'coupon/couponCharge'
				})
			},
			goSetCode() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: 'setCode'
				})
			},
			goVip() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: 'vip?grade=' +this.grade
				})
			},
			goMessage(){
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: 'message'
				})
			},
			goBill() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: 'bill'
				})
			},
			goMyCode() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: 'myCode'
				})
			},
			fetchMoney() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: '/pages/user/fetchMoney'
				})
			},
			goEditPassword(){
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: '../pass/editPassword'
				})
			},
			goChangeTel(){
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: '../pass/changeTel'
				})
			},
			resetPassword(){
				uni.navigateTo({
					url: '../pass/reset'
				})
			},
			checkLogin() {
				let isLogin = this.$store.state.token
				if (isLogin) {
					return true
				}
				uni.navigateTo({
					url: "/pages/pass/login"
				});
				return false
			},
			goUserInfo() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: "./userInfo"
				})
			},
			goSet() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: "./set"
				})

			},
			goShouyi() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: "./income"
				})
			},
			goOrder(index, orderType,oType) {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: "./orderNew?tabIndex=" + index + "&orderType=" + orderType +'&oType=' + oType
				})
			},
			goFans() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: "./inviterList"
				})
			},
			login: function() {
				uni.navigateTo({
					url: '../pass/login'
				});
			},
			async getdata() {
				this.$http.post('/api/buyer/getEarnings').then( res => {
					this.todayTotalCommission = parseFloat(res.data.day.todayOrderNumBalance).toFixed(2)  
					this.thisTotalCommissionBalance = parseFloat(res.data.month.thisTotalCommissionBalance).toFixed(2) 
				}) 
				let data = await this.$http.post('/api/buyer/getIndex')
				data.data.buyerInfo.avatar = this.$common.qiniuCdnUrl(data.data.buyerInfo.avatar)
				this.userData = data.data.buyerInfo
				this.myMoney = data.data.buyerDetailInfo.withdrawMoney
				this.prevMoney = parseFloat(data.data.statInfo.month.lastTotalCommission)+parseFloat(data.data.statInfo.month.lastTotalCommissionBalance)
				this.nowMoney = parseFloat(data.data.statInfo.month.thisTotalCommission)+parseFloat(data.data.statInfo.month.thisTotalCommissionBalance)
				this.grade = data.data.buyerDetailInfo.grade
				this.couponMoney = data.data.buyerDetailInfo.couponMoney
				this.totalCouponMoney =data.data.buyerDetailInfo.totalCouponMoney
				this.gradeIcon = '/static/image/home/vip' + this.grade + '.png'
				let gradeName = this.$store.state.jxConfig.config.gradeList[this.grade]
				this.gradeName = gradeName
				this.orderCount = data.data.statInfo.inviterOrderNum + data.data.statInfo.inviterOrderNumBalance
				this.fansCount = data.data.buyerDetailInfo.inviterCount
				this.isLogin = true
				
				this.$store.commit('jxUserInfo', data.data)
			},
			goCollection() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: "./collection"
				});

			},
			goHistory() {
				if (!this.checkLogin()) {
					return
				}
				uni.navigateTo({
					url: "./history"
				});
			},
			copyinfo: function(e) {
				this.$common.copy(e)
			},

			/* async fansList(){
				let data = await this.$http.post('/api/inviter/getList',{type:0})
				this.fansCount = data.data.total
			}, */
			tixian: function() {
				if (!this.checkLogin()) {
					return
				}
				this.$http.post('/api/alipay/getDetail')
					.then(res => {
						if (res.code < 0) {
							this.$msg.confirm({
								title: '温馨体系',
								content: '请先绑定支付宝账号！'
							}, function() {
								uni.navigateTo({
									url: "./addZhiFuBao"
								})
							})

						} else {
							uni.navigateTo({
								url: "./fetchMoney"
							})
						}
					})
			},

			checkVersion() {
				let version = this.$store.state.version
				let config = this.$store.state.jxConfig
				if (config.hasOwnProperty('versionInfo')) {
					this.$msg.confirm({
						title: '更新提示',
						content: `发现新版本${config.versionInfo.version}`,
						confirmText: '马上更新'
					}, () => {
						this.openUpLoadPage(config.versionInfo)
					})
				} else {
					this.$msg.toast(`当前最新版本${version}`)
				}

			},
			async shareFc() {
				if (!this.checkLogin()) {
					return
				}
				return uni.navigateTo({
					url: '/pages/user/inviterCode'
				})
				try {
					if (!this.poster.finalPath) {
						let jxConfig = this.$store.state.jxConfig
						let userInfo = this.$store.state.userInfo
						let inviterUrl = `${jxConfig.config.inviterUrl}?app=1&inviterCode=${userInfo.inviterCode}`
						const d = await getSharePoster({
							type: 'testShareType',
							posterCanvasId: this.canvasId,
							backgroundImage: this.sharePic,
							qrCodeArray: ({
								bgObj,
								type,
								bgScale
							}) => {
								return [{
									text: inviterUrl, //二维码地址
									size: bgObj.width * 0.2,
									dx: bgObj.width * 0.4,
									dy: bgObj.height - bgObj.width * 0.36
								}]
							},
							setCanvasWH: ({
								bgObj,
								type,
								bgScale
							}) => { // 为动态设置画布宽高的方法，
								this.poster = bgObj;
							},
						});
						console.log('海报生成成功， 临时路径: ' + d.poster.tempFilePath)
						this.poster.finalPath = d.poster.tempFilePath;
					}
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifdef APP-PLUS
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
			},
			share() {
				let _this = this
				plus.share.sendWithSystem({
					type: 'image',
					pictures: [_this.poster.finalPath]
				}, '', '')
				//_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);


				// #ifdef H5
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}
		},
		computed: {
			withdrawMoney: function() {
				return parseFloat(this.myMoney).toFixed(2)
			},
			lastTotalCommission: function() {
				return parseFloat(this.prevMoney).toFixed(2)
			},
			thisTotalCommission: function() {
				return parseFloat(this.nowMoney).toFixed(2)
			}
		},
		onPullDownRefresh() {
			let isLogin = this.$store.state.token;
			console.log(isLogin);
			if (isLogin) {
				this.getdata()
	
			}
			uni.stopPullDownRefresh();
		},
	}
</script>
<style>
	@import "../../static/css/global.css";
	.coupon {
		display: flex;
		height: 52upx;
		margin-top: 30rpx;
	}
	.coupon-balance {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.coupon-history {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.balance-text {
		color: #c8c8c8;
		padding-left: 10upx;
		font-size: 24rpx;
	}
	.num {
		color: #fff;
		font-size: 40rpx;
	}
	.coupon-btn {
		background:linear-gradient(-30deg,rgba(252,211,136,1),rgba(229,162,47,1));
		color: #333;
		padding: 0 16upx;
		height: 40upx;
		border-radius: 40upx;
		line-height: 40upx;
		margin-left: 20upx;
		font-size: 24rpx;
	}
	.homeContent {
		background: #fff;
		height: 100%;
	}
	
	.topBar {
		position: relative;
		/* box-sizing: border-box; */
		height: 480rpx;
		padding: 140rpx 20rpx 20rpx;
		width: 100%;
		background-image: url('../../static/image/home/top_bg.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.hederBar {
		box-sizing: content-box;
		width: 100%;
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 99999;
		background: rgba(241, 105, 111, 0);

	}
/* 	.header-tran {
		transition: all 1.2s ease;
	}
	.scroll-hederBar {
		background: rgba(241, 105, 111, 1);
	}
 */
	.hederBar .iconLaft,
	.hederBar .iconRight {
		width: 160rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 40upx;
	}

	.iconsize {
		width: 40rpx;
		height: 40rpx;
		margin-left: 40rpx;
		
	}
	.iconsize image {
		width: 100%;
		height: 100%;
	}

	.hederBar .title {
		flex: 1;
		text-align: center;
		font-size: 36rpx;
		color: #333;
	}

	.userInfoBar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx;
	}

	.userInfoBar .userBox {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.userInfoBar .userBox .userPic {
		width: 110rpx;
		height: 110rpx;
		border-radius: 110rpx;
		position: relative;
		margin-right: 20rpx;
	}

	.userInfoBar .userBox .userPic image {
		width: 110rpx;
		height: 110rpx;
		border-radius: 110rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.userInfoBar .userBox .userName {
		flex: 1;
	}

	.userInfoBar .userBox .userName .name {
		color: #333;
		font-size: 38rpx;
		margin-bottom: 20upx;
	}

	.userInfoBar .userBox .userName .invite {
		color: #333;
		font-size: 24rpx;
		display: flex;
	}
	
	.invite_code {
		width: auto;
		line-height: 40rpx;
		font-size: 24rpx;
	}
	.copy_code {
		width: 200rpx;
		color: #FFF9BE;
		background-color: #303030;
		height: 40rpx;
		line-height: 40rpx;
		border-radius: 40rpx;
		text-align: center;
		margin-left: 40rpx;
		font-size: 24rpx;
	}
	.userInfoBar .userBox .userName .userLevel {
		background-color: rgba(0, 0, 0, 0.2);
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: auto;
		margin-top: 10rpx;
	}

	.userInfoBar .userBox .userName .userLevel .levelIcon {
		width: 40rpx;
		height: 40rpx;
	}

	.userInfoBar .userBox .userName .userLevel .levelIcon image {
		width: 100%;
		height: 100%;
	}

	.userInfoBar .userBox .userName .userLevel .levelText {
		flex: 1;
		font-size: 24rpx;
		color: #333;
	}

	.userInfoBar .userBox .userName .login {
		background: #ffffff;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #333;
		width: 180rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		padding: 0 10rpx;
		margin-top: 20rpx;
	}

	.userInfoBar .moneyBar {
		flex: 1;
		text-align: right;
		color: #333;
		position: relative;
	}

	.userInfoBar .moneyBar .money {
		color: #333;
		font-size: 44rpx;
		padding-right: 40rpx;
	}

	.userInfoBar .moneyBar .moneyMoer {
		color: #333;
		
		padding-right: 40rpx;
		margin-top: 10rpx;
		font-size: 28rpx;
	}

	.moneyInfoBar {
		position: relative;
		margin-top: 20rpx;
	}

	.moneyInfoBar .moneyInfo {
		background: #fff;
		border-radius: 20rpx;
		position: absolute;
		left: 0;
		height: 460upx;
		bottom: -460rpx;
		background: url(../../static/image/home/bg_mine.png) no-repeat;background-size: 100% 100%;
		border-radius: 30upx;
		overflow: hidden;
	}
/* 	.left-text::before {
		content: '\E633';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
	} */
	.balance {
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
	}
	.balance .balance_num {
		font-size: 80rpx;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #fff;
	}
	.balance .balance_title {
		margin-top: 30rpx;
		color: #fff;
		font-size: 32rpx;
		text-align: center;
	}
	.income {
		/* margin-top: 40upx; */
		display: flex;
	}
	.right-income {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.income-text {
		color: #c8c8c8;
		text-align: center;
		margin-top: 14rpx;
		font-weight: 200;
		font-size: 24rpx;
	}
	.income-num {
		color: #fff;
		text-align: center;
		margin-top: 14upx;
	}
	.income-num {
		font-size: 40upx;
	}	
	.row {
		flex-direction: column;
		font-size: 32upx;	
		flex: 1;
		position: relative;
	}
	.row:first-child:after {
		content: '';
		position: absolute;
		width: 2rpx;
		height: 60rpx;
		background-color: #c8c8c8;
		right: 0;
		bottom: 8rpx;
	}
	.govip {
		margin: 20upx auto 0;
		height: 40upx;
		width: 650upx;
		background: #F9D7A9;
		border-radius: 50upx;
		display: flex;
		align-items: center;
		padding-left: 10upx;
	}
	.vip-icon {
		width: 30upx;
		height: 30upx;
		
	}
	.vip-text {
		flex: 1;
		padding-left: 10upx;
		font-size: 24rpx;
		color: #333;
	}
	.right-text {
		width: 100upx;
		font-size: 24rpx;
	}
	.moneyInfo .userLevel{
		position: absolute;
		display: flex;
		left: 0 ;
		top: 0;
		width: 172rpx;
		height: 62rpx;
	}
	.moneyInfoBar .moneyInfo .textCenter {
		text-align: center;
	}

	.moneyInfoBar .moneyInfo .textCenter .number {
		font-size: 36rpx;
		color: #fa3300;
	}

	.moneyInfoBar .moneyInfo .textCenter .text {
		margin-top: 20rpx;
		color: #575757;
	}
	
	.moneyInfoBar .moneyInfo .row_01,
	.moneyInfoBar .moneyInfo .row_02 {
		border-right: 1px solid #eeeeee;
	}
	.home_nav1 {
		padding: 26rpx 68rpx 0 68rpx;
		display: flex;
		justify-content: space-between;
	}
	.home_nav1 .nav1_list {
		display: flex;
		flex-direction: column;
		width: 104rpx;
	}
	.home_nav1 .nav1_list .nav1_icon {
		width: 104rpx;
		height: 104rpx;
	}
	.home_nav1 .nav1_list .nav1_text {
		text-align: center;
		font-size: 24rpx;
		color: #666;
	}
	.home_nav2 {
		display: flex;
		justify-content: center;
		margin-top: 30rpx;
	}
	.home_nav2 .nav2_list {
		padding-left: 50rpx;
		width: 362rpx;
		height: 155rpx;
		box-sizing: border-box;
		
	}
	.home_nav2 .nav2_list:first-child {
		background: url(../../static/image/home/nav2_1.png) no-repeat;background-size: 100% 100%;
	}
	.home_nav2 .nav2_list:last-child {
		background: url(../../static/image/home/nav2_2.png) no-repeat;background-size: 100% 100%;
	}
	.home_nav2 .nav2_list .nav2_title {
		margin-top: 30rpx;
		margin-bottom: 8rpx;
		color: #585858;
		font-size: 32rpx;
	}
	.home_nav2 .nav2_list .nav2_text {
		color: #585858;
		font-size: 24rpx;
	}
	.home_nav2 .nav2_list .nav2_num {
		color: #585858;
		font-size: 32rpx;
	}
	.homeContentMain {
		padding: 20rpx 0;
		margin-top: 110rpx;
	}

	.homeContentMain .homeBannerBar {
		background: #fff;
		border-radius: 20rpx;
		
	}

	.homeContentMain .homeBannerBar .homeBanner {
		width: 740rpx;
		height: 190rpx;
		margin: 0 auto;

	}
	.homeContentMain .homeBannerBar .homeBanner image {
		height: 100%;
		width: 100%;
	}
	.homeContentMain .linkIconListBar {
		padding: 20rpx 30rpx 30rpx 30rpx;
		background: #fff;
		border-radius: 20rpx;
	}

	.homeContentMain .linkIconListBar .linkIconList {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		box-shadow:0px 0px 32rpx 0px rgba(56,56,56,0.2);
		border-radius: 16rpx;
		padding-bottom: 40rpx;
	}

	.homeContentMain .linkIconListBar .linkIconList .iconBox {
		width: 165rpx;
		margin-top: 40rpx ;
	}

	.homeContentMain .linkIconListBar .linkIconList .iconBox .icon {
		width: 102rpx;
		height: 86rpx;
		margin: auto;
	}

	.homeContentMain .linkIconListBar .linkIconList .iconBox .icon image {
		width: 102rpx;
		height: 86rpx;
	}

	.homeContentMain .linkIconListBar .linkIconList .iconBox .text {
		color: #6a6a6a;
		text-align: center;
		font-size: 24rpx;
	}

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500rpx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
		width: auto;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10rpx;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 500rpx;
		height: 890rpx;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
