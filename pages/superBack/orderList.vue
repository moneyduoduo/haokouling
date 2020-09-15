<template>
	<view class="page-content">
		<view class="header bg0" :style="{paddingTop:statusBarHeight*2 +'rpx'}">
			<view class="h100 row middle">
				<view class="w100 row middle between" >
					<text class="iconfont icon-zuojiantou c3 f40 ml20" @tap="$common.goPage(-1)"></text>
					<!-- <text class="iconfont icon-close-x f56 c3" @tap="$common.goPage(0)"></text> -->
				</view>
				<view class="search_box ml20 flex1 row middle">
					<text class="iconfont icon-sousuo c7 f46"></text>
					<input class="ml10 flex1" type="text" v-model="thirdOrderId" placeholder="请输入淘宝订单号" />
					<text class="iconfont icon-close-x f46 c7 mr10"  v-if="thirdOrderId" @tap="thirdOrderId=''" ></text>
				</view>
				<view class="w130 tc c3" style="font-size: 34rpx;" @tap="searchOrder()">搜索</view>
			</view>
		</view>
		
		<view class="search_nav_box" :style="{top:100+ statusBarHeight*2+'rpx'}">
			<view class="nav_width_box">
				<view :id="'item'+item.status" v-for="(item,index) in orderNavList" :key="index" :class="{active:item.active}"  class="nav_text_size" @tap="tabOrderNav(item.status)">
					<text >{{item.name}}</text>
					<view class="">
						
					</view>
					<text class="red_dot" v-if="item.msg != 0">{{item.msg}}</text>
					<!-- <badge :text="item.msg" v-if="item.msg != 0" type="danger"></badge> -->
				</view>
			</view>
		</view>
			
		<!-- 取消订单 -->
		<view class="popup" v-if="showCancelBox" >
			<view class="mask"></view>
			<view class="popupBox">
				<view class="popupContent pd20">
					<view class="ptb15 row middle bb">
						<text class="w80"></text>
						<text class="c3 f32 flex1 tc">请选择取消原因</text>
						<text @tap="closeBox" class="iconfont icon-close-x f50 w80"></text>
					</view>
					<radio-group name="radio" class="ptb20 pd30 ln1" @change="changeCancel">
						<label v-for="(item,index) in cancelBuyerOrder" :key="index" class="row ptb10 middle"><radio value="item" color="#fd2f53" /> {{item}}</label>
					</radio-group>
					<view class="btn_box">
						<view class="btn" @tap="cancelSubmit">确定取消</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 取消订单 -->
		<view class="popup" v-if="showExpressBox">
			<view class="mask"></view>
			<view class="popupBox">
				<view class="popupContent pd20">
					<view class="ptb15 row middle bb">
						<text class="w80"></text>
						<text class="c3 f32 flex1 tc">查看物流</text>
						<text @tap="closeBox" class="iconfont icon-close-x f50 w80"></text>
					</view>
					<view class="row ptb20 c9 pd30 ln1">
						<text class="c6">快递公司：</text>{{expressInfo.expressCompany}}
					</view>
					<view class="row ptb20 pd30 ln1 row">
						<text class="c6" style="width:auto">快递单号：</text>
						<view class="flex1 c9 row middle">
							<view>{{expressInfo.expressNumber}}</view>
							<view class="btnCopy" @tap="copyNumber">复制</view>
						</view>
					</view>
					<view class="btn_box">
						<view class="btn" @tap="selectExpress">点击查询</view>
					</view>
				</view>
			</view>
		</view>
			
	<!--
		// gImges礼物图片，orderId订单id，name商品名称，backmoney返还金额，ordertime订单时间，type订单状态，gID礼品ID，backMoneyTime返还金额时间，orderImage商品图片，gName礼物名称，note备注，confirm确认时间，cType失效类型，cTypetext失效原因，evaluation是否评价过
	-->
		<view  v-if="orderList.length != 0" class="list_main_bar" :style="{paddingTop: 188 + statusBarHeight*2 +'rpx'}"  >
			<!-- <mescroll @onPullDown="onPullDown" @onLoadMore="onLoadMore" :scrollHeight="scrollHeight"> -->
				<view class="bg0 radius20 mr20 ml20 mt20" style="width:710rpx;" v-for="(item,index) in orderList" :key="index">
					<view class="h80 row bb pd30">
						<text class="status_text">{{item.statusText}}</text>
						<text class="flex1 status_text" v-if="item.status==0||item.status==5">：{{item.id}}</text>
						<text class="flex1 status_text" v-else>：{{item.thirdOrderId}}</text>
						<text class="status_text">{{item.createTime}}</text>
					</view>
					<view class="pd30 ptb20 row" style="position: relative;">
						<image :src="item.thumb" class="img"></image>
						<view class="flex1 ml20 column">
							<view class="ellipsis2 tl" style="font-size: 30rpx; color: #333; font-weight: bold;">{{item.title}}</view>
							<view class="tl mt10 status_text" style="font-size: 24rpx;" v-if="item.status == 5">到手价：{{item.giftPrice}}元</view>
							<view class="tl mt10 status_text" style="font-size: 24rpx;" v-else>返：{{item.returnPrice}}元</view>
							<view class="tl mt10 cRed f24" v-if="item.status == 5">{{cancelTypeText[item.cancelType]}}</view>
							
							<view class="tl mt10 cRed f24" v-if="item.status == 0 && crontabCancelOrderTime">请在{{crontabCancelOrderTime}}分钟内完成付款并回填单号,超时自动取消</view>
							<view class="tl mt10 cRed f24"  v-else-if="item.status == 1 && item.countDown">最迟{{item.countDown}}后确认</view>
							<view class="tl mt10 cRed f24" v-else-if="item.status == 3 && item.countDown">最迟{{item.countDown}}后返款</view>
						</view>
						<view class="row right row pd30" style="position: absolute; bottom: 20rpx; right: 0;" >
							<text class="order_btn ml10" v-if="item.status==0" @tap="cancelOrder(item.id)">取消</text>
							<text class="order_btn ml10" v-if="item.status==0" @tap="goOrder(item.id)">去下单</text>
							<text class="order_btn ml10" v-if="item.complaintId" @tap="goComplaintDetail(item.complaintId)">查看申述</text>
							<text class="order_btn ml10" v-else-if="item.status!=0&&item.status!=5" @tap="goAddComplaint(item.id)">申述</text>
							<text class="order_btn ml10" v-if="item.isNeedComment && item.isComment<1 && item.status==3" @tap="goComment(item)">晒评价</text>
							<text class="order_btn ml10" v-if="item.shippingStatus == 1" @tap="showExpress(item.id)">查看物流</text>
							<text class="order_btn ml10" @tap="$common.goPage('/pages/superBack/help')">查看帮助</text>
						</view>
					</view>
				</view>
			<!-- </mescroll> -->
				
			
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<view v-if="orderList.length == 0" class="list_main_bar" style="background-color: #fff; height: 100vh" :style="{paddingTop: 188 + statusBarHeight*2 +'rpx'}" >
			<emptydata></emptydata>
		</view>
		<bottom-nav current="2"></bottom-nav>
	</view>
