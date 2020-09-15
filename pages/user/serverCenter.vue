<template>
	<view class="content">
		<view class="head">
			<view class="head-box" style="border-right: 2upx solid #f2f2f2;">
				<view class="icon">
					&#xe6f6;
				</view>
				<view class="">
					在线客服
				</view>
			</view>
			<view class="head-box">
				<view class="icon">
					&#xe610;
				</view>
				<view class="">
					热线电话
				</view>
			</view>
		</view>
		<view class="title">
			问题分类
		</view>
		<view class="list-box" @tap="goDetail">
			<view class="list-name">
				<view class="icon">
				</view>
				<view class="">
					常见问题
				</view>
			</view>
			<view class="right-icon">
				&#xe644;
			</view>
		</view>
		<view class="list-box">
			<view class="list-name">
				<view class="icon">
				</view>
				<view class="">
					配送问题
				</view>
			</view>
			<view class="right-icon">
				&#xe644;
			</view>
		</view>
		<view class="list-box">
			<view class="list-name">
				<view class="icon">
				</view>
				<view class="">
					售后问题
				</view>
			</view>
			<view class="right-icon">
				&#xe644;
			</view>
		</view>
		<view class="list-box">
			<view class="list-name">
				<view class="icon">
				</view>
				<view class="">
					支付问题
				</view>
			</view>
			<view class="right-icon">
				&#xe644;
			</view>
		</view>
		<view class="list-box">
			<view class="list-name">
				<view class="icon">
				</view>
				<view class="">
					会员问题
				</view>
			</view>
			<view class="right-icon">
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
			goDetail() {
				uni.navigateTo({
					url:"question"
				})
			}
		}
	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont';  /* project id 1124562 */
	  src:  url('https://at.alicdn.com/t/font_1124562_u2jda5en4x.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1124562_u2jda5en4x.svg#iconfont') format('svg');
	}
	page {
		font-size: 28upx;
		background-color: #f9f9f9;
	}
	.content {
		border-top: 2upx solid #f2f2f2;
	}
	.head {
		display: flex;
		background-color: #fff;
		border-bottom: 2upx solid #f2f2f2;
	}
	.head-box {
		padding: 20upx 0;
		box-sizing: border-box;
		flex: 1;
		display: flex;
		height: 172upx;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.icon {
		font-family: 'iconfont';
		font-size: 72upx;
		color: #a9a9a9;
	}
	.title {
		text-align: center;
		font-size: 32upx;
		margin: 50upx 0 30upx 0;
	}
	.list-box {
		display: flex;
		background-color: #fff;
		border-top: 2upx solid #f2f2f2;
		justify-content: space-between;
		height: 88upx;
		align-items: center;
		padding: 0 40upx;
	}
	.right-icon {
		font-family: "iconfont";
	}
</style>
