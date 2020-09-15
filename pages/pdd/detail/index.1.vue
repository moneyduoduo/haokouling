<template>
	<view>
		<view class="headerTop">
			<view class='grace-h3 grace-iconfont icon-arrow-left' @tap="back()" style="padding-left: 20%;"> </view>
		</view>
		<view class="yj-content yj-mainF">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500" indicator-active-color="#FD4C66"
			 indicator-color="#fff" style="height: 750upx;">
				<swiper-item v-for="(item,index) in banner" :key="index">
					<image :src="item" mode="aspectFill" style="width: 750upx; height: 750upx;"></image>
				</swiper-item>
			</swiper>
			<view class="yj-bg-fff yj-pad-lr yj-pad-b-sm">
				<view class="yj-display-flex yj-middle">
					<view class="yj-goods-title yj-pad-t-min yj-flex-1" @longpress="copyinfo(news.Title)">
						<image class="yj-goods-from" :src="news.IsTmall==1?'../../static/img/tmall.png':'../../static/img/taobao.png'"></image>
						{{news.Title}}
					</view>
					<view class="yj-pad-l yj-text-center" @click="collgoods(news)">
						<image :src="collect?'../../static/img/icon/collect_active.png':'../../static/img/icon/collect.png'" style="width:50upx; height: 50upx;"></image>
						<!-- <text class="yj-color-gray yj-text-sm">收藏</text> -->
					</view>
				</view>
				<view class="yj-color-gray-light yj-text-sm yj-mar-t-min">已售 {{news.Sales_num}}</view>
				<view class="yj-display-flex yj-between yj-mar-t-min">
					<view class="yj-color-main">
						券后 &yen; <text class="yj-goods-pirce yj-text-super">{{parseFloat(news.Price)}}</text>
						<text class="yj-del yj-color-gray-light yj-text-sm yj-mar-l-sm">&yen;{{news.Org_Price}}</text>
					</view>
					<view class="yj-zhuan-2">赚&yen;{{ goodsType=='1'?parseFloat(news.Price):zhuan}}</view>
				</view>
				<view class="yj-tip-yellow yj-mar-t-sm yj-display-flex yj-between" v-show="isputong&&goodsType=='0'">
					<view>升级赚: <text class="yj-text-bold yj-mar-l-min"> &yen;{{parseFloat(news.Commission*8.7*news.Price*9/10000).toFixed(2)}}</text></view>
					<navigator class="yj-color-gray-dark" :url="'../index/webview?url=http://www.sqwolf.com/Rule/index/id/4/uid/'+uid">
						升级 <image class="yj-icon-smlotter" src="../../static/img/enter.png" mode="widthFix"></image>
					</navigator>
				</view>
				<view class="detail_bigquan yj-mar-t-sm" v-if="news.Quan_price&&news.Quan_price!='null'&&Number(news.Quan_price)!='0'" @click="lingquan">
					<view class="money">
						<view class="yj-text-biger">
							&yen;<text style="font-size: 80upx;">{{news.Quan_price |numFilter2}}</text>
						</view>
						<view class="yj-mar-l-sm">
							<view class="yj-text-biger">优惠券</view>
							<view class="yj-text-min">
								{{news.Quan_start_time?news.Quan_start_time:'到期时间' | splittime}} -- {{news.Quan_end_time | splittime}}
								<!-- <text class="yj-text-sm">到期：</text>
								{{news.Quan_end_time | splittime}} -->
							</view>
						</view>
					</view>
					<view class="name">
						<view class="yj-lingquan-btn">领券</view>
					</view>
				</view>
				<view class="yj-color-gray-light yj-text-sm yj-mar-t-sm" v-if="news.Introduce && news.Introduce != 'undefined'">
					【小编推荐】 : {{news.Introduce}}
				</view>
				
			</view>
			
			
			<!-- 商品推荐 -->
			<view class="sellLick grace-bg-white" v-if="goodsType=='0' && relevance">
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
			</view>
			
			<!-- 商品详情图 -->
			<view style="margin-top: 30upx;">
				<view class=" grace-bg-white  grace-center grace-h4 grace-blod active ">商品详情</view>
				<!-- <img size=790x946>//img.alicdn.com/imgextra/i4/2260414556/O1CN01hZMJXS1jWgzAbLrXn_!!2260414556.jpg</img> -->
			</view>
			<view class="grace-product-info">
				<!-- <p  v-for="(item,index) in pic" :key="index">{{item}}</p> -->
				<image v-for="(item,index) in pic" :key="index" :src="item" mode="widthFix" alt="00"></image>
			</view>
		</view>

		<!-- 底部 -->
		<view class="yj-footer yj-pad-tb-min yj-bg-fff">
			<view class="yj-mar-t-min" style="width: 170upx;" @tap="home">
				<image src="../../static/img/home.png" style="height: 36upx; width: 34upx;" mode="widthFix"></image>
				<view class="yj-text-min yj-color-gray-light">首页</view>
			</view>
			<view class="yj-flex-1 yj-display-flex yj-text-center yj-radius-sm yj-mar-r yj-text-bold" style="overflow: hidden;">
				<view class="yj-flex-1 yj-bg-yellow-dark yj-display-flex yj-middle" @click="sharezhuan">
					<view class="yj-text-biglotter yj-flex-1" v-if="goodsType=='0'">
						&yen;{{zhuan}}
						<view class="yj-text-sm">分享赚</view>
					</view>
					<view class="yj-text-biglotter yj-flex-1" v-else>
						<view class="yj-text-usual">分享</view>
						<view class="yj-text-usual">赚钱</view>
					</view>
				</view>
				<view class="yj-flex-1 yj-bg-main yj-display-flex yj-middle" @click="lingquan">
					<view class="yj-text-biglotter yj-flex-1">
						<view v-if="news.Quan_price&&news.Quan_price!='null'">&yen;{{goodsType=='0' ? sheng:news.Price}}</view>
						<view v-else>&yen;{{goodsType=='0' ? zhuan:news.Price}}</view>
						<view class="yj-text-sm">自购省</view>
					</view>
				</view>
			</view>
		</view>
	

		<loadding :isShow='loadIsShow'></loadding>
	</view>
