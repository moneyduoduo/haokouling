<template>
	<view>
		<!-- 搜索框 -->
		<view class="find_top">
			<view class="find_status" :style="{height: statusBarHeight*2+'rpx'}">
				
			</view>
			<view class="find_title">
				发现
			</view>
			<view class="find_search">
				<image class="search_icon" src="../../static/image/home/sousuo1.png" mode=""></image>
				<input class="search_input" type="text" placeholder="输入搜索关键词" placeholder-style="color:#fff"  @tap="search">
			</view>
		</view>
		<!-- <view class="yj-search-box yj-bg-gray-light" style="position: fixed; z-index: 10; width: 100%; top: 0;left: 0;" @tap="search">
			<view class="">
				
			</view>
			<view class="">
				
			</view>
			<input class="yj-search-input" type="text" placeholder="关键字"  disabled="true">
		</view> -->
		<view class="yj-border-box yj-bg-fff" :style="{paddingTop:164+ statusBarHeight*2 +'rpx'}">
			<view class="grace-comment">
				<view v-for="(item,index) in selectedItem" :key="index" class="grace-comment-list">
					<view class="grace-comment-face" :class="[gujia ? 'yj-gujia':'']">
						<image  class="face_logo" v-if="!gujia" src="/static/img/taobao-icon.png" mode="widthFix"></image>
						<text class="face_text" style="flex:1" v-if="!gujia">集享</text>
						<image  class="buy_icon"  v-if="!gujia"   @tap="goodsDetail(item.itemId)"  src="../../static/image/index/buy_icon.png" mode=""></image>
						<image  class="share_icon" v-if="!gujia"   @tap="goodsShare(item.itemId)" src="../../static/image/index/share_icon.png" mode=""></image>
					</view>
					<view class="grace-comment-body">
						<rich-text class="ln2 grace-flex" @tap="goodsDetail(item.itemId)" :class="[gujia ? 'yj-gujia':'']" :nodes="htmlEscape(item.showContent)"></rich-text>
						<!-- <view class="grace-rows grace-wrap grace-space-between imgBox" :class="[gujia ? 'yj-gujia':'']">
							<image @tap="previewImages(v,item.itemPic)" v-for="(v,i) in item.itemPic" :src="$common.imgThumbAli(v)" :key="i" mode="scaleToFill" class="itemPic" :class="item.class"></image>
						</view> -->
						<scroll-view :scroll-x="true" class="scroll_class">
							<view class="goods_img_box" v-for="(v,i) in item.itemPic" :key="i">
									<image class="goods_img" @tap="previewImages(v,item.itemPic)"  :src="$common.imgThumbAli(v)"  mode="scaleToFill"  ></image>
									<view class="look_goods_img" v-if="i == 0">
										查看商品
									</view>
							
							</view>
						</scroll-view>
						
						<view style="width:652rpx;background:#f8f8f8;border-radius: 10rpx;padding:20rpx;" :class="[gujia ? 'yj-gujia':'']" @tap="copyComment(item)">
							<rich-text syle="width:300rpx; color:#705F5F" :nodes="htmlEscape(item.showComment)"></rich-text>
							<view style="display: flex;align-items: flex-end; justify-content: flex-end; margin-top:10rpx;">
								<image  class="copykl" src="../../static/image/index/copykl.png" mode=""></image>
							</view>
						</view>
						<view class="grace-comment-date" style="margin-top: 20rpx;" :class="[gujia ? 'yj-gujia':'']">
							<image class="time_icon" src="../../static/image/index/time_icon.png" mode=""></image>
							<text class="date_text" v-if="!gujia">{{item.adviseTime|dateInfo}}</text>
						</view>
					</view>
				</view>
				<graceLoading :loadingType="loadingType"></graceLoading>
				<loadding :isShow='loadIsShow'></loadding>
			</view>
			<view class="hideCanvasView">
				<canvas class="hideCanvas" 
				canvas-id="qrcode"
				:style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas>
			</view>
		</view>
	</view>