</template>
<script>
	import loading from '@/components/loading';
	import bottomNav from '@/components/superBack/bottomNav.vue';
	import mescroll from '@/components/mescroll.vue';
	import badge from "@/components/superBack/badge.vue";
	import emptydata from "@/components/emptydata.vue"
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		components: {
			bottomNav,mescroll,loading,badge,emptydata
		},
		data() {
			return {
				statusBarHeight:statusBarHeight,
				orderNavList:[
					{name:"全部",active:true,msg:0,status:''},
					{name:"待操作",active:false,msg:0,status:0},
					{name:"待返款",active:false,msg:0,status:3},
					{name:"已返款",active:false,msg:0,status:4},
					{name:"已取消",active:false,msg:0,status:5},
				],
				isSearch:false,
				cancelBuyerOrder:{},
				showCancelBox:false,
				showExpressBox:false,
				expressInfo:{},
				scrollLeft:0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingshow:true,
				loadingType: 0,
				scrollHeight:500,
				current:3,
				status:'',
				page:1,
				pageSize:5,
				isLoading:false,
				orderList:[],
				orderStatus:['待操作','待确认','已确认','待返款','已返款','已取消'],
				cancelTypeText:['未取消','超时未下单取消','管理员取消','商家取消','主动取消'],
				cancelForm:{
					orderId:'',
					cancelText:''
				},
				thirdOrderId:'',
				crontabCancelOrderTime:this.$storage.get('cjfConfig').crontabCancelOrderTime,
				crontabOrderConfirmTime:this.$storage.get('cjfConfig').crontabOrderConfirmTime*3600,
				crontabOrderReturnCapitalTime:this.$storage.get('cjfConfig').crontabOrderReturnCapitalTime*84600,
				intervalId:null
			}
		},
		onLoad(e) {

		},
		onPullDownRefresh() {
			let data = null;
			this.orderList = [];
			this.page = 1;
			this.getOrderList();
		},
		onReachBottom() {
			let data = null;
			//没有更多
			if (this.loadingType == 2) {
				return;
			}
			this.getOrderList();
		},
		onReady:function(){
			let view = uni.createSelectorQuery().in(this).select(".list_main_bar");
			view.fields({ 
				size: true, 					
				scrollOffset: true
			}, data => {
				this.scrollHeight = data.height
			}).exec();
		},
		onUnload: function() {
			clearInterval(this.intervalId);
		},
		onShow(){
			//读取银行列表
			this.cancelBuyerOrder = this.$storage.get('cjfConfig').cancelBuyerOrder;
		},
		methods: {
			searchOrder(){
				this.isSearch = true;
				this.page = 1;
				this.orderList = [];
				this.getOrderList();
			},
			removeSearch(){
				this.isSearch = false;
				this.thirdOrderId = '';
				this.getOrderList();
			},
			copyNumber(){
				this.$common.copy(this.expressInfo.expressNumber);
			},
			showExpress(orderId){
				this.$http.posts('/api/order/getExpressDetail',{orderId:orderId}).then((res)=>{
					this.showExpressBox = true;
					this.expressInfo = res.data;
				})
			},
			selectExpress(){
				this.$common.goPage('/pages/common/webView?title=物流查询&url=https://m.kuaidi100.com/result.jsp?nu='+this.expressInfo.expressNumber);
			},
			goOrder(orderId){
				this.$common.goPage('/pages/superBack/goodsDetail?orderId='+orderId);
			},
			goComplaintDetail(complaintId){
				this.$common.goPage('/pages/superBack/complaintDetail?id='+complaintId);
			},
			goAddComplaint(orderId){
				this.$common.goPage('/pages/superBack/addComplaint?orderId='+orderId);
			},
			goComment(item){
				this.$storage.set('goodsInfo',item);
				this.$common.goPage('/pages/superBack/goodsComments');
			},
			tabOrderNav(status){
				if(this.status === status){
					return;
				}
				this.status = status;
				console.log(status);
				this.orderNavList.map((item,index)=>{
					if(this.orderNavList[index].status === status){
						this.orderNavList[index].active = true;
					}else{
						this.orderNavList[index].active = false;
					}
				});
				this.orderList = [];
				this.page = 1;
				clearInterval(this.intervalId);
				this.getOrderList();
			},
			setCountDown(){
				clearInterval(this.intervalId);
				for (let key in this.orderList) {
					if(this.orderList[key]["status"] == 1 || this.orderList[key]["status"] == 3){
						if(this.orderList[key]["status"] == 1){
							this.orderList[key]['confirmTime'] = this.orderList[key]["actionTime"] + this.crontabOrderConfirmTime;
							this.orderList[key]["countDown"] = this.$common.countDown(this.orderList[key]['confirmTime']);
						}else{
							this.orderList[key]['returnCapitalTime'] = this.orderList[key]["confirmTime"] + this.crontabOrderReturnCapitalTime;
							this.orderList[key]["countDown"] = this.$common.countDown(this.orderList[key]['returnCapitalTime']);
						}
					}
				}
				this.intervalId = setInterval( ()=> {
					for (let key in this.orderList) {
						if(this.orderList[key]["status"] == 1 || this.orderList[key]["status"] == 3){
							if(this.orderList[key]["status"] == 1){
								this.orderList[key]['confirmTime'] = this.orderList[key]["actionTime"] + this.crontabOrderConfirmTime;
								this.orderList[key]["countDown"] = this.$common.countDown(this.orderList[key]['confirmTime']);
							}else{
								this.orderList[key]['returnCapitalTime'] = this.orderList[key]["confirmTime"] + this.crontabOrderReturnCapitalTime;
								this.orderList[key]["countDown"] = this.$common.countDown(this.orderList[key]['returnCapitalTime']);
							}
						}
					}
				}, 1000);
			},
			getOrderList(){
				let _this = this;
				_this.loadingType = 1;
				let requestData = {};
				if(this.status !== ''){
					requestData.status = this.status;
				}
				if(this.isLoading){
					return;
				}
				this.isLoading = true;
				if(this.thirdOrderId){
					requestData.thirdOrderId = this.thirdOrderId;
				}
				this.$http.posts('/api/order/getOrderNumber',{}).then(res=>{
					this.orderNavList[1].msg = res.data.notOperateNum;
					this.orderNavList[2].msg = res.data.returnCaptainIngNum;
				})
				requestData.page = this.page;
				requestData.pageSize = this.pageSize;
				return this.$http.posts('/api/order/getList',requestData).then(res=>{
					this.isLoading = false;
					res.data.list.map(function(item){
						item.thumb = _this.$common.imgThumb(item.thumb,'100');
						item.statusText = _this.orderStatus[item.status];
						item.createTime = _this.$common.timeFormat(item.createTime,'mmddhhii');
						item.countDown = '';
						_this.orderList.push(item);
					});
					if(_this.orderList.length<1&&_this.page==1){//空数据
						_this.noData = true;
					}else if(res.data.list.length<_this.pageSize){//没有更多
						_this.loadingType = 2;
					}
					this.setCountDown();
					_this.page++;
					uni.stopPullDownRefresh()
				}).catch((e)=>{
					this.isLoading = false;
				});
			},
			changeCancel(e){
				this.cancelForm.cancelText = e.detail.value;
			},
			cancelSubmit(){
				if(!this.cancelForm.cancelText){
					return this.$common.toast('请选择取消原因');
				}
				this.$http.posts('/api/order/doCancelOrder',this.cancelForm).then(res=>{
					this.showCancelBox = false;
					this.$msg.toast(res.msg);
					this.getOrderList();
				});
			},
			closeBox(){
				this.showCancelBox = false;
				this.showExpressBox = false;
			},
			cancelOrder(orderId){
				this.cancelForm.orderId = orderId;
				this.showCancelBox = true;
			},
			onLoad(option){
				if(option.status){
					this.status = option.status;
					this.orderNavList.map((item,index)=>{
						if(item.status == option.status){
							this.orderNavList[index].active = true;
						}else{
							this.orderNavList[index].active = false;
						}
					})
				}
				this.getOrderList();
			},
			onLoadMore(){
				let data = null;
				//没有更多
				if(this.loadingType == 2){
					return;
				}
				data = this.getOrderList();
				data.then((val)=>{
					this.$msg.toast("加载成功")
				})
			},
		}
	}
