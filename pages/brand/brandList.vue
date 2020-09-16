<template>
	<view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<!-- <view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back">
					<view class="icon iconfont icon-zuojiantou" @tap="backPage"></view>
				</view> 
				<view class="middle">品牌详情</view>
				<view class="icon-btn"></view>
			</view> -->
			<!-- 头部-滚动渐变显示 -->
	<!-- 		<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" >
					<view class="icon iconfont icon-zuojiantou" @tap="backPage"></view>
				</view>
				<view class="middle">
					<view>品牌详情</view>
				</view>
				<view class="icon-btn"></view>
			</view> -->
		</view>
		<view class="topBar">
			<image src="/static/image/index/brand-bg.png" class="bgPic"></image>
			<view class="positionBar">
				<view class="contianerBar">
					<view class="topRow">
						<view class="logoName">
							<view class="picBox">
								<view class="logoView"><image :src="brandLogo" class="logoPic"></image></view>
							</view>
							<view class="brandName">{{tbBrandName}}</view>
						</view>
						<view class="focusBox" :class="{active:isFocus==1}" @tap="focusFn()">
							<view class="focus">
								<text>关注</text>
							</view>
						</view>
					</view>
					<view class="subText">
						<text>{{subText}}</text>
					</view>
					<view class="listBar">
						<view class="goodsList" v-for="(dataItem,index) in listData" :key="index" @tap="gotoGoodsDeatil(dataItem.itemId)">
							<image :src="dataItem.itemPic" class="picBox" />
							<view class="goodsInfoBox">
								<view class="titleBox">
									<image src="/static/image/common/tmall.png" class="titleIcon" v-if="dataItem.shopType=='B'" />
									<image src="/static/image/common/taobao.png" class="titleIcon" v-if="dataItem.shopType=='C'" />
									<view class="goodsTitle">{{dataItem.itemTitle}}</view>
								</view>
								<view class="couponeBox">
									<view class="couponBg">
										<text class="couponText">券 减{{dataItem.couponMoney}}</text>
									</view>
									<view class="zhuanBox">
										<text class="zhuanText">赚￥{{dataItem.zhuan}}</text>
									</view>
								</view>
								<view class="oldMoneyBox">
									<text class="oldMoneyLaft">￥{{dataItem.itemPrice}}</text>
									<text class="oldMoneyRight">已抢{{dataItem.itemSale}}件</text>
								</view>
								<view class="couponeMoneyBox">
									<view class="couponeMoney">
										<text class="couponeMoneyText">券后￥</text><text class="bigMoney">{{dataItem.itemEndPrice}}</text>
									</view>
									<view class="nowBayBtn">
										<text class="nowBayBtnText">马上抢</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="listData.length > 0">
						<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
					</view>
				</view>
			</view>
			
		</view>
		<loadding :isShow='loadIsShow'></loadding>
	</view>

