<template>
	<view>
		<view v-if="show">
			<view class="headerTop">
				<view class='grace-h3 grace-iconfont icon-arrow-left' @tap="back()" style="padding-left: 20%;"> </view>
			</view>
			<view class="yj-content yj-mainF">
				<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" indicator-active-color="#FD4C66"
				 indicator-color="#fff" style="height: 750upx;">
					<swiper-item v-for="(item,index) in goodsInfo.smallImages" :key="index">
						<image :src="item+'_q90.jpg'" mode="aspectFill" style="width: 750upx; height: 750upx;"></image>
					</swiper-item>
				</swiper>
				<view class="yj-bg-fff yj-pad-lr yj-pad-b-sm">
					<view class="yj-display-flex yj-middle">
						<view class="yj-goods-title yj-pad-t-min yj-flex-1" @longpress="copyinfo(goodsInfo.itemTitle)">
							<image class="yj-goods-from" :src="goodsInfo.shopType=='B'?'../../static/img/tmall.png':'../../static/img/taobao.png'"></image>
							{{goodsInfo.itemTitle}}
						</view>
						<view class="yj-pad-l yj-text-center" @click="favourite(goodsInfo.itemId,'set')">
							<image :src="collect==1?'../../static/img/icon/collect_active.png':'../../static/img/icon/collect.png'" style="width:50upx; height: 50upx;"></image>
						</view>
					</view>
					<view class="yj-color-gray-light yj-text-sm yj-mar-t-min">已售 {{goodsInfo.itemSale}}</view>
					<view class="yj-display-flex yj-between yj-mar-t-min">
						<view class="yj-color-main">
							券后 &yen; <text class="yj-goods-pirce yj-text-super">{{goodsInfo.itemEndPrice}}</text>
							<text class="yj-del yj-color-gray-light yj-text-sm yj-mar-l-sm">&yen;{{goodsInfo.itemPrice}}</text>
						</view>
						<view class="yj-zhuan-2" v-if="!isReview">赚&yen;{{goodsInfo.zhuan}}</view>
					</view>

					<view class="detail_bigquan yj-mar-t-sm" @click="goUrl(0)">
						<view class="money">
							<view class="yj-text-biger">
								&yen;<text style="font-size: 80upx;">{{goodsInfo.couponMoney}}</text>
							</view>
							<view class="yj-mar-l-sm">
								<view class="yj-text-biger">优惠券</view>
								<view class="yj-text-min">
									{{goodsInfo.couponStartTime}} -- {{goodsInfo.couponEndTime}}
								</view>
							</view>
						</view>
						<view class="name">
							<view class="yj-lingquan-btn">领券</view>
						</view>
					</view>
					<view class="yj-color-gray-light yj-text-sm yj-mar-t-sm">
						【小编推荐】 : {{goodsInfo.itemDesc}}
					</view>

				</view>


				<!-- 商品推荐 -->
				<!-- <view class="sellLick grace-bg-white" v-if="goodsType=='0' && relevance">
					<view>
						<view class=" grace-bg-white  grace-center grace-h4 grace-blod active ">为您推荐</view>
					</view>
					<view>
						<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
							<view class=" scroll-view-item_H" v-for="(items, row) in relevance" :key="row" style="width: 30%;margin-left: 3%;margin-top: 50upx;">
								<view @click="goodsDetail(items)" v-if="items">
									<image :src="items.Pic" class="grace-img-lazy" style="width:200upx; height: 200upx; border-radius: 10upx;" mode="widthFix"></image>
									<view class="paddLeftInfo" style="overflow: hidden;width: 80%;font-size:0.6rem;">{{items.Title}}</view>
									<view class="grace-news" style="font-size: 0.7rem;">￥{{items.Price}}<text style="font-size: 0.5rem;">卷后</text>
										<text class="del" style="color:#ccc;font-size: 0.6rem;margin-left:7%;">{{items.Org_Price}}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view> -->

				<!-- 商品详情图 -->
				<view style="margin-top: 30upx;">
					<view class=" grace-bg-white  grace-center grace-h4 grace-blod active ">商品详情</view>
					<!-- <img size=790x946>//img.alicdn.com/imgextra/i4/2260414556/O1CN01hZMJXS1jWgzAbLrXn_!!2260414556.jpg</img> -->
				</view>
				<view class="grace-product-info">
					<image v-for="(item,index) in pic" :key="index" :src="item" mode="widthFix" alt="00"></image>
				</view>
			</view>

			<!-- 底部 -->

			<view class="yj-footer yj-pad-tb-min yj-bg-fff">
				<view class="yj-mar-t-min" style="width: 170upx;" @tap="home">
					<image src="../../static/img/home.png" style="height: 36upx; width: 34upx;" mode="widthFix"></image>
					<view class="yj-text-min yj-color-gray-light yj-mar-t-sm">首页</view>
				</view>
				<view class="yj-flex-1 yj-display-flex yj-text-center yj-radius-sm yj-mar-r yj-text-bold" style="overflow: hidden;">
					<view class="yj-flex-1 yj-bg-yellow-dark yj-display-flex yj-middle" @click="goUrl(2)">
						<view class="yj-text-biglotter yj-flex-1">
							&yen;{{goodsInfo.zhuan}}
							<view class="yj-text-sm">分享赚</view>
						</view>
					</view>
					<view class="yj-flex-1 yj-bg-main yj-display-flex yj-middle" @click="goUrl(0)">
						<view class="yj-text-biglotter yj-flex-1">
							<view>&yen;{{goodsInfo.couponMoney}} + &yen;{{goodsInfo.zhuan}}</view>
							<view class="yj-text-sm">自购省</view>
						</view>
					</view>
				</view>
			</view>


			<view class="flex_row_c_c modalView" :class="canvasShow?'show':''" @tap="cancelCanvas()">
				<view class="flex_column">
					<view class="backgroundColor-white padding1vh border_radius_10px">
						<image :src="canvasImgSrc" mode="widthFix" class="posterImage"></image>
					</view>
					<view class="flex_row marginTop2vh">
						<button type="warn" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
						<button type="warn" size="mini" @tap.prevent.stop="uniActionsheetFn()">分享图片</button>
					</view>
				</view>
			</view>
			<view class="hideCanvasView">
				<canvas class="hideCanvas" canvas-id="qrcode" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas>
			</view>


		</view>
		<loadding :isShow='loadIsShow'></loadding>
	</view>
