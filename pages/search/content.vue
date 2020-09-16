<template>
	<view>
		<view class="yj-search-box"  :style="{paddingTop: 20 + statusBarHeight*2 +'rpx'}" style="position: fixed; z-index: 10; width: 100%; top: 0;left: 0;">
			<image class="yj-search-return yj-pad-r" src="/static/image/home/return.png" @tap="back()"></image>
			<view class="grace-rows yj-search-input" style="align-items: center;vertical-align: middle;">
				<input type="text" style="flex:1" v-model="searchName"  @confirm="search" placeholder="关键字" confirm-type="search">
				<text v-if="searchName" class="grace-iconfont icon-close" @tap="searchName = ''" style="color:#ccc;background:#fff;margin-left:10rpx;"></text>
			</view>
			<view class="yj-color-gray yj-pad-l yj-text-usual" @click="search">搜索</view>
		</view>
		<!-- grace filter start -->
		<view class="grace-filter yj-pad-t-sm" :style="{top: 116+ statusBarHeight*2 +'rpx'}" >
			<view class="items" @tap='showOptions1' style="word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;overflow:hidden;">{{orderList[orderIndex]}}<text
				 class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items" @tap='changePriceOrder1'>
				销量
				<view class="img_box">
					<view :class="[ 'up_icon', priceOrder1 == 2 ? 'select_icon':'']">
						
					</view>
					<view :class="['down_icon', priceOrder1 == 3? 'select_icon1':'' ]">
						
					</view>
				</view>
			<!-- 	<image src='../../static/imgs/sort1.png' mode='widthFix' ></image>
				<image src='../../static/imgs/sort2.png' mode='widthFix' v-if="priceOrder1 == 3"></image> -->
			</view>
			<view class="items" @tap='changePriceOrder'>
				价格
				<view class="img_box">
					<view :class="[ 'up_icon', priceOrder == 4 ? 'select_icon':'']">
						
					</view>
					<view :class="['down_icon', priceOrder == 5? 'select_icon1':'' ]">
						
					</view>
				</view>
				<!-- <image src='../../static/imgs/sort1.png' mode='widthFix' v-if="priceOrder == 4"></image>
				<image src='../../static/imgs/sort2.png' mode='widthFix' v-if="priceOrder == 5"></image> -->
			</view>
			<view class="items yt-aa" @tap='double'>
				<image  v-if="Single" src="../../static/img/classify2.png" mode=""></image>
				<image v-else src="../../static/img/classify.png" mode=""></image>
			</view>

			<view class='grace-filter-options' v-if="showingIndex == 1">
				<view v-for="(item, index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
				 @tap='changeOrder' :data-itemid="index">
					{{item}}<text class="grace-iconfont icon-right" v-if="index ==  orderIndex"></text>
				</view>
			</view>
		</view>
		<!-- grace filter start -->
		<!-- 以下为演示内容 -->
		<view class="yj-border-box" :style="{paddingTop:216+ statusBarHeight*2+ 'upx', height: '100vh'}"  v-if="showData">
			<scroll-view scroll-y="true" @scrolltolower="scrollend" style="height: 100%;" :scroll-top="scrollTop" @scroll="scroll" v-if="searchData">
				<!-- 两排显示 -->
				<view v-if="Single">
					<view class="yj-goods-list">
						<view class="yj-goods-list-left">
							<view class="yj-goods-list-item" v-for="(items, row) in searchData" :key="row" v-if="row % 2 == 0" @click="authtaobao(items.itemId)">
								<image class="yj-goods-list-img" :class="[gujia ? 'yj-gujia':'']" :src="items.itemPic" mode="widthFix"></image>
								<view class="yj-goods-info">
									<view class="yj-goods-title yj-elip-2" :class="[gujia ? 'yj-gujia':'']" >
										<image class="yj-goods-from" v-if="items.shopType=='B'" src="../../static/img/tmall.png" mode="widthFix" style="width:30upx;height:30upx;"></image>
										<image class="yj-goods-from" v-if="items.shopType=='C'" src="../../static/img/taobao.png" mode="widthFix" style="width:30upx;height:30upx;"></image>
										{{items.itemTitle?items.itemTitle:''}}
									</view>
									<!-- <view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']">{{items.shopName?items.shopName:''}}</view> -->

									<!-- 已登录 高级-->
									<view>
									
										<view class="yj-goods-info-bar">
										<!-- 	<view class="yj-zhuan">
												赚&yen;{{items.zhuan| numFilter}}
											</view> -->
											<view class="yj-quan yj-quan1">{{items.couponMoney | numFilter2}}元券</view>
											<view class="yj-quan yj-quan2">预估收益{{items.zhuan| numFilter}}元</view>
										</view>
									</view>
									
									
									<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']" >
										<view class="yj-display-flex yj-middle">
											<text class="yj-goods-pirce">
												<text class="yj-text-sm">&yen;</text>{{items.itemEndPrice | numFilter}}
											</text>
											<text class="yj-color-gray-light yj-text-min yj-del yj-mar-l-min yj-goods-price-aftercon">{{items.tkRates | numFilter}}</text>
										</view>
										<view class="yj-color-gray-light yj-text-min">月销{{items.itemSale}}</view>
									</view>
								

								</view>
							</view>
						</view>
						<view class="yj-goods-list-right">
							<view class="yj-goods-list-item" v-for="(items, row) in searchData" :key="row" v-if="row % 2 == 1" @click="authtaobao(items.itemId)">
								<image class="yj-goods-list-img" :class="[gujia ? 'yj-gujia':'']"  :src="items.itemPic" mode="widthFix"></image>
								<view class="yj-goods-info">
									<view class="yj-goods-title yj-elip-2" :class="[gujia ? 'yj-gujia':'']" >
										<image class="yj-goods-from" v-if="items.shopType=='B'" src="../../static/img/tmall.png" mode="widthFix" style="width:30upx;height:30upx;"></image>
										<image class="yj-goods-from" v-if="items.shopType=='C'" src="../../static/img/taobao.png" mode="widthFix" style="width:30upx;height:30upx;"></image>
										{{items.itemTitle?items.itemTitle:''}}
									</view>
									<!-- <view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']">{{items.shopName}}</view> -->

									<!-- 已登录 高级-->
									<view>
									
										<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']" >
											<!-- <view class="yj-zhuan">
												赚&yen;{{items.zhuan | numFilter}}
											</view> -->
											
											<view class="yj-quan yj-quan1">{{items.couponMoney | numFilter2}}元券</view>
											<view class="yj-quan yj-quan2">预估收益{{items.zhuan| numFilter}}元</view>
										</view>
									</view>
									
									
									<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']" >
										<view class="yj-display-flex yj-middle">
											<text class="yj-goods-pirce">
												<text class="yj-text-sm">&yen;</text>{{items.itemEndPrice | numFilter}}
											</text>
											<text class="yj-color-gray-light yj-text-min yj-del yj-mar-l-min yj-goods-price-aftercon">{{items.itemPrice | numFilter}}</text>
										</view>
										<view class="yj-color-gray-light yj-text-min" v-if="items.itemSale">月销{{items.itemSale}}</view>
									</view>


								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 一排显示 -->
				<view class="yj-goods-sigle" v-else>
					<view class="yj-goods-sigle-item" v-for="(items, row) in searchData" :key="row" @click="authtaobao(items.itemId)">
						<image class="yj-goods-sigle-img" :class="[gujia ? 'yj-gujia':'']"  :src="items.itemPic" mode="widthFix"></image>
						<view class="yj-goods-sigle-info">
							<view class="yj-elip-2" :class="[gujia ? 'yj-gujia':'']" >
								<image class="yj-goods-from" v-if="items.shopType=='B'" src="../../static/img/tmall.png" mode="widthFix"></image>
								<image class="yj-goods-from" v-if="items.shopType=='C'" src="../../static/img/taobao.png" mode="widthFix"></image>
								{{items.itemTitle?items.itemTitle:''}}
							</view>
							<view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']" >{{items.shopName?items.shopName:''}}</view>

							<view class="yj-goods-sigle-info-base">
								<!-- 已登录 高级-->
								<view>
								
									<view class="yj-goods-info-bar">
										<!-- <view class="yj-zhuan">
											赚&yen;{{items.zhuan | numFilter}}
										</view> -->
										
										<view class="yj-quan yj-quan1">{{items.couponMoney | numFilter2}}元券</view>
										<view class="yj-quan  yj-quan2">预估收益{{items.zhuan| numFilter}}元</view>
									</view>
								</view>
								
								
								<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']" >
									<view class="yj-display-flex yj-middle">
										<text class="yj-goods-pirce yj-left">
											<text class="yj-text-sm">&yen;</text>{{items.itemEndPrice | numFilter}}
										</text>
										<text class="yj-color-gray-light yj-text-min yj-del yj-mar-l-min yj-goods-price-aftercon yj-left">{{items.itemPrice | numFilter}}</text>
									</view>
									<view class="yj-color-gray-light yj-text-min">月销{{items.itemSale}}</view>
								</view>

							</view>
						</view>
					</view>
				</view>

				<graceLoading :loadingType="loadingType"></graceLoading>
			</scroll-view>

			
			<view v-else>
				<emptydata></emptydata>
				<!-- <view class="yj-btn yj-block yj-radius yj-main yj-mar-t-big" style="margin:100upx 200upx 0;" @click="search(1)">全网搜索</view> -->
			</view>

		</view>

		<loadding :isShow='loadIsShow'></loadding>
	</view>
