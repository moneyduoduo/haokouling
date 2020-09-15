<template>
	<view>
		<ytHeader></ytHeader>
		<scroll-view scroll-y style="height: 100vh;">
			<view class="top">
				<image class="topimg" src="../../static/img/activity/miandan_top.jpg" mode="widthFix"></image>
				<view class="miandan-step">
					<view class="miandan-title">下单流程</view>
					<view class="yj-display-flex yj-between" style="margin-top: 30rpx;">
						<view>
							<image class="md-step-img" src="../../static/img/activity/md_step1.png" mode="widthFix"></image>
							<view class="md-step-text">1.搜索商品</view>
						</view>
						<view>
							<image class="md-step-img" src="../../static/img/activity/md_step2.png" mode="widthFix"></image>
							<view class="md-step-text">2.领券购买</view>
						</view>
						<view>
							<image class="md-step-img" src="../../static/img/activity/md_step3.png" mode="widthFix"></image>
							<view class="md-step-text">3.补贴返佣</view>
						</view>
					</view>
				</view>
				<view style="padding: 30rpx 60upx 0; color: #fff; text-align: right;">
					剩余{{drawnum}}次
					<text class="sharecishu" @click="sharetouser" >分享赚红包</text>
				</view>
			</view>
			
			<view class="miandan-title yj-color-fff" style="margin-top: 40rpx; margin-bottom: 40rpx; ">商品列表</view>
			<view class="list">
				<view class="item" v-for="(item,index) in content" :key="index" @click="authtaobao(item)">
					<img class="goodsimg" :src="item.Pic" alt="">
					<view class="info">
						<view class="item-title">{{item.Title}}</view>
						<view style="margin: 10upx 0">
							<text class="quan">
								券￥<text class="yj-text-big">{{item.Quan_price | numFilter}}</text>
							</text>
							
							<text class="quan yj-mar-l">
								下单返<text class="yj-text-big">{{item.Price | numFilter}}</text>
							</text>
				
						</view>
						<view class="yj-display-flex yj-between yj-middle">
							<view>
								<text class="item-cost">
									￥
									<text>0</text>
									返后
								</text>
								<text class="item-price yj-mar-l-min">￥{{item.Org_Price | numFilter}}原价</text>
							</view>
							<text class="quan btn-list">领券购买</text>
						</view>
					</view>
				</view>
			
			</view>
			
		</scroll-view>
		
		<uni-popup :show="type === 'bottom-share'" position="bottom" @hidePopup="togglePopup('')">
			<view class="bottom-title">分享到</view>
			<view class="bottom-content">
				<view class="bottom-content-box" v-for="(item, index) in bottomData" :key="index" @click="shareinfo(item.type)">
					<view class="bottom-content-image">
						<image :src="item.icon" mode="widthFix"></image>
					</view>
					<view class="bottom-content-text">{{ item.text }}</view>
				</view>
			</view>
			<view class="bottom-btn" @click="togglePopup('')">取消分享</view>
		</uni-popup>
	</view>
</template>

