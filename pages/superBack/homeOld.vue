<template>
	<view class="page_content">
		<top-bar title="个人中心" :isClose="true" bgClass="orange"></top-bar>
		<view class="main_bar">
				<view class="home_bar">
					<view class="top_bar">
						<view class="cont">
							<view class="userId">用户ID：{{userInfo.buyerInfo.id}}</view>
							<view class="btn_box">
								<view class="btn" @tap="goBank">银行信息</view>
								<view class="btn" @tap="goUserInfo">账号信息</view>
							</view>
						</view>
						<view class="p_box">
							<view class="moeny_bar">
								<view class="flex"  @tap="goRemainMoneyLsit">
									<view class="title">余额</view>
									<view class="number">{{userInfo.buyerDetailInfo.account}}</view>
								</view>
								<view class="flex">
									<view class="title">待返还</view>
									<view class="number">{{userInfo.buyerDetailInfo.unReturnAccount}}</view>
								</view>
								<view class="felx_btn" @tap="goFetchMoney">
									<view class="btn">提现</view>
								</view>
							</view>
						</view>
					</view>
					<view class="main_content">
						<view class="nav_icon_box">
							<view class="title_box">
								<view class="h1">超级返订单</view>
								<view class="link" @tap="goOrderList()">查看全部>></view>
							</view>
							<view class="icon_list">
								<view class="box" @tap="goOrderList(0)">
									<text class="iconfont icon-qiandao cRed f80"></text>
									<view>待操作</view>
								</view>
								<view class="box" @tap="goOrderList(3)">
									<text class="iconfont icon-shijian"></text>
									<view>待返款</view>
								</view>
								<view class="box" @tap="goOrderList(4)">
									<text class="iconfont icon-tikuan"></text>
									<view>已返款</view>
								</view>
								<view class="box" @tap="goOrderList(5)">
									<text class="iconfont icon-fankui"></text>
									<view>已取消</view>
								</view>
							</view>
						</view>
						<view class="nav_icon_box">
							<view class="title_box">
								<view class="h1">工具服务</view>
							</view>
							<view class="icon_list">
								<view class="box" style="position: relative;" @tap="$common.goPage('/pages/superBack/complaint')">
									<view class="img"><image src="/static/img/superback/icon_home_01.png"></image></view>
									<view>申诉管理</view>
									<view class="red_dot" v-if="unfinishedComplaintNum>0">{{unfinishedComplaintNum}}</view>
								</view>
								<view class="box" @tap="$common.getTaskArticle()">
									<view class="img"><image src="/static/img/superback/icon_home_02.png"></image></view>
									<view>下单流程</view>
								</view>
								<view class="box" @tap="$common.getKefu()">
									<view class="img"><image src="/static/img/superback/icon_home_03.png"></image></view>
									<view>联系客服</view>
								</view>
								<view class="box" @tap="$common.goPage('/pages/superBack/help')">
									<view class="img"><image src="/static/img/superback/icon_home_04.png"></image></view>
									<view>常见问题</view>
								</view>
							</view>
						</view>
						
						<view class="myTeam">
							<view class="h1">我的团队</view>
							<view class="team_box">
								<view class="box">
									<view class="title">团队总成员</view>
									<view class="number">{{userInfo.buyerDetailInfo.inviterCount}}人</view>
									<view class="btn" @tap="$common.goPage('/pages/superBack/sharePage')">邀请有奖</view>
								</view>
								<view class="box">
									<view class="title">每月{{commDate}}日发放</view>
									<view class="number">{{userInfo.buyerDetailInfo.inviterCount}}元</view>
									<view class="btn" @tap="goLnviterMoneyLsit">查看明细</view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
		</view>
		<bottom-nav current="4" @loadConfig="loadConfig"></bottom-nav>
	</view>