</template>
<script>
    
	export default {
		data() {
			return {
				//控制渐变标题栏的参数
				beforeHeaderzIndex: 11,//层级
				afterHeaderzIndex: 10,//层级
				beforeHeaderOpacity: 1,//不透明度
				afterHeaderOpacity: 0,//不透明度
				brandId:"",
				tbBrandName:'',
				brandLogo:'',
				subText:'',
				listData:[],
				bili:0,
				allianceScale:0,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "暂无更多数据了"
				},
				
				isDataMoer:false,
				minId:1,
				loadIsShow:true,
				isFocus:0,
				
			}
		},

		components: {

		},
		onLoad: function(opstion) {
			this.brandId = opstion.brandId
			this.getData()
		},
		onShow: function() {
	
		},
		onPageScroll: function(e) {
			//导航栏渐变
			let tmpY = 100;
			e.scrollTop = e.scrollTop > tmpY ? 100 : e.scrollTop;
			this.afterHeaderOpacity = e.scrollTop/0.5 * (1 / tmpY);
			this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
			//切换层级
			this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
			this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
		},
		onReachBottom: function() { //页面上拉触底事件的处理函数
			this.loadCouponList();
		},
		methods: {
			backPage() {
				uni.navigateBack();
			},
			gotoPDD(){ //调试拼多多
				uni.navigateTo({
					url: '../common/webView?url='+ encodeURIComponent('https://p.pinduoduo.com/OonrVGzp')
				})
			},
			gotoGoodsDeatil(itemId){
				uni.navigateTo({
					url: '/pages/detail/index?itemId='+ itemId
				})
			},
			async getData(moer){
				
				let resbili = await this.$http.post('/api/index/getScale')
				this.bili = resbili.data.scale
				this.allianceScale = resbili.data.allianceScale
				let obj = {minId:this.minId,brandId:this.brandId,order:1}
				//order【1.最新，2.销量（高到低），3.销量（低到高），4.价格(低到高)，5.价格（高到低），6.佣金比例（高到低）】（默认1）
				let res = await this.$http.post('/api/brand/getSingleBrand',obj)
				if(res.data.list.length > 0){
					let newData = res.data.list
					newData.map((v,i)=>{
						let zhuan = (v.tkRates*v.itemEndPrice*this.bili*this.allianceScale/100).toFixed(2)
						v.zhuan = zhuan
						v.itemPic = this.$common.imgThumbAli(v.itemPic);
					})
				}
				if(!moer){
					this.listData = res.data.list
					this.subText = res.data.brandInfo.introduce
					this.tbBrandName = res.data.brandInfo.tbBrandName
					this.brandLogo = res.data.brandInfo.brandLogo
				}else{
					if(res.data.list.length==0){
						this.loadingType = 2
					}
					this.listData = this.listData.concat(res.data.list);
				}
				this.isFocus = res.data.brandInfo.isFollow
				this.isDataMoer = false
				this.loadIsShow = false
				console.log(res.data)
			},
			async focusFn(){
				let res = await this.$http.post('/api/brand/doFollow',{brandId:this.brandId})
				this.isFocus = res.data.isFollow
			},
			loadCouponList(){
				if(this.isDataMoer){ //阻塞多次加载
					return
				}
				this.loadingType = 1
				this.isDataMoer = true;
				this.minId ++ 
				this.getData(true)
			
			},
		}
	}
</script>

