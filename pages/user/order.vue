<template>
	<view>
		<!-- 类目 -->
		<scroll-view class="grace-tab-title grace-center yj-bg-fff orderClass" scroll-x="true">
			<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
			 @tap="tabChange">{{tab.name}}</view>
		</scroll-view>
		
		<swiper class="grace-tab-swiper-full yj-border-box" :current="swiperCurrentIndex" @change="swiperChange" style="padding-top:0upx; height: 100vh;">
			<swiper-item v-for="(news, newsIndex) in newsAll" :key="newsIndex">
				<scroll-view scroll-y="true" :data-scindex="newsIndex" @scrolltolower="scrollend">
					<!-- 首页 类目-->
					<view v-if="newsIndex == 0">
						<view class="grace-padding  grace-bg-white">
							<view class="uni-media-list" style="padding-top:25upx; width:700upx;">
								<view v-if="show" class="grace-center">
									<!-- <image style="width:30%;margin-top: 50upx;" src="../../static/img/zanwushuju.png" mode="widthFix"></image> -->
									<view style="margin-top: 50upx;"> <button @click="doller" class="mini-btn" type="warn" size="mini">去赚钱</button></view>
								</view>
								<!-- 所有订单 -->
								<view v-for="(item, index) in newsMent" :key="index" class="grace-news-list-items" @tap="goodsDetail(item.itemId)">
									<image class="grace-news-list-img" :class="[gujia ? 'yj-gujia':'']" mode="widthFix" :src="item.pic"></image>
									<view class="grace-news-list-title">
										<view class="grace-news-list-title-main paddLeft" :class="[gujia ? 'yj-gujia':'']"><text class="paddLefts">{{item.title}}</text></view>
										<view class="grace-news-list-title-desc grace-text-overflow" :class="[gujia ? 'yj-gujia':'']">
											<text v-if="item.status == '12'" class="grace-news-tip" style="background: #4991E3;">已付款</text>
											<text v-else-if="item.status == '3'" class="grace-news-tip" style="background: #69B903;">已结算</text>
											<text v-else-if="item.status == '13'" class="grace-news-tip" style="background: #9C9C9C;">无效</text>
						<!-- 					<text v-if="item.lottery_status == '1' && item.threeid == item.users_id" class="grace-news-tip" style="background-color: red; margin-left:20upx">活动奖励</text>
											<text v-if="item.lottery_status != '1' && item.threeid == item.users_id" class="grace-news-tip" style="background-color: red; margin-left:20upx">自购奖励</text>
											<text v-if="item.invite_money == '1' && item.threeid != item.users_id" class="grace-news-tip" style="background-color: red; margin-left:20upx">下级奖励</text> -->
											
										</view>
										<view class="dollerInfo">
											<view class="yj-clearfix" style="margin-top: 10upx;" :class="[gujia ? 'yj-gujia':'']">
												<view class="dollerLefts">
													<view class="dollerNum">佣金</view>
													<view class="dollerMoney grace-center">{{item.commission}}</view>
												</view>
												<!-- <view class="dollerLeft">
													<view class="dollerNum " v-if="item.users_id">预估收入</view>
													<view class="dollerMoney grace-center" v-if="item.oneid == item.users_id">{{item.onerank}}</view>
													<view class="dollerMoney grace-center" v-else-if="item.twoid == item.users_id">{{item.tworank}}</view>
													<view class="dollerMoney grace-center" v-else-if="item.threeid == item.users_id">{{item.threerank}}</view>
													<view class="dollerMoney grace-center" v-else-if="item.users_id =='1'">{{item.company}}</view> 
												</view> -->
												<!-- <view class="dollerLeft" v-if="!gujia">
													<view class="dollerNum">拉新奖励</view>
													
													<view class="dollerMoney grace-center" v-if="item.invite_money == '1' && item.twoid == item.users_id || item.invite_money == '3' && item.twoid == item.users_id">{{item.invite_money}}</view>
													<view class="dollerMoney grace-center" v-else >0</view>
												</view> -->
											</view>
										</view>
										<view class="yj-color-gray-light yj-text-sm yj-mar-t-min">下单时间:{{item.paidTime}}</view>
									</view>
								</view>

							</view>
						</view>
					</view>
					<!-- 其他统一类目 -->
					<view class="" v-else-if="newsIndex == '1'">

						<view class="grace-padding  grace-bg-white">
							<view class="uni-media-list" style="padding-top:25upx; width:700upx;">
								<view v-if="show1" class="grace-center">
									<!-- <image style="width:30%;margin-top: 50upx;" src="../../static/img/zanwushuju.png" mode="widthFix"></image> -->
									<view style="margin-top: 50upx;"> <button @click="doller" class="mini-btn" type="warn" size="mini">去赚钱</button></view>
								</view>

								<view v-for="(item, index) in newsMaterial" :key="index" class="grace-news-list-items"  @tap="goodsDetail(item.itemId)">
									<image class="grace-news-list-img " :class="[gujia ? 'yj-gujia':'']" mode="widthFix" :src="item.pic"></image>
									<view class="grace-news-list-title">
										<view class="grace-news-list-title-main paddLeft" :class="[gujia ? 'yj-gujia':'']"><text class="paddLefts">{{item.title}}</text></view>
										<view class="grace-news-list-title-desc grace-text-overflow" :class="[gujia ? 'yj-gujia':'']">
											<text v-if="item.status == '12'" class="grace-news-tip" style="background: #4991E3;">已付款</text>
											<text v-else-if="item.status == '3'" class="grace-news-tip" style="background: #69B903;">已结算</text>
											<text v-else-if="item.status == '13'" class="grace-news-tip" style="background: #9C9C9C;">无效</text>
											<!-- <text v-if="item.lottery_status == '1'" class="grace-news-tip" style="float: right; background-color: red;">首单奖励</text> -->
											<!-- 	<text class="grace-news-tip" style="background-color: red; margin-left:20upx">活动奖励</text>
										<text v-if="item.lottery_status != '1' && item.threeid == uid" class="grace-news-tip" style="background-color: red; margin-left:20upx">自购奖励</text>
											<text v-if="item.invite_money == '1' && item.threeid != uid || item.invite_money == '3' && item.threeid != uid" class="grace-news-tip" style="background-color: red; margin-left:20upx">下级奖励</text> -->
										</view>
										
										<view class="yj-color-gray-light yj-text-sm yj-mar-t-min">下单时间:{{item.paidTime}}</view>
									</view>
								</view>

							</view>
						</view>
					</view>
					<view class="" v-else-if="newsIndex == '2'">
						<view class="grace-padding  grace-bg-white">
							<view class="uni-media-list" style="padding-top:25upx; width:700upx;">
								<view v-if="show2" class="grace-center">
									<!-- <image style="width:30%;margin-top: 50upx;" src="../../static/img/zanwushuju.png" mode="widthFix"></image> -->
									<view style="margin-top: 50upx;"> <button @click="doller" class="mini-btn" type="warn" size="mini">去赚钱</button></view>
								</view>

								<view v-for="(item, index) in newsHeart" :key="index" class="grace-news-list-items"  @tap="goodsDetail(item.itemId)">
									<image class="grace-news-list-img" :class="[gujia ? 'yj-gujia':'']" mode="widthFix" :src="item.pic"></image>
									<view class="grace-news-list-title">
										<view class="grace-news-list-title-main paddLeft" :class="[gujia ? 'yj-gujia':'']"><text class="paddLefts">{{item.title}}</text></view>
										<view class="grace-news-list-title-desc grace-text-overflow" :class="[gujia ? 'yj-gujia':'']">
											<text v-if="item.status == '12'" class="grace-news-tip" style="background: #4991E3;">已付款</text>
											<text v-else-if="item.status == '3'" class="grace-news-tip" style="background: #69B903;">已结算</text>
											<text v-else-if="item.status == '13'" class="grace-news-tip" style="background: #9C9C9C;">无效</text>
											<text v-if="item.lottery_status == '1' && item.threeid == item.uid" class="grace-news-tip" style="float: right; background-color: red;">首单奖励</text>
										</view>
										<!-- <view class=" dollerInfo" :class="[gujia ? 'yj-gujia':'']">
											<view class="yj-clearfix" style="margin-top: 10upx;">
												<view class="dollerLefts" v-if="!gujia">
													<view class="dollerNum" >付款金额</view>
													<view class="dollerMoney grace-center">{{item.alipay_total_price}}</view>
												</view>
												<view class="dollerLeft" v-if="!gujia"> 
													<view class="dollerNum ">预估收入</view>
													<view class="dollerMoney grace-center" v-if="item.oneid == item.users_id">{{item.onerank}}</view>
													<view class="dollerMoney grace-center" v-else-if="item.twoid == item.users_id">{{item.tworank}}</view>
													<view class="dollerMoney grace-center" v-else-if="item.threeid == item.users_id">{{item.threerank}}</view>
													<view class="dollerMoney grace-center" v-else-if="item.users_id =='1'">{{item.company}}</view> 
												</view>
												<view class="dollerLeft" v-if="!gujia">
													<view class="dollerNum ">拉新奖励</view>
													
													
													<view class="dollerMoney grace-center" v-if="item.invite_money == '1' && item.twoid == uid || item.invite_money == '3' && item.twoid == uid">{{item.invite_money}}</view>
													<view class="dollerMoney grace-center" v-else >0</view>
												</view>
											</view>
										</view> -->
										<view class="yj-color-gray-light yj-text-sm yj-mar-t-min">下单时间:{{item.paidTime}}</view>
									</view>
								</view>

							</view>
						</view>
					</view>

					<!-- <graceLoading v-if="showLoding" :loadingType="tabs[newsIndex].loadingType"></graceLoading> -->
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>

