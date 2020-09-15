<template>
	<view class="page_content">
		<!-- <top-bar title="超级返" :isClose="true" bgClass="orange"></top-bar> -->
		<view class="notice" @tap="$common.goPage('/pages/superBack/noticeList')">
			<text class="iconfont icon-tongzhi"></text>
			<swiper class="notice ml10 h60" vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item class="ellipsis1 h60 ce f28" v-for="(item,index) in otherConfig.noticeIndex" :key="index">{{item.title}}</swiper-item>
			</swiper>
		</view>
		<view class="show_banner_box">
			<image class="show_banner" src="../../static/image/superBack/index_banner.png"></image>
		</view>
		<view class="help_bar">
			<view class="order_bar">
				<view class="order_bar_title" @tap="$common.getTaskArticle()">
					下单流程
				</view>
				<view class="order_bar_text">
					查看图例
				</view>
			</view>
			<view class="question_bar" @tap="$common.goPage('/pages/superBack/help')">
				<view class="question_bar_title">
					常见问题
				</view>
				<view class="question_bar_text">
					查看图例
				</view>
			</view>
		</view>
		<view class="navbar">
			<view class="tab" :class="{active:activeType==1}" @tap="tabGoods(1)">抢购中
			</view>
			<view class="tab" :class="{active:activeType==2}" @tap="tabGoods(2)">即将开抢
			</view>
		</view>

		<view class="list_bar">
			<view class="list_box">
				<view class="goods_box" v-for="(item,index) in goodsList" :key="index">
					<view class="list row middle" >
						<view class="img_box">
							<image :src="item.thumb"></image>
						</view>
						<view class="list_main flex1">
							<view class="title_box">
								<view class="title ellipsis2">
									<image class="cate_icon" src="../../static/image/superBack/tianmao_icon.png" mode=""></image>
									{{item.giftName}}
								</view>
							</view>
							
							<view class="price_box row between middle">
								<view class="price">
									<view class="gray">
										实拍价￥{{item.realPrice}}
									</view>
									<view class="newPrice">
										到手价￥<text>{{item.giftPrice}}</text>
									</view>
									<view class="nowbuy_box">
										<view class="nowbuy">
											返￥{{item.returnPrice}}
											<view class="count_down" v-if="activeType==2 && item.countDown">
												{{item.countDown}}
											</view>
											<view class="buy_btn" v-if="activeType==1||!item.countDown" @tap="goGoods(item.id)">
												马上抢
											</view>
											
										</view>
										<view class="remain" v-if="activeType==1">剩余{{item.stockLeft}}/{{item.stockTotal}}</view>
									</view>
								</view>
						<!-- 		<view class="btn_box column center">
									<view class="btn" v-if="activeType==1||!item.countDown" @tap="goGoods(item.id)"><text>马上抢</text></view>
									<text class="nowbay_box" v-if="activeType==2 && item.countDown">
										{{item.countDown}}
									</text>
									<view class="gray" v-if="activeType==1">剩余{{item.stockLeft}}/{{item.stockTotal}}</view>
								</view> -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="goodsList.length > 0">
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
			<view class="noData_box" v-if="noData">
				<view class="noData_bg">
					<image src="../../static/image/home/nodata.png"></image>
				</view>
				<view class="">
					<view class="notips_text">
						活动正在筹备中
					</view>
					<view class="notips_text">
						周六周日再来转转吧
					</view>
				</view>
				<view class="DataMoer_box" v-if="giftId" @tap="unsetGiftId()">点击查看更多礼品</view>
				</view>
		</view>
		<bottom-nav current="0" @loadConfig="loadConfig"></bottom-nav>
		<view  class="mask" @touchmove.stop.prevent="moveHandle" v-if="isShowMask" >
			<view class="popup_box">
				<view class="goods_box1" @touchstart="touchStart"  @touchend="touchEnd">
					<image class="close_img" src="../../static/image/superBack/close.png" mode="" @tap="closePupop"></image>
					<view class="popup_title">
						左右滑动选择礼品
					</view>
				<!-- 	<swiper style="height: 300rpx; margin: 10rpx auto 40rpx;" :current="current_img"  @change = "changeSwiper">
						<swiper-item  v-for="(item,index) in list" > -->
							<image class="select_img1" :src="selectImg" mode=""></image>
					<!-- 	</swiper-item>
					</swiper> -->
				</view>
				<view class="goods_list">
					<view class="type_box">
						<view :class="['type_text',  price == 0.1 ? 'active':'']" @tap="getGift(0.1)">
							一毛超值区
						</view>
						<view :class="['type_text', price == 5 ? 'active':'' ]" @tap="getGift(5)">
							五元超值区
						</view>
					</view>
					<view class="srcoll_box">
						<scroll-view  class="scroll_view" scroll-x="true"  :scroll-into-view="scrollId" scroll-with-animation="true">
							<view :class=" ['img_box',index== current_img? 'active':'' ]" :id="'item_'+index " v-for="(item,index) in list" :key="index" @tap="selectImgIndex(index)">
								<image :src="item.thumb" mode=""></image>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="gobuy" @tap="gobuy">	
					立即抢购
				</view>
			</view>
		</view>
		<view class="pupop_img" @tap="open()">
			<image src="../../static/image/superBack/select.gif" mode=""></image>
		</view>
	</view>
