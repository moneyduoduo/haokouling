<template>
	<view class="logout">
		<view class="title">
			申请注销账号
		</view>
		<img class="jingao_icon" src="/static/image/pass/jingao.png" alt="">
		<view class="jingao_text">
			慎重操作
		</view>
		<view class="jingao_text1">
			注销好口令号是不可恢复的操作。
		</view>
		<view class="jingao_text2">
			一旦注销成功，就再也找不回原本的好口令账号。
		</view>
		<view class="logout_btn" @tap="goLogout">
			申请注销
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
			goLogout() {
				this.$msg.confirm({
					content: '确定要注册账号吗？'
				},()=> {
					this.$http.post('/api/buyer/doDestroy').then( res => {
						this.$msg.toast('注销成功')
						setTimeout( () => {
							uni.switchTab({
								url:'/pages/index/index'
							})
						},1000)
					})
				})
				
			}
		}
	}
</script>

<style>
	.logout_btn {
		position: fixed;
		width: 340rpx;
		height: 74rpx;
		line-height: 74rpx;
		text-align: center;
		font-size: 28rpx;
		color: #000;
		bottom: 115rpx;
		background-color: #FFE400;
		border-radius: 74rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.jingao_text2 {
		margin-top: 10rpx;
		color: #333;
		text-align: center;
		font-size: 32rpx;
	}
	.jingao_text1 {
		color: #333;
		text-align: center;
		margin-top: 60rpx;
		font-size: 32rpx;
	}
	.jingao_text {
		font-size: 25rpx;
		margin-top: 13rpx;
		text-align: center;
		color: #999999;
	}
	.title {
		margin-top: 76rpx;
		text-align: center;
		font-size: 59rpx;
		font-weight: bold;
	}
	.jingao_icon {
		display: block;
		margin: 76rpx auto 0;
		height: 151rpx;
		width: 168rpx;
	}
</style>
