<template>
	<view>
		<view class="listBar">
			<view class="listBox" v-for="(item,index) in monthList" :key="index">
				<view class="monthRow">
					<view class="month">{{item.title}}</view>
					<view class="detailBox" @tap="goDetail(item.time)">
						<view class="iconfont icon icon-dingdan"></view>
						<view>明细</view>
					</view>
				</view>
				<view class="moneyRow">
					<view class="money">￥<text>{{item.commission}}</text></view>
				</view>
				<view class="laxinFans">
					<view class="fansText">
						<text class="box">有效用户数：<text class="fontRed">{{item.validBuyerNum}}</text>人</text>
						<text class="box">激活用户数：<text class="fontRed">{{item.regBuyerNum}}</text>人</text>
						<text class="box">首购数：<text class="fontRed">{{item.firstBuyNum}}</text>人</text>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>
<script>

	export default {
		data() {
			return {
				monthList:[
					{month:'11月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'10月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'9月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'8月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'7月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'6月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'5月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'4月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'3月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'2月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
					{month:'1月APP拉新收益',money:0,usefulFans:0,activationFans:0,buyFans:0},
				]
			}
		},

		components: {

		},
		onLoad: function() {
			this.getlist()
		},
		onShow: function() {

		},

		methods: {
			goDetail(time){
				uni.navigateTo({
					url: './detail?time='+time
				})
			},
			async getlist(){
				let res = await this.$http.post('/api/inviter/getStatList')
				this.monthList = res.data.list
				console.log(res)
			}
		}
	}
</script>

<style>
	@import "../../../static/css/global.css";
	page{background: #ededed;}
	.listBar{background-color: #ededed;padding: 20rpx;}
	.listBar .listBox{background-color: #ffffff; padding:40rpx 20rpx; border-radius: 20rpx; margin-top: 20rpx;}
	.listBar .listBox .monthRow{display: flex;justify-content: center;align-items: center;}
	.listBar .listBox .monthRow .month{flex: 1;}
	.listBar .listBox .monthRow .detailBox{width:auto;padding: 6rpx 10rpx; background-color: #fff5f7; border-radius:5px; display: flex;justify-content: center;align-items: center;}
	.listBar .listBox .monthRow .detailBox .icon{ font-size: 38rpx;width:auto; margin-right: 10rpx; color:#de4724;}
	.listBar .listBox .moneyRow .money text{font-size: 44rpx;}
	.laxinFans .fansText .box{padding-right: 40rpx; font-size: 24rpx;}
	.laxinFans .fansText .box .fontRed{color:#de4724;}
</style>