</template>
<script>
	var _self, page = 1,
		result = '';
	var baseurl;
	//默认新闻数据（来自api请求）
	//每个选项下面的新闻列表
	var news = [];
	//对应下面3个标签的新闻内容数据
	var newsAll = [news, news, news];
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import graceSwiper from "../../graceUI/components/graceSwiper.vue";
	import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
	export default {
		data() {
			return {
				gujia:true,
				header: '',
				uid:'',
				newsMent:[1,2,3,4,5,6,7,8], //所有订单 ,
				newsMaterial: [1,2,3,4,5,6,7,8], //有效订单,
				newsHeart: [1,2,3,4,5,6,7,8], //无效订单
				showLoding: true,
				show: false,
				show1: false,
				show2: false,
				searchKey: "",
				searchClose: false,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '所有订单',
						id: 'index0',
						cid: '0',
						loadingType: 0,
						page: 2
					},
					{
						name: '已付款',
						id: 'nvzhuang',
						cid: '1',
						loadingType: 0,
						page: 2
					},
					{
						name: '已失效',
						id: 'nanzhuang',
						cid: '2',
						loadingType: 0,
						page: 2
					}

				],
				newsAll: newsAll
			}
		},
		filters: {
			numFilter(value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(value).toFixed(2)
				// num.toFixed(2)获取的是字符串
				return parseFloat(realVal)

			},
		},
		components: {
			graceSwiper, //轮播图
			graceLoading, //数据库流

		},
		onLoad: function(opstion) {
			if(opstion.tabIndex){
				this.swiperCurrentIndex = opstion.tabIndex;
				this.tabCurrentIndex = opstion.tabIndex;
			}
		},
		onShow: function() {
			//0 全部 1付款 13 无效
			this.myorder(0);
			this.myorder(12);
			this.myorder(13);
		},
	
		methods: {
			back: function() {
				uni.navigateBack();
			},
			doller: function() {  
				uni.switchTab({
					url:'../index/index'
				})
			},
			goodsDetail: function(itemId) {
				uni.navigateTo({
					url: "../detail/index?itemId=" + itemId
				});
			},
			myorder:function(type){
				uni.showLoading({
					title: '加载中...',
					mask: false
				});
				this.$http.post('/api/order/getList',{page:1,status:type})
				.then(res=>{
					//console.log(res)
					uni.hideLoading();
					this.gujia = false;
					switch (type){
						case 12:
							console.log('有效订单');
							if(res.data.list.length==0){
								this.show1 = true;
								this.newsMaterial='';
								return
							}
							this.newsMaterial = res.data.list;
							this.newsMaterial.forEach((v,i)=>{
								this.newsMaterial[i].paidTime = this.reviseDate(res.data.list[i].paidTime)
							})
							console.log(this.newsMaterial);
							
							break;
						case 13:
							console.log('失效订单');
							if(res.data.list.length==0){
								this.show2 = true;
								this.newsHeart='';
								return
							}
							this.newsHeart = res.data.list;
							this.newsHeart.forEach((v,i)=>{
								this.newsHeart[i].paidTime = this.reviseDate(res.data.list[i].paidTime)
							})
							console.log(this.newsHeart);
							break;
						default:
							console.log('全部订单');
							if(res.data.list.length==0){
								this.show = true;
								this.newsMent='';
								return
							}
							this.newsMent = res.data.list;
							this.newsMent.forEach((v,i)=>{
								this.newsMent[i].paidTime = this.reviseDate(res.data.list[i].paidTime)
							})
							console.log(JSON.stringify(this.newsMent));
							break;
					}
				})
				
			},
			 reviseDate(date){
				return this.$common.timeFormat(date,'mmddhhii')
			 },
			
			tabChange: function(e) {
				let index = parseInt(e.target.id.replace('tabTag-', ''));
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				
			},
			swiperChange: function(e) {
				let index = e.detail.current;
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
			},
			scrollend(e){
				var index = e.currentTarget.dataset.scindex;
				if (this.tabs[index].loadingType === 1) {
					return false;
				}	
				this.tabs[index].loadingType = 1; //加载中
				
				let type;
				if(index == 1){
					type = 1;
				}else if(index == 13){
					type = 13;
				}else{
					type = 0;
				}
				
				uni.request({
					url: baseurl+'index/User/orderGoods',
					data: {
						p: this.tabs[index].page,
						type: type
					},
					header:{token:_self.header},
					method: "POST",
					success: (msg) => {
						console.log(msg);
						//console.log(JSON.stringify(msg.data.info));
						if (msg.data.code == 1) {
							if (typeof(msg.data.data)=='object' && msg.data.data!=null) {
								//_self.newsMent = _self.newsMent.concat(msg.data.info);
								_self.tabs[index].page++;
								_self.tabs[index].loadingType = 0;
								
								
								switch (type){
									case 1:
										_self.newsMaterial = _self.newsMaterial.concat(msg.data.data);
										break;
									case 13:
										_self.newsHeart = _self.newsHeart.concat(msg.data.data);
										break;
									default:
										_self.newsMent = _self.newsMent.concat(msg.data.data);
										break;
								}
								
							} else {
								this.tabs[index].loadingType = 2; //全部
								return;
							}
						}
				
					}
				});
				
				
				
			},
		}
	}
