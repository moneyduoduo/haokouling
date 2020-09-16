<template>
	<view class="couponRecord">
		<view class="total">
			<view class="total-label">
				累计充值金额（元）
			</view>
			<view class="num">
				{{totalCouponMoney}}
			</view>
		</view>
		<view class="record-title">
			充值记录（元）
		</view>
		<view class="record-head">
			<view class="code">
				充值码
			</view>
			<view class="quota">
				面额
			</view>
			<view class="time">
				充值时间
			</view>
		</view>
		 <view class="record-list" v-for="(item,index) in recordList" :key='index'>
		 	<view class="code">
		 		{{item.couponCode}}
		 	</view>
		 	<view class="quota">
		 		{{item.amount}}
		 	</view>
		 	<view class="time">
		 		{{$common.timeFormat(item.exchargeTime,'yyyy-mm-dd')}}
		 	</view>
		 </view>
		 <load-more  :loadingType="loadingType" :contentText="contentText"></load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordList: [],
				page : 1,
				totalCouponMoney:0,
				loadingType:0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "暂无更多数据"
				},
			}
		},
		onLoad(o) {
			this.getRecord()
			this.totalCouponMoney = o.totalCouponMoney
		},
		methods: {
			async getRecord() {
				this.loadingType = 1
				return this.$http.post('/api/account/getExchargeCouponList',{page:this.page}).then( res => {
					if(res.data.list) {
						this.recordList = [...this.recordList,...res.data.list]
						this.page += this.page
						this.loadingType = 0
					}else {
						this.loadingType = 2
					}
					if(this.recordList.length == res.data.total ) {
						this.loadingType = 2
					}
					
				})
			}
		},
		onReachBottom: function() {
			this.getRecord();
		},
		onPullDownRefresh() {
			this.page = 1
			this.recordList = []
			this.getRecord().then(uni.stopPullDownRefresh())
		},
	}
</script>

<style>
	page {
		color: #333;
		background-color: #f9f9f9;
		font-size: 28upx;
	}
	.couponRecord {
		border-top: 2upx solid #f2f2f2;
	}
	.total {
		height: 92upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40upx;
		background-color: #fff;
	}
	.record-title {
		margin-top: 34upx;
		height: 92upx;
		padding: 0 40upx;
		color: #666;
		background-color: #fff;
		line-height: 92upx;
	}
	.record-head,.record-list {
		height: 80upx;
		color: #333;
		display: flex;
		align-items: center;
		background-color: #fff;
	}
	.code ,.time,.quota{
		flex: 1;
		text-align: center;
		
	}
</style>