<script>
	var _self,baseurl;
	import uniPopup from '../../components/uni-popup/uni-popup.vue';
	import ytHeader from '../../components/header.vue';
	/* var myjs = require("../../static/js/my.js"); */
	export default {
		data (){
			return {
				header:'',
				drawnum:1,
				linqunum:'',
				content:[],
				type: '',
				bottomData: [{
					text: '微信',
					icon: '../../static/img/weixinCircle.png',
					name: 'wx',
					type:'WXSceneSession'
				},
				{
					text: '朋友圈',
					icon: '../../static/img/firendQuanCircle.png',
					name: 'wx',
					type:'WXSenceTimeline'
				}]
			}
		},
		components:{
			uniPopup,ytHeader
		},
		onLoad: function () {
			_self = this;
			baseurl = getApp().globalData.baseUrl;
			_self.header = getApp().globalData.tokenss;
			_self.goodsList();
		},
		onShow: function () {
			_self.getdrawnum();	
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
		methods:{
			//该用户是否有已领取未下单的0元购商品
			songgoods:function(id){
				uni.request({
					url: baseurl+'index/Lottery/lotteryRember',
					data: {},
					header:{token:_self.header},
					method: "POST",
					success: (msg) => {
						console.log(msg);
						if(msg.data.code==1){
							if(typeof(msg.data.data)=='object' && msg.data.data != null){
								
								let goodsdata = msg.data.data;
								//item.tk_status==0
								_self.linqunum = 0;
								for(let i=0; i<goodsdata.length; i++){
									if(goodsdata[i].tk_status=='0'){
										_self.linqunum++;
									}
								}
								console.log(_self.linqunum);
								if(_self.linqunum>0){
									uni.showToast({
										title: '检测到您有未领取的0元购商品',
										icon:'none'
									});
									uni.navigateTo({
										url: '../user/drawgoods'
									});
								}else{
									uni.showToast({
										title: '您的0元购次数已用完',
										icon:'none'
									});
								}
							}
						}
						
					}
				})
			},
			
			
			goodsList:function(){
				uni.request({
					url: baseurl + 'index/Movement/drawGoods',
					data:{},
					method:'POST',
					success: function(msg) {
						console.log(msg);
						if(msg.data.code == 1){
							_self.content = msg.data.data;
						}
					}
				})
			},
			
			//获取
			getdrawnum:function(){
				if(_self.header){
					uni.request({
						url: baseurl+'index/user/userId',
						data: {
							type:'baseInfo'
						},
						method: "POST",
						header:{token:_self.header},
						success: (msg) => {
							console.log(msg);
							if(msg.data.code==1){
								_self.drawnum = msg.data.data.draw_number;
								console.log(_self.drawnum);
							}
						}
					});
				}else{
					uni.showToast({
						title:'您还没有登录哦',
						icon:'none'
					});
					_self.drawnum = 0;
				}
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
								_self.goodsDetail(item);
							}else{
								//未授权
								uni.showModal({
									title: '提示',
									content: '是否开通淘宝购物返利权限？',
									success: function (res) {
										if (res.confirm) {
											console.log('去授权');
											myjs.baichuanoa('0','..__activity__gift');
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								});
							}
						}
					});
								
				}else{
					uni.showToast({
						title: '请先登录',
						icon:'none',
						success:function(){
							uni.navigateTo({
								url: '../user/login'
							});
						}
					});
				}
				
			},
			
			
			 goodsDetail: function(thisgoods){
				if(_self.drawnum>0){
					 uni.request({
						url: baseurl + 'index/User/subtractDraw',
						data: {
							GoodsID: thisgoods.GoodsID
						},
						method: 'POST',
						header:{token:_self.header},
						success(msg) {
							console.log(msg);
								
							//console.log(res.data.message);
							if (msg.data.code == 1) {
								uni.navigateTo({
									url: "../detail/index?data=" + encodeURIComponent(JSON.stringify(thisgoods)) + "&nomoney=1"
								});
							} else {
								uni.showToast({
									title: msg.data.message,
									icon: 'none'
								});
							}
						}
					 })
				}else{
					_self.songgoods(_self.uid);
				}
			  },
			  //隐藏弹窗
			  togglePopup: function(type) {
				this.type = type;
					//console.log(0);
			  },
			  sharetouser:function(){
				  if (_self.header) {
					 this.togglePopup('bottom-share'); 
				  }else{
					  uni.showToast({
						title: "请先登录",
						icon: "none"
					  })
					  uni.navigateTo({
						url: '../user/login'
					  })
				  }
			  },
			  shareinfo:function(t){
				  _self.togglePopup('');
				  uni.share({
					provider: "weixin",
					scene: t,
					type: 0,
					href: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7e668fa2f7da97fb&redirect_uri="+baseurl+"index/App/handActivity/token/"+_self.header+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",
					title: "省钱狼0元购活动开启，0元超省，速速围观",
					summary: "省钱狼APP是一个分享生活的平台。在这里发现有趣好玩的世界，找到有意思的人，找到优质的商品、找到省钱持家的生活方式，不仅仅能领卷购物省钱，更能开心的赚钱，在这里一起共同标记自己生活的点滴。达人们每日分享海量服饰搭配、美妆教程、旅游攻略、美食测评，让你轻松升级潮流生活老司机。玩转省钱狼、标记属于自己的生活态度！",
					imageUrl: "http://aa.sqwolf.com/public/app/logo.png",
					success: function (res) {
						uni.showToast({
							title: '分享成功',
							icon:'none'
						});
					},
					fail: function (err) {
							uni.showToast({
								title: JSON.stringify(err),
								icon:'none'
							});
						//console.log("fail:" + JSON.stringify(err));
					}
				  });
			  }
		}
		
	}