</template>
<script>
	var _self,baseurl;
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import loadding from "../../components/loadding.vue";
	import emptydata from "../../components/emptydata.vue";
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	//var myjs = require("../../static/js/my.js");
	export default {
		data() {
			return {
				statusBarHeight:statusBarHeight,
				gujia:true,
				loadIsShow: true,
				showData:false,
				userData: [],
				userpid: '',
				bili:0,
				allianceScale:0,
				zhuantype: '升级赚',
				isputong: true,
				topuser: false,
				//被展示的菜单
				showingIndex: 0,
				//第一个选项相关
				orderIndex: 0,
				orderList: ['综合', '最新商品', '最多佣金'],
				//第二个选项相关
				cateIndex: 0,
				cateList: 1,
				//价格排序
				priceOrder: 4,
				priceOrder1: 2, //销量
				searchHistory:[],
				price: '',
				//筛选条件 
				where1Tips: [],
				where2Tips: [],
				searchName: '', //搜索名称
				searchData: '', //搜索数据
				zhuanArr: [],
				rows: [],
				tabHeight: 300,
				Single: false,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '精选',
						id: 'index0',
						cid: '0',
						loadingType: 0,
						page: 2
					}
				],
				type: '1', //是否全网搜 0不是 1是
				header:'',
				
				
				loadingType:0,
				sortcont:0,
				page:1,
				scrollTop:0,
				old: {
					scrollTop: 0
				}
			}
		},
		onLoad: function(option) {
			// option.search = "衣服";
			this.mybili()
			if(uni.getStorageSync('searchHistory')){
				this.searchHistory = uni.getStorageSync('searchHistory');
			}
			if(option.search){
				let keyword = option.search;
				this.searchName = keyword;
				this.search(this.searchName);
			}else{
				this.$msg.toast('请输入关键字搜索！')
				this.showData = true
				this.loadIsShow = false
				this.loadingType = 2
			}
		},
		components: {
			graceLoading, //数据库流
			loadding,
			emptydata
		},

		filters: {
			numFilter(value) {
				let realVal = parseFloat(parseFloat(value).toFixed(2));
				return realVal
			},
			numFilter2(value) {
				let realVal2 = parseInt(value);
				return realVal2
			}
		},
		methods: {
			back: function() {
				uni.navigateBack();
			},
			saveSeaHistory:function(e){
				let _self = this;
				let _val = e;
				let index = _self.searchHistory.indexOf(_val);
				if ( index != -1) {
					//获取 _val 在数组中的位置
					let thisindex = 0;
					for (var i = 0; i < _self.searchHistory.length; i++) { 
						if (_self.searchHistory[i] == _val)
						thisindex = i;
					}
					//将 _val 在数组中删除
					_self.searchHistory.splice(thisindex, 1);
				}
					//将 _val 重新追加到数组第一位
				  _self.searchHistory.unshift(_val);
				  //超过10位移除
					_self.searchHistory.splice(10,1);
				//存入缓存
				uni.setStorageSync('searchHistory', _self.searchHistory);
				uni.getStorage({
				  key: 'searchHistory',
				  success: function(res) {
					//console.log(JSON.stringify(res));
				  }
				})
			},
			mybili:function(){
				this.$http.post('/api/index/getScale')
				.then(res =>{
					this.bili = res.data.scale
					this.allianceScale = res.data.allianceScale
				})
			},
			async search(mark) {
				this.loadingType = 1;
				this.saveSeaHistory(this.searchName);
				let data = await this.$http.post('/api/goods/getSearch',{keyword:this.searchName,sort:this.sortcont,pages:this.page})
				if(data.data.list.length==0){
					this.$msg.toast('没有搜到相关商品！')
					return 
				}
				data.data.list.map((v,i)=>{
					let zhuan = (v.tkRates*v.itemEndPrice*this.bili*this.allianceScale/100).toFixed(2)
					this.$set(
						v,"zhuan", zhuan
					);
					// data.data.list[i].itemPic = this.$common.imgThumbAli(v.itemPic);
				})
				
				if(mark==0){
					this.searchData = this.searchData.concat(data.data.list)
				}else{
					this.scrollTop = this.old.scrollTop
					this.$nextTick(function() {
						this.scrollTop = 0
					});
					this.searchData = data.data.list
				}
				this.loadingType = 0
				this.gujia = false
				this.showData = true
				this.loadIsShow = false
			
			},
			double: function() {
				if (this.Single) {
					this.Single = false;
				} else {
					this.Single = true;
				}
			},
			scroll(e){
				this.old.scrollTop = e.detail.scrollTop
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				tapIndex == 2 ? this.sortcont = 6 : this.sortcont = tapIndex ;
				console.log(this.price);
				this.orderIndex = tapIndex
				this.showingIndex = 0;
				this.page = 1
				this.getList();
			},
			//综合
			showOptions1: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 1;

			},
			//销量排序
			changePriceOrder1: function() {
				this.priceOrder1 == 2 ? this.priceOrder1 = 3 : this.priceOrder1 = 2
				this.sortcont = this.priceOrder1;
				this.page = 1
				console.log(this.sortcont)
				this.getList();
			},
			changeCate: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.cateIndex = tapIndex;
				this.showingIndex = 0;
				this.page = 1
				this.getList();
			},
			//价格排序
			changePriceOrder: function() {
				this.priceOrder == 4 ? this.priceOrder = 5 : this.priceOrder = 4
				this.sortcont = this.priceOrder;
				this.page = 1
				console.log(this.sortcont)
				this.getList();
			},
			authtaobao:function(itemId){
				this.goodsDetail(itemId);
			},
			//条件更新后执行统一函数（如重新读取数据等）
			getList: function(e) {

				this.search();
				// console.log('条件更新后执行统一函数（如重新读取数据等）');
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				this.page ++
				this.search(0)
				
			},
			
			//商品详情
			goodsDetail: function(itemId) {

				uni.navigateTo({
					url: "../detail/index?itemId=" + itemId
				});
			},


		}
	}
