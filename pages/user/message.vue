<template>
	<view class="message">
		<view class="item-box" @tap="$common.getJXKefu()">
			<view class="icon_img">
				<image src="../../static/image/home/kefu.png" mode=""></image>
				<view class="red_icon">
					
				</view>
			</view>
			<view class="ms-type">
				<view class="ms-title">
					在线客服
				</view>
				<view class="ms-content">
					查看与客服的沟通记录
				</view>
			</view>
			<view class="icon">
				&#xe644;
			</view>
		</view>
		<view class="item-box" @tap="goActivities(0)">
			<view class="icon_img">
				<image src="../../static/image/home/huodong.png" mode=""></image>
			</view>
			<view class="ms-type">
				<view class="ms-title">
					活动消息
				</view>
				<view class="ms-content">
					你的地球日优惠福利来啦
				</view>
			</view>
			<view class="icon">
				&#xe644;
			</view>
		</view>
		<view class="item-box" @tap="goActivities(1)">
			<view class="icon_img">
				<image src="../../static/image/home/fuwu.png" mode=""></image>
			</view>
			<view class="ms-type">
				<view class="ms-title">
					服务消息
				</view>
				<view class="ms-content">
					您有新的返款已到账了
				</view>
			</view>
			<view class="icon">
				&#xe644;
			</view>
		</view>
		<view class="item-box" @tap="goActivities(2)">
			<view class="icon_img">
				<image src="../../static/image/home/xiaoxi.png" mode=""></image>
			</view>
			<view class="ms-type">
				<view class="ms-title">
					系统消息
				</view>
				<view class="ms-content">
					超级返上线公告
				</view>
			</view>
			<view class="icon">
				&#xe644;
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			goActivities(t) {
				uni.navigateTo({
					url : "activities?type="+t
				})
			}
		}
	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont';  /* project id 1124562 */
	  src:url('https://at.alicdn.com/t/font_1124562_3juez3mfwro.ttf') format('truetype')
	}
	page {
		background: #f9f9f9;
		font-size: 28upx;
	}
	.icon_img {
		width: 86rpx;
		height: 86rpx;
		position: relative;
	}
	.red_icon {
		position: absolute;
		background-color: #ff606d;
		width: 18rpx;
		height: 18rpx;
		top: 0;
		right: 0rpx;
		border-radius: 18rpx;
	}
	.icon_img  image{
		width: 100%;
		height: 100%;
	}
	.message {
	}
	.item-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx 40upx;
		background-color: #fff;
		margin-top: 20upx;
	}
	.icon {
		font-family: 'iconfont';
		color: #a9a9a9;
		font-size: 42upx;
	}
	.ms-type {
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		margin-left: 40upx;
		height: 84upx;
		flex: 1;
	}
	.ms-title {
		color: #666;

	}
	.ms-content {
		color: #a9a9a9;
		font-size: 24upx;
		
	}
</style>
