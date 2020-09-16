<template>
	<view>
		<view class="yt-text-center yt-emptydata">
			<image class="yt-emptydata-img" :src="emptyimg" mode="widthFix"></image>
			<view class="yt-emptydata-title">{{emptytitle}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'emptydata',
		props:{
			emptyimg:{
				type:String,
				default:'../../static/image/home/nodata.png'
			},
			emptytitle:{
				type:String,
				default:'暂无数据'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.yt-emptydata{
		text-align: center;
	}
	.yt-emptydata-img{
		margin-top: 100upx;
		width: 511upx;
		height: 277upx;
	}
	.yt-emptydata-title{
		margin-top: 50upx;
		color: #999;
	}
</style>
