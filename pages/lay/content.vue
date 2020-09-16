<template>
	<view>
		<!-- grace filter start -->
		<view class="grace-filter" id="grace-filter-header">
			<view class="items" @tap='showOptions1' style="word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;overflow:hidden;">{{orderList[orderIndex]}}<text
				 class="grace-iconfont icon-arrow-down"></text></view>
			<view class="items" @tap='changePriceOrder1'>
				销量
				<image src='../../static/imgs/sort1.png' mode='widthFix' v-if="priceOrder1 == 3"></image>
				<image src='../../static/imgs/sort2.png' mode='widthFix' v-if="priceOrder1 == 4"></image>
			</view>
			<view class="items" @tap='changePriceOrder'>
				价格
				<image src='../../static/imgs/sort1.png' mode='widthFix' v-if="priceOrder == 1"></image>
				<image src='../../static/imgs/sort2.png' mode='widthFix' v-if="priceOrder == 2"></image>
			</view>
			<view class="items yt-aa" @tap='double'>
				<img v-if="Single" src="../../static/img/classify2.png" mode='widthFix' alt="">
				<img v-else src="../../static/img/classify.png" mode='widthFix' alt="">
			</view>
			<!-- 第一个选项 -->
			<view class='grace-filter-options' v-if="showingIndex == 1">
				<view v-for="(item, index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
				 @tap='changeOrder' :data-itemid="index+4">
					{{item}}<text class="grace-iconfont icon-right" v-if="index ==  orderIndex"></text>
				</view>
			</view>

	
		</view>
		
		<view class="yj-border-box" style='padding-top:76upx; height: 100vh;'>
			<scroll-view scroll-y="true" :data-scindex="newsIndex" @scrolltolower="scrollend" style="height: 100%;" v-if="searchData">
				<!-- 两排显示 -->
				<view v-if="Single">
					<view class="yj-goods-list">
						<view class="yj-goods-list-left">
							<view class="yj-goods-list-item"  v-for="(items, row) in searchData" :key="row" v-if="row % 2 == 0"  @click="authtaobao(items)">
								<image class="yj-goods-list-img" :class="[gujia ? 'yj-gujia':'']" :src="items.Pic" mode="widthFix"></image>
								<view class="yj-goods-info">
									<view class="yj-goods-title yj-elip-2" :class="[gujia ? 'yj-gujia':'']">
										<image class="yj-goods-from" v-if="items.IsTmall==1" src="../../static/img/tmall.png" mode="widthFix"></image>
										<image class="yj-goods-from" v-if="items.IsTmall==0" src="../../static/img/taobao.png" mode="widthFix"></image>
										{{items.D_title?items.D_title:''}}
									</view>
									<view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']" v-if="items.shop_title">{{items.shop_title}}</view>
									
									<!-- 已登录 高级-->
									<view v-if="items.Commission">
										
										<view class="yj-goods-info-bar"  :class="[gujia ? 'yj-gujia':'']">
											<view class="yj-zhuan">
												赚&yen;{{items.Commission*bili*items.Price*9/10000 | numFilter}}
											</view>
											<view class="yj-quan" v-if="items.Quan_price">{{items.Quan_price | numFilter2}}元券</view>
										</view>
									</view>
									
									
									<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']">
										<view class="yj-display-flex yj-middle">
											<text class="yj-goods-pirce" v-if="items.Price">
												<text class="yj-text-sm">&yen;</text>{{items.Price | numFilter}}
											</text>
											<text class="yj-color-gray-light yj-text-min yj-del yj-mar-l-min yj-goods-price-aftercon" v-if="items.Org_Price">{{items.Org_Price | numFilter}}</text>
										</view>
										<view class="yj-color-gray-light yj-text-min" v-if="items.Sales_num">月销{{items.Sales_num}}</view>
									</view>
									
									
								</view>
							</view>
						</view>	
						<view class="yj-goods-list-right">
							<view class="yj-goods-list-item"  v-for="(items, row) in searchData" :key="row" v-if="row % 2 == 1"  @click="authtaobao(items)">
								<image class="yj-goods-list-img" :class="[gujia ? 'yj-gujia':'']" :src="items.Pic" mode="widthFix"></image>
								<view class="yj-goods-info">
									<view class="yj-goods-title yj-elip-2" :class="[gujia ? 'yj-gujia':'']">
										<image class="yj-goods-from" v-if="items.IsTmall==1" src="../../static/img/tmall.png" mode="widthFix"></image>
										<image class="yj-goods-from" v-if="items.IsTmall==0" src="../../static/img/taobao.png" mode="widthFix"></image>
										{{items.D_title?items.D_title:''}}
									</view>
									<view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']" v-if="items.shop_title">{{items.shop_title}}</view>
									
									<!-- 已登录 高级-->
									<view v-if="items.Commission" >
										
										<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']">
											<view class="yj-zhuan">
												赚&yen;{{items.Commission*bili*items.Price*9/10000 | numFilter}}
											</view>
											<view class="yj-quan" v-if="items.Quan_price">{{items.Quan_price | numFilter2}}元券</view>
										</view>
									</view>
									
									
									<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']">
										<view class="yj-display-flex yj-middle">
											<text class="yj-goods-pirce" v-if="items.Price">
												<text class="yj-text-sm">&yen;</text>{{items.Price | numFilter}}
											</text>
											<text class="yj-color-gray-light yj-text-min yj-del yj-mar-l-min yj-goods-price-aftercon" v-if="items.Org_Price">{{items.Org_Price | numFilter}}</text>
										</view>
										<view class="yj-color-gray-light yj-text-min" v-if="items.Sales_num">月销{{items.Sales_num}}</view>
									</view>
								
								</view>
							</view>
						</view>
					</view>
				
				</view>						
				<!-- 一排显示 -->
				<view class="yj-goods-sigle"  v-else>
					<view class="yj-goods-sigle-item" v-for="(items, row) in searchData" :key="row" @click="authtaobao(items)">
						<image class="yj-goods-sigle-img" :class="[gujia ? 'yj-gujia':'']" :src="items.Pic" mode="widthFix"></image>
						<view class="yj-goods-sigle-info">
							<view class="yj-elip-2" :class="[gujia ? 'yj-gujia':'']">
								<image class="yj-goods-from" v-if="items.IsTmall==1" src="../../static/img/tmall.png" mode="widthFix"></image>
								<image class="yj-goods-from" v-if="items.IsTmall==0" src="../../static/img/taobao.png" mode="widthFix"></image>
								{{items.D_title?items.D_title:''}}
							</view>
							<view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']" v-if="items.shop_title">{{items.shop_title}}</view>
							
							<view class="yj-goods-sigle-info-base" :class="[gujia ? 'yj-gujia':'']">
								<!-- 已登录 高级-->
								<view v-if="items.Commission" >
									
									<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']">
										<view class="yj-zhuan">
											赚&yen;{{items.Commission*bili*items.Price*9/10000 | numFilter}}
										</view>
										<view class="yj-quan" v-if="items.Quan_price">{{items.Quan_price | numFilter2}}元券</view>
									</view>
								</view>
								
								
								<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']">
									<view class="yj-display-flex yj-middle">
										<text class="yj-goods-pirce yj-left" v-if="items.Price">
											<text class="yj-text-sm">&yen;</text>{{items.Price | numFilter}}
										</text>
										<text class="yj-color-gray-light yj-text-min yj-del yj-mar-l-min yj-goods-price-aftercon yj-left" v-if="items.Org_Price">{{items.Org_Price | numFilter}}</text>
									</view>
									<view class="yj-color-gray-light yj-text-min" v-if="items.Sales_num">月销{{items.Sales_num}}</view>
								</view>
								
								
							</view>
						</view>
					</view>
				</view>
				<graceLoading :loadingType="tabs[0].loadingType"></graceLoading>
			</scroll-view>
			<emptydata v-else></emptydata>
		</view>
		<loadding :isShow='loadIsShow'></loadding>
	</view>
