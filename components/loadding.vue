<template>
	<view>
		<view class="yt-loadding" v-show="isShow">
			<image :src="loadimg" mode="widthFix"></image>
			<view class="text">数据加载中...</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'loadding',
		props:{
			isShow:{
				type: Boolean,
				default: false
			},
			loadimg:{
				type:String,
				default:'/static/img/loading.gif'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.yt-mask {
		position: fixed;
		z-index: 9999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.text{text-align: center;}
	.yt-loadding{
		position: absolute;
		z-index: 10000;
		width: 300upx;
		height: 300upx;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.yt-loadding image{
		width: 100%;
		height: 100%;
	}
</style>
