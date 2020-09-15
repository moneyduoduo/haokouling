<template>
	<view class="page-content">
		<top-bar title="账户明细"  bgClass="orange"></top-bar>
		<view class="notice pd20 bg1 row">
			<text class="iconfont icon-info ce f40"></text>
			<view class="notice ml10 h80 ce">{{$storage.get('cjfConfig').cjfCommTip}}</view>
		</view>
		
		<view class="list_main_bar">
			<mescroll @onPullDown="onPullDown" @onLoadMore="onLoadMore" :scrollHeight="scrollHeight">
				<view class="list_box">
					<view class="list middle" v-for="(item,index) in list" :key="index">
						<view class="row">
							<view class="name c6">{{item.desc}}</view>
							<view class="money in tr f36 flex1" v-if="item.money>0">+{{item.money}}</view>
							<view class="money out tr f36 flex1" v-else>{{item.money}}</view>
						</view>
						<view class="row">
							<view class="c9">{{item.createTime}}</view>
							<view class="c9 tr">余额：{{item.account}}</view>
						</view>
					</view>
				</view>
				<view v-if="list.length > 0">
					<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>
			</mescroll>
		</view>

	</view>
</template>
<script>
	import mescroll from '@/components/mescroll.vue';
	export default {
		components: {
			mescroll
		},
		data() {
			return {
				pageSize:15,
				page:1,
				isLoading:false,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loadingType: 0,
				scrollHeight:500,
				list:[]
			}
		}, 
		methods: {
			goBack(){
				uni.navigateBack();
			},
			onPullDown(done){ //刷新页面
				let data = null;
				this.list = [];
				this.page = 1;
				this.loadingType = 0;
				data = this.getList();
				data.then((val)=>{
					done();
					this.$msg.toast("刷新成功")
				})
			},
			onLoadMore(){
				let data = null;
				if(this.loadingType==2){
					return;
				}
				data = this.getList();
				data.then((val)=>{
					this.$msg.toast("加载成功")
				})
			},
			onScroll(e) { 
				
			},
			getList(){
				this.noData = false;
				this.loadingType = 0;
				if(this.isLoading){
					return;
				}
				this.isLoading = true;
				let requestData = {};
				requestData.type = this.activeType;
				requestData.page = this.page;
				requestData.pageSize = this.pageSize;
				return this.$http.posts('/api/account/getAccountLogList',requestData).then((res)=>{
					this.isLoading=false;
					res.data.list.map((item,index)=>{
						item.createTime = this.$common.timeFormat(item.createTime);
						this.list.push(item);
					})
					if(res.data.list.length<1&&this.page==1){//空数据
						this.noData = true;
					}else if(res.data.list.length<this.pageSize){//没有更多
						this.loadingType = 2;
					}
					this.page++;
				});
			}
		},
		watch: {

		},
		computed: {


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
		onShow(){
			this.getList();
		},
		onUnload(){
			
		},
		onLoad: function() {

		},

	}
</script>
<style>
	@import "../../static/css/global.css";
	/* 商品列表 */
	.list_main_bar{
		z-index: 1;
		position: fixed;
		top: calc(170rpx + var(--status-bar-height));
		left: 0;
		right: 0;
		bottom: 0;
		width: auto; /* 使right生效 */
		height: auto; /* 使bottom生效 */
		overflow: hidden;
	}
	.list_box{background: #fff; padding:0 20rpx;}
	.list_box .list{border-bottom: 1px solid #d8d8d8; padding: 20rpx 0;}
	.list_box .list .money.in{color:#fd2f53}
	.list_box .list .money.out{color:#00C700}
</style>
