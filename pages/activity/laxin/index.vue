<template>
	<view>
		<view class="banner">
			<image src="/static/image/activity/laxin/banner.jpg" mode='widthFix'></image>
		</view>
		<view class="inviteBtnBox" @tap="goInviterCode()">
			<view class="inviteBtn">邀请拿奖励</view>
		</view>
		<view class="inviteRowBar">
			<view class="inviteRow iconfont" @tap="goList">
				<view class="inviteCount">你已成功邀请<text>{{inviterCount}}</text>人，累计获得奖励<text>{{inviterTotalCommissionBalance}}</text>元</view>
			</view>
		</view>
		<view class="rowImage">
			<image src="/static/image/activity/laxin/row_01_title.jpg" mode='widthFix'></image>
		</view>
		<view class="rowImage">
			<image src="/static/image/activity/laxin/row_01_01.jpg" mode='widthFix'></image>
			<image src="/static/image/activity/laxin/row_01_02.jpg" mode='widthFix'></image>
		</view>
		<view class="rowImage">
			<image src="/static/image/activity/laxin/row_02_title.jpg" mode='widthFix'></image>
		</view>
		<view class="rowImage">
			<image src="/static/image/activity/laxin/row_02_01.jpg" mode='widthFix'></image>
			<image src="/static/image/activity/laxin/row_02_02.jpg" mode='widthFix'></image>
		</view>
	</view>

</template>
<script>

	export default {
		data() {
			return {
				isLogin:false,
				inviterCount:0,
				inviterTotalCommissionBalance:0
			}
		},

		components: {

		},
		onLoad: function() {
			let isLogin = this.$store.state.token
			if(isLogin){
				this.isLogin = true;
				this.getData()
			}
		},
		onShow: function() {

		},

		methods: {
			goList(){
				if(!this.isLogin){
					uni.navigateTo({
						url: "/pages/pass/login?back="+encodeURIComponent('pages/activity/laxin/index')
					});
					return
				}
				uni.navigateTo({
					url: './list'
				})
			},
			goInviterCode(){
				if(!this.isLogin){
					return uni.navigateTo({
						url: "/pages/pass/login?back="+encodeURIComponent('pages/activity/laxin/index')
					});
				}
				uni.navigateTo({
					url: '/pages/user/inviterCode'
				})
			},
			async getData(){
				let res = await this.$http.post('/api/inviter/getStatIndex')
				this.inviterCount = res.data.inviterCount
				this.inviterTotalCommissionBalance = res.data.commission
			}
		}
	}
</script>

<style>
	@import "../../../static/css/global.css";
	.inviteBtnBox{display: flex;justify-content: center;align-items: center; margin-top: 20rpx;}
	.inviteBtnBox .inviteBtn{width: 500rpx;height:100rpx;line-height:100rpx; background-color: #f9e851; color:#783c15; font-size: 32rpx;text-align: center;border-radius: 50rpx;font-weight: bold;}
	.inviteRowBar{background-color: #f2f2f2; padding: 20rpx 0; margin-top: 40rpx;}
	.inviteRowBar .inviteRow{background-color: #ffffff; padding: 20rpx;position: relative;}
	.inviteRowBar .inviteRow text{color:#de4724;}
	.inviteRowBar .inviteRow::before{content:'\E633';position: absolute;top:20rpx;right:0; width: 40rpx;height: 40rpx;}
</style>