</script>
<style lang="less">
	@import "../../graceUI/graceUI.css";
	@import "../../static/css/mycss.less";
	@baseW: 80upx;
	.yj-goods-pirce {
		color: #FF3C65 !important;
	}
	.yj-quan2 {
		border-radius: 4rpx !important;
		background: #FFF000 !important;
		height: 30rpx !important;
		display: flex;
		align-items: center;
		font-size: 18rpx !important;
		color: #000;
		margin-left: 10rpx;
	}
	.yj-goods-info>view>.yj-goods-info-bar {
		justify-content: flex-start !important;
	}
	.yj-goods-sigle-info-base>view>.yj-goods-info-bar {
		justify-content: flex-start !important;
	}
	.yj-quan {
		
	}
	.yj-quan1 {
		border-radius: 4rpx !important;
		background: #F6491F !important;
		height: 30rpx !important;
		display: flex;
		align-items: center;
		font-size: 18rpx !important;
	}
	.yj-goods-info {
		padding-left: 10rpx;
	}
	.yj-goods-title {
		font-size: 24rpx !important;
		font-weight: normal !important;
	}
	.img_box {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 6rpx;
	}
	.img_box  .up_icon{
		width: 0;
		height: 0;
		border:10rpx solid transparent;
		border-bottom-color:#D8D8D8;

	}
	.img_box  .down_icon{
		width: 0;
		height: 0;
		border:10rpx solid transparent;
		border-top-color:#D8D8D8;
		margin-top: 4rpx;
	
	}
	.img_box  .select_icon {
		border-bottom-color:#FFEA00 !important;
	}
	.img_box  .select_icon1 {
		border-top-color:#FFEA00 !important;
	}
	
	
	.grace-filter-options .option {
		color: #999999;
	}
	.grace-filter-options .current{
		color: #000;
	}
	.grace-filter-options .current .grace-iconfont {
		color: #000;
	}
	.yj-search-box {
		padding: 20rpx 36rpx 40rpx 36rpx;
		background-color: #ffe600;
	}
	.yj-search-box  .yj-search-return {
		width: 20rpx;
		height: 36rpx;
		padding-right:46rpx
	}
	.yj-search-box .yj-search-input {
		height: 56rpx;
		background-image: url(../../static/image/index/sousuo.png);
		background-size: 32rpx 32rpx;
		
	}
	.yj-search-box .yj-search-input input {
		font-size: 24rpx;
	}
	.yj-search-box .yj-text-usual {
		height: 54rpx;
		line-height: 54rpx;
		font-size: 32rpx;
		background-color: #333333;
		color: #FFF600;
		width: 104rpx;
		border-radius: 54rpx;
		text-align: center;
		margin-left: 18rpx;
		padding: 0;
	}
	.grace-filter {
		top: 158upx;
		padding: 0 !important;
	}
	.grace-filter .yt-aa image {
		width: 62rpx !important;
		height: 62rpx !important;
	}
	.grace-filter .items {
		height: @baseW;
		line-height: 60upx;
		
		height: 100rpx;
		display: flex;
		align-items: center;
		text-align: center;
		width: 30%;
		color: #666;

		&.yt-aa {
			width: 10%;
		}

		image {
			width: 40upx;
			height: 40upx;
			margin-top: 14upx;
			margin-left: -4upx;
		}
	}

	.yt-zhuan {
		display: inline-block;
		padding: 0 20upx;
		font-size: 24upx;
		height: 40upx;
		line-height: 40upx;
		border-radius: 3px;
		background-color: #F9EBEC;
		color: #CC1513;
	}



	.yt-sales {
		color: #999;
		font-size: 24upx;
		padding-left: 20upx;
		/* margin-top: -36upx;
		text-align: right;
		padding-right: 20upx; */
	}

	.dollerContent {
		background: #F0EDE5;
		width: 40%;
		border-radius: 12px;
	}

	.grace-items-demo1 {
		background: #00B26A;
	}

	.grace-items-demo2 {
		background: #F76260;
	}

	/* .grace-gradient-bg::after {
		width: 105%;
		height: 100px;
		content: "";
		left: -5%;
		top: 180px;
		position: absolute;
		display: block;
		background: #FFF;
		border-radius: 80px;
	} */

	.grace-news-list-img {
		width: 260upx;
		height: 260upx;

		margin-top: 10upx;
		margin-bottom: 10upx;
		border-radius: 10upx;
	}

	.grace-news-list-title-main {
		font-size: 30upx;

		/* font-weight: bold; */

	}

	.grace-news-list-title {
		width: 60%;
		margin-left: 30upx;
		padding-right: 30upx;
		/* border-bottom: 0.5px solid #F0EDE5; */
	}



	.paddLeftTwo {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.paddLefts {
		margin-top: 10upx;
		line-height: 1.2em;
		font-size: 28upx;
		padding-left: 10upx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.grace-news {
		color: #fe4a65;
	}

	.quan {

		padding: 0;
		position: relative;
		z-index: 1;
		zoom: 1;
		top: 0;
		margin-right: 10px;
		overflow: hidden;
	}

	.quan text {
		background: linear-gradient(to left, #FF5E5E 0%, #FF927C 100%);
		position: relative;
		z-index: 1;
		zoom: 1;
		font-style: normal;
		display: block;
		border-radius: 3px;
		-moz-border-radius: 3px;
		-webkit-border-radius: 3px;
		-o-border-radius: 3px;
		-ms-border-radius: 3px;
		/* font-size: .785rem; */
		width: 22%;

		text-align: center;
		padding: 1px 10px;
		margin-left: 250upx;
		margin-top: -50upx;
		color: #fff;

	}

	.quan text:after,
	.quan text:before {
		position: absolute;
		z-index: 1;
		zoom: 1;
		left: -4px;
		top: 50%;
		margin-top: -3px;
		background: #fff;
		display: block;
		width: 5px;
		height: 5px;
		content: "";
		border-radius: 10px;
		border: 1px solid #fff;
	}

	.quan text:before {
		left: auto;
		right: -4px;
	}

	.grace-h4 {
		border-bottom: 1px solid #F0EDE5;
	}

	.grace-boxes-img image {
		width: 80%;
	}

	.grace-img-lazy {
		width: 345upx;
		height: 345upx;
		border-top-left-radius: 12upx;
		border-top-right-radius: 12upx;
	}

	.del {
		text-decoration: line-through;
	}

	.delLeft {
		margin-left: 50upx;
	}











	/* 搜索样式 */
	.grace-gradient-bg {
		height: 80upx;
	}

	.speech {
		width: 15%;
		margin-top: 500upx;
		background: #ccc;
		border-radius: 64px;
	}

	.yt-searchbox {
		padding-top: 30upx;
		padding-right: 30upx;
		display: flex;
		vertical-align: middle;
	}

	.yt-search-return {
		margin-top: 5upx;
		padding: 0 20upx;
		width: 60upx;
		height: 60upx;
	}

	.yt-search-inputbox {
		flex: 1;
		position: relative;
		background-color: #fff;
		border-radius: 70upx;
	}

	.yt-search-input {
		color: #333;
		height: 70upx;
		padding: 0 100upx 0 30upx;
	}

	.yt-search-btn {
		width: 100upx;
		height: 70upx;
		line-height: 70upx;
		font-size: 32upx;
		text-align: center;
		position: absolute;
		right: 20upx;
		top: 0;
		color: #333;

	}

	.yt-search-tb {
		position: absolute;
		top: 15upx;
		right: 30upx;
		width: 40upx;
		height: 40upx;
	}

	.laiyuan {
		color: #f00;
		font-size: 24px
	}

	.incomeinfo {
		position: absolute;
		right: 40upx;
		bottom: 30upx;
		z-index: 9;

	}

	.yt-quan {
		background: linear-gradient(to right, #FF788C, #FD4C66);
		position: relative;
		z-index: 1;
		zoom: 1;
		font-style: normal;
		display: inline-block;
		border-radius: 3px;
		/* width: auto; */
		padding: 1px 10px;
		color: #fff;
		float: right;
		margin-top: 20upx;
		font-size: 24upx;
	}

	.yt-quan:after,
	.yt-quan:before {
		position: absolute;
		z-index: 1;
		zoom: 1;
		left: -4px;
		top: 50%;
		margin-top: -3px;
		background: #fff;
		display: block;
		width: 5px;
		height: 5px;
		content: "";
		border-radius: 10px;
		border: 1px solid #fff;
	}

	.yt-quan:before {
		left: auto;
		right: -4px;
	}

	.yt-shopname {
		color: #999;
		font-size: 24upx;
		padding: 0 20upx;
		width: 8em;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.priceinfo {
		position: absolute;
		width: 100%;
		bottom: 30upx;
	}



	.yj-goods-list {
		display: flex;
		padding-left: 20upx;
		padding-right: 20upx;
	}

	.yj-goods-list-left {
		flex: 1;
		// padding: 0 10upx;
	}

	.yj-goods-list-right {
		flex: 1;
		padding: 0 10upx;
	}

	.yj-goods-list-item {
		width: 100%;
		background-color: #fff;
		border-radius: 10upx;
		overflow: hidden;
	}

	.yj-goods-list-img {
		width: 100%;
	}
</style>
