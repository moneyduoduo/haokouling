<template>
	<view class="versions">
		<image class="version_img" src="../../static/image/home/version.png" mode=""></image>
		<view class="ver_box">
			<view class="version_text">
				V {{versionNum}}
			</view>
			<view class="ver-title">
				版本不息  优化不止
			</view>
			<view class="rich_box">
				<rich-text :nodes="versionContent"></rich-text>
			</view>
			
		</view>
		
		<!-- <view class="ver-box">
			<text class="ver-logo">
				&#xe63f;
			</text>
			<view class="ver-title">
				版本不息  优化不止
			</view>
		</view>
		<view class="ver-item">
			<view class="item-head">
				<view class="ver-num">
					V {{versionNum}}
				</view>
				<view class="ver-time">
					
				</view>
			</view>
			<view class="ver-content">
				<view class="content-list">
					<rich-text :nodes="versionContent"></rich-text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import upload from '@/components/tui-upload/tui-upload.vue'
	export default {
		data () {
			return {
				versionContent:'',
				versionNum:''
			}
		},
		onLoad() {
			this.versionContent = this.$storage.get('jxConfig').otherConfig.versionContent
			this.versionNum = this.$storage.get('version')
		}
	}
</script>

<style>
	page {
		background-color: #f9f9f9;
		color: #a9a9a9;
		font-size: 28upx;
		
	}
	.rich_box {
		width: auto;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		margin-top: 105rpx;
	}
	.ver-title {
		font-size: 44rpx;
		margin-top: 44rpx;
		text-align: center;
		color: #000;
	}
	.ver_box {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
	.version_text {
		margin-top: 762rpx;
		font-size: 48rpx;
		font-weight: bold;
		color: #000;
		text-align: center;
	}
	.version_img {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	@font-face {
	  font-family: 'iconfont'; 
	  src: url('https://at.alicdn.com/t/font_1124562_fddev4xfw56.ttf') format('truetype');
	}
	.ver-box {
		box-sizing: border-box;
		padding: 60upx;
		height: 340upx;
		text-align: center;
		background-color: #fff;
	}
	.ver-logo {
		font-family: iconfont;
		font-size: 120upx;
	}
	.ver-title {
		font-size: 34upx;
		margin-top: 28upx;
	}
	.ver-item {
		background-color: #fff;
		margin-top: 40upx;
	}
	.ver-num {
		font-weight: bold;
	}
	.item-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80upx;
		padding: 0 40upx;
		border-top: 2upx solid  #f2f2f2;
		border-bottom: 2upx solid  #f2f2f2;
	}
	.ver-content {
		padding: 0 40upx 40upx;
		
	}
	.content-list {
		margin-top: 40upx;
		font-size: 26upx;
	}
	
</style>