</template>
<script>
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
	import loadding from "../../components/loadding.vue";
	import $bindSystem from "@/common/bindSystem.js";
	import QRCode from "@/common/qrcode.js"
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		data() {
			return {
				statusBarHeight:statusBarHeight,
				gujia:true,
				loadIsShow:false,
				menu1Show: false,
				show: false,
				page:1,
				selectedItem: [
					{type:1,show_content:''},
					{type:1,show_content:''},
					{type:1,show_content:''},
					{type:1,show_content:''},
					{type:1,show_content:''},
				], //首页数据 ,
				uid: '', //用户凭证
				header:'',
				loadingType:0,
				searchKey: "",
				searchClose: false,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				goodsShareData: [],
				bili:'',
				userpid:'',
				isputong:true,
				userData:{},
				canvasW:0,
				canvasH: 0,
				canvasImgSrc:''
			}
		},

		filters: {
			numFilter(value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(parseFloat(value).toFixed(2));
				// num.toFixed(2)获取的是字符串
				return parseFloat(realVal)
			},
			dateInfo(value) {
				/*
				let tmp = Date.parse(value.replace(/-/gi, "/"));
				*/
			   let tmp =value*1000;
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - tmp;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				let result = '';
				if (monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else {
					result = "刚刚";
				}

				return result
			},
			timeChange(valueTime) {
				if (valueTime) {
					var newData = Date.parse(new Date()) / 1000;
					var diffTime = Math.abs(newData - valueTime);
					if (diffTime > 7 * 24 * 3600 * 1000) {
						var date = new Date(valueTime);
						var y = date.getFullYear();
						var m = date.getMonth() + 1;
						m = m < 10 ? ('0' + m) : m;
						var d = date.getDate();
						d = d < 10 ? ('0' + d) : d;
						var h = date.getHours();
						h = h < 10 ? ('0' + h) : h;
						var minute = date.getMinutes();
						var second = date.getSeconds();
						minute = minute < 10 ? ('1' + minute) : minute;
						second = second < 10 ? ('0' + second) : second;
						return m + '-' + d + ' ' + h + ':' + minute;

					} else if (diffTime < 7 * 24 * 3600 * 1000 && diffTime > 24 * 3600 * 1000) {
						// //注释("一周之内");

						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
						return dayNum + "天前";

					} else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
						// //注释("一天之内");
						// var time = newData - diffTime;
						var dayNum = Math.floor(diffTime / (60 * 60 * 1000));
						return dayNum + "小时前";

					} else if (diffTime < 3600 * 1000 && diffTime > 0) {

						// //注释("一小时之内");
						// var time = newData - diffTime;
						let dayNum = Math.floor(diffTime / (60 * 1000));
						console.log(111)
						// return dayNum + "分钟前";
						return "111"

					}
				}
			}


		},
		components: {
			graceLoading, //数据库流
			loadding
		},
		onLoad: function() {
			let _self = this;
			_self.loadIsShow = true;
			_self.selectedItem =  [];
			_self.page = 1;
			_self.gujia = true;
			_self.getSelectedItem();
		},
		onShow: function() {

		},
		onReady: function() {
			//获取屏幕高度及比例
			//_self.scrollH();
		},
		onReachBottom:function(){
			this.loadingType = 1;
			this.loadIsShow = true;
			this.getSelectedItem();
		},
		onPullDownRefresh() {
			let data = null;
			data = this.getSelectedItem();
			this.page = 1;
			this.selectedItem = [];
			if(data){
				uni.stopPullDownRefresh();
			}
		},
		methods: {
			goodsDetail: function(itemId) {
				uni.navigateTo({
					url: "../detail/index?itemId=" + itemId
				});
			},
			//特殊字符转html实体
			htmlEscape(str){
				if(!str){
					return;
				}
				var s = "";
				if (str.length === 0) {
				return "";
				}
				s = str.replace(/\.&lt;br&gt;/, " ");
				s = s.replace(/&amp;/g, "&");
				s = s.replace(/&lt;/g, "<");
				s = s.replace(/&gt;/g, ">");
				s = s.replace(/&nbsp;/g, " ");
				s = s.replace(/&#39;/g, "\'");
				s = s.replace(/&quot;/g, "\"");
				s = s.replace(/<img/g,'<img style="vertical-align:middle;height:20px;margin:0 2px;"');
				return s;
			},
			//每日爆款
			getSelectedItem: function(e) {
				let _self = this;
				_self.loadingType = 1;
				return this.$http.post('/api/goods/getWechatMoments',{minId:this.page}).then((res)=>{
					if(res.data.list.length>0){
						res.data.list.map((v,i)=>{
							let length = v.itemPic.length;
							res.data.list[i].class = 'width100';
							if(length > 1 && length < 5){
								res.data.list[i].class = 'width50';
							}
							if(length>4){
								res.data.list[i].class = 'width33';
							}
							res.data.list[i].showContent = res.data.list[i].showContent;
							_self.selectedItem.push(v)
						})
						_self.gujia = false;
						_self.loadIsShow = false;
						_self.loadingType = 0;
						_self.page++;
					}else{
						_self.loadingType = 2;
					}
				});
			},
			getSubjectHot: function(e) {
				let _self = this;
				this.tabs[1].loadingType = 1;
				uni.request({
					url: 'http://v2.api.haodanku.com/subject_hot/apikey/jixiangshenghuo',
					data: {
						min_id: this.tabs[1].page
					},
					method: "GET",
					success: (res) => {
						if(res.data.code == 1){
							res.data.data.map((v,i)=>{
								let length = v.itempic.length;
								res.data.data[i].class = 'width100';
								if(length > 1 && length < 5){
									res.data.data[i].class = 'width50';
								}
								if(length>4){
									res.data.data[i].class = 'width33';
								}
								res.data.data[i].show_content += '<span style="color: red;">[查看商品]</span>'
							});
							res.data.data.map((v,i)=>{
								_self.subjectHot.push(v)
							})
							_self.gujia = false;
							_self.tabs[1].loadingType = 0;
							this.tabs[1].page++;
						}else{
							_self.subjectHot = [];
							_self.gujia = true;
							_self.tabs[1].loadingType = 2;
						}
					},
					complete:function(){
						setTimeout(function() {
							_self.loadIsShow = false;
							_self.show2 = true;
						}, 1000)
					}
				});
			},
			getSubject: function(e) {
				let _self = this;
				this.tabs[2].loadingType = 1;
				uni.request({
					url: 'http://v2.api.haodanku.com/get_subject/apikey/jixiangshenghuo',
					method: "GET",
					success: (res) => {
						if(res.data.code == 1){
							res.data.data.map((v,i)=>{
								let length = v.itempic.length;
								res.data.data[i].class = 'width100';
								if(length > 1 && length < 5){
									res.data.data[i].class = 'width50';
								}
								if(length>4){
									res.data.data[i].class = 'width33';
								}
								res.data.data[i].show_content += '<span style="color: red;">[查看商品]</span>'
							});
							_self.subject.push(res.data.data);
							_self.gujia = false;
							_self.tabs[2].loadingType = 0;
							this.tabs[2].page++;
						}else{
							_self.subject = [];
							_self.gujia = true;
							_self.tabs[2].loadingType = 2;
						}
					},
					complete:function(){
						setTimeout(function() {
							_self.loadIsShow = false;
							_self.show2 = true;
						}, 1000)
					}
				});
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

							}
						}
					});
								
				}else{
					uni.navigateTo({
						'url': '../user/login'
					});
				}
			},
			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
			},
			previewImages(url,urls){
				uni.previewImage({
					current: url,
					urls: urls,
				});
			},
			copyComment(item){
				this.$http.post('/api/goodsShare/doShare',{itemId:item.itemId}).then((res)=>{
					let content = item.copyComment;
					content = content.replace(/\.&lt;br&gt;/g, " ");
					content = content.replace(/\$淘口令\$/g, res.data.model);
					uni.setClipboardData({
						data: content,
						success: () => {
							//缓存剪贴板内容，用户切换会app不做弹窗
							this.$storage.set('clipboardContent',content);
							uni.showToast({
								title:'复制成功',
								duration: 3000,
								icon:"none"
							});
						},
						fail: () => {
							uni.showToast({
								title:'复制失败',
								duration: 3000,
								icon:"none"
							});
						}
					});
				});
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				//获取是哪个选项滚动到底？
				var index = e.currentTarget.dataset.scindex;
				//判断当前是否正在加载
				if (this.tabs[index].loadingType === 1) {
					return false;
				}
				this.tabs[index].loadingType = 1; //加载中
				//模拟延迟 
				if (index == '0') {
					this.getSelectedItem();
				} else if (index == '1') {
					this.getSubjectHot();
				} else if (index == '2') {
					this.getSubject();
				}
			},
			async goodsShare(itemId) {
				let _self = this;
				// console.log(JSON.stringify(_self.goodsShareData));
				$bindSystem.checkBindTaoBao('pages/community/index','pages/community/index');
				let data = await this.$http.post('/api/goods/getDetail',{itemId:itemId});
				let _this = this;
				//this.canvasShow = true
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.userInfo
				this.canvasW = this.$store.state.systemInfo.windowWidth
				this.canvasH = this.$store.state.systemInfo.windowHeight
				let inviterUrl = `${jxConfig.config.shareGoodsUrl}?itemId=${itemId}&inviterCode=${userInfo.inviterCode}`
				let canvasW = null ; 
				let canvasH = null;
				this.canvasW >= 375 ? canvasW = 375 : canvasW = this.canvasW;
				this.canvasH >= 667 ? canvasH = 667 : canvasH = this.canvasH;
				data.data.shopType=='B' ? data.data.shopType= `/static/img/tmall.png` : data.data.shopType= `/static/img/taobao.png`;
				new QRCode({
					context: _this,
					canvasId:'qrcode',
					text: inviterUrl, // 二维码链接
					width:_this.canvasW,
					height:_this.canvasH,
					showLoading:true,
					loadingText:'海报生成中...',
					size: 80, // 二维码大小
					canvasOpotion:{ //海报尺寸
						canvasWidt:canvasW,
						canvasheight:canvasH
					},
					goods:{ //商品信息
						shopType:data.data.shopType,
						itemTitle:data.data.itemTitle,
						itemEndPrice:data.data.itemEndPrice,
						couponMoney:data.data.couponMoney,
						itemPrice:data.data.itemPrice,
						itemSale:data.data.itemSale,
						itemPic:data.data.itemPic
					},
					cbResult: function (res) { // 生成海报的回调
						_this.canvasImgSrc = res //base64 图片格式
						plus.share.sendWithSystem({
							type: 'image',
							pictures: [_this.canvasImgSrc]
						}, '', '')
					},
				})
			},
			imgShare: function(e) {
				//自定义分享
				/* _self.img = e;
				_self.show = true;
				_self.menu1Show = true;
				_self.type = 2;
				 */
				//原生分享
				uni.downloadFile({
					url: e,
					success: (res) => {
						if (res.statusCode === 200) {
							plus.share.sendWithSystem({
								type: 'image',
								pictures: [res.tempFilePath]
							}, '', '')
						}
					},
					fail: (err) => {
						console.log('downloadFile fail, err is:', err)
					}
				})

			},
			hide: function() {
				_self.show = false;
				_self.menu1Show = false
			},
			weixin: function() {
				_self.shareImg('weixin', 'WXSceneSession', _self.type);
			},
			weixinFirend: function() {
				_self.shareImg('weixin', 'WXSenceTimeline', _self.type);
			},
			qq: function() {
				// _self.shareImg('qq', 'qq');
				uni.showToast({
					title: '正在开发中,敬请期待',
					icon: "none"
				});
			},
			photo: function() {

				uni.showToast({
					title: '正在开发中,敬请期待',
					icon: "none"
				});

			},
			shareImg: function(e, a, t) {
				//图片分享
				if (t == 2) {
					uni.share({
						provider: e,
						scene: a,
						type: 2,
						imageUrl: _self.img,
						success: function(res) {
							_self.show = false;
							_self.menu1Show = false
							console.log(JSON.stringify(res));
							uni.showToast({
								title: "分享成功",
								icon: "none"
							})

						},
						fail: function(err) {
							_self.show = false;
							_self.menu1Show = false

							uni.showToast({
								title: "分享失败",
								icon: "none"
							})
						}
					});
				} else {
					//图文分享
					uni.share({
						provider: e,
						scene: a,
						type: 0,
						href: _self.goodsShareData.Quan_link,
						summary: _self.goodsShareData.Introduce,
						title: _self.goodsShareData.Title,
						imageUrl: _self.goodsShareData.Pic,
						success: function(res) {
							_self.show = false;
							_self.menu1Show = false
							console.log(JSON.stringify(res));
							uni.showToast({
								title: "分享成功",
								icon: "none"
							})

						},
						fail: function(err) {
							_self.show = false;
							_self.menu1Show = false

							uni.showToast({
								title: "分享失败",
								icon: "none"
							})
						}
					});
				}
			},
			search: function() {
				uni.navigateTo({
					url: '../search/index'
				});
			},
		}
	}
