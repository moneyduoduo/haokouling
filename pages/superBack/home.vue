<template>
	<view class="page_content">
		<!-- <top-bar title="个人中心" :isClose="true" :isKefu="false" bgClass="orange"></top-bar> -->
		<view class="top-bar">
			<view class="user-head">
				<image :src="userInfo.buyerInfo.avatar"></image>
			</view>
			<view class="info">
				<view class="user-info">
					<view class="user-name">
						{{userInfo.buyerInfo.nickName}}
					</view>
					<view class="user-id">
						ID:{{userInfo.buyerInfo.id}}
					</view>
				</view>
				<view class="user-edit">
					<view class="user-detail" @tap="goUserInfo">
						账号信息
					</view>
					<view class="user-detail" @tap="goBank">
						银行信息
					</view>
				</view>
<!-- 				<view class="set" @tap="goBank">
					<image src="../../static/image/superBack/set.png" mode=""></image>
				</view> -->
			</view>
			
			<view class="money">
				<view class="money-type line">
					<view class="money-num ellipsis1">
						{{userInfo.buyerDetailInfo.account}}
					</view>
					<view class="money-title">
						余额(元)
					</view>
					
				</view>
				<view class="money-type line">
					<view class="money-num ellipsis1">
						{{userInfo.buyerDetailInfo.unReturnAccount}}
					</view>
					<view class="money-title">
						待返款(元)
					</view>
					
				</view>
				<view class="money-type line">
					<view class="money-num ellipsis1">
						{{userInfo.buyerDetailInfo.account}}
					</view>
					<view class="money-title">
						已返还(元)
					</view>
					
				</view>
				<view class="withdraw" @tap="goFetchMoney" >
					提现
					<!-- <view class="withdraw" @tap="goFetchMoney">
						
					</view> -->
				</view>
			</view>
		</view>
		<view class="main-content">
			<view class="order">
				<view class="head-content">
					<view class="order-title">
						超级返订单
					</view>
					<view  class="else"  @tap="goOrderList('')">
						查看全部&gt;
					</view>
				</view>
				<view class="content-main">
					<view class="edit-item" @tap="goOrderList(0)">
						<view class="item-icon">
							<image src="../../static/image/superBack/edit.png" mode=""></image>
						</view>
						<view class="item-text">
							待操作
						</view>
					</view>
					<view class="edit-item" @tap="goOrderList(3)">
						<view class="item-icon">
							<image src="../../static/image/superBack/return.png" mode=""></image>
						</view>
						<view class="item-text">	
							待返款
						</view>
					</view>
					<view class="edit-item" @tap="goOrderList(5)">
						<view class="item-icon">
							<image src="../../static/image/superBack/fail.png" mode=""></image>
						</view>
						<view class="item-text">
							已取消
						</view>
					</view>
		<!-- 			<view class="edit-item">
						<view class="item-icon">
							<image src="../../static/image/superBack/pingjia.png" mode=""></image>
						</view>
						<view class="item-text">
							待评价
						</view>
					</view> -->
					<view class="edit-item"  @tap="goOrderList(4)">
						<view class="item-icon">
							<image src="../../static/image/superBack/success.png" mode=""></image>
						</view>
						<view class="item-text">
							已返款
						</view>
					</view>
				</view>
			</view>
			<view class="tool">
				<view class="head-content">
					<view class="order-title">
						工具服务
					</view>
					<view class="else">
					</view>
				</view>
				<view class="content-main">
					<view class="edit-item" @tap="$common.goPage('/pages/superBack/complaint')">
						<view class="item-icon1">
							<image src="../../static/image/superBack/tixian.png" mode=""></image>
						</view>
						<view class="item-text">
							申诉管理
						</view>
					</view>
					<view class="edit-item" @tap="$common.getTaskArticle()">
						<view class="item-icon1">
							<image src="../../static/image/superBack/shensu.png" mode=""></image>
						</view>
						<view class="item-text">
							下单流程
						</view>
					</view>
					<view class="edit-item" @tap="$common.getKefu()">
						<view class="item-icon1">
							<image src="../../static/image/superBack/kefu.png" mode=""></image>
						</view>
						<view class="item-text">
							联系客服
						</view>
					</view>
					<view class="edit-item" @tap="$common.goPage('/pages/superBack/help')">
						<view class="item-icon1">
							<image src="../../static/image/superBack/question.png" mode=""></image>
						</view>
						<view class="item-text">
							常见问题
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-team">
			<view class="team-head">
				我们团队
			</view>
			<view class="team-content"> 
				<view class="content-box">
					<view class="num">
						{{userInfo.buyerDetailInfo.inviterCount}}人
					</view>
					<view class="team-title">
						团队总成员
					</view>
					
					<view class="team-btn" @tap="$common.goPage('/pages/superBack/sharePage')">
						邀请有奖
					</view>
				</view>
				<view class="content-box">
					<view class="num">
						{{userInfo.buyerDetailInfo.unReturnAwardAccount}}元
					</view>
					<view class="team-title">
						每月25日发放
					</view>
					
					<view class="team-btn"  @tap="goLnviterMoneyLsit">
						奖励明细
					</view>
				</view>
			</view>
		</view>
		<bottom-nav current="3" @loadConfig="loadConfig"></bottom-nav>
	</view>
