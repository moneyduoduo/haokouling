<template>
	<view class="couponCharge">
		<view class="item">
			<view class="item-label">
				手机号
			</view>
			<view class="item-content">
				{{tel}}
			</view>
		</view>
		<view class="item">
			<view class="item-label">
				充值码
			</view>
			<input type="text" value="" v-model="couponCode" placeholder="请输入充值码" placeholder-style="color:#a9a9a9" />
		</view>
		<view class="comfirm-btn" @click="goCharge">
			确认充值
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				couponCode :'',
				tel: ''
			}
		},
		methods: {
			goCharge () {
				if(!this.couponCode) {
					this.$msg.toast("请输入充值码") 
					return 
				}
				this.$http.post('/api/account/doExchargeCoupon',{couponCode:this.couponCode}).then( res =>{
					this.$msg.toast('充值成功',"back")
				})
			}
		},
		onLoad() {
		 	this.tel = this.$storage.get("userInfo").mobile
		}
	}
</script>

<style>
	page {
		color: #333;
		background-color: #fff;
		font-size: 32upx;
	}
	.couponCharge {
		border-top: 2upx solid #f2f2f2;
		padding-top: 80upx;
	}
	.item {
		display: flex;
		margin-bottom: 40upx;
	}
	.item:first-child {
		margin-bottom: 40upx;
	}
	.item-label {
		padding-left: 40upx;
		width: 200upx;
	}
	.comfirm-btn {
		background-color: #ffe400;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		width: 560upx;
		margin: 88upx auto 0;
		border-radius: 12upx;
	}
</style>