</template>
<script>
	var _self,baseurl;
	//var myjs = require("../../static/js/my.js");
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import loadding from "../../components/loadding.vue";
	import emptydata from "../../components/emptydata.vue";
	export default {
		data() {
			return {
				gujia:true,
				Single: false,
				//for
				forData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				//被展示的菜单
				showingIndex: 0,
				//第一个选项相关
				orderIndex: 0,
				orderList: ['综合', '佣金比率降序', '佣金比率升序'],
				//第二个选项相关
				cateIndex: 0,
				cateList: 1,
				//价格排序
				priceOrder: 1,
				priceOrder1: 3, //销量
				price: '',
				//筛选条件 
				where1Tips: [],
				where2Tips: [],
				filterHeight: '100%',
				searchName: '', //搜索名称
				cid: '',
				searchData: [1,2,3,4,5,6,7,8], //搜索数据
				zhuanArr: [],
				userData:[],
				userpid:'',
				bili:8.7,
				zhuantype:'升级赚',
				isputong:true,
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
				loadIsShow:false,
				header:''
			}
		},
		onLoad: function(option) {
			_self = this;
			let search = option.search;
			search = search.replace(/\s*/g,"");
			_self.searchName = search;
			uni.setNavigationBarTitle({
				title: option.search
			});
			_self.cid = option.cid;
			
			baseurl = getApp().globalData.baseUrl;
			try {
				const value = uni.getStorageSync('header');
				if (value) {
					_self.header = value;
					_self.mybili();
				} else {
					_self.bili = 8.7;
				}
			} catch (e) {
				_self.bili = 8.7;
			}
			_self.search();
			_self.loadIsShow = true;
		},
		
		components: {
			graceLoading, //数据库流
			loadding,emptydata

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
			mybili:function(){
				uni.request({
					url:baseurl+'index/Rule/bili',
					data:{},
					header:{token:_self.header},
					method: "POST",
					success: (msg) => {
						console.log(msg);
						if(msg.data.code==1){
							this.bili = msg.data.data.bili;
							console.log(_self.bili);
						}
					}
				});
			},
			authtaobao:function(item){
				if(_self.header){
					uni.request({
						url: baseurl+'index/User/checkUserRid',
						data: {},
						header:{token:_self.header},
						method:'POST',
						success: (msg) => {
							console.log(msg);
							if(msg.data.code=='1'){
								this.goodsDetail(item);
							}else{
								//未授权
								uni.showModal({
									title: '提示',
									content: '是否开通淘宝购物返利权限？',
									success: function (res) {
										if (res.confirm) {
											console.log('去授权');
											myjs.baichuanoa('0','4');
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							}
						}
					});
								
				}else{
					uni.navigateTo({
						'url': '../user/login'
					});
				}
				
			},
			
			
			//商品详情
			goodsDetail: function(item) {
				let zhuan = item.Commission*_self.bili*item.Price*9/10000;
				let goodsitem = item;
				goodsitem.zhuan=zhuan;
				goodsitem.bili = _self.bili;
				let thisgoods = JSON.stringify(goodsitem);
				//console.log(thisgoods);
				uni.navigateTo({
					url: "../detail/index?data="+encodeURIComponent(thisgoods)
				});
			},
			
			search: function() {
				_self = this;
				//console.log(0);
				uni.request({
					url: 'http://www.yunhaodan.com/index.php?s=UniApp/indexContent',
					data: {
						search: _self.searchName, //搜索内容
						px: _self.price, //销量 
						cid: _self.cid
					},
					method: "GET",
					success: (msg) => {
						//console.log(msg);
						if (typeof(msg.data)=='object') {
							setTimeout(function(){
								_self.gujia = false;
								_self.searchData = msg.data;
							},500);
						}else{
							_self.searchData=''
						}
						//console.log(JSON.stringify(msg.data));
					},
					complete:function(){
						_self.loadIsShow = false;
					}
				})
			},
			double: function() {
				if (this.Single) {
					_self.Single = false;
				} else {
					_self.Single = true;
				}
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				_self.orderIndex = tapIndex - 4;

				_self.price = tapIndex;
				_self.showingIndex = 0;
				_self.getList();
			},
			//综合
			showOptions1: function() {
				if (_self.showingIndex != 0) {
					_self.showingIndex = 0;
					return;
				}
				_self.showingIndex = 1;

			},
			//销量排序
			changePriceOrder1: function() {
				if (_self.priceOrder1 == 3) {
					_self.priceOrder1 = 4;
				} else {
					_self.priceOrder1 = 3;
				}
				_self.price = _self.priceOrder1;
				_self.getList();
			},
			changeCate: function(e) {
				var tapIndex = e.target.dataset.itemid;
				_self.cateIndex = tapIndex;
				_self.showingIndex = 0;
				_self.getList();
			},
			//价格排序
			changePriceOrder: function() {
				if (_self.priceOrder == 1) {
					_self.priceOrder = 2;
				} else {
					_self.priceOrder = 1;
				}
				_self.price = _self.priceOrder;
				_self.getList();
			},
			//提交条件
			formsubmit: function(e) {
				console.log(JSON.stringify(e.detail.value));
				uni.showModal({
					title: '请观察控制台',
					content: '条件以表单形式提交 ^_^'
				});
				_self.showingIndex = 0;
				_self.getList();
			},
			//重置表单
			formReset: function() {
				for (var i = 0; i < _self.where1Tips.length; i++) {
					_self.where1Tips[i].checked = false;
				}
				_self.where1Tips = _self.where1Tips;
				for (var i = 0; i < _self.where2Tips.length; i++) {
					_self.where2Tips[i].checked = false;
				}
				_self.where2Tips = _self.where2Tips;
				_self.showingIndex = 0;

			},
			//筛选页面js
			changeFunc: function(e) {
				var checkVal = e.detail.value;
				var currentVal = _self.where1Tips;
				for (var i = 0; i < currentVal.length; i++) {
					if (checkVal.indexOf(currentVal[i].value + '') != -1) {
						currentVal[i].checked = true;
					} else {
						currentVal[i].checked = false;
					}
				}
				_self.where1Tips = currentVal;
			},
			changeFunc2: function(e) {
				var checkVal = e.detail.value;
				for (var i = 0; i < _self.where2Tips.length; i++) {
					if (checkVal.indexOf(_self.where2Tips[i].value + '') != -1) {
						_self.where2Tips[i].checked = true;
					} else {
						_self.where2Tips[i].checked = false;
					}
				}
				_self.where2Tips = _self.where2Tips;
			},
			//条件更新后执行统一函数（如重新读取数据等）
			getList: function(e) {

				_self.search();
				// console.log('条件更新后执行统一函数（如重新读取数据等）');
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				//获取是哪个选项滚动到底？
				var index = e.currentTarget.dataset.scindex;
				//判断当前是否正在加载
				if (_self.tabs[0].loadingType === 1) {
					return false;
				}

				_self.tabs[0].loadingType = 1; //加载中

				//模拟延迟

				uni.request({
					url: 'http://www.yunhaodan.com/index.php?s=UniApp/indexContent',
					data: {
						p: _self.tabs[0].page,
						search: _self.searchName,
						cid: _self.cid,
						px: _self.price
					},
					method: "GET",
					success: (msg) => {
						console.log(_self.searchName); 
						if (typeof(msg.data)=='object') {
							_self.searchData = _self.searchData.concat(msg.data);
							//分页
							_self.tabs[0].page++;
							_self.tabs[0].loadingType = 0; //恢复加载状态

						} else {
							_self.tabs[0].loadingType = 2; //全部
							return;
						}

					}
				});

			}
		}
	}
</script>
<style lang="less">
	@import "../../graceUI/graceUI.css";
	@import "../../static/css/mycss.less";
	.grace-filter{
		top: 0;
	}
	.grace-filter .items{
		height: 80upx;
		line-height: 60upx;
		text-align: center;
		width: 30%;	
		color: #666;
	}
	.grace-filter .items.yt-aa{
		width: 10%;
	}
		.grace-filter .items image{
			width:40upx; 
			height: 40upx; margin-top: 14upx;margin-left: -4upx}
	
</style>
