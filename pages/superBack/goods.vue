<template>
	<view class="contentBox">
		<view class="status status_bar"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon iconfont icon-zuojiantou" @tap="back"></view></view> 
				<view class="middle">
					
				</view>
				<view class="icon-btn">
					<view class="icon iconfont icon-fx" @tap="share"></view>
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon iconfont icon-zuojiantou" @tap="$common.goPage(-1)"></view></view>
				<view class="middle">
					<view>商品说明</view>
				</view>
				<view class="icon-btn">
					<view class="icon iconfont icon-fx" @tap="share"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box" @tap="$common.getKefu()">
					<view class="icon iconfont icon-kefu"></view>
					<view class="text">联系客服</view>
				</view>
			</view>
			<view class="btn">
				<view class="buy" @tap="goGoodsDetail">去下单</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="share" :class="shareClass">
			<view class="mask"></view>
			<view class="layer">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box" @tap="shareWeixin()">
						<image src="/static/img/sharemenu/wechat_friend.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box" @tap="shareWeixinQuan()">
						<image src="/static/img/sharemenu/wechat_moments.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<!--<view class="box">
						<image src="/static/img/sharemenu/weibo.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>-->
					<view class="box" @tap="shareQQ()">
						<image src="/static/img/sharemenu/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>
			
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<image :src="goodsInfo.thumb"></image>
		</view>
		<!-- 标题 -->
		<view class="info-box goods-info">
			<view class="title">
				{{goodsInfo.giftName}}
			</view>
		</view>
		<view class="goods_price_bar">
			<view class="price_box">
				<view class="price">￥<text>{{goodsInfo.giftPrice}}</text></view>
				<view class="subPrice">
					<view class="old_price">下单价 ￥{{goodsInfo.realPrice}}</view>
					<view class="new_price"><text>返现 ￥{{goodsInfo.returnPrice}}</text></view>
				</view>
			</view>
			<view class="djs_box">
				<view class="texttitle">下单倒计时：</view>
				<view class="djs_row">
					<view class="time_bg">{{djsobjed.day}}</view>
					<text>天</text>
					<view class="time_bg">{{djsobjed.hour}}</view>
					<text>时</text>
					<view class="time_bg">{{djsobjed.minute}}</view>
					<text>分</text>
					<view class="time_bg">{{djsobjed.second}}</view>
					<text>秒</text>
				</view>
			</view>
		</view>
		
		<view class="partner_money">
			商家已缴纳{{goodsInfo.returnPrice*goodsInfo.stockTotal}}保证金，请放心购买！
		</view>
		
		<view class="sharp_text">
			ps:点击右上角分享成功，好友通过您分享的链接参加超级返活动，您可以获得奖励哦！
		</view>
		
		<view class="detaile_bar">
			<view class="partner_instructions">
				<view class="title">商品说明</view>
				<view v-if="goodsInfo.goodsDesc">{{goodsInfo.goodsDesc}}</view>
				<view v-else>暂无商品说明</view>
			</view>
		</view>
		<view class="pd20 ptb20 ln2">
			<rich-text :nodes="$storage.get('cjfConfig').cjfTaskTip" ></rich-text>
		</view>
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
			intervalId: null,
			selectAnchor:0,//选中锚点
			djsTime:'2019/10/15 12:00:00',
			djsobjed:{
				day:"00",
				hour:"00",
				minute:"00",
				second:"00"
			},
			shareClass:'',
			
			goodsId:0,
			orderId:0,
			cjfTaskTip:{},
			goodsInfo:{},
			providerList: [],
		};
	},
	onLoad(option) {
		this.bindTaoBao();
	},
	onReady(){
	},
	onPageScroll(e) {
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop/0.5 * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	
	onReachBottom() {
		//uni.showToast({ title: '触发上拉加载' });
	},
	mounted () {
		
	},
	onUnload(){
		clearInterval(this.intervalId);
	},
	onShow(){
		
	},
	onLoad(e){
		this.goodsId = e.goodsId;
		this.orderId = e.orderId;
		this.$http.posts('/api/goods/getGoodsDetail',{orderId:e.orderId}).then(res=>{
			this.goodsInfo = res.data;
			this.goodsInfo.thumb = this.$common.imgThumb(res.data.thumb,'750');
		});
		this.SetInterval();
		// #ifdef APP-PLUS
		uni.getProvider({
			service: 'share',
			success: (result) => {
				const data = {};
				for (let i = 0; i < result.provider.length; i++) {
					switch (result.provider[i]) {
						case 'weixin':
							data.weixin = {
								name: '分享到微信好友',
								id: 'weixin'
							};
							data.weixinQuan = {
								name: '分享到微信朋友圈',
								id: 'weixin',
								type: 'WXSenceTimeline'
							};
							break;
						case 'qq':
							data.qq = {
								name: '分享到QQ',
								id: 'qq'
							};
							break;
						default:
							break;
					}
				}
				this.providerList = data;
			},
			fail: (error) => {
				console.log('获取分享通道失败' + JSON.stringify(error));
			}
		});
		// #endif
	},
	methods: {
		goGoodsDetail(){
			if(this.orderId){
				clearInterval(this.intervalId);
				this.$common.goPage('/pages/superBack/goodsDetail?orderId='+this.orderId);	
			}
		},
		// 分享
		share(){
			this.shareClass = 'show';
		},
		goShare(type){
			let provider = this.providerList[type].id;
			let jxConfig = this.$store.state.jxConfig;
			let userInfo = this.$store.state.userInfo;
			let inviterUrl = `${jxConfig.config.inviterUrl}?app=1&inviterCode=${userInfo.inviterCode}`;
			uni.share({
				provider: provider,
				scene: this.providerList[type].type && this.providerList[type].type === 'WXSenceTimeline' ?
					'WXSenceTimeline' : "WXSceneSession",
				type: (provider === "qq") ? 1 : 0,
				title: this.$storage.get('cjfConfig').cjfShareTitle,
				summary: this.$storage.get('cjfConfig').cjfShareText,
				imageUrl: this.goodsInfo.thumb,
				href: inviterUrl,
				success: (res) => {

				},
				fail: (e) => {
					uni.showModal({
						content: e.errMsg,
						showCancel: false
					})
				}
			});
		},
		shareQQ(){
			this.goShare('qq');
		},
		shareWeixin(){
			this.goShare('weixin');
		},
		shareWeixinQuan(){
			this.goShare('weixinQuan');
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		SetInterval(){
			clearInterval(this.intervalId);
			this.intervalId = setInterval( ()=> {
				let endTime = this.goodsInfo.createTime + this.$storage.get('cjfConfig').crontabCancelOrderTime*60;
				let now = this.$common.getTime();
				let rightTime = endTime - now;
				if (rightTime > 0) {
					let day = Math.floor(rightTime / 60 / 60 / 24);
					let hour = Math.floor((rightTime / 60 / 60) % 24);
					let minute = Math.floor((rightTime / 60) % 60);
					let second = Math.floor(rightTime % 60);
					if (minute <= 9) minute = '0' + minute;
					if (second <= 9) second = '0' + second;
					this.djsobjed.day = day
					this.djsobjed.hour = hour
					this.djsobjed.minute = minute
					this.djsobjed.second = second
				}else{
					clearInterval(this.intervalId);
				}
			}, 1000);
		}
	}
};
</script>

<style>
@import "../../static/css/global.css";
@keyframes showPopup{0%{opacity:0}100%{opacity:1}}
@keyframes hidePopup{0%{opacity:1}100%{opacity:0}}
@keyframes showLayer{0%{transform:translateY(0)}100%{transform:translateY(-100%)}}
@keyframes hideLayer{0%{transform:translateY(-100%)}100%{transform:translateY(0)}}

.contentBox{padding-bottom:100rpx;}
.status{height:var(--status-bar-height);position:fixed;z-index:10;top:0;background-color:#f1f1f1;transition:opacity 0.05s linear;}
.header{display:flex;align-items:center;position:fixed;top:0;z-index:10;}
.header .before,.header .after{padding:0 4%;height:100rpx;display:flex;align-items:center;position:fixed;top:var(--status-bar-height);transition:opacity 0.05s linear;}
.header .before .back,.header .after .back{width:60rpx;height:60rpx;flex-shrink:0}
.header .before .back .icon,.header .after .back .icon{margin-left:-10%;width:60rpx;height:60rpx;display:flex;align-items:center;justify-content:center;font-size:36rpx}
.header .before .middle,.header .after .middle{width:100%}
.header .before .icon-btn,.header .after .icon-btn{width:60rpx;height:60rpx;flex-shrink:0;display:flex}
.header .before .icon-btn .icon,.header .after .icon-btn .icon{width:60rpx;height:60rpx;display:flex;justify-content:center;align-items:center;font-size:32rpx}
.header .before .icon-btn .icon:first-child,.header .after .icon-btn .icon:first-child{margin-right:4rpx}
.header .before .back .icon{color:#fff;background-color:rgba(0,0,0,0.5);border-radius:100%}
.header .before .icon-btn .icon{color:#fff;background-color:rgba(0,0,0,0.5);border-radius:100%}
.header .after{background-color:#f1f1f1}
.header .after .back .icon{color:#666}
.header .after .icon-btn .icon{color:#666}
.header .after .middle,.header .before .middle{height:90rpx;padding:0 7%;flex: 1; text-align: center;height:90rpx; line-height: 90rpx;}
.header .after .middle view,.header .before .middle view{padding:0 3%;margin:0 3%;font-size:36rpx;}
.header .after .middle view.on{margin-bottom:-4rpx;color:#f47952;border-bottom:solid 2px #f47952;}

.swiper-box{position: relative;width: 100%;height: 100vw;}
.swiper-box image{width: 100%;height: 100vw;}

.info-box{padding: 20rpx 4%;background-color: #fff;}
.goods-info .title{font-size: 30rpx;word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}
.goods_price_bar{background: linear-gradient(45deg,#fe50b1, #ff605c);height: 50px; display:flex;}

.price_box{display:flex;padding-left: 20rpx; flex: 1;}
.price_box .price{font-size: 24rpx; color:#fff; line-height:100rpx; width: 140rpx;}
.price_box .price text{font-size: 44rpx;}
.price_box .subPrice{flex: 1;}
.price_box .subPrice .old_price{color:#fff;font-size: 20rpx;margin-top:10rpx;text-decoration:line-through;}
.price_box .subPrice .new_price{color:#fff;font-size: 20rpx;margin-top: 6rpx;}
.price_box .subPrice .new_price text{ border:1px solid #fff;padding: 4rpx; border-radius: 6rpx;}

.djs_box{width: 300rpx;}
.djs_box .texttitle{text-align: center;font-size: 20rpx;margin-top: 10rpx;color:#fff;}
.djs_box .djs_row{display:flex; height:40rpx; line-height:40rpx; padding-right: 20rpx; font-size: 20rpx;margin-top: 6rpx;}
.djs_box .djs_row .time_bg{background: #333333;border-radius: 6rpx; text-align: center; color:#fff;font-size: 20rpx;margin:0 6rpx;}


.partner_money{height: 70px;; line-height: 70px; background: #fdfbec; color:#fb5b00; padding:0 20rpx;margin-top: 20rpx;}
.partner_money:before{font-family: "iconfont"; font-size: 28rpx;content: "\E60F"; padding-right: 20rpx;}

.detaile_bar,.sharp_text{padding: 20rpx;background: #fff;margin-top: 20rpx;}
.detaile_bar .title{color:#ec3f43; font-size: 36rpx;text-align: center;margin-bottom: 20rpx;}
.detaile_bar .h1class{font-weight: bold;margin-top: 16rpx;}
.detaile_bar .list{margin-top: 16rpx;}
.detaile_bar .list .color{color:#ff440f;}
.detaile_bar{padding-bottom: 60rpx;}

.share{display:none}
.share.show{display:block}
.share.show .mask{animation:showPopup-data-v-06e2cbec 0.15s linear both}
.share.show .layer{animation:showLayer-data-v-06e2cbec 0.15s linear both}
.share.hide{display:block}
.share.hide .mask{animation:hidePopup-data-v-06e2cbec 0.15s linear both}
.share.hide .layer{animation:hideLayer-data-v-06e2cbec 0.15s linear both}
.share.none{display:none}
.share .mask{background-color:rgba(0,0,0,0.5);position:fixed;width:100%;height:100%;top:0;z-index:11}
.share .layer{position:fixed;z-index:12;padding:0 4%;bottom:0;background:#fff;}
.share .layer .list{width:100%;display:flex;padding:10rpx 0 30rpx 0}
.share .layer .list .box{width:25%;display:flex;justify-content:center;flex-wrap:wrap}
.share .layer .list .box image{width:13.8vw;height:13.8vw}
.share .layer .list .box .title{margin-top:10rpx;display:flex;justify-content:center;width:100%;font-size:26rpx}
.share .layer .btn{width:100%;height:100rpx;display:flex;justify-content:center;align-items:center;font-size:28rpx;border-top:solid 1px #666666}
.share .layer .h1{width:100%;height:80rpx;display:flex;justify-content:center;align-items:center;font-size:34rpx}

.footer{position:fixed;bottom:0px;height:100rpx;border-top:solid 1px #eee;background-color:#fff;z-index:2;display:flex;justify-content:space-between;align-items:center;}
.footer .icons{display:flex;height:80rpx;flex:1;justify-content:space-between;}
.footer .icons .box{width:375rpx;height:80rpx;display:flex;justify-content:center;flex-wrap:wrap}
.footer .icons .joinCart{text-align: center;line-height: 80rpx; color: #fe752f;font-size: 32rpx;}
.footer .icons .box .icon{font-size:32rpx;color:#ff440f;text-align: center;padding-top: 10rpx;}
.footer .icons .box .text{display:flex;justify-content:center;width:100%;font-size:22rpx;color:#666;}
.footer .btn{height:100rpx; width: 375rpx;}

.footer .btn .buy{background: linear-gradient(45deg,#fd7209, #ff440f); height:50px;color:#fff;font-size:14px;line-height: 50px;text-align:center;}

</style>