</script>，
<style>
@import "../../static/css/global.css";
page{background:#f2f2f2;}
.red_dot {
	min-width: 32rpx;
	height: 32rpx;
	background-color: #ff7132;
	position: absolute;
	font-size: 24rpx !important;
	font-weight: normal !important;
	right: 0;
	top: 10rpx;
	line-height: 32rpx;
	border-radius: 32rpx;
	color: #fff;
}
.order_btn {
	height: 44rpx;
	line-height: 44rpx;
	font-size: 24rpx;
	padding:0 20rpx;
	border-radius: 44rpx;
	color: #333;
	background-color: #FFF000;
}
.popup .mask{background-color:rgba(0,0,0,0.5);position:fixed;width:100%;height:100%;top:0;z-index:100}
.popup .popupBox{position:fixed;z-index:200;top:0;left: 0;right:0; bottom:0;display:flex;justify-content:center;align-items:center;}
.popup .popupContent{width: 80%;margin: auto; background: #fafafa;border-radius: 20rpx;}
.popup .closeBox{height:80rpx;padding:0 20rpx;display:flex;justify-content:flex-end;align-items:center;}
.popup .closeBox text{width: 60rpx; height:60rpx; font-size: 60rpx; color:#a6a6a6;}
.popup .btn_box{padding-top: 0;margin:20rpx 0;}
.popup .btn_box .btn{height:80rpx;line-height: 80rpx;background: #de5140; color:#fff; text-align: center; border-radius:40rpx;}

.btnCopy{width:120rpx;text-align: center; height:40rpx;line-height:40rpx;border:1px solid #fd2f53;border-radius: 30rpx;font-size:28rpx;color:#fd2f53;}
.searchBar{position: fixed;top:var(--status-bar-height);padding: 20rpx 20rpx;background:#fff;height:100rpx;}
.search_nav_box{position: fixed;top:100rpx+var(--status-bar-height);background:#fff;height: 88rpx; z-index: 99;}
.search_nav_box  .nav_width_box {display:flex;white-space: nowrap;}
.search_nav_box .nav_width_box .nav_text_size{position: relative;font-size:26rpx; color: #666; flex:1;  line-height:88rpx;height:88rpx;flex-shrink: 0;text-align: center;}
.search_nav_box  .nav_width_box .active{color: #333; font-size: 32rpx; font-weight: bold;}
.search_nav_box  .nav_width_box .active:after {
	position: absolute;
	content: '';
	background: url(../../static/image/superBack/bolang2.png);
	width: 59rpx;
	height: 13rpx;
	background-size: 100% 100%;
	bottom: 10rpx;
	left: 50%;
	transform: translateX(-50%)
}
.status_text {
	font-size: 26rpx;
	color: #999;
}
.list_main_bar{
		background-color: #f2f2f2;
		/* z-index: 1; */
		/* position: fixed; */
		padding-top: calc(80rpx + var(--status-bar-height));
		/* left: 0;
		right: 0; */
		padding-bottom: 120rpx;
		width: auto; /* 使right生效 */
		height: auto; /* 使bottom生效 */
		overflow: hidden;
}
.img{width: 218rpx; height:218rpx;}

</style>