</script>

<style lang="less">
	@import "../../graceUI/graceUI.css";
	@import "../../static/css/mycss.less";
	.copykl {
		width: 96rpx;
		height: 42rpx;
		margin-right: 14rpx;
	}
	.find_top {
		background-color: #ffe600;
		padding: 0 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99999;
	}
	.find_title {
		height: 88rpx;
		text-align: center;
		color: #333;
		font-size: 36rpx;
		background-color: #ffe600;
		line-height: 88rpx;
		font-family: "Arial","Microsoft YaHei","\9ED1\4F53","\5B8B\4F53",sans-serif;
	}
	.find_search {
		background-color:  #eeda0f;
		height: 60rpx;
		flex: 1;
		display: flex;
		border-radius: 60rpx;
		padding-left: 32rpx;
		align-items: center;
	}
	.search_icon {
		width: 36rpx;
		height: 36rpx;
	}
	.search_input {
		flex: 1;
		font-size: 28rpx;
		padding-left: 20rpx;
		line-height: 28rpx;
	}
	.grace-tab-title view {
		color: #000;
		margin-left: 15%;
	}

	.grace-comment-face {
		display: flex;
		width: 100%;
		height: 100rpx;
		border-radius: 0;
		align-items: center;
	}
	.grace-comment-face  .face_logo {
		width: 100upx;
		height: 100upx;
		margin-left: 30upx;
		margin-right: 24rpx;
		
	}
	.grace-comment-face  .face_text {
		line-height: 100rpx;
		letter-spacing: 4rpx;
		font-size: 30rpx;
	}
	.grace-comment-face  .buy_icon {
		width: 96rpx;
		height: 42rpx;
		border-radius: 0;
		margin-right: 24rpx;
	}
	.grace-comment-face  .share_icon {
		width: 96rpx;
		height: 42rpx;
		border-radius: 0;
		margin-right: 54rpx;
	}
	.grace-comment-body {
		padding-left: 30rpx;
		box-sizing: border-box;
	}
	.scroll_class {
		width: 100%;
		height: 170rpx;
		white-space: nowrap;
	}
	.grace-comment-body  .goods_img_box {
		display: inline-block;
		margin-right: 18rpx;
		position: relative;
	}
	.grace-comment-body  .goods_img_box .look_goods_img {
		position: absolute;
		width: 170rpx;
		height: 32rpx;
		font-size: 22rpx;
		line-height: 32rpx;
		text-align: center;
		color: #fff;
		bottom: 0;
		left: 0;
		background-color: rgba(0,0,0,.3);
	}
	.grace-comment-body .goods_img {
		width: 170rpx;
		height: 170rpx;
	}
	.grace-comment-date {
		display: flex;
		align-items: center;
		height: 40rpx;
	}
	.time_icon {
		width: 22rpx;
		height: 22rpx;
		margin-right: 10rpx;
	}
	.date_text {
		flex: 1;
		line-height: 40rpx;
		color: #848484;
		font-size: 22rpx;
	}
	.grace-comment-top text {
		color: #666;
		font-size: 30upx;
	}
	.grace-comment-list {
		padding-top: 36rpx;
		flex-direction: column;
	}
	.grace-newsInfo {
		margin-right: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: #c0c0c0;
		border-radius: 30rpx;
		font-size: 24rpx;
		width: 96rpx;
		text-align: center;
		color: #fff !important;
	}

	/* 分享操作 */
	.uni-mask {
		position: fixed;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.gracePopupMenu {
		position: fixed;
		background: #666;
		height: 500upx;
		z-index: 999;
		bottom: 0;
		flex-wrap: nowrap;

	}

	.grace-boxes {
		position: relative;
	}

	.grace-boxes-text {
		color: #666;
		margin-top: -46upx;
	}

	.closeImg {
		background: #333;
		position: relative;
		z-index: 999;
		color: #9b9b9b;
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		border-radius: 100upx;
		margin: 120upx 60upx 0;
	}

	.close {
		position: relative;
		z-index: 999;
		color: #9b9b9b;
		height: 100upx;
		line-height: 100upx;
		font-size: 14px;
	}

	.search-images {
		width: 38upx;
		margin-top: 3upx;
		/* margin-top: 25px; */
	}
	.grace-comment-content{
		padding-right: 30upx;
	}
	.width100{width:300rpx;height:300rpx;margin-top:10rpx;}
	.width50{width:290rpx;height:290rpx;margin-top:10rpx;}
	.width33{width:190rpx;height:190rpx;margin-top:10rpx;}
	.ln2{line-height:1.7;margin-top:10rpx;}
	.ln2.yj-gujia{height:100rpx;}
	.imgBox{width:590rpx;}
	.imgBox:after { 
	    content: ""; 
	    width:190rpx;
	} 
	.imgBox.yj-gujia{height:300rpx;}
	.hideCanvasView {
		position: relative;
	}
	.hideCanvas {
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}
</style>
