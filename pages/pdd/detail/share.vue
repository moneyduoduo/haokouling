<template>
 <view>
	 <view class="canvas_box"><image :src="canvasImgSrc" mode="widthFix"></image></view>
	<canvas canvas-id="qrcode" :style="{ width: canvasW + 'px', height: canvasH + 'px'}" class="hideCanvasView"></canvas>
	
 	<!-- <canvas canvas-id="canvasId" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas> -->
 </view>
</template>

<script>
	import QRCode from "@/common/qrcode.js"
export default {
	data() {
		return {
			canvasW:0,
			canvasH: 0,
			canvasImgSrc:'',
			base64:'',
			itemPic:'',
			shopType:'',
			itemTitle:'',
			itemSale:'',
			couponMoney:'',
			itemEndPrice:'',
			itemPrice:'',
		};
	},
	onLoad:function(option) {
		let itemId = option.itemId
		this.goodsBaseInfo(itemId)
		
		
	},
	onShow:function() {
		
	},
	methods: {
		//ID 获取商品基本信息
		async goodsBaseInfo(itemId){
			let data = await this.$http.post('/api/goods/getDetail',{itemId:itemId})
			this.itemPic = data.data.itemPic
			let shopType = data.data.shopType
			shopType=='B' ? this.shopType= `/static/img/tmall.png` : this.shopType= `/static/img/taobao.png`
			this.itemTitle = data.data.itemTitle
			this.itemSale = data.data.itemSale
			this.couponMoney = data.data.couponMoney
			this.itemEndPrice = data.data.itemEndPrice
			this.itemPrice = data.data.itemPrice
			//this.setCanvas()
			this.makeCode()
		},
		makeCode() {
			let _this = this
			this.canvasW = this.$store.state.systemInfo.windowWidth
			this.canvasH = this.$store.state.systemInfo.windowHeight
				new QRCode({
				context: _this,
				canvasId:'qrcode',
				text: 'www.baidu.com', // 二维码链接
				size: 80, // 二维码大小
				canvasOpotion:{
					canvasWidt:_this.canvasW,
					canvasheight:_this.canvasH -120
				},
				goods:{
					shopType:_this.shopType,
					itemTitle:_this.itemTitle,
					itemEndPrice:_this.itemEndPrice,
					couponMoney:_this.couponMoney,
					itemPrice:_this.itemPrice,
					itemSale:_this.itemSale,
					itemPic:_this.itemPic
					
				},
				cbResult: function (res) { // 生成二维码的回调
					console.log("生成二维码成功！")
					_this.canvasImgSrc = res
					console.log(_this.canvasImgSrc)
				},
			});
		},
		/* setCanvas(){
			console.log(this.itemTitle)
			let canvasWidt = this.$store.state.systemInfo.windowWidth
			let canvasheight = this.$store.state.systemInfo.windowHeight
			this.canvasW = canvasWidt
			this.canvasH = canvasheight - 100
			const ctx = uni.createCanvasContext('canvasId',this);
			ctx.drawImage(this.shopType, 20, 20, 30, 30); //设置图标
			ctx.setFontSize(14); //设置标题字体大小
			let strlineW = 0
			let textW = canvasWidt - 60
			
			for (let i = 0; i < this.itemTitle.length; i++) {
				strlineW += this.measureText(this.itemTitle[i],7);
				if(strlineW>textW){
					ctx.fillText(this.itemTitle.substring(0, i-2)+'...', 60, 40);
					break;
				}else if (i == this.itemTitle.length - 1){
					ctx.fillText(this.itemTitle, 60, 40);
				}
			}
			
			ctx.setFontSize(16);
			ctx.setFillStyle('#FD4C66');
			ctx.fillText('￥', 20, 80);
			ctx.setFontSize(22);
			ctx.setFillStyle('#FD4C66');
			ctx.fillText(this.itemEndPrice, 40, 80);
			let priceWidth =  this.measureText(this.itemEndPrice,12) +50
			console.log(this.measureText(this.itemEndPrice))
			ctx.setFontSize(16);
			ctx.setFillStyle('#FD4C66');
			ctx.fillText('券后价', priceWidth, 80);
			ctx.drawImage('/static/img/coupon_bg.jpg', this.canvasW-155, 60, 140, 40);
			ctx.setFontSize(20);
			ctx.setFillStyle('#ffe1a5');
			ctx.fillText(`￥${this.couponMoney}`, this.canvasW-110-this.measureText(this.couponMoney), 86);
			ctx.setFontSize(14);
			ctx.setFillStyle('#888888');
			ctx.fillText('原价', 20, 105);
			ctx.setFontSize(14);
			ctx.setFillStyle('#888888');
			ctx.fillText('￥', 50, 105);
			
			ctx.setFontSize(14);
			ctx.setFillStyle('#888888');
			ctx.fillText(this.itemPrice, 65, 105);
			
			
			ctx.setFontSize(14);
			ctx.setFillStyle('#888888');
			ctx.fillText('销量', 120, 105);
			ctx.setFontSize(14);
			ctx.setFillStyle('#888888');
			ctx.fillText(this.itemSale, 150, 105);
			
			ctx.drawImage(this.itemPic, 25, 130, this.canvasW-50, this.canvasW-50); //商品图片
			setTimeout(function() {
				ctx.draw();
			}, 600);
		},
		measureText (text, fontSize=10){ // 模拟canvas measureText不支持 不支持APP的方法
				text = String(text);
			    var text = text.split('');
			    var width = 0;
			    text.forEach(function(item) {
			        if (/[a-zA-Z]/.test(item)) {
			            width += 7;
			        } else if (/[0-9]/.test(item)) {
			            width += 5.5;
			        } else if (/\./.test(item)) {
			            width += 2.7;
			        } else if (/-/.test(item)) {
			            width += 3.25;
			        } else if (/[\u4e00-\u9fa5]/.test(item)) {  //中文匹配
			            width += 10;
			        } else if (/\(|\)/.test(item)) {
			            width += 3.73;
			        } else if (/\s/.test(item)) {
			            width += 2.5;
			        } else if (/%/.test(item)) {
			            width += 8;
			        } else {
			            width += 10;
			        }
			    });
			    return width * fontSize / 10*2;
		} */
	}
}
</script>

<style>
	.canvas_box{width: 100%;height:100%;}
	.canvas_box image{width: 100%;height:100%;}
.hideCanvasView {
		position: relative;
	}
	.hideCanvas {
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}
.posterImage{widows: 100%;}
</style>