</template>
<script>
	import QRCode from "@/common/qrcode.js"
	export default {
		data() {
			return {
				show: false,
				loadIsShow: true,
				canvasImgSrc: '',
				canvasShow: false,
				goodsinfo: [], //数据内容
				pic: [], //商品详情图
				banner: [], //轮播图
				relevance: '', //商品关联
				is_bc: '', // 是否授权百川,0是未授权 1是授权
				is_ralation_id: '', //是否手淘h5登录  0是未授权 1是授权
				goodsType: '0', //判断是否0元购  '0':普通商品详情 '1':0元购
				zhuan: '', //赚
				sheng: '', //购买省
				success: '', //二合一卷
				shouquan: '',
				isputong: true,
				optiondata: '',
				collect: 0,

				uid: '', //用户id
				header: '',
				bili: 0,
				allianceScale: 0,
				sjZhuan: '',
				rooturl: '',

				goodsData: '',
				goodsInfo: '',

				itemPic: '',
				shopType: '',
				itemTitle: '',
				itemSale: '',
				couponMoney: '',
				itemEndPrice: '',
				itemPrice: '',
				itemDesc: '',
				canvasW: 0,
				canvasH: 0,
				itemId: '',
				isReview: 0,
			}
		},
		filters: {
			numFilter(value) {
				let realVal = parseFloat(parseFloat(value).toFixed(2));
				return realVal
			},
			numFilter2(value) {
				let realVal2 = parseInt(value);
				return realVal2
			},
			splittime(value) {
				let realVal2 = value.split(" ")[0];
				return realVal2
			}
		},

		onLoad(option) {
			let itemId = option.itemId
			//console.log(this.goodsData)
			this.mybili()
			this.goodsImgInfo(itemId)
			this.goodsBaseInfo(itemId)
			this.itemId = itemId
			this.isReview = this.$storage.get('isReview');

		},
		onshow() {

		},
		methods: {
			async favourite(itemId) {
				let islogin = this.$store.state.token
				if (islogin) {
					//	platformType 平台类型（1淘宝，2京东，3拼多多） 
					let data = await this.$http.post('/api/goodsFavourite/doCollect', {
						itemId: this.itemId,
						platformType: 1
					})
					this.collect = data.data.isFavorite
					console.log(data)
				} else {
					this.$msg.confirm({
						title: '提示',
						content: '请先登录'
					}, () => {
						uni.navigateTo({
							url: `/pages/pass/login?back=pages/detail/index?itemId=${itemId}`
						});
					})
				}
			},
			cancelCanvas() {
				this.canvasShow = false
			},
			//复制标题
			copyinfo: function(e) {
				uni.setClipboardData({
					data: e,
					success: function() {
						uni.getStorageSync('clipboardContent', e);
						uni.vibrateShort({
							success: function() {
								console.log('success');
							}
						});
					}
				});
			},
			mybili: function() {
				this.$http.post('/api/index/getScale')
					.then(res => {
						this.bili = res.data.scale
						this.allianceScale = res.data.allianceScale
						console.log(this.bili)
					})

			},
			goodsShareFn() {
				let inviterCode = this.$store.state.userInfo.inviterCode
				return new Promise((resolve, reject) => {
					this.$http.post('/api/goodsShare/doShare', {
							itemId: this.itemId,
							'inviterCode': inviterCode
						})
						.then(res => {
							resolve(res)
						}).catch(err => {
							console.log(err)
							reject(err)
						})
				})
			},
			//ID 获取商品基本信息
			async goodsBaseInfo(itemId) {
				// 淘宝比例 *  券后价 * 接口比例 / 100
				let data = await this.$http.post('/api/goods/getDetail', {
					itemId: itemId
				})
				let zhuan = (data.data.tkRates * data.data.itemEndPrice * this.bili * this.allianceScale / 100).toFixed(2)
				this.$set(data.data, "zhuan", zhuan);
				let zhigoushen = (parseFloat(data.data.couponMoney) + parseFloat(data.data.zhuan)).toFixed(2)
				this.$set(data.data, "zhigoushen", zhigoushen)
				data.data.couponStartTime = this.$common.timeFormat(data.data.couponStartTime, 'mmdd')
				data.data.couponEndTime = this.$common.timeFormat(data.data.couponEndTime, 'mmdd')
				if (data.data.smallImages.length == 0) {
					data.data.smallImages[0] = data.data.itemPic
				}
				this.itemPic = data.data.itemPic
				let shopType = data.data.shopType
				shopType == 'B' ? this.shopType = `/static/img/tmall.png` : this.shopType = `/static/img/taobao.png`
				this.itemTitle = data.data.itemTitle
				this.itemSale = data.data.itemSale
				this.couponMoney = data.data.couponMoney
				this.itemEndPrice = data.data.itemEndPrice
				this.itemPrice = data.data.itemPrice
				this.itemDesc = data.data.itemDesc
				this.collect = data.data.isFavorite
				//this.setCanvas()
				this.canvasW = this.$store.state.systemInfo.windowWidth
				this.canvasH = this.$store.state.systemInfo.windowHeight
				this.loadIsShow = false
				this.show = true
				this.goodsInfo = data.data
				console.log(data.data)

			},
			shareWeixinOne() { //分享给微信朋友
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.userInfo
				let inviterUrl = `${this.$config.couponeBaseUrl}/1-${this.itemId}-${userInfo.inviterCode}`
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					imageUrl: this.canvasImgSrc,
					type: 2,
					title: this.itemTitle,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			shareWeixinTwo() { //分享到微信朋友圈
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.userInfo
				let inviterUrl = `${this.$config.couponeBaseUrl}/1-${this.itemId}-${userInfo.inviterCode}`
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					imageUrl: this.canvasImgSrc,
					summary: this.itemDesc,
					type: 0,
					href: inviterUrl,
					title: this.itemTitle,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			uniActionsheetFn() {
				let _this = this
				uni.showActionSheet({
					title: '分享到',
					itemList: ['微信好友', '微信朋友圈'],
					success: (e) => {
						console.log(e.tapIndex);
						if (e.tapIndex == 0) {
							_this.shareWeixinOne()
						} else if (e.tapIndex == 1) {
							_this.shareWeixinTwo()
						}

					}
				})
			},
			makeCode() {
				let _this = this
				//this.canvasShow = true
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.userInfo
				let inviterUrl = `${this.$config.couponeBaseUrl}/1-${this.itemId}-${userInfo.inviterCode}`
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
						shopType: _this.shopType,
						itemTitle: _this.itemTitle,
						itemEndPrice: _this.itemEndPrice,
						couponMoney: _this.couponMoney,
						itemPrice: _this.itemPrice,
						itemSale: _this.itemSale,
						itemPic: _this.itemPic

					},
					cbResult: function(res) { // 生成海报的回调
						console.log("生成海报成功！")
						_this.canvasShow = true
						_this.canvasImgSrc = res //base64 图片格式

					},
				});
			},
			//图片详情
			goodsImgInfo: function(id) {
				let data = '{"id":"' + id + '","type":"0"}';
				let _this = this
				// #ifdef H5
				uni.request({
					url: '/h5/mtop.taobao.detail.getdesc/6.0/?data=' + encodeURIComponent(data), //encodeURIComponent(data)
					dataType: "json",
					success: (rsp) => {
						if (rsp.hasOwnProperty('data')) {
							var picArr = [];
							for (var i = 0; i < rsp.data.data.wdescContent.pages.length; i++) {
								if (rsp.data.data.wdescContent.pages[i].includes('</img>')) {
									var aaa = "http://" + ((rsp.data.data.wdescContent.pages[i]).split('//')[1]).split('</img>')[0];
									picArr.push(aaa)
								}

							}
							_this.pic = picArr;
						}
					}
				});
				//#endif
				// #ifdef APP-PLUS
				uni.request({
					url: 'https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data=' + encodeURIComponent(data), //encodeURIComponent(data)
					dataType: "json",
					success: (rsp) => {
						var picArr = [];
						console.log(rsp)
						for (var i = 1; i < rsp.data.data.wdescContent.pages.length; i++) {
							var aaa = "http://" + ((rsp.data.data.wdescContent.pages[i]).split('//')[1]).split('</img>')[0];
							picArr.push(aaa)
						}
						_this.pic = picArr;
					}
				});
				//#endif
			},

			//返回
			back: function() {
				uni.navigateBack();
			},
			showCanvas() {
				if (this.canvasImgSrc == '') {
					this.makeCode()
				} else {
					this.canvasShow = true
				}
			},

			saveImage() {
				let _this = this
				// #ifdef APP-PLUS
				console.log(this.canvasImgSrc)
				uni.saveImageToPhotosAlbum({
					filePath: this.canvasImgSrc,
					success: function(res) {
						//_this.showToast('保存成功');
						_this.$msg.toast('保存成功！')
						console.log('保存成功！')
					}
				})
				// #endif
			},
			//分享赚||领取优惠券
			goUrl: function(uslIndex) { // 0 领优惠券 1 跳转商品详情  2 分享
				const couponMoney = this.goodsInfo.couponMoney
				this.$bindSystem.checkBindTaoBao('pages/detail/index', {
					itemId: this.itemId
				}).then(res => {
					switch (uslIndex) {
						case 0:
							//this.$bindSystem.baiChuan.openCoupon(this.goodsInfo.couponUrl)
							const option = {}
							option.type = 1
							option.money = couponMoney
							option.itemId = this.itemId
							console.log(option)
							this.$http.post('/api/account/doUseCoupon', option).then(res => {
								this.goodsShareFn().then(res => {
									this.$bindSystem.baiChuan.goodsUrl(res.data.url)
								})
							})
							break
						case 1:
							this.goodsShareFn().then(res => {
								this.$bindSystem.baiChuan.goodsUrl(res.data.url)
							})
							break
						case 2:
							uni.navigateTo({
								url: 'share?itemId=' + this.itemId + '&type=' + this.shopType
							})
							// this.showCanvas()
							break
						default:
							break;
					}
				})


			},

			home: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},

		}
	}
