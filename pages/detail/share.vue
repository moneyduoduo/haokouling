<template>
 <view>
	<view class="shareBar">
		<view class="shareMoney">{{goodsInfo.zhuan}} 佣金</view>
		<view class="shareSubText">
			分享说明：分享商品给好友购买后，您可以获得推广奖励哦！
		</view>
		<view class="picBar">
			<view class="titleBar">
				<view class="left">选择生成海报主图</view>
			</view>
			<scroll-view scroll-x show-scrollbar="false">
				<view class="picList">
					<view class="list" v-for="(item,index) in smallImages" :key="index" @tap="selectPic(index)" >
						<image :src="item.pic">
						<view class="checkbox" :class="{active:item.active}"></view>
					</view>
				</view>
			</scroll-view>
			<view class="btnBar">
				<view class="btn" @tap="savePic">保存海报到本地</view>
			</view>
		</view>
		<view class="shareTextBar">
			<view class="title">分享文案</view>
<!-- 			<textarea class="shareMainBox">
				<view class="row">
					<view class="shareText"> {{goodsInfo.itemTitle}}</view>
					<view class="shareText">【在售价】 ￥{{goodsInfo.itemPrice}}元</view>
					<view class="shareText">【券后价】 ￥{{goodsInfo.itemEndPrice}}元</view>
					<view class="shareText">【下单链接】{{inviterUrl}}</view>
					<view class="shareText">--------------------</view>
					<view class="shareText">复製这条({{tklShare}})</view>
					<view class="shareText">打开【Tao宝】即可抢购</view>
				</view>
			</textarea> -->
			<textarea class="shareMainBox" v-model="copywriting" maxlength="-1">
			</textarea>
			<view class="textBtnBar">
				<view class="left" @tap="copyTKL">仅复制淘口令</view>
				<view class="right" @tap="copyWA">仅复制分享文案</view>
			</view>
		</view>
		
	</view>
	<view class="layer">
		<view class="standbar">
			
		</view>
		<view class="h1">分享图文到</view>
		<view class="list">
			<view class="box" @tap="shareWeixin()">
				<image src="/static/img/sharemenu/wechat_friend.png"></image>
				<view class="title">
					微信好友
				</view>
			</view>
			<view class="box" @tap="shareWeixinQuan()">
				<image src="/static/img/sharemenu/wechat_moments.png"></image>
				<view class="title">
					朋友圈
				</view>
			</view>
			<view class="box" @tap="shareWeiBo">
				<image src="/static/img/sharemenu/weibo.png"></image>
				<view class="title">
					新浪微博
				</view>
			</view>
			<view class="box" @tap="shareQQ()">
				<image src="/static/img/sharemenu/qq.png"></image>
				<view class="title">
					QQ
				</view>
			</view>
		</view>
	</view>
	<view class="hideCanvasView">
		<canvas class="hideCanvas" canvas-id="qrcode" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas>
	</view>
 </view>
</template>

<script>
	import QRCode from "@/common/qrcode.js"
