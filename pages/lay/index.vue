<template>
	<view style='height:100%;'>
		<!-- 搜索框 -->
		<view class="yt-catasearch" :style="{paddingTop:statusBarHeight*2 +'rpx'}">
			<view class="grace_title">
				分类
			</view>
			<view class="grace-search">
				<view class="grace-search-in" style="background: #eeda0f;" @tap="search">
					<image class="search-images" src="../../static/image/home/sousuo1.png" ></image>
					<input class="grace-search-input" style="background: #eeda0f;" type="search" placeholder="输入搜索关键词"  placeholder-style="color:#fff" disabled="true"></input>
				</view>
			</view>
		</view>
		<view v-if="show" class="grace-cate" :style="{paddingTop:164 +statusBarHeight*2 +'rpx'}">
			<scroll-view scroll-y class="grace-cate-left">
				<view v-for="(item, index) in soncates" :key="index" :class="['item', currentCateIndex == index ? 'current' : '']"
				 :data-cateid="index" @tap='changCate'>{{item[0].top}}</view>
			</scroll-view>
			<scroll-view class="grace-cate-right" scroll-y :scroll-into-view="productListTo" scroll-with-animation='true' @scroll="rscroll">
				<view class="scrolListBox" v-for="(cate, index) in soncates" :key="index">
					<view class="yt-cate-banner" :id="'subMenu_'+index">{{cate[0].top}}</view>
					<view class="grace-news-list">
						<view class="grace-wrap">
							<view class="grace-boxes" v-for="(itemSon, indexSon) in soncates[index]"
							 :key="indexSon" @tap="selectCate(indexSon,index)">
								<view class="grace-boxes-img">
									<image :src="itemSon.pic"  style="width: 120upx; height: 120upx;"></image>
								</view>
								<view class="grace-boxes-text">{{itemSon.name}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<loadding :isShow='loadIsShow'></loadding>
	</view>
</template>
<script>
	var _self;
	var scrollTimer = null;
	var pageHeight = 100;
	var productsData = require('../../data/products.js');
	import loadding from "../../components/loadding.vue";
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		components:{
			loadding
		},
		data() {
			return {
				loadIsShow:false,
				soncates: [],
				currentCateIndex: 0,
				show: false,
				// 左侧滚动定位
				leftTo: 'menu_1',
				// 产品列表滚动定位
				productListTo: 'productList1',
				// 产品列表对应分类
				allProducts: productsData.allProducts,
				listBarHeight:[],
				statusBarHeight:statusBarHeight,
				scrollTop: '',
			}
		},
		onReady:function(){
			setTimeout(()=>{
				uni.createSelectorQuery().in(this).selectAll('.scrolListBox').boundingClientRect((rects) => {
					rects.forEach((rect,index) => {
						if(index == 0 ) {
							this.scrollTop = rect.top
						}
						this.listBarHeight.push(rect)
					})
				}).exec();
			},1000)
			
			
		},
		onLoad: function() {
			uni.getSystemInfo({
				success: function(res) {
					pageHeight = res.windowHeight;
				},
			});
			_self = this;
			/* uni.showLoading({
				title: ''
			}) */
			_self.loadIsShow = true;
			//获取缓存
			_self.twoMenu();
		
		},
		methods: {
			selectCate(indexSon,index) {
				if(index == 1 || index == 2 ||  index == 8 ) {
					console.log()
					uni.navigateTo({
						url: '../search/content?search=' + this.soncates[index][indexSon].top  + this.soncates[index][indexSon].name
					})
				}else {
					uni.navigateTo({
						url: '../search/content?search=' + this.soncates[index][indexSon].name
					})
				}
				// if(top.includes('男')||top.includes('女')||top.includes('儿')) {
				// 	uni.navigateTo({
				// 		url: '../search/content?search=' + top  + name
				// 	})
				// }else {
				// 	uni.navigateTo({
				// 		url: '../search/content?search='+ name
				// 	})
				// }
			},
			twoMenu: function() {
				this.$http.post('/api/goods/getCates')
				.then(res =>{
					for( let key in res.data.list) {
						this.soncates.push(res.data.list[key])
					}
					this.show = true
					this.loadIsShow = false;
				})
			},
			// 分类切换
			changCate: function(e) {
				var cateid = e.currentTarget.dataset.cateid;
				//console.log(cateid)
				this.currentCateIndex = cateid;
				//this.leftTo = 'menu_' + cateid;
				this.productListTo = `subMenu_${cateid}`
			},
			// 产品区域滚动
			rscroll: function(e) {
				let scrollTop = e.detail.scrollTop
				console.log(e)
				let thisName = ''
				this.listBarHeight.forEach((item,index)=>{
					if((scrollTop+this.scrollTop)>=item.top){
						this.currentCateIndex = index;
					}
				})
			},

			search: function() {
				uni.navigateTo({
					url: '../search/index'
				});
			}
		}
	}