</script>

<style lang="less">
	@import "../../graceUI/graceUI.css";
	@import "../../static/css/mycss.less";

	page {
		background: #F2F3F4;
	}

	.yt-footer-index {
		/* width: 10%; */
		text-align: center;
		padding: 0 5%;
		color: #666;
		line-height: 90upx;
	}

	.grace-product-info image {
		vertical-align: middle;
	}

	.grace-product-btn {
		width: 45%;
	}

	.headerTop {
		flex-wrap: nowrap;
		position: fixed;
		z-index: 9998;
		margin-left: 5%;
		border-radius: 50%;
		background: #9B9B9B;
		margin-top: 50upx;
		height: 75upx;
		width: 75upx;
		color: #fff;
		opacity: 0.6;

	}

	.goods_quan {
		position: relative;
		z-index: 1;
		zoom: 1;
	}

	.goods_quan .row {
		display: block;
		position: absolute;
		z-index: 1;
		zoom: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		text-align: center;
	}

	.detail_bigquan {
		width: 690upx;
		height: 160upx;
		background-image: url('../../static/img/quan_bg.png');
		background-size: 100% 100%;
		color: @main_color;
		display: flex;
		align-items: center;
		font-weight: @font_bold;
	}

	.detail_bigquan .money {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.detail_bigquan .name {
		width: 215upx;
	}

	.yj-lingquan-btn {
		width: 142upx;
		height: 64upx;
		font-size: 38upx;
		background-image: linear-gradient(to right, #ffd269, #ffb608);
		text-align: center;
		line-height: 64upx;
		border-radius: 64upx;
		margin: auto;
	}

	.goods_quan image {
		display: block;
		width: 100%;
	}

	.introduce {
		color: #999;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}

	.active {
		line-height: 100upx;
	}

	.sellLick {
		/* background: #F6F7FB; */
		/* border-radius: 24px; */
		margin: 20upx 0;

	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		/* width: 100%; */
		height: 300upx;
		/* line-height: 300upx; */
		/* text-align: center; */
		font-size: 36upx;
	}

	.grace-boxes-text {
		line-height: 0.3rem;
	}

	.grace-product-price text {
		text-decoration: none;
	}

	.yt-popup-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .4);
		z-index: 10;
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

	.share_box .mark {
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10000;
	}

	.share_box .sharePostion {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10001;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.share_box .sharePostion .shareImg {
		width: 80%;
		height: 90%;
		position: relative;
	}

	.share_box .sharePostion .shareImg .cancel {
		width: 15px;
		height: 15px;
		position: absolute;
		top: 5px;
		right: 10px;
		z-index: 10;
	}

	.share_box .sharePostion .shareImg .cancel image {
		width: 100%;
		height: 100%;
	}

	.share_box .sharePostion .shareImg .img_box {
		background-color: #ffffff;
		border-radius: 10px;
		height: 80%;
		padding: 20px 10px;
	}

	.share_box .sharePostion .shareImg .img_box image {
		width: 100%;
		height: 100%;
	}

	.share_box .sharePostion .shareImg .btn_box {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10px;
	}

	.share_box .sharePostion .shareImg .btn_box .btn {
		width: 120px;
		height: 35px;
		text-align: center;
		background-color: #FD4C66;
		color: #fff;
		line-height: 35px;
		margin-left: 10px;
		border-radius: 10px;
	}

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(3);
		perspective: 2500rpx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 9999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
		width: auto;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10rpx;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 500rpx;
		height: 890rpx;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
