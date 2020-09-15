<template>
	<view>
		<!-- 启动广告 -->
		<view class="gui-start-banner">
			<swiper 
			:indicator-dots="false" indicator-active-color="#666" indicator-color="rgba(0,0,0,0.3)" 
			:autoplay="false" previous-margin="100rpx" next-margin="100rpx" @change="change" :current="cardCur" :style="{height:startBannerHeight+'px'}">
				<!-- 启动图片建议纯色背景 此处设置 swiper-item 背景颜色与图片背景颜色相同即可实现全屏效果 -->
				<swiper-item v-for="(v,i) in sharePic" :key="i">
					<view :class="cardCur==i?'cur':''">
						<image class="img" :src="v" mode="widthFix"></image>
						<image class="qrcode" :src="img"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="inviteBtnBox">
			<view class="inviteBtn" @tap="share">分享海报</view>
		</view>
		
		<view class="qrimg">
		    <tki-qrcode
		    ref="qrcode"
		    cid="inviterCode"
		    :val="inviterUrl"
			:size="800" 
		    :lv="3" 
		    :loadMake="loadMake"
		    :showLoading="false"
		    @result="qrR" />
		</view>
		<view class="canvas">
			<canvas canvas-id="default_PosterCanvasId" :style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
		</view>
	</view>
</template>
<script>
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
import _app from '@/common/QS-SharePoster/app.js';
import getSharePoster from '@/common/QS-SharePoster/QS-SharePoster.js';
export default {
    components: {tkiQrcode},
    data(){
        return {
			poster:{},
			cardCur:1,
			sharePic:[
				'http://img.jixiangshenghuo.com/pic_01.jpg',
				'http://img.jixiangshenghuo.com/pic_02.jpg',
				'http://img.jixiangshenghuo.com/pic_03.jpg',
				'http://img.jixiangshenghuo.com/pic_04.jpg'
			],
			startBannerHeight:0,
			inviterUrl:'',
			img:'',
			loadMake:true,
			canvasId: 'default_PosterCanvasId',
			isShareWin:false
		}
    },
    onLoad:function(){
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
		this.startBannerHeight = this.$storage.get('systemInfo').windowHeight-150;
		
	},
	onShow:function(){
		if(this.isShareWin){
			this.$msg.toast('分享成功！')
		}
		let jxConfig = this.$store.state.jxConfig;
		let userInfo = this.$store.state.userInfo;
		this.inviterUrl = `${jxConfig.config.inviterUrl}?app=1&inviterCode=${userInfo.inviterCode}`;
	},
    methods:{
		change(e){
			this.cardCur = e.detail.current;
		},
		qrR(e){
			//持久化二维码临时文件
			/* uni.saveFile({
				tempFilePath: e,
				success: (res)=>{
					var savedFilePath = res.savedFilePath;
					this.$storage.set('qrcode',savedFilePath);
					this.img = savedFilePath;
					console.log(this.img);
				}
			}); */
			this.img = e;
		},
		async share(){
			if(this.img == ''){
				return false;
			}
			_app.showLoading('海报生成中...');
			const d = await getSharePoster({
				type: 'testShareType',
				posterCanvasId: this.canvasId,
				backgroundImage:this.sharePic[this.cardCur],
				imagesArray: ({bgObj, type, bgScale}) => { //接收的第一个参数为背景图片的信息, 第二个参数是自定义标识（感觉这里用不到）, 图片为示例图片
					const dx = bgObj.width*0.3; 
					return [{
						url: this.img,
						dx:90,
						dy:840,
						dWidth:120,
						dHeight:120,
					}]
				},
				setCanvasWH: ({bgObj, type, bgScale}) => { // 为动态设置画布宽高的方法，
					this.poster = bgObj;
				},
				setCanvasToTempFilePath:({bgObj, type, bgScale}) => { // 为动态设置画布宽高的方法，
					return {
						destWidth:750,
						destHeight:1228,
						quality:0.5
					}
				},
			});
			console.log(d.poster.tempFilePath)
			_app.hideLoading('海报生成中...');
			plus.share.sendWithSystem({
				type: 'image',
				pictures: [d.poster.tempFilePath]
			}, '', (res)=>{
				console.log(res);
				this.isShareWin = true
				console.log(this.isShareWin)
			})
		}
	}
}
</script>
<style>
swiper{width:100%}
swiper-item view{
	display: block;
	height: 100%;
	transform: scale(0.93,0.8);
	opacity: 0.7;
	transition: all 0.05s ease-in 0s;
	overflow: hidden;
	box-sizing: border-box;
	margin: 80upx 40upx 0 40upx ;
	position:relative;
}
.img{width:100%;border-radius: 20rpx;z-index:1;position:absolute;top:0}
.qrcode{position:absolute;z-index:2;top:700upx;left:76upx;width:50px;height:50px;}
swiper-item view.cur{transform:  initial;opacity: 1;}
.inviteBtnBox{width:100%;height:100px;display: flex;justify-content: center;align-items: center; position:fixed; bottom:0; }
.inviteBtn{width:80%;height:50px;line-height:50px; background-color: #f9e851; color:#783c15; font-size: 16px;text-align: center;border-radius: 25px;font-weight: bold;}
.qrimg{position: fixed;top: -99999rpx;left: -99999rpx;z-index: -99999;}
.canvas{width:750px;height:1228px;position: fixed;top: -99999rpx;left: -99999rpx;z-index: -99999;}
</style>