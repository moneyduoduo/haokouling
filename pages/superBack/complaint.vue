<template>
	<view class="page-content">
		<top-bar title="申述管理" bgClass="orange"></top-bar>
		<view class="navbar">
			<view class="nav_box">
				<view class="tab" @tap="tabList(2)" :class="{'active':type==2}">
					<view class="text"><text class="mr10">收到的申诉</text>
						<!-- <badge :text="num.fromStoreComplaintNum" v-if="num.fromStoreComplaintNum>0" type="danger"></badge> -->
					</view>
				</view>
				<view class="tab" @tap="tabList(1)" :class="{'active':type==1}">
					<view class="text"><text class="mr10">提出的申诉</text>
						<text class="red_dot" v-if="num.fromMyComplaintNum">{{num.fromMyComplaintNum}}</text>
						<!-- <badge style="color: #333; background-color: #ffe300;" :text="num.fromMyComplaintNum" v-if="num.fromMyComplaintNum" type="danger"></badge> -->
					</view>
				</view>
			</view>
		</view>
		<view class="list_main_bar">
			<mescroll @onPullDown="onPullDown" @onLoadMore="onLoadMore" :scrollHeight="scrollHeight">
				<view class="list_box">
					<view class="list" @tap="goComplaintDetail(item.id)" v-for="(item,index) in complaintList" :key="index">
						<view class="order_row">
							<view class="order">任务编号：{{item.orderId}}</view>
							<view class="time">{{item.createTime}}</view>
						</view>
						<view class="c_content">
							<view class="text ellipsis2">{{item.content}}</view>
							<view class="state_btn in" v-if="item.status == 1">处理中</view>
							<view class="state_btn" v-else>已完结</view>
						</view>
					</view>
				</view>
				<view v-if="complaintList.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
		<!-- 		<view v-if="superBacklist.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view> -->

			</mescroll>
		</view>

	</view>
</template>
<script>
	import mescroll from '@/components/mescroll.vue';
	import badge from "@/components/superBack/badge.vue";
	export default {
		components: {
			mescroll,badge
		},
		data() {
			return {
				superbackPage:0,
				showsuperbackDataMoer:false,

				loadingshow:false,
				
				complaintList:[],
				page:1,
				pageSize:5,
				type:1,
				noData:false,
				
				make:0,
				num:{},
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				scrollHeight:500,
				
			}
		}, 
		methods: {
			goBack(){
				//uni.navigateBack();
				uni.navigateTo({
					url: '/pages/superBack/home'
				});
			},
			goComplaintDetail(id){
				this.$common.goPage('/pages/superBack/complaintDetail?id='+id);
			},
			tabList(type){
				if(this.type == type){
					return;
				}
				this.type = type;
				this.complaintList = [];
				this.page = 1;
				this.getComplaintList();
			},
			getComplaintList(){
				return this.$http.posts('/api/complaint/getList',{page:this.page,pageSize:this.pageSize,type:this.type}).then(res=>{
					res.data.list.map((item)=>{
						item.createTime = this.$common.timeFormat(item.createTime);
						this.complaintList.push(item);
						if(this.complaintList.length<1&&this.page==1){//空数据
							this.noData = true;
						}else if(res.data.list.length<this.pageSize){//没有更多
							this.loadingType = 2;
						}
						if(this.activeType == 2){
							this.setCountDown();
						}
						this.page++;
					});
				})
			},
			onPullDown(done){ //刷新页面
				let data = null;
				this.complaintList = [];
				this.page = 1;
				data = this.getComplaintList();
				data.then((val)=>{
					done();
					this.$msg.toast("刷新成功")
				})
			},
			onLoadMore(){
				let data = null;
				//没有更多
				if(this.loadingType == 2){
					return;
				}
				data = this.getComplaintList();
				data.then((val)=>{
					this.$msg.toast("加载成功")
				})
			},
		},
		watch: {

		},
		computed: {

		},
		onReady:function(){ 

		},
		onShow(){
			this.$http.posts('/api/complaint/getComplaintNum',{}).then(res=>{
				this.num = res.data;
				if(res.data.fromStoreComplaintNum > 0){
					this.type = 2;
				}
				this.getComplaintList();
			})
		},
		onUnload(){
		
		},
		onLoad: function() { 

		},

	}
</script>
<style >
	@import "../../static/css/global.css";
	page{background:#f2f2f2;}
	.red_dot {
		min-width: 32rpx;
		height: 32rpx;
		background: #ff7132;
		font-size: 24rpx !important;
		font-weight: normal !important;  
		position: absolute;
		right: 100rpx;
		top: 6rpx;
		line-height: 32rpx;
		border-radius: 32rpx;
		color: #fff;
	}
	.list_box .list .order_row .order {
		color: #333 !important;
		font-size: 30rpx;
		font-weight: bold;
	}
	.nav_box .tab {
		position: relative;
	}
	.nav_box .tab.active .text {
		border: none !important;
	}
	.nav_box .tab.active:after {
		position: absolute;
		content: '';
		background: url(../../static/image/superBack/bolang2.png);
		width: 59rpx;
		height: 13rpx;
		background-size: 100% 100%;
		bottom: 8rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.nav_box .tab .text{
		color: #666 ;
		font-size: 26rpx;
	}
	.nav_box .tab.active .text {
		color: #333 !important;
		font-size: 30rpx;
		font-weight: bold;
	}
	.badge {
		position: absolute;
		left: 150rpx;
		top: 25rpx;
	}
	/* 商品列表 */
	.list_main_bar{
		z-index: 1;
		position: fixed;
		top: calc(180rpx + var(--status-bar-height));
		left: 0;
		right: 0;
		width: auto; /* 使right生效 */
		height: auto; /* 使bottom生效 */
		overflow: hidden;
	}
	.list_box{padding:0 20rpx;}
	.list_box .list{margin-top: 20rpx; background: #fff; border-radius: 10rpx; padding: 10rpx;}
	.list_box .list .order_row{display: flex; justify-content: center; align-items: center;}
	.list_box .list .order_row .order{ color:#fd2f53; width: auto;}
	.list_box .list .order_row .time{color:#888; text-align: right; flex: 1;}
	.list_box .list .c_content{margin-top: 40rpx;display: flex; justify-content: center; align-items: center; flex-wrap:nowrap;}
	.list_box .list .c_content .text{flex: 1; }
	.list_box .list .c_content .state_btn{width: 160rpx; height:70rpx; line-height: 70rpx; text-align: center; border: 1px solid #e1e1e1; border-radius: 16rpx; color:#888;}
	.list_box .list .c_content .state_btn.in{background:#eff9f0; color:#639069; }
</style>