</template>
<script>
	import bottomNav from '@/components/superBack/bottomNav.vue'
	import mescroll from '@/components/mescroll.vue';
	export default {
		components: {
			bottomNav,mescroll
		},
		data() {
			return {
				userInfo:{buyerInfo:{id:'加载中'},buyerDetailInfo:{account:'加载中'}},
				commDate:'',
				returnAwardAccount:0,
				unfinishedComplaintNum:this.$storage.get('cjfOtherConfig').unfinishedComplaintNum,
			}
		}, 
		methods: {
			loadConfig(){
				
			},
			goBank(){
				if(this.$storage.get('cjfOtherConfig')['bankStatus'] == 0 || this.$storage.get('cjfOtherConfig')['bankStatus'] == 1){
					this.$common.goPage('/pages/superBack/bankInfo');
				}else{
					this.$common.goPage('/pages/superBack/addBank');
				}
			},
			goUserInfo(){
				if(this.$storage.get('cjfOtherConfig')['checkStatus'] == 1 || this.$storage.get('cjfOtherConfig')['checkStatus'] == 2){
					this.$common.goPage('/pages/superBack/userInfo');
				}else{
					this.$common.goPage('/pages/superBack/addUserInfo');
				}
			},
			goRemainMoneyLsit(){
				uni.navigateTo({
					url: '/pages/superBack/remainMoneyLsit'
				})
			},
			goOrderList(index){
				uni.navigateTo({
					url: `/pages/superBack/orderList?status=${index}`
				})
			},
			goLnviterMoneyLsit(){
				uni.navigateTo({
					url: '/pages/superBack/inviterMoneyLsit'
				})
			},
			goFetchMoney(){
				uni.navigateTo({
					url: '/pages/superBack/fetchMoney?money='+this.userInfo.buyerDetailInfo.account
				})
			},
			async getData(){
				let data = await this.$http.post('/api/buyer/getIndex');
				this.$store.commit('jxUserInfo',data.data);
				return this.$http.posts('/api/buyer/getIndex')
				.then(res =>{
					this.userInfo = res.data;
					this.$storage.set('cjfUserInfo',this.userInfo);
				});
			}
		},

		watch: {

		},
		computed: {


		},
		onReady:function(){
		},
		onShow(){
			this.getData();
			this.commDate = this.$storage.get('cjfConfig').commDate;
			this.returnAwardAccount = this.$storage.get('cjfOtherConfig').returnAwardAccount;
		},
		onUnload(){
			
		},
		onLoad: function() {
			
		},
		onPullDownRefresh() {
			let data = null;
			data = this.getData();
			if(data){
				uni.stopPullDownRefresh();
			}
		}
}
</script>
<style>
	@import "../../static/css/global.css";
	/* 顶部 */	
	.icon-qiandao,.icon-shijian,.icon-fankui{font-size: 80rpx;margin: 10rpx 0 0 0; color:#fd2f53;}
	.icon-tikuan{width: 80rpx; height:80rpx;margin: auto;margin-top:20rpx;}
	.icon-tikuan:before{font-size: 60rpx;color:#fd2f53;}
	.red_dot{min-width: 32rpx;height:32rpx;background: #fd2f53;position: absolute;right: 30rpx;top:5rpx;line-height: 32rpx; border-radius: 16rpx; color:#fff;width:auto;font-size:24rpx;}
	/* 商品列表 */
	.main_bar{}
	.top_bar{background: #fd2f53;  height:260rpx;position: relative;}
	.top_bar .cont{display: flex;padding: 40rpx;}
	.top_bar .cont .userId{color:#fff;}
	.top_bar .cont .btn_box{display: flex;}
	.top_bar .cont .btn_box .btn{background: #fff; border-radius:16rpx;text-align: center; height:60rpx; line-height: 60rpx;margin-left: 20rpx;color:#fd2f53}
	.top_bar .p_box{position: absolute;left:0;top:120rpx; padding: 40rpx;}
	.top_bar .p_box .moeny_bar{ background: #fff; display: flex;padding: 40rpx; border-radius: 20rpx;height:200rpx;box-shadow:1rpx 1rpx 10rpx #e1e1e1;}
	.top_bar .p_box .moeny_bar .flex{text-align: center;}
	.top_bar .p_box .moeny_bar .flex .title{font-weight: bold;margin-top: 20rpx;}
	.top_bar .p_box .moeny_bar .flex .number{margin-top: 20rpx; font-size: 32rpx; color:#fd2f53; }
	.top_bar .p_box .moeny_bar .felx_btn{display: flex;justify-content: center;align-items: center;}
	.top_bar .p_box .moeny_bar .felx_btn .btn{width: 160rpx; background: #fd2f53; color:#fff; text-align: center; line-height: 60rpx;height:60rpx; border-radius: 16rpx;}
	
	.main_content{background: #fff;padding: 100rpx 40rpx 150rpx 40rpx;}
	.main_content .nav_icon_box{ margin-top: 40rpx;}
	.main_content .title_box{display: flex;justify-content:space-between;}
	.main_content .title_box .h1{flex:1; font-size: 16px; font-weight: bold;}
	.main_content .title_box .link{width: auto; color:#6a6a6a}
	.main_content .icon_list{display: flex;margin-top: 40rpx;}
	.main_content .icon_list .box{text-align: center;}
	.main_content .icon_list .box text{font-size:60rpx;}
	.main_content .icon_list .img{width: 80rpx; height: 80rpx;margin: auto;margin-bottom: 20rpx;}
	.main_content .icon_list .img image{width: 100%; height:100%;}
	
	.myTeam{margin-top: 40rpx;}
	.myTeam .h1{font-size: 32rpx; font-weight: bold;}
	.myTeam .team_box{background: linear-gradient(45deg,#fe3548, #fd2066);margin-top: 60rpx; border-radius: 16rpx; padding: 40rpx;display: flex;}
	.myTeam .team_box .box{text-align: center;}
	.myTeam .team_box .box .title{color: #fff;}
	.myTeam .team_box .box .number{font-size: 32rpx;color:#fff;margin-top: 20rpx;}
	.myTeam .team_box .box .btn{width:200rpx; background: #fff; color:#fd2f53;margin: auto;margin-top: 20rpx; height: 60rpx; line-height: 60rpx;border-radius: 40rpx;}
</style>