</template>
<script>
	import bottomNav from '@/components/superBack/bottomNav.vue'
	import mescroll from '@/components/mescroll.vue';
	export default {
		components: {
			bottomNav,
			mescroll
		},
		data() {
			return {
				userInfo: {
					buyerInfo: {
						id: '加载中'
					},
					buyerDetailInfo: {
						account: '加载中'
					}
				},
				commDate: '',
				returnAwardAccount: 0,
				unfinishedComplaintNum: this.$storage.get('cjfOtherConfig').unfinishedComplaintNum,
				defaultHead: '../../static/image/superBack/default_head.jpg'
			}
		},
		methods: {
			loadConfig() {

			},
			goBank() {
				if (this.$storage.get('cjfOtherConfig')['bankStatus'] == 0 || this.$storage.get('cjfOtherConfig')['bankStatus'] ==
					1) {
					this.$common.goPage('/pages/superBack/bankInfo');
				} else {
					this.$common.goPage('/pages/superBack/addBank');
				}
			},
			goUserInfo() {
				if (this.$storage.get('cjfOtherConfig')['checkStatus'] == 1 || this.$storage.get('cjfOtherConfig')['checkStatus'] ==
					2) {
					this.$common.goPage('/pages/superBack/userInfo');
				} else {
					this.$common.goPage('/pages/superBack/addUserInfo');
				}
			},
			goRemainMoneyLsit() {
				uni.navigateTo({
					url: '/pages/superBack/remainMoneyLsit'
				})
			},
			goOrderList(index) {
				uni.navigateTo({
					url: `/pages/superBack/orderList?status=${index}`
				})
			},
			goLnviterMoneyLsit() {
				uni.navigateTo({
					url: '/pages/superBack/inviterMoneyLsit'
				})
			},
			goFetchMoney() {
				uni.navigateTo({
					url: '/pages/superBack/fetchMoney?money=' + this.userInfo.buyerDetailInfo.account
				})
			},
			async getData() {
				let data = await this.$http.post('/api/buyer/getIndex');
				this.$store.commit('jxUserInfo', data.data);
				return this.$http.posts('/api/buyer/getIndex')
					.then(res => {
						this.userInfo = res.data;
						if(res.data.buyerInfo.avatar) {
							console.log(res.data.buyerInfo.avatar)
							this.userInfo.buyerInfo.avatar = this.$common.qiniuCdnUrl(res.data.buyerInfo.avatar)
						}else {
							this.userInfo.buyerInfo.avatar = this.defaultHead
						}
						this.$storage.set('cjfUserInfo', this.userInfo);
					});
			}
		},

		watch: {

		},
		computed: {
		},
		onReady: function() {},
		onShow() {
			this.getData();
			this.commDate = this.$storage.get('cjfConfig').commDate;
			this.returnAwardAccount = this.$storage.get('cjfOtherConfig').returnAwardAccount;
		},
		onUnload() {

		},
		onLoad: function() {

		},
		onPullDownRefresh() {
			let data = null;
			data = this.getData();
			if (data) {
				uni.stopPullDownRefresh();
			}
		}
	}
