<template>
	<view class="page">
		<view class="logo-box">
			<image src="/static/image/pass/logo.png" mode=""></image>
		</view>
		<view class="title">
			集享
		</view>
		<view class="small_title">
			集生活  享好货
		</view>
		<view class="link">
			<view class="">
				客服热线 : 4000-000000
			</view>
			<view class="">
				客服邮箱 : 437805361@qq.com
			</view>
			<view class="">
				当前版本 : {{version}}
			</view>
		</view>
		<view class="copy-right">
			<view class="protocol" @tap="goProtocol">
				《集享用户协议》
			</view>
			<view class="cp">
				CopyRight @ 广州集享科技有限公司 2016 - 2019
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: ''
			}
		},
		methods: {
			goProtocol() {
				uni.navigateTo({
					url: '/pages/pass/protocol?type=1'
				})
			}
		},
		onLoad() {
			this.version = this.$storage.get('version')
		}
	}
</script>

<style>
	page {
		background: #fff;
		height: 100%;
	}
	.small_title {
		margin-top: 38rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.page {
		padding: 40upx;
		height: 100%;
		box-sizing: border-box;
	}
	.copy-right {
		position: fixed;
		bottom: 30rpx;
		width: 100%;
	}
	.logo-box  {
		width: 220upx;
		height: 220upx;
		margin: 80upx auto 0;
	}
	.logo-box image {
		border-radius: 220upx;
		width: 100%;
		height: 100%;
	}
	.title {
		color: #000;
		font-size: 48upx;
		/* font-weight: bold; */
		text-align: center;
		margin-top: 20upx;
	}
	.link {
		font-size: 26upx;
		height: 240upx;
		box-sizing: border-box;
		background-color: #fcfcfc;
		padding: 40upx 0 40upx 52upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #999;
		border: 2upx solid #f9f9f9;
		margin-top: 120upx;
	}
	.copy-right {
		font-size: 28upx;
		margin-top: 180upx;
		text-align: center;
		line-height: 52upx;
	}
	.protocol {
		color: #E63A52;
		
	}
	.cp {
		color: #a9a9a9;
		font-size: 22rpx;
	}
</style>