</template>
<script>
	var _self,baseurl;
	import loadding from "../../components/loadding.vue";
	var bctaobao = require("../../static/js/my.js");
	export default {
		data() {
			return {
				loadIsShow: false,
				news: [], //数据内容
				pic: [], //商品详情图
				banner: [], //轮播图
				relevance: '', //商品关联
				
				uid: '', //用户id
				header:'',
				
				is_bc: '', // 是否授权百川,0是未授权 1是授权
				is_ralation_id: '', //是否手淘h5登录  0是未授权 1是授权
				goodsType: '0', //判断是否0元购  '0':普通商品详情 '1':0元购
				zhuan: '', //赚
				sheng: '', //购买省
				bili: '', //当前用户佣金比例
				success: '', //二合一卷
				shouquan: '',
				isputong:true,
				optiondata:'',
				collect:false
			}
		},
		filters: {
			numFilter(value) {
				let realVal = parseFloat(value).toFixed(2);
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
		
		onLoad: function(option) {
			_self = this;
			_self.optiondata = option.data;
			baseurl = getApp().globalData.baseUrl;
			_self.header = getApp().globalData.tokenss;
			_self.goodsType = option.nomoney;
			//等待
			_self.loadIsShow = true;
			try {
				_self.isputong = uni.getStorageSync('isputong');
			} catch (e) {
				_self.isputong = false;
			}
			/* if (option.shouquan) {
				_self.shouquan = option.shouquan;
			} else {
				_self.shouquan = ''
			} */
			_self.shouquan = option.shouquan ? option.shouquan:'';
			
			if (_self.shouquan == '1') {
				const shouquangoods = uni.getStorageSync('shouquangoods');
				if (shouquangoods) {
					//console.log(shouquangoods);
					_self.detail(shouquangoods);
				} else {
					uni.switchTab({
						url: '../index/index'
					})
				}
			} else {
				_self.detail(JSON.parse(option.data));
			}

			
			//_self.iscollgoods();
		},

		methods: {
			//判断是否收藏
			iscollgoods:function(){
				uni.request({
					url: baseurl+'index/Collect/checkCollect',
					data: {
						GoodsID: _self.news.GoodsID
					},
					method:'POST',
					header : {token:_self.header},
					success: (msg) => {
						console.log(msg);
						if(msg.data.code==1){
							_self.collect = true;
						}else{
							_self.collect = false;
						}
					}
				})
			},
			//复制标题
			copyinfo: function(e) {
				
				uni.setClipboardData({
					data: e,
					success: function() {
						uni.vibrateShort({
							success: function () {
								console.log('success');
							}
						});
						//plus.device.vibrate(100);
						uni.showToast({
							title: "复制成功",
							icon: 'none'
						});

					}
				});
			},
			//商品详情
			detail: function(e) {
				console.log(e);
				_self.loadIsShow = false;
				_self.news = e;
				_self.zhuan = parseFloat(parseFloat(e.zhuan).toFixed(2));
				_self.sheng = parseFloat(parseFloat(Number(e.Quan_price) + Number(e.zhuan)).toFixed(2));
				_self.bili = e.bili;
				_self.goodsbanner(e.GoodsID);
				_self.goodsImgInfo(e.GoodsID);
				_self.goshop(e);
				_self.goodsrelevance(e.GoodsID);
				//console.log(e.Quan_price);
			},
			//轮播图
			goodsbanner(e) {
				console.log(_self.news.GoodsID);
				uni.request({
					url:baseurl + 'index/Goods/goodsLunBo',
					data:{
						GoodsID:e
					},
					method: "POST",
					header : {'content-type':'application/x-www-form-urlencoded'},
					success: (msg) => {
						console.log(msg);
						if(msg.data.code==1){
							_self.banner = msg.data.data;
						}else{
							_self.banner[0] = _self.news.Pic;
						}
					}
				});
			},
			//图片详情
			goodsImgInfo: function(id) {
				let data = '{"id":"' + id + '","type":"0"}';
				uni.request({
					url: 'https://h5api.m.taobao.com/h5/mtop.taobao.detail.getdesc/6.0/?data=' + encodeURIComponent(data), //encodeURIComponent(data)
					dataType: "json",
					success: (rsp) => {
						var picArr = [];
						for (var i = 1; i < rsp.data.data.wdescContent.pages.length; i++) {
							var aaa = "http://" + ((rsp.data.data.wdescContent.pages[i]).split('//')[1]).split('</img>')[0];
							picArr.push(aaa)
						}
						_self.pic = picArr;
					}
				});
			},
			//商品关联
			goodsrelevance: function(e) {
				uni.request({
					url: 'http://www.sqwolf.com/index.php?s=User/relevance',
					data: {
						goodsid: e
					},
					method: "GET",
					success: (msg) => {
						if (msg.data.code == 1) {
							_self.relevance = msg.data.res;
						}
					}
				});
			},
			//进入商品详情
			goodsDetail: function(item) {
				let zhuan = item.Commission * _self.bili * item.Price * 9 / 10000;
				let goodsitem = item;
				goodsitem.zhuan = zhuan;
				goodsitem.bili = _self.bili;
				let thisgoods = JSON.stringify(goodsitem);
				//console.log(thisgoods);
				uni.navigateTo({
					url: "../detail/index?data=" + encodeURIComponent(thisgoods)
				});
			},
			//返回
			back: function() {
				uni.navigateBack();
			},
		

			//授权时商品信息存入缓存
			huancungoods: function() {
				uni.setStorageSync('shouquangoods', _self.news);
			},

			//高佣转链
			goshop: function(e) {
				//淘宝详情图 
				if (_self.uid) {
					uni.request({
						url: 'http://www.sqwolf.com/index.php/User/highmaid', //https://www.shengqianbb.com/api/goods/highmaid
						data: {
							uid: _self.uid,
							Title: e.Title,
							GoodsID: e.GoodsID,
							Pic: e.Pic
						},
						method: "GET",
						success: (msg) => {
							console.log(msg);
							_self.news.success = msg.data.success;
							_self.news.tao = msg.data.tao;
							_self.news.code = msg.data.code;
							_self.is_bc = msg.data.is_bc;
							_self.is_ralation_id = msg.data.is_ralation_id;
							
						}
					});
				}
			},

			//分享赚
			sharezhuan:function(){
				if (_self.header) {
					uni.request({
						url:'http://www.sqwolf.com/index.php?s=/User/accountDj',
						data:{
							uid:_self.uid
						},
						method:"POST",
						header : {'content-type':'application/x-www-form-urlencoded'},
						success:function(msg){
							console.log(msg.data);
							if(msg.data.code=='1'){
								_self.buyNow();
							}else{
								uni.showToast({
									title:msg.data.msg,
									icon:'none'
								})
							}
						}
					})
				} else {
					uni.navigateTo({
						url: "../user/login"
					})
				}
			},

			//去分享
			buyNow: function() {
				if (_self.is_ralation_id == '0') {
					bctaobao.baichuanoa('0','9');
				} else {
					_self.goshop(_self.news);
					uni.showLoading({
						title: '生成中'
					});
					uni.request({
						url: 'http://www.sqwolf.com/index.php?s=UniApp/gdImage',
						data: {
							uid: _self.uid,
							goodsid: _self.news.GoodsID,
							Pic: _self.news.Pic,
							Title: _self.news.Title,
							Price: _self.news.Price,
							Sales_num: _self.news.Sales_num,
							Quan_price: _self.news.Org_Price - _self.news.Price
						},
						method: "GET",
						success: (msg) => {
							uni.hideLoading();
							uni.navigateTo({
								url: "./share?tao=" + _self.news.tao + "&D_title=" + _self.news.Title + "&Org_Price=" + _self.news.Org_Price +
									"&Price=" + _self.news.Price + "&pic=" + msg.data + "&pic1=http:" + _self.banner[0] + "&pic2=http:" +
									_self.banner[1] + "&pic3=http:" + _self.banner[2] + "&code=" + _self.news.code
							})
						},
						complete:function(){
							uni.hideLoading();
						}
					});
				}
			},


			//领券
			successInfo: function() {
				console.log(_self.news.success);
				if (_self.is_ralation_id == '0') {
					uni.setStorageSync('shouquangoods', _self.news);
					bctaobao.baichuanoa('0','9');
				} else {
					//判断为空，提示该商品已失效
					if (!_self.news.success) {
						_self.goshop(_self.news);
						return;
					}
					uni.showToast({
						icon: "loading",
						title: "请稍后",
						mask: true
					})
					bctaobao.quandetail(_self.news.success);
				}
			},

			//领券
			lingquan: function() {
				if (_self.header) {
					uni.request({
						url:'http://www.sqwolf.com/index.php?s=/User/accountDj',
						data:{
							uid:_self.uid
						},
						method:"POST",
						header : {'content-type':'application/x-www-form-urlencoded'},
						success:function(msg){
							console.log(msg);
							if(msg.data.code == 1){
								_self.successInfo();
							}else{
								uni.showToast({
									title:msg.data.msg,
									icon:'none'
								})
							}
						}
					})
				} else {
					uni.navigateTo({
						url: "../user/login"
					})
				}
			},

			home: function() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			//收藏：
			collgoods:function(e){
				_self.collect = !_self.collect;
				console.log(e);
				console.log(e.shopname);
				uni.request({
					url:baseurl+'index/Collect/cllect',
					data:{
						cid:e.cid,
						addtime:e.addtime, 
						shopname:e.shopname, 
						D_title:e.D_title, 
						Title:e.Title, 
						Quan_price:e.Quan_price, 
						Quan_start_time:e.Quan_start_time, 
						Quan_end_time:e.Quan_end_time, 
						Price:e.Price, 
						Introduce:e.Introduce, 
						Sales_num:e.Sales_num, 
						Quan_link:e.Quan_link, 
						Pic:e.Pic, 
						Long_pic:e.Long_pic, 
						Org_Price:e.Org_Price, 
						coupon_apply_amount:e.coupon_apply_amount, 
						GoodsID:e.GoodsID, 
						SellerID:e.SellerID, 
						Commission:e.Commission, 
						IsTmall:e.IsTmall, 
						videoid:e.videoid, 
						status:e.status, 
						juhuasuan:e.juhuasuan, 
						taoqianggou:e.taoqianggou, 
						yunfeixian:e.yunfeixian, 
						jinpai:e.jinpai, 
						jiyoujia:e.jiyoujia, 
						haitao:e.haitao, 
						yan:e.yan, 
						bk:e.bk, 
						/* zhuan:e.zhuan, 
						bili:e.bili, 
						success:e.success, 
						tao:e.tao, 
						code:e.code, */
					},
					method:'POST',
					header:{token:_self.header},
					success:function(msg){
						console.log(msg);
						uni.showToast({
							title:msg.data.msg,
							icon:'none'
						})
						if(msg.data.code=='1'){
							_self.collect = true;
						}else{
							_self.collect = false;
						}
					}
				})
			}
			
		},
		components: {
			loadding
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
		justify-content:center;
		align-items: center;
	}

	.detail_bigquan .name {
		width: 215upx;
	}
	.yj-lingquan-btn{
		width: 142upx;
		height: 64upx;
		font-size: 38upx;
		background-image: linear-gradient(to right,#ffd269,#ffb608);
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
</style>
