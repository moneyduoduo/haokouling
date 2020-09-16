<template>
	<view class="page-content">
		<top-bar title="编辑银行信息" bgClass="orange"></top-bar>
		<view class="bank_bar">
			<view class="bank_box">
				<view class="bank">
					<view class="bank_btn">
						<view class="title">姓名</view>
						<view class="input_box">
							<view class="text">{{data.realName}}</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">卡号</view>
						<view class="input_box">
							<view class="text">{{data.bankAccount}}</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">银行</view>
						<view class="input_box">
							<view class="text">{{data.bankName}}</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">开户行</view>
						<view class="input_box">
							<view class="text">{{data.branchName}}</view>
						</view>
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
				data:{}
			}
		},
		onLoad() {
			this.$http.posts('/api/account/getBankInfo')
			.then(res=>{
				this.data = res.data;
			})
		},
		methods: {

		}
	}
</script>，
<style>
@import "../../static/css/global.css";
/* 顶部 */
.content {
	padding: 0;
}
.header{position: fixed;top:0;left:0;height: 40px;}	
.bank_bar{background: #fff;padding: 20rpx}
.bank_box .bank_btn{border-bottom: 1px solid #ccc;display: flex;justify-content: space-between; align-items: center; height:100rpx;}
.bank_box .bank_btn .title{color: #000;width: auto;}
.bank_box .bank_btn .input_box{flex: 1;}
.bank_box .bank_btn .input_box .text{text-align: right;}
</style>