</script>

<style lang="less">
	@import "../../graceUI/graceUI.css";
	@import "../../static/css/mycss.less";
	page{
		background-color: #fff;
	}

	.grace-tab-title view {
		color: #000;
		margin-left: 15%;
	}

	.grace-comment-face {
		width: 100upx;
		height: 100upx;
		margin-left: 20upx;
	}

	.grace-comment-top text {
		color: #666;
		font-size: 30upx;
	}

	.grace-newsInfo {
		margin-right: 5%;
		border: 1px solid #fe4a65;
		background: #FFEDED;
		border-radius: 8px;
		font-size: 0.8rem;
		color: #FFFFFF;
		text-align: center;
		line-height: 15px;
		width: 20%;
		height: 25px;
		line-height: 25px;
	}

	.grace-items-demo1 {
		background: #00B26A;
	}

	.grace-items-demo2 {
		background: #F76260;
	}

	.grace-gradient-bg::after {
		width: 105%;
		height: 100px;
		content: "";
		left: -5%;
		top: 180px;
		position: absolute;
		display: block;
		background: #FFF;
		border-radius: 80px;
	}

	.grace-news-list-img {
		width: 250upx;
		height: 250upx;
		margin-top: 10upx;
		border-radius: 12px;
		margin-bottom: 10upx;
		background-color: #eee;
	}

	.grace-news-list-title-main {
		font-size: 25upx;
		font-weight: bold;

	}

	.grace-news-list-title {
		margin-left: 5%;
		margin-top: 20upx;
		/* border-bottom: 0.5px solid #F0EDE5; */

	}

	.paddLeft {

		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	/* .paddLefts {
		padding-left: 10upx;
	} */

	.grace-news {
		color: #fe4a65;
	}



	.grace-h4 {
		border-bottom: 1px solid #F0EDE5;
	}

	.grace-boxes-img image {
		width: 80%;
	}

	.grace-img-lazy {
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	.del {
		text-decoration: line-through;
	}

	.delLeft {
		margin-left: 50upx;
	}

	.dollerInfo {
		width: 90%;
		background: #fff;
		/* position: absolute; */
		border-radius: 24px;
	}

	.dollerMoney {
		/* margin-top: 10upx; */
		font-size: 30upx;
		color: #FD4D67
	}

	.dollerLeft {
		float: left;
		margin-left: 5%;
	}

	.dollerLefts {
		float: left;
	}

	.dollerNum {
		color: #999999;
		margin-top: 5upx;
	}
	.grace-news-list-title-desc{
		margin-top: 0;
	}
</style>
