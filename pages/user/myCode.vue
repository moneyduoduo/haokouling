<template>
	<view class="my-code">
		<view class="user-box">
			<image :src="userInfo.avatar? userInfo.avatar:defalutHead" mode=""></image>
			<view class="user-info">
				<view class="user-name">
					{{userInfo.nickName}}
				</view>
				<view class="code-box">
					<text>邀请ID：{{userInfo.inviterCode}}</text>
					<text class="copy" @tap="copy">复制</text>
				</view>
			</view>
		</view>
		<view class="qrimg">
			<image :src="img" mode=""></image>
		</view>
		<view class="tip">
			扫一扫上面的邀请码，加入集享
		</view>
		<view class="tkiimg">
		    <tki-qrcode
		    ref="qrcode"
		    cid="inviterCode"
		    :val="inviterUrl"
			:size="800" 
		    :lv="3" 
		    :loadMake="loadMake"
		    :showLoading="false"
			@result="qrR"/>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	export default {
		data() {
			return {
				defalutHead:'/static/image/superBack/default_head.jpg',
				userInfo: '',
				loadMake: true,
				img: '',
				inviterUrl: ''
			}
		},
		methods:{
			copy() {
				this.$common.copy(this.userInfo.inviterCode)
			},
			qrR(e){
				//持久化二维码临时文件
				this.img = e;
				uni.saveFile({
					tempFilePath: e,
					success: (res)=>{
						var savedFilePath = res.savedFilePath;
						this.$storage.set('mycode',savedFilePath);
						this.img = savedFilePath;
						console.log(this.img);
					}
				});
			},
		},
		onLoad() {
			this.userInfo  = this.$store.state.jxUserInfo.buyerInfo;
			let mycode = this.$storage.get('mycode');
			if(mycode){
				//判断文件是否存在，如果已经存在不在生成
				uni.getSavedFileInfo({
					filePath: mycode,
					success:(res)=>{
						this.loadMake = false;
						console.log(res)
					}
				})
				this.img = mycode;
			}
			let jxConfig = this.$store.state.jxConfig;
			
			this.inviterUrl = `${jxConfig.config.inviterUrl}?app=1&inviterCode=${this.userInfo.inviterCode}`;
		},
		components: {
			tkiQrcode
		}
	}
</script>

<style>
	page {
		background-color: #fff;
		font-size: 28upx;
		
	}
	.my-code {
		
	}
	.user-box {
		margin-top: 76upx;
		padding-left: 90upx;
		display: flex;
	}
	.user-box image {
		width: 100upx;
		height: 100upx;
		border-radius: 100upx;
		margin-right: 20upx;
	}
	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.user-name {
		font-size: 32upx;
	}
	.code-box {
		display: flex;
	}
	.copy {
		background-color: #FFEb00;
		color: #333;
		width: 88upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8upx;
		margin-left: 50upx;
		font-size: 24rpx;
	}
	.qrimg {
		width: 360upx;
		height: 360upx;
		margin: 80upx auto 0;
	}
	.qrimg image {
		width: 100%;
		height: 100%;
	
	}
	.tkiimg {
		position: fixed;
		left: 8888888upx;
		bottom: 9999999upx;
		z-index: -9999;
	}
	.tip {
		margin-top: 60upx;
		text-align: center;
		color: #666;
	}
</style>
