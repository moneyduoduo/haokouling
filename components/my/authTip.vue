<template>
	<view>
		<view class="yt-popup-bg" v-if="show">
			<view class="yt-popup-con">
				<img class="popuptitle" src="../../../static/img/hongbaotip.png" style="width: 100%;">
				<view class="yt-popup-main">
					<view class="yt-popup-info">
						<view>领取优惠券需要淘宝授权</view>
						<view>授权完成后可享受高额返利</view>
						<view>速速参与</view>
					</view>
					<view class="yt-popup-confirm" @click="goAuth">
						<img class="goget" src="../../../static/img/zhidaole.png" width="60%">
					</view>
					<view class="yt-popup-note-center cancalGet" @click="close">
						取消
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var bctaobao = require("../../../static/js/my.js");
	export default {
		name:'authtip',
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			};
		},
		methods: {
			goAuth(){
				bctaobao.baichuanoa('0');
			},
			close(e) {
				console.log('点击了关闭');
				this.show=false;
			    this.$emit('close');
			    e.stopPropagation();
			},
		}
	}
</script>

<style>
	.yt-popup-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0);
		z-index: 1000;
	}
	
	.yt-popup-con {
		width: 550upx;
		height: 60vh;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
	}
	
	.popuptitle {
		width: 100%;
		height: 330upx;
	}
	
	.yt-popup-con img {
		vertical-align: middle;
	}
	
	.yt-popup-main {
		background-image: linear-gradient(180deg, #ff5249, #FF315B);
		padding: 1rem;
		border-bottom-right-radius: 1.5rem;
		border-bottom-left-radius: 1.5rem;
		font-size: 1rem;
		margin-top: -4upx;
	}
	
	.yt-popup-info {
		width: 88%;
		height: auto;
		max-height: 200upx;
		overflow: auto;
		padding: 1rem;
		/* text-align: center; */
		margin: 0 auto;
		background-color: rgba(255, 255, 255, .4);
		border-radius: .5rem;
		color: #666;
		font-size: .9rem;
	}
	
	.yt-popup-confirm {
		text-align: center;
		margin-top: 1rem;
	}
	
	.yt-popup-confirm image {
		width: 275upx;
		height: 73upx;
	}
	
	.yt-popup-note-center {
		text-align: center;
		color: #666;
		margin-top: .8rem;
		font-size: 26upx;
	}
</style>