</template>
<script>
	import loading from '@/components/loading'
	import bottomNav from '@/components/superBack/bottomNav.vue'
	import mescroll from '@/components/mescroll.vue'
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			loading,
			mescroll,
			bottomNav,
			// uniPopup
		},
		data() {
			return {
				scrollId:'item_0',
				pageX:0,
				selectImg:'',
				current_img:0,
				activeType: 1,
				page: 1,
				isloading: false,
				pageSize: 5,
				giftId: 0,
				noData: false,
				goodsList: [],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				scrollHeight: 500,
				otherConfig: {},
				config: {},
				intervalId: null,
				list:[],
				price: '',
				isShowMask:false,
				
			}
		},
		methods: {
			moveHandle() {
				
			},
			closePupop() {
				// this.$refs.popup.close()
				this.isShowMask= false
			},
			gobuy() {
				this.giftId = this.list[this.current_img].id
				let data = null;
				this.goodsList = [];
				this.page = 1;
				this.loadingType = 0;
				this.getGoodsList()
				// this.$refs.popup.close()
				this.isShowMask= false
			},
			selectImgIndex(index) {
				this.current_img = index
				this.selectImg = this.list[index].thumb
				this.scrollId = 'item_'+index
			},
			touchStart(e) {
				// this.current_img = e.detail.current
				this.pageX = e.mp.changedTouches[0].pageX
			},
			touchEnd (e) {
				// this.current_img = e.detail.current
				this.pageX = e.mp.changedTouches[0].pageX - this.pageX
				if(this.pageX > 58) {
					if(this.current_img == 0) return
					this.current_img --
					this.selectImg = this.list[this.current_img].thumb
					this.scrollId = 'item_'+this.current_img
					console.log(this.current_img)
				}else if( this.pageX < -58){
					if(this.current_img == (this.list.length-1)) return
					this.current_img ++
					this.selectImg = this.list[this.current_img].thumb
					this.scrollId = 'item_'+this.current_img
				}
			},
			getGift(price) {
				let requestData = {};
				let th = this;
				requestData.page = 1
				requestData.pageSize = 999
				requestData.price = price
				this.price = price
				this.list = []
				this.$http.posts('/api/gift/getList',requestData)
				.then(res =>{
					res.data.list.map(function(a) {
						a.active = false;
						a.thumb = th.$common.imgThumb(a.thumb);
						th.list.push(a);
					})
					this.selectImg = th.list[0].thumb
				
				});
			},
			go() {
				uni.navigateTo({
					url:'giftList'
				})
			},
			open(){
				// 需要在 popup 组件，指定 ref 为 popup
				 // this.$refs.popup.open()
				 this.isShowMask= true
			},
			unsetGiftId() {
				this.giftId = '';
				this.getGoodsList();
			},
			loadConfig() {
				let cjfConstantVersion = '';
				this.config = this.$storage.get('cjfConfig');
				if (this.$storage.get('cjfConfig')) {
					cjfConstantVersion = this.config.cjfConstantVersion;
				}
				this.otherConfig = this.$storage.get('cjfOtherConfig');
				this.getGoodsList();
				//超级返初始化接口
				if (!this.otherConfig.isBuyerRegister && this.otherConfig.checkStatus != 2) {
					return this.$msg.alert({
							title: '提示信息',
							content: '超级返关闭账户绑定，具体开放时间另行通知'
						},
						function() {
							uni.navigateBack();
						}
					)
				}
				if (parseInt(this.config.isBuyerUpgrade)) {
					return this.$msg.alert({
						title: '提示信息',
						content: this.config.buyerUpgradeTip
					}, () => {
						this.$common.goPage(0);
					})
				}
				if (this.otherConfig.checkStatus == 0) {
					return this.$msg.alert({
						title: '提示信息',
						content: '请先完善个人资料',
						confirmText: '立即完善'
					}, () => {
						this.$common.goPage('/pages/superBack/addUserInfo');
					})
				}
				if (this.otherConfig.checkStatus == 1) {
					return this.$msg.alert({
						title: '提示信息',
						content: '个人信息审核通过后即可访问超级返'
					}, () => {
						this.$common.goPage(0);
					})
				}
				if (this.otherConfig.checkStatus == 3) {
					return this.$msg.alert({
						title: '提示信息',
						content: '个人信息审核不通过，点击修改'
					}, () => {
						this.$common.goPage('/pages/superBack/addUserInfo');
					})
				}
				if (this.otherConfig.isBlacklist == 1) {
					return this.$msg.alert({
						title: '提示信息',
						content: '你的账号不符合要求',
						confirmText: '确定'
					}, () => {
						this.$common.goPage(0);
					})
				}
			},
			goGoods(goodsId) {
				let _this = this;
				this.$http.posts('/api/order/doStartReceipt', {
					goodsId: goodsId
				}).then(res => {
					if (res.status == 1) {
						clearInterval(this.intervalId);
						this.$common.goPage('/pages/superBack/goods?orderId=' + res.data.orderId);
					}
				}).catch(res => {
					if (res.data.orderId) {
						this.$msg.confirm({
							confirmText: '查看礼品',
							content: res.msg
						}, function() {
							_this.$common.goPage('/pages/superBack/goods?orderId=' + res.data.orderId);
						});
					}
				})
			},
			tabGoods(type) {
				if (this.activeType == type) {
					return;
				}
				this.activeType = type;
				this.goodsList = [];
				this.page = 1;
				this.getGoodsList();
			},
			getGoodsList() {
				let th = this;
				th.noData = false;
				th.loadingType = 1;
				let requestData = {};
				requestData.type = th.activeType;
				requestData.page = th.page;
				requestData.pageSize = th.pageSize;
				if (th.giftId > 0) {
					requestData.giftId = th.giftId;
				}
				//加载中防止重复加载
				if (this.isloading) {
					return;
				}
				this.isloading = true;
				return th.$http.posts('/api/goods/getList', requestData)
					.then(res => {
						this.isloading = false;
						res.data.list.map(function(a) {
							a.countDown = '加载中';
							a.thumb = th.$common.imgThumb(a.thumb);
							th.goodsList.push(a);
						});
						if (th.goodsList.length < 1 && th.page == 1) { //空数据
							th.page--;
							th.noData = true;
						} else if (res.data.list.length < th.pageSize) { //没有更多
							th.loadingType = 2;
						}
						if (th.activeType == 2) {
							this.setCountDown();
						}
						th.page++;
						uni.stopPullDownRefresh()
					});
			},
			setCountDown() {
				clearInterval(this.intervalId);
				for (let key in this.goodsList) {
					this.goodsList[key]["countDown"] = this.$common.countDown(this.goodsList[key]["startTime"])
				}
				this.intervalId = setInterval(() => {
					for (let key in this.goodsList) {
						this.goodsList[key]["countDown"] = this.$common.countDown(this.goodsList[key]["startTime"])
					}
				}, 1000);
			},
			onScroll(e) { // 监听滚动
			}
		},
		onPullDownRefresh() {
			let data = null;
			this.goodsList = [];
			this.page = 1;
			this.loadingType = 0;
			this.getGoodsList()
		},
		onReachBottom() {
			let data = null;
			//没有更多
			if (this.loadingType == 2) {
				return;
			}
			data = this.getGoodsList();
		},
		onReady: function() { //监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
			/* this.setAnimation() */
			let view = uni.createSelectorQuery().in(this).select(".list_bar");
			view.fields({
				size: true,
				scrollOffset: true
			}, data => {
				this.scrollHeight = data.height
				//console.log(data.height)
			}).exec();
		},
		onShow: function() {
			
		},
		onUnload: function() {
			clearInterval(this.intervalId);
		},
		onLoad: function(e) {
			this.getGift(0.1)
			if (e.giftId) {
				this.page = 1;
				this.giftId = e.giftId;
			}
			setTimeout( () => {
				this.open()
			},1000)
		},

	}