<style>
	@import "../../static/css/global.css";
	page{background-color: #f8f8f8;}
	.header{position:fixed;top:0;z-index:10;}
	.header .before,.header .after{padding:0 4%;height:70px;display:flex;align-items:center;position:fixed;top:0;transition:opacity 0.05s linear; padding-top: 40rpx;}
	.header .before .back,.header .after .back{width:30px;height:30px;flex-shrink:0}
	.header .before .back .icon,.header .after .back .icon{margin-left:-10%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:18px}
	.header .before .middle,.header .after .middle{width:100%;text-align: center; font-size: 36rpx; color:#ffffff;}
	.header .before .icon-btn,.header .after .icon-btn{width:30px;height:30px;flex-shrink:0;display:flex}
	.header .before .icon-btn .icon,.header .after .icon-btn .icon{width:30px;height:30px;display:flex;justify-content:center;align-items:center;font-size:16px}
	.header .before .icon-btn .icon:first-child,.header .after .icon-btn .icon:first-child{margin-right:2px}
	.header .before .back .icon{color:#fff;border-radius:100%;/* background-color:rgba(0,0,0,0.5); */}
	.header .before .icon-btn .icon{color:#fff;background-color:rgba(0,0,0,0.5);border-radius:100%}
	.header .after{background-color:#f1f1f1}
	.header .after .back .icon{color:#666}
	.header .after .icon-btn .icon{color:#666}
	.header .after .middle{height:45px;padding:0 7%;flex: 1; text-align: center;height:45px; line-height: 45px;}
	.header .after .middle view{font-size:36rpx;}
	.header .after .middle view.on{margin-bottom:-2px;color:#f47952;border-bottom:solid 2px #f47952;}
	
	.topBar{position: relative;}
	.positionBar{position: absolute; top:0;left:0}
	.contianerBar{padding: 20rpx 20rpx 0 20rpx;}
	.topRow{display: flex;}
	.logoName{display: flex; align-items: center; flex: 1;}
	.logoName .picBox{width: 80rpx; height:80rpx; border-radius: 50%; margin-right: 40rpx; overflow: hidden;display: flex;justify-content: center;align-items: center;background-color: #ffffff;}
	.logoName .logoView{display: flex;justify-content: center;align-items: center;width: 100rpx; height:50rpx;}
	.logoName .picBox image{ width: 100rpx; height:50rpx;}
	.logoName .brandName{flex: 1; font-size: 32rpx; color:#333;}
	.focusBox{height:50rpx;padding:0 20rpx; border-radius: 50rpx;background-color: #ffd35e; display: flex;justify-content: center;align-items: center; width: auto;}
	.focusBox text{color:#555}
	.focusBox.active{background-color: #d8d8d8;}
	.focusBox.active text{color:#888}
	.subText{
	 margin-top: 20rpx;
	 overflow: hidden;
	 text-overflow: ellipsis;
	 display: -webkit-box;
	 -webkit-line-clamp:3;
	 -webkit-box-orient: vertical;
	 color:#333;
	}
	.subText text{color:#333;}
	
	
	
	/* 商品样式 */
	.listBar{
		margin-top: 20rpx;
	}
	.goodsList{
		background-color: #ffffff;
		padding: 20rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		 margin-bottom: 20rpx;;
	}
	.picBox{
		width: 250rpx;
		height:250rpx;
		margin-right:10rpx;
	}
	.goodsInfoBox{
		width: 430rpx;
		padding: 20rpx;
	}
	.couponeBox,.oldMoneyBox,.couponeMoneyBox{
		display: flex;
		width: 410rpx;
	}
	.titleBox{
		position: relative;
	}
	.titleIcon{
		width: 30rpx;
		height:30rpx;
		margin-right: 10rpx;
		position: absolute;
		left:0;
		top:5rpx;
	}
	.goodsTitle{
		font-size: 28rpx;
		text-indent:40rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp:2;
		-webkit-box-orient: vertical;
	}
	.couponBg{
		margin-top: 20rpx;
		background-image: linear-gradient(to left,#ff5453, #ff6e48);
		border-radius: 10rpx;
		margin-right: 20rpx;
		width:auto;
	}
	.couponText{
		font-size: 24rpx;
		color:#ffffff;
		padding:5rpx 10rpx;
		text-align: center;
	}
	.zhuanBox{
		margin-top: 20rpx;
		border-radius: 10rpx;
		background-color: #fcfffa;
		border-style:solid;
		border-width:1px;
		border-color: #d47926;
		width:auto;
	}
	.zhuanText{
		font-size: 24rpx;
		color:#d2886c;
		padding:5rpx 10rpx;
		text-align: center;
	}
	.oldMoneyBox,.couponeMoneyBox{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	
	.oldMoneyLaft{
		font-size: 24rpx;
		color:#797979;
		text-align: left;
	}
	.oldMoneyRight{
		font-size: 24rpx;
		color:#797979;
		text-align: right;
	}
	.couponeMoneyText{
		color:#fb4a63;
		font-size: 24rpx;
	}
	.bigMoney{
		font-size: 36rpx;
		color:#fb4a63;
	}
	.nowBayBtn{
		padding:10rpx 20rpx;
		background-image: linear-gradient(to left,#ff5453, #ff6e48);
		border-radius: 10rpx;
		width: auto;
	}
	.couponeMoney{
		display: flex;
		align-items: center;
		flex:1
	}
	.nowBayBtnText{
		color:#ffffff;
		font-size: 28rpx;
	}
</style>