export default {
	data() {
		return {
			shareText:'',
			itemId:'',
			bili:0,
			allianceScale:0,
			goodsInfo:'',
			smallImages:[],
			inviterUrl:'',
			tklShare:'',
			copywriting:'',
			itemPic:'',
			canvasImgSrc:'',
			canvasW:'',
			canvasH:'',
			shopType:''
			
		};
	},
	onLoad:function(option) {
		this.itemId = option.itemId
		option.type == 'B' ? this.shopType = `/static/img/tmall.png` : this.shopType = `/static/img/taobao.png`
		let jxConfig = this.$store.state.jxConfig
		let userInfo = this.$store.state.userInfo
		this.inviterUrl = `${this.$config.couponeBaseUrl}/1-${this.itemId}-${userInfo.inviterCode}`
		this.mybili()
		// this.tklShareFn(this.itemId)
		this.goodsBaseInfo(this.itemId)
	},
	onShow:function() {
		
	},
	methods: {
		shareWeiBo(){
			uni.getProvider({
				service:'share',
				success:(provider) => {
					console.log(provider)
				}
			})
			
		},
		shareWeixinQuan() {
			if( !this.canvasImgSrc) {
				this.createPic( () => {
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline",
						imageUrl: this.canvasImgSrc,
						type: 2,
						complete: () => {
						}
					});
				})
			}else {
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					imageUrl: this.canvasImgSrc,
					type: 2,
					complete: () => {
					}
				});
			}
			
		},
		shareWeixin() {
			uni.getProvider({
				service:'share',
				success:(provider) => {
					console.log(provider)
				}
			})
			if(!this.canvasImgSrc) {
				this.createPic( () => {
					uni.share({
						provider: "weixin",
						scene: "WXSceneSession",
						imageUrl: this.canvasImgSrc,
						type: 2,
						complete: () => {
						}
					});
				})
			}else {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					imageUrl: this.canvasImgSrc,
					type: 2,
					complete: () => {
					}
				});
			}
		},
		savePic() {
			if(!this.canvasImgSrc) {
				this.createPic(()=> {
					uni.saveImageToPhotosAlbum({
						filePath: this.canvasImgSrc,
						success: () => {
							this.$msg.toast('保存成功')
						},
						fail: () => {
						}
					})
				})
			}else {
				uni.saveImageToPhotosAlbum({
					filePath: this.canvasImgSrc,
					success: () => {
						this.$msg.toast('保存成功')
					},
					fail: () => {
					}
				})
			}
		},
		createPic(callback) {
			let _this = this
			//this.canvasShow = true
			let jxConfig = this.$store.state.jxConfig
			let userInfo = this.$store.state.jxUserInfo.buyerInfo
			let inviterUrl = `${this.$config.couponeBaseUrl}/1-${this.itemId}-${userInfo.inviterCode}`
			if(!this.itemPic) {
				this.itemPic = this.smallImages[0].pic
			}
			console.log(_this.canvasW)
			let canvasW = null;
			let canvasH = null;
			this.canvasW >= 375 ? canvasW = 375 : canvasW = this.canvasW
			this.canvasH >= 667 ? canvasH = 667 : canvasH = this.canvasH
			new QRCode({
				context: _this,
				canvasId: 'qrcode',
				text: inviterUrl, // 二维码链接
				width: _this.canvasW,
				height: _this.canvasH,
				showLoading: true,
				loadingText: '海报生成中...',
				size: 100, // 二维码大小
				canvasOpotion: { //海报尺寸
					canvasWidt: canvasW,
					canvasheight: canvasH
				},
				goods: { //商品信息
					shopType: this.shopType,
					itemTitle: this.goodsInfo.itemTitle,
					itemEndPrice: this.goodsInfo.itemEndPrice,
					couponMoney: this.goodsInfo.couponMoney,
					itemPrice: this.goodsInfo.itemPrice,
					itemSale: this.goodsInfo.itemSale,
					itemPic: _this.itemPic
		
				},
				cbResult: function(res) { // 生成海报的回调
					console.log("生成海报成功！")
					_this.canvasImgSrc = res //base64 图片格式
					if(callback) {
						callback()
					}
				},
			});
		},
		selectPic(index) {
			this.canvasImgSrc = ''
			this.smallImages.forEach( (v,i) => {
				if(index == i) {
					v.active = true
					this.itemPic = v.pic
				}else {
					v.active = false
				}
			})
		},
		
		copyTKL() {
			this.$common.copy(this.tklShare,() => {
				this.$msg.toast("复制成功")
			})
		},
		copyWA() {
			if( !this.copywriting ) {
				this.$msg.toast("请填写分享文案")
				return false
			}
			this.$common.copy(this.copywriting,() => {
				this.$msg.toast("复制成功")
			})
		},
		//ID 获取商品基本信息
		async goodsBaseInfo(itemId){
			// 淘宝比例 *  券后价 * 接口比例 / 100
			let data = await this.$http.post('/api/goods/getDetail',{itemId:itemId})
			this.tklShareFn(itemId)
			this.goodsInfo = data.data
			let zhuan = (data.data.tkRates*data.data.itemEndPrice*this.bili*this.allianceScale/100).toFixed(2)
			this.$set(data.data,"zhuan", zhuan);

			if(data.data.smallImages.length==0){
				data.data.smallImages[0] = data.data.itemPic
			}
			data.data.smallImages.forEach((item,index)=>{
				if(index==0){
					this.smallImages.push({pic:item,active:true})
				}else{
					this.smallImages.push({pic:item,active:false})
				}
				
			})
			this.itemPic = data.data.itemPic
			let shopType = data.data.shopType
			shopType=='B' ? this.shopType= `/static/img/tmall.png` : this.shopType= `/static/img/taobao.png`
			this.itemTitle = data.data.itemTitle
			this.itemSale = data.data.itemSale
			this.couponMoney = data.data.couponMoney
			this.itemEndPrice = data.data.itemEndPrice
			this.itemPrice = data.data.itemPrice
			this.itemDesc = data.data.itemDesc

			//this.setCanvas()
			this.canvasW = this.$store.state.systemInfo.windowWidth
			this.canvasH = this.$store.state.systemInfo.windowHeight
			
		},	
		mybili(){
			this.$http.post('/api/index/getScale')
			.then(res =>{
				this.bili = res.data.scale
				this.allianceScale = res.data.allianceScale
			})
		
		},
		tklShareFn(itemId){
			this.$http.post('/api/goodsShare/doShare',{itemId:itemId})
			.then(res =>{
				this.tklShare = res.data.model
				let goodsInfo =  this.goodsInfo 
				let inviterUrl = this.inviterUrl
				this.copywriting = `【${ goodsInfo.itemTitle}】
【在售价】 ￥${goodsInfo.itemPrice}元
【券后价】 ￥${goodsInfo.itemEndPrice}元
【下单链接】${inviterUrl}
--------------------
复製这条(${res.data.model})
打开【Tao宝】即可抢购`
			})
		}
	}
}
</script>

