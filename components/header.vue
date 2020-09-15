<template>
	<view>
		<view class="yt-header" :class="{'yj-header-shadow': bgcolor=='#fff'}" :style="{backgroundColor: bgcolor, color:txtcolor}">
			<view class="yt-header-return" v-if="isback=='true'" @click="back()">
				<image :src="returnimg" mode="widthFix"></image>
			</view>
			<view class="yt-header-return" v-else></view>
			
			<view class="yt-header-title">{{title}}</view>
			<view class="yt-header-right" v-if="linkimgsrc !='' || linkimgsrc " @click="gourl(linkurl)"><image :src="linkimgsrc" mode=""></image></view>
			<view class="yt-header-right" v-else  @click="gourl(linkurl)">{{linktitle}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'ytHeader',
		props:{
			isback:{
				type:String,
				default:'true'
			},
			bgcolor:{
				type:String,
				default:''
			},
			txtcolor:{
				type:String,
				default:'#fff'
			},
			returnimg:{
				type:String,
				default:'../../static/img/fanhui_white.png'
			},
			title:{
				type:String,
				default:''
			},
			linkimg:{
				type:Boolean,
				default:false
			},
			linkimgsrc:{
				type:String,
				default:''
			},
			linkurl:{
				type:String,
				default:''
			},
			linktitle:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			back: function() {
				uni.navigateBack();
			},
			gourl: function(e){
				console.log(222)
				uni.navigateTo({
					url: e
				});
			}
		}
	}
</script>

<style>
	.yt-header{
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 998;
		padding-top:40upx;
		display: flex;
		justify-content:space-between;
		align-items: center;
		text-align: center;
		/* box-shadow: 0 5rpx 10rpx #eee; */
	}
	.yj-header-shadow{
		box-shadow: 0 5rpx 20rpx #eee;
	}
	.yt-header-title{
		max-width: 70%;
		overflow: hidden;
		font-size: 40upx;
		font-weight: bold;
	}
	.yt-header{
		height: 88upx;
		line-height: 88upx;
	}
	.yt-header-return,.yt-header-right{
		width: 90upx;
		text-align: center;
	}
	.yt-header-return image,.yt-header-right image{
		
		vertical-align: middle;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
	}
	.yt-header-right{
		font-size: 30upx;
	}
</style>