</script>
<style>
	@import "../../static/css/global.css";

	/* 顶部 */
	page {
		background-color: #fff;
		padding-bottom: 140upx;
	}

	.red_dot {
		min-width: 32rpx;
		height: 32rpx;
		background: #fd2f53;
		position: absolute;
		right: 30rpx;
		top: 5rpx;
		line-height: 32rpx;
		border-radius: 16rpx;
		color: #fff;
		width: auto;
		font-size: 24rpx;
	}

	.top-bar {
		display: flex;
		position: relative;
		height: 288upx;
		/* background: linear-gradient(to right, #f99a12, #ff7133); */
		background: #FCF032;
		padding: 36upx 32upx;
	/* 	border-bottom-left-radius: 24upx;
		border-bottom-right-radius: 24upx; */
	}

	.top-bar .user-head {
		overflow: hidden;
		border-radius: 134upx;
		width: 134upx;
		height: 134upx;
		margin-right: 20upx;
	}

	.top-bar image {
		height: 100%;
	}

	.info {
		flex: 1;
		/* display: flex; */
	}

	.info .set {
		width: 44upx;
		height: 36upx;
	}

	.info .set image {
		width: 100%;
		height: 100%;
	}

	.info .user-name {
		font-size: 38upx;
		color: #333;
		margin-bottom: 10rpx;
	}

	.info .user-id {
		font-size: 34upx;
		color: #333;
	}

	.info .user-detail {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #333;
		font-size: 24upx;
		color: #FCF032;
		width: 154upx;
		height: 40upx;
		border-radius: 40upx;
		margin-right: 20upx;
	}
	.user-edit {
		display: flex;
		margin-top: 10rpx;
	}

	.user-info {
		display: flex;
		height: 134upx;
		flex-direction: column;
		justify-content: center;
	}

	.money {
		display: flex;
		width: 674upx;
		height: 144upx;
		box-sizing: border-box;
		padding: 26upx;
		position: absolute;
		left: 28upx;
		bottom: -112upx;
		background: #fff;
		box-shadow:1rpx 10rpx 16rpx 0px rgba(118,118,118,0.07);
		border-radius: 144upx;
	}
	.money .money-type {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		flex: 1;
	}
	.money .withdraw {
		width: 92rpx;
		height: 92rpx;
		border-radius: 92rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #FFF000;
		color: #333;
	}
	.money .money-title {
		font-size: 24upx;
		text-align: center;
		color: #242424;
	}

	.money .money-num {
		color: #F77E39;
		font-size: 44upx;
		font-weight:bold;
		text-align: center;
		width: 176rpx;
	}

	.main-content {
		background-color: #fff;
		width: 694upx;
		padding: 40upx 26upx;
		margin: 146upx auto 0;
		border-radius: 20upx;
		box-shadow:2rpx 2rpx 16rpx 0px rgba(118,118,118,0.18);
	}
	.head-content {
		display: flex;
		justify-content: space-between;
	}
	.tool .head-content {
		margin-top: 40upx;
	}
	.order-title {
		font-weight: bold;
		font-size: 30upx;
		flex: 1;
	}
	.else {
		color: #999999;
		font-size: 24upx;
		width: 140upx;
		text-align: right;
	}
	
	.content-main {
		display: flex;
		margin-top: 44upx;
		height: 140upx;
	}
	.tool .content-main {
		height:120rpx
	}
	.edit-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	}
	.edit-item  .item-icon1 {
		width: 80upx;
		height: 80upx;	
	}
	.edit-item  .item-icon1  image{
		width: 100%;
		height: 100%;
	}
	.edit-item .item-icon {
		width: 112upx;
		height: 112upx;		
	}
	.edit-item .item-icon image {
		width: 100%;
		height: 100%;
	}
	.edit-item .item-text{
		color: #666666;
		text-align: center;
		font-size: 24rpx;
	}
	.my-team {
		margin: 28rpx auto 0;
		width: 694rpx;
		background-color: #FCF032;
		height: 284rpx;
		border-radius: 20rpx;
	}
	.my-team .team-head {
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		font-weight: bold;
		padding-left: 24rpx;
	}
	.my-team .team-content {
		display: flex;
		/* padding: 30upx 40upx 60upx 40upx; */
	}
	.my-team .team-content .content-box {
		height: 164upx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.my-team .team-content .team-title {
		text-align: center;
		color: #333;
		font-size: 24rpx;
	}
	.my-team .team-content .num {
		font-size: 32upx;
		color: #333;
		text-align: center;
	}
	.team-btn {
		height: 44upx;
		width: 140upx;
		font-size: 24upx;
		text-align: center;
		line-height: 44upx;
		background-color: #333333;
		color: #FCF032;
		border-radius: 44upx;
	}
</style>
