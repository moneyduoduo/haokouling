<template>
	<view>
		<!-- 启动广告 -->
		<view class="gui-start-banner">
			<swiper indicator-active-color="#666" indicator-color="rgba(0,0,0,0.3)" :autoplay="false" previous-margin="100rpx"
			 next-margin="100rpx" @change="change" :current="cardCur" :style="{height:startBannerHeight+'px'}">
				<!-- 启动图片建议纯色背景 此处设置 swiper-item 背景颜色与图片背景颜色相同即可实现全屏效果 -->
				<template v-if="isShow">
					<swiper-item v-for="(v,i) in posterList" :key="i" :style="{width:startBannerWidth+'px'}">
						<view :class="cardCur==i?'cur':''">
							<image class="img" :src="v" mode="widthFix"></image>
							<!-- <image class="qrcode" :src="img"></image> -->
						</view>
					</swiper-item>
				</template>
			</swiper>
		</view>
		<view class="inviteBtnBox">
			<!-- <view class="inviteBtn" @tap="share">分享海报</view> -->

		</view>
		<view class="inviteBtnLeft" @tap="share(1)">
			<image src="../../static/image/home/icon_fenxianglianjie.png" mode=""></image>
			<view class="invite-text">
				分享链接
			</view>
		</view>
		<view class="inviteBtnRight" @tap="share(2)">
			<image src="../../static/image/home/icon_share_firends.png" mode=""></image>
			<view class="invite-text">
				分享海报
			</view>
		</view>
		<view class="qrimg">
			<tki-qrcode ref="qrcode" cid="inviterCode" :val="inviterUrl" :size="800" :lv="3" :loadMake="loadMake" :showLoading="false"
			 loadingText="加载中..." @result="qrR" />
		</view>
		<view class="canvas">
			<canvas canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
		<popup ref="popup" type="bottom">
			<view class="share-box">
				<view class="share-list" @tap="shareWeixin()">
					<image src="/static/img/sharemenu/wechat_friend.png" mode=""></image>
					<view class="share-text">
						微信好友
					</view>
				</view>
				<view class="share-list" @tap="shareWeixinQuan()">
					<image src="/static/img/sharemenu/wechat_moments.png" mode=""></image>
					<view class="share-text">
						朋友圈
					</view>
				</view>
				<view class="share-list" @tap="shareQQ()">
					<image src="/static/img/sharemenu/qq.png" mode=""></image>
					<view class="share-text">
						QQ
					</view>
				</view>
				<view class="share-list" @tap="shareQQ()">
					<image src="/static/img/sharemenu/qqspace.png" mode=""></image>
					<view class="share-text">
						QQ空间
					</view>
				</view>
			</view>
		</popup>
	</view>