</script>
<style>
	@import "../../graceUI/graceUI.css";
	page {
		height: 100%;
	}
	.grace_title {
		height: 88rpx;
		text-align: center;
		color: #333;
		font-size: 36rpx;
		background-color: #ffe600;
		line-height: 88rpx;
		font-family: "Arial","Microsoft YaHei","\9ED1\4F53","\5B8B\4F53",sans-serif
	}
	.yt-cate-banner{
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		color: #4d4d4d;
		font-size: 30rpx;
		position: relative;
	}
	.yt-cate-banner:before {
		content: '';
		position: absolute;
		width: 32rpx;
		height: 2rpx;
		background-color: #6f6f6f;
		top: 50rpx;
		left: 200rpx;
	}
	.yt-cate-banner:after {
		position: absolute;
		content: '';
		width: 32rpx;
		height: 2rpx;
		background-color: #6f6f6f;
		top: 50rpx;
		right: 200rpx;
	}
	.yt-cate-banner img{
		width: 100%;
		height: 100%;
	}
	.grace-boxes{
		width: 170upx !important;
		text-align: center;
		
	}
	.grace-boxes-text{
		width: 100%;
		font-size: 24upx;
		color: #666;
		line-height: 1.5em;
	}
.grace-title{
	text-indent: 30upx;
}
	.grace-search-icon:before {
		color: #E2231A;
	}
	.grace-search-input {
		flex: 1;
		font-size: 28rpx;
	}
	.grace-news-list-items>image {
		width: 80px;
		height: 80px;
	}

	.grace-news-list-title .price {
		line-height: 1.8em;
		color: #E2231A;
	}

	.grace-add-to-card {
		width: 26px;
		height: 26px;
		line-height: 22px;
		border: 1px solid #E2231A;
		font-size: 26px;
		color: #E2231A;
		float: right;
		text-align: center;
		border-radius: 26px;
	}

	.grace-boxes {
		width: 30%
	}

	.grace-cate{
		/*width:100%;
		 height:calc(100% - 150upx); */
		padding-top: 170upx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.grace-cate-left {
		background: #eee;
		color: #999;
	}
	.grace-cate-right{
		padding-left: 20upx;
		box-sizing: border-box;
	}
	.yt-catasearch{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding:20upx;
		background-color: #fff;
		z-index: 999;
		background-color: #ffe600;
	}

	.grace-cate-left view{
		height: 100upx;
		line-height: 100upx;
		border-bottom:none;
		position: relative;
	}
	.grace-cate-left .current {
		color: #000;
		font-size: 32rpx;
	}
	.grace-cate-left .current:after {
		content: '';
		position: absolute;
		width: 8rpx;
		height: 62rpx;
		background-color: #ffeb08;
		border-radius: 8rpx;
		top: 19rpx;
		left: 20rpx;
	}
	.grace-search-in{
		height: 60upx;
		padding: 0;
		align-items: center;
		padding-left: 32rpx;
		flex: 1;
	}
	.search-images {
		width: 36rpx;
		height: 36rpx;
		/* margin-top: 4upx; */
		/* margin-top: 25px; */
	}
</style>