</script>
<style>
	@import "../../static/css/global.css";
	page {
		background-color: #fafafa;
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,.5);
		z-index: 999;
		transition: all 0.3s ease ;
	}
	.pupop_img image {
		width: 100%;
		height: 100%;
	}
	.pupop_img {
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		right: 10rpx;
		width: 130rpx;
		height: 130rpx;
	}
	.page_content {
		padding-bottom: 120rpx;
	}
	.close_img {
		width: 38rpx;
		height: 38rpx;
		position: absolute;
		top: 24rpx;
		right: 24rpx;
	}
	.popup_title {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 34rpx;
		color: #333;
	}
	.select_img1 {
		width: 300rpx;
		height: 300rpx;
		display: block;
		margin: 10rpx auto 40rpx
	}
	.gobuy {
		width: 322rpx;
		height: 62rpx;
		border-radius: 62rpx;
		margin: 40rpx auto 40rpx;
		background: #FCF032;
		color: #333333;
		text-align: center;
		line-height: 62rpx;
	}
	.srcoll_box {
		flex: 1;
		overflow: hidden;
	}
	.goods_list {
		display: flex;
	}
	.scroll_view {
		display: flex;
		white-space: nowrap;
		width: 100%;
		height: 128rpx;
	}
	.type_text {
		width: 160rpx;
		height: 48rpx;
		background: #f2f2f2;
		border-radius: 48rpx;
		font-size: 24rpx;
		line-height: 48rpx;
		text-align: center;	
	}
	.type_text.active {
		background:#fcf032
	}
	.type_box {
		width: 212rpx;
		height: 128rpx;
		padding: 8rpx 26rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.img_box.active {
		border: 2rpx solid #FCF032;
	}
	.img_box {
		height: 128rpx;
		width: 128rpx;
		display: inline-block;
		margin-right: 16rpx;
		border-radius: 8rpx;
		overflow: hidden;
		box-sizing: border-box;
	}
	.img_box  image {
		width: 100%;
		height: 100%;
	}
	.popup_box {
		/* width: 704rpx; */
		background-color: #fff;
		margin:  0 auto ;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		
	}
	.goods_box1 {
		width: 100%;
		position: relative;
	}
	.notips_text {
		font-size: 24rpx;
		text-align: center;
		color: #7F7F7F;
		margin-bottom: 16rpx;
	}
	.help_bar {
		display: flex;
		justify-content: center;
		margin-top: 14rpx;
	}
	.order_bar {
		width: 342rpx;
		height: 138rpx;
		background: url(../../static/image/superBack/liucheng.png);
		background-size: 100% 100%;
		padding-left: 142rpx;
	}
	.order_bar_title {
		margin-top: 34rpx;
		font-size: 30rpx;
		line-height: 30rpx;
		color: #66A7FF;
	}
	.order_bar_text {
		color: #79CCFF;
		font-size: 18rpx;
		line-height: 18rpx;
		margin-top: 12rpx;
	}
	.question_bar {
		width: 342rpx;
		height: 138rpx;
		background: url(../../static/image/superBack/wenti.png);
		background-size: 100% 100%;
		padding-left: 142rpx;
	}
	.question_bar_title {
		margin-top: 34rpx;
		font-size: 30rpx;
		line-height: 30rpx;
		color: #F04A18;
	}
	.question_bar_text {
		color: #F04A18;
		font-size: 18rpx;
		line-height: 18rpx;
		margin-top: 12rpx;
	}
	.show_banner_box {
		padding: 18rpx 20rpx 0 20rpx;
		box-sizing: border-box;
		height: 343rpx;
	}
	.show_banner {
		width: 100%;
		height: 100%;
	}
	.list_bar {
		z-index: 1;
		top: 710upx;
		left: 0;
		right: 0;
		bottom: 60px;
		width: auto;
		height: auto;
		overflow: hidden;
	}
	.notice {
		display: flex;
		height: 60rpx !important;
		line-height: 60rpx;
		background-color: #fffbbd !important;
	}
	.icon-tongzhi {
		font-size: 30upx;
		margin: 0 10upx 0 50rpx;
		color: #d46e2c;
	}
	/* 选项卡（抢购中和即将抢购） */
	.navbar {
		height: 84upx;
		position: relative;
		background-color: #fff;
	}
	.navbar {
		display: flex;
		white-space: nowrap;
	}
	.navbar .tab {
		text-align: center;
		line-height: 84upx;
		position: relative;
	}
	.navbar .tab  {
		font-size: 26rpx;
		color: #666666;
	}
	.navbar .tab.active  {
		color: #000000 !important;
		font-size: 30rpx;
		
	}
	.navbar .tab.active:after {
		position: absolute;
		content: '';
		width: 84rpx;
		height: 11rpx;
		background: url(../../static/image/superBack/bolang.png);
		background-size: 100% 100%;
		bottom: 6rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	/* 商品列表 */
	.list_main_bar {
		z-index: 1;
		position: fixed;
		top: 360upx;
		left: 0;
		right: 0;
		bottom: 120upx;
		width: auto;
		/* 使right生效 */
		height: auto;
		/* 使bottom生效 */
		overflow: hidden;
	}
	.list_box {
	}
	.noData_bg  image{
		width: 665upx;
		height: 396upx;
		display: block;
		margin: 0 auto;
	}
	.goods_box {
		padding: 16upx 16upx 0 16upx;
		background-color: #ff7132;
	}
	.goods_box:last-child {
		padding-bottom: 16upx; 
	}
	.list_box .list {
		display: flex;
		background-color: #fff;
		border-bottom: 2upx solid #f2f2f2;
		border-radius: 16upx;
		padding-bottom: 20upx;
		padding: 20upx 20upx
	}

	.list_box .list .img_box {
		width: 200upx;
		height: 200upx;
		overflow: hidden;
		margin-right: 20upx;
		border-radius: 16upx;
	
	}
	.cate_icon {
		width: 24upx;
		height: 24upx;
		margin-right: 10upx;
	}
	.list_box .list .img_box .back_price {
		width: 200upx;
		background: linear-gradient(45deg, #ec145d, #ff6088);
		color: #fff;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
	}

	.list_box .list .img_box image {
		width: 100%;
		height: 100%;
	}

	.list_box .list .list_main {
		flex: 1;
	}
	.list_main .title_box .title {
		width: 100%;
		/* min-height: 80upx; */
		line-height: 40upx;
		font-weight: bold;
	}
	.list_main .nowbuy_box {
		margin-top: 16upx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		height: 68upx;
	}
	.list_main .nowbuy_box .remain {
		flex: 1;
		text-align: right;
		font-size: 24upx;
		color: #888;
	}
	.list_main .nowbuy {
		display: inline-block;
		position: relative;
		height: 68upx;
		width: auto;
		background: linear-gradient(to right, #f66219 ,#ee2c0b);
		padding: 0 60upx 0 15upx;
		line-height: 68upx;
		font-size: 32upx;
		color: #FFF;
	}
	.list_main .nowbuy .buy_btn {
		position: absolute;
		font-size: 32upx;
		width: 136upx;
		height: 68upx;
		line-height: 68upx;
		right: -100upx;
		top: 0upx;
		border-radius: 68upx;
		text-align: center;
		color: #fff;
		background-color: #ffe000;
	}
	.list_main .nowbuy .count_down {
		position: absolute;
		font-size: 32upx;
		width: 310upx;
		height: 68upx;
		line-height: 68upx;
		right: -268upx;
		top: 0upx;
		border-radius: 68upx;
		text-align: center;
		color: #da2028;
		background-color: #ffe000;
	}
	.list_main .title .tag {
		color: #ec145d;
		padding: 0upx 10upx;
		text-align: center;
		border: 1px solid #ec145d;
		border-radius: 10upx;
		margin-right: 10upx;
	}

	.list_main .price_box {
		display: flex;
		height: 160upx;
	}

	.list_main .price_box .newPrice {
		color: #da2028;
		font-size: 28upx;
		margin-top: 10upx;
	}
	.newPrice text{
		font-size: 34upx;
		font-weight: 600;
	}

	.list_main .price_box .gray {
		color: #888;
		font-size: 24upx;
		margin-top: 10upx;
	}

	.btn_box {
		text-align: center;
		padding-right: 20upx;
	}
	.DataMoer_box{
		text-align: center;
		margin-top: 20rpx;
	}
</style>