</template>
<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
	import _app from '@/common/QS-SharePoster/app.js';
	import getSharePoster from '@/common/QS-SharePoster/QS-SharePoster.js';
	import popup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			tkiQrcode,
			popup
		},
		data() {
			return {
				logo:'/static/image/pass/logo.png',
				posterList: [],
				isShow: false,
				poster: {},
				cardCur: 1,
				sharePic: [
					'http://img.jixiangshenghuo.com/share1.jpg',
					'http://img.jixiangshenghuo.com/share2.jpg',
					'http://img.jixiangshenghuo.com/share3.jpg'
				],
				startBannerHeight: 0,
				startBannerWidth: 0,
				inviterUrl: '',
				img: '',
				userInfo: '',
				loadMake: true,
				canvasId: 'default_PosterCanvasId',
				isShareWin: false,
				shareType: 0

			}
		},
		onHide() {
			uni.hideLoading()
		},
		onLoad: function() {
			/* let qrcode = this.$storage.get('qrcode');
			if(qrcode){
				//判断文件是否存在，如果已经存在不在生成
				uni.getSavedFileInfo({
					filePath: qrcode,
					success:(res)=>{
						this.loadMake = false;
					}
				})
				this.img = qrcode;
			} */
			this.startBannerHeight = this.$storage.get('systemInfo').windowHeight - 120;
			this.startBannerWidth = this.$storage.get('systemInfo').windowWidth - 120;
			// this.sharePic.forEach( (item,index) =>{
			// 	this.getPoster(item)
			// })
		},
		onShow: function() {
			if (this.isShareWin) {
				this.$msg.toast('分享成功！')
			}
			let jxConfig = this.$store.state.jxConfig;
			this.userInfo = this.$store.state.jxUserInfo.buyerInfo;
			this.inviterUrl = `${jxConfig.config.inviterUrl}?app=1&inviterCode=${this.userInfo.inviterCode}`;
		},
		methods: {
			change(e) {
				this.cardCur = e.detail.current;
			},
			qrR(e) {
				uni.showLoading({
					title: '海报生成中',
					mask: true
				})
				this.img = e;
				this.getPoster(0)
			},
			async getPoster(index) {
				if (this.img == '') {
					return false;
				}
				// if(this.posterList[this.cardCur] ) {
				// 	this.$refs.popup.open()
				// 	return false
				// }
				
				
				if (index >= this.sharePic.length) {
					uni.hideLoading()
					this.isShow = true
					return false
				}
				const d = await getSharePoster({
					type: 'testShareType',
					posterCanvasId: this.canvasId,
					backgroundImage: this.sharePic[index],
					imagesArray: ({
						bgObj,
						type,
						bgScale
					}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
						const dx = bgObj.width * 0.3;
						return [{
							url: this.img,
							dx: 191,
							dy: 722,
							dWidth: 180,
							dHeight: 180,
						}]
					},
					textArray: [{
						text: this.userInfo.inviterCode,
						size:24,
						dy: 960,
						dx: 236,
						
					}],
					setCanvasWH: ({
						bgObj,
						type,
						bgScale
					}) => { // 为动态设置画布宽高的方法，
						this.poster = bgObj;
					},
					setCanvasToTempFilePath: ({
						bgObj,
						type,
						bgScale
					}) => { // 为动态设置画布宽高的方法，
						return {
							destWidth: 750,
							destHeight: 1334,
							quality: 0.5
						}
					},
				});

				this.posterList[index] = d.poster.tempFilePath
				console.log(this.posterList[index])
				console.log(index)
				this.getPoster(index + 1)

			},
			share(type) {
				// this.getPoster()
				this.$refs.popup.open()
				this.shareType = type
			},
			shareWeixin() {
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.userInfo
				if (this.shareType == 1) {
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						imageUrl: this.logo,
						href: this.inviterUrl,
						type: 0,
						title: "集享",
						summary: "集好货，享生活",
						complete: () => {
							this.$refs.popup.close()
						}
					});
				} else {
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						imageUrl: this.posterList[this.cardCur],
						type: 2,
						complete: () => {
							this.$refs.popup.close()
						}
					});
				}

			},
			shareWeixinQuan() {
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.userInfo
				if (this.shareType == 1) {
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						imageUrl: this.logo,
						href: this.inviterUrl,
						type: 0,
						title: "集好货，享生活",
						summary: "集好货，享生活",
						complete: () => {
							this.$refs.popup.close()
						}
					});
				} else {
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						imageUrl: this.posterList[this.cardCur],
						type: 2,
						complete: () => {
							this.$refs.popup.close()
						}
					});
				}

			},
			shareQQ() {
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.userInfo
				uni.getProvider({
					service: 'share',
					success: (res) => {
						console.log(res)
					}
				})
				uni.share({
					provider: "qq",
					imageUrl: this.posterList[this.cardCur],
					type: 2,
					href: this.inviterUrl,
					complete: () => {
						this.$refs.popup.close()
					}
				});
			},

		}
	}
</script>
<style>
	page {
		/* background-color: #f2f2f2; */
		background-color: rgba(0, 0, 0, 0);
	}

	swiper {
		margin: 0 auto;
	}

	swiper-item view {
		display: block;
		height: 100%;
		transform: scale(0.93, 0.8);
		opacity: 0.7;
		transition: all 0.05s ease-in 0s;
		overflow: hidden;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0);
		margin: 60upx 10upx 10upx 0;
		position: relative;
	}

	.img {
		width: 100%;
		border-radius: 20rpx;
		z-index: 1;
		position: absolute;
		top: 0
	}

	.qrcode {
		position: absolute;
		top: 500rpx;
		z-index: 2;
		top: 644rpx;
		left: 184rpx;
		width: 90px;
		height: 90px;
	}

	swiper-item view.cur {
		transform: initial;
		opacity: 1;
	}

	.inviteBtnBox {
		width: 100%;
		height: 50%;
		box-sizing: border-box;
		padding: 0 70upx;
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: 0;
		background: url(../../static/image/home/bg_rectangle.png) no-repeat;
		background-size: 100% 100%;
		z-index: -999;
	}

	.inviteBtnLeft,
	.inviteBtnRight {
		position: fixed;
		bottom: 60upx;
		width: 260upx;
		height: 72rpx;
		background-color: #fff;
		border-radius: 72rpx;
		color: #333;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 30upx;

	}

	.inviteBtnLeft {
		left: 60upx;
	}

	.inviteBtnRight {
		right: 60upx;
	}

	.inviteBtnLeft image,
	.inviteBtnRight image{
		width: 52upx;
		height: 52upx;
	}

	.inviteBtnLeft .invite-text,
	.inviteBtnRight .invite-text{
		font-size: 28upx;
		margin-left: 20upx;
	}

	.qrimg {
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}

	.canvas {
		width: 750px;
		height: 1228px;
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}

	.share-box {
		height: 172upx;
		background-color: #fff;
		display: flex;

	}

	.share-list {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 20upx 0 30upx 0;
		align-items: center;
		justify-content: space-between;
	}

	.share-list image {
		width: 80upx;
		height: 80upx;
	}

	.share-text {
		font-size: 24upx;
	}
</style>
