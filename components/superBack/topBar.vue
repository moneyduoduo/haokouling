<template>
	<view class="page-header" :class="bgClass">
		<view :style="{ height: statusBarHeight }" class="uni-status-bar"></view> 
		<view class="statusBar " style="height:90rpx;">
			<view class="lefticon">
				<image class="return" src="../../static/image/superBack/return1.png" mode="" @tap="$common.goPage(-1)"></image>
				<image class="close" src="../../static/image/superBack/back_02.png" mode="" v-if="isClose" @tap="$common.goPage(0)"></image>
			</view>
			<view class="title">{{title}}</view>
			<view class="servicer">
				<!-- <image  v-if="isKefu" @tap="$common.getKefu()" src="../../static/image/superBack/servicer.png" mode=""></image> -->
			</view>
		</view>
	</view>
</template>
<script>
	var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
	export default {
		props:{
			isClose:{
				type:Boolean,
				default:false				
			},
			isKefu:{
				type:Boolean,
				default:true				
			},
			title:{
				type:String,
				default:'',
			},
			bgClass:{
				type:String,
				default:"red"
			}
		},
		data() {
			return {
				statusBarHeight:statusBarHeight,
			};
		}
	}
</script>

<style>
	.orange {
		/* background: linear-gradient(to right,#f99a12,#ff7133); */
		background-color: #fcf032;
		width: 100%;
	}
	.page-header {
		/* padding-top: 38upx; */
	}	
	.statusBar {
		display: flex;
		width: 100%;	
	}
	.title {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36upx;
		color: #333;
	}
	.lefticon {
		width: 200upx;
		display: flex;
		align-items: center;
	}
	.return {
		width: 24upx;
		height: 40upx;
		margin: 0 40upx;
	}
	.close {
		width: 36upx;
		height: 36upx;
	}
	.servicer {
		width: 200upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.servicer image {
		width: 40upx;
		height: 40upx;
		margin-right: 40upx;
	}
</style>