</script>

<style lang="less">
	@import "../../static/css/mycss.less";
	
	
	page{
		background-color: #4A0080;
		position: relative;
		height: 100vh;
		
	}
	.topimg{
		width:750upx;
	}
	.sharecishu{
		display: inline-block;
		background-color: #FF285C;
		color: #fff;
		padding:10upx 30upx;
		margin-left: 10upx;
		font-size: 36upx;
		border-radius: 50upx;
		font-weight: bold;
	}
	.title{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		line-height:78upx;
		height:78upx;
		padding:0 30upx;
		text-align:center;
		background-size:100% 100%;
		color:#fff;
		font-size:36upx;
	}
	
	.tit{
		width:100%;
		height:16upx;
	}
	.list{
		width:100%;
		margin-bottom: 100upx;
	}
	.item{
		display:flex;
		/* flex-direction:row;
		justify-content:center; */
		align-items:center;
		width:650upx;
		padding:20upx;
		margin:0 30upx 30upx;
		border-radius:16upx;
		background-color:#BD61EE;
	}
	.goodsimg{
		width: 200upx;
		height: 200upx;
		border-radius:10upx;
	}
	.info{
		position:relative;
		padding-left:30upx;
		flex: 1;
	}
	.item-title{
		color:#fff;
		font-size: 28rpx;
		font-weight: bold;
		.yj-elip-2;
	}
	
	.item-cost{
		color:#FFF000;
		font-size:24upx;
		font-weight: bold;
	}
	.item-cost text{
		font-size:48upx;
	}
	.item-price{
		font-size:24upx;
		color:#999;
		text-decoration:line-through;
		font-weight: bold;
	}
	.userimg{
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		border:4upx solid #fff;
		margin-top: 32upx;
	}
	.username{
		font-size: 28upx;
		color: #fff;
	}
	
	
	.miandan-step{
		position: relative;
		width: 700rpx;
		height: 325rpx;
		padding: 70rpx 100rpx 0;
		margin: -50rpx 25rpx 0;
		text-align: center;
		box-sizing: border-box;
		background-image: url('../../static/img/activity/miandan_step.png');
		background-size: 100% 100%;
	}
	.miandan-title{
		width: 267rpx;
		height: 40rpx;
		margin: 0 auto;
		line-height: 40rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		background-image: url('../../static/img/activity/md_title.png');
		background-size: cover;
	}
	.md-step-img{
		width: 116rpx;
		height: 90rpx;
	}
	.md-step-text{
		font-size: 24rpx;
		text-align: center;
		margin-top: 15rpx;
		font-weight: bold;
	}
	
	@quan_doll_size:10upx; //半径
	.quan{
		position:relative;
		border-radius:10upx;
		display:inline-block;
		font-size:22upx;
		height: 42upx;
		min-width: 60upx;
		text-align: center;
		padding: 0 24upx;
		line-height: 42upx;
		color: #fff;
		font-weight: bold;
		letter-spacing: 3rpx;
		background-color:#FD435E;
		&::before,&::after{
			content: "";
			position: absolute;
			width: @quan_doll_size *2;
			height: @quan_doll_size *2;
			z-index: 1;
			zoom: 1;
			left: -@quan_doll_size;
			top: 50%;
			margin-top: -@quan_doll_size;
			background-color: #BD61EE;
			display: block;
			border-radius: 20upx;
		}
		&::before {
			left: auto;
			right: -@quan_doll_size;
		}
	}
	
	.btn-list{
		height: 50rpx;
		line-height: 50rpx;
		font-size:24upx;
		background:linear-gradient(to right,#FCD44C 20%,#FCB04C 80%);
	}
	
	
	
	.uni-mask{
		top: auto;
	}

	.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}
	
	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 35upx;
	}
	
	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
		width: 25%;
		box-sizing: border-box;
	}
	
	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90upx;
		height: 90upx;
		overflow: hidden;
		/* background: #007aff;
		border-radius: 10upx; */
	}
	.bottom-content-image image{
		width: 100%;
		height: 100%;
	}
	
	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}
	
	.bottom-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</style>