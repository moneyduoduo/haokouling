<template>
	<view class="bill">
<!-- 		<view class="type-box">
			<view class="type-item ">
				全部
			</view>
			<view class="type-item active">
				拼多多明细
			</view>
			<view class="type-item">
				京东明细	
			</view>
		</view> -->
		<view class="bill-content">
			<view class="bill-item" v-for="(item,index) in billList" :key='index'>	
				<image :src="item.money>0?'../../static/image/home/in.png':'../../static/image/home/out.png'" mode=""></image>
				<view class="bill-from">
					<view class="use">
						{{item.desc}}
					</view>
					<view class="time">
						<!-- <view class="">
							序号：{{item.id}}
						</view>
						<view class="line">
							
						</view> -->
						<view class="">
							{{item.createTime}}
						</view>
					</view>
				</view>
				<view class="bill-money">
					{{item.money>0? '+'+item.money: item.money}}
				</view>
			</view>
				<load-more  :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				billList: [],
				page : 1,
				loadingType:1,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "暂无更多数据"
				},
			}
		},
		methods:{
			getBills() {
				return this.$http.post('/api/account/getLogList',{page:this.page}).then( res => {
					this.loadingType = 2
					if (res.data.list.length == 0) {
						return
					}
					this.page++ 
					res.data.list.forEach( (item,index) => {
						item.createTime = this.$common.timeFormat(item.createTime)
					})
					this.billList = [...this.billList,...res.data.list]
				})
			}
		},
		onReachBottom:function(){
			this.loadingType = 1;
			this.getBills();
		},
		onLoad () {
			this.getBills()
		},
		onPullDownRefresh() {
			this.loadingType = 1;
			this.billList =[]
			this.page =1
		 	const data = this.getBills();
			if(data){
				uni.stopPullDownRefresh();
			}
		},
		
	}
</script>

<style>
	page {
		background-color: #f6f6f6;
		font-size: 28upx;
		color:#333;
		/* padding-top: 84upx; */
		
	}
	.type-box {
		position: fixed;
		top: 0;
		width: 100%;
		height: 84upx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #FFF;
	}
	.type-item {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 32upx;
	}
	.active:after{
		content: '';
		display: block;
		position: absolute;
		width: 110upx;
		height: 4upx;
		bottom: 0;
		left: 50%;
		background-color: #FD4C66;
		transform: translateX(-50%);
	}
	.bill-content {
		margin-top: 30upx;
		
	}
	.bill-item {
		display: flex;
		justify-content: space-between;
		height: 112upx;
		padding: 30upx;
		background-color: #fff;
		margin-bottom: 20upx;
		align-items: center;
	}
	.bill-item image{
		width: 72upx;
		height: 72upx;
		/* border-radius: 52upx; */
		margin-right: 20upx;
		
	}
	.bill-from {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	.use {
		font-size: 34upx;
		/* height: 80upx; */
	}
	.time {
		display: flex;
		color: #a9a9a9;
		align-items: center;
		height: 40upx;
	}
	.line {
		background-color: #a9a9a9;
		width: 2upx;
		height: 30upx;
		margin:  0 30upx;
	}
	.bill-money {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FD4C66;
		font-size: 32upx;
	}
</style>