<style>
	page{
		background: #fff;
		padding-bottom: 282upx;
	}
	.hideCanvas{
		position: fixed;
		left: 999999999upx;
		top: 999999999upx;
	}
	.shareBar{border-top: 1px solid #eee; padding: 30rpx; box-sizing: border-box;}
	.shareMoney{font-size: 32rpx; color:#fa5541;text-align: center;}
	.shareSubText{padding-top:20rpx; font-size: 24rpx;color:#f26686;}
	.picBar{margin-top: 20rpx;}
	.titleBar{display: flex; justify-content: space-between;align-items: center;}
	.titleBar .left,.titleBar .right{ font-size: 28rpx;}
	.titleBar .right text{color: #fa5541;}
	.picList{margin-top: 10rpx; display: flex; justify-content: flex-start; align-items: center;}
	.picList .list{position: relative; width: 200rpx; height:200rpx; margin-right: 20rpx;flex-shrink: 0;}
	.picList .list image{width: 100%; height:100%;}
	.picList .list .checkbox{width: 40rpx; height:40rpx; background: url(../../static/image/index/unchoose_like_icon.png) no-repeat; position: absolute; right: 1px; top:1px; background-size: 100% 100%;}
	.picList .list .checkbox.active{background: url(../../static/image/index/choosed_like_icon.png) no-repeat;background-size: 100% 100%;}
	.btnBar{background:#ffe400; font-size: 28rpx;text-align: center;margin: auto;width: 500rpx;height:80rpx;line-height: 80rpx; border-radius:60rpx; margin-top: 20rpx;}
.shareTextBar {margin-top: 20rpx;}
.shareTextBar .title{font-size: 28rpx;}

.shareMainBox{background-color: #E3E3E3; margin-top: 10rpx; padding: 20rpx; font-size: 26upx;}
.shareText{font-size: 28rpx; color:#888}
.textBtnBar{margin-top: 20rpx; display: flex; justify-content: space-between; align-items: center;}
.textBtnBar .left,.textBtnBar .right{ font-size: 28rpx; color: #fa5541;}


.layer {position: fixed; width:100%;bottom: 0; background-color: #fff;box-sizing: border-box;}
.standbar {height: 12upx; background-color: #f2f2f2;}
.layer .list{width:100%;display:flex;padding:0 0 30rpx 0}
.layer .list .box{display:flex;justify-content:center;flex-wrap:wrap;padding-top: 20rpx; flex: 1;}
.layer .list .box image{width:12.8vw;height:12.8vw}
.layer .list .box .title{margin-top:10rpx;display:flex;justify-content:center;width:100%;font-size:26rpx}
.layer .btn{width:100%;height:100rpx;display:flex;justify-content:center;align-items:center;font-size:28rpx;}
.layer .h1{width:100%;height:80rpx;display:flex;justify-content:center;align-items:center;font-size:28rpx}
</style>