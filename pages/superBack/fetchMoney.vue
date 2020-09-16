<template>
	<view class="page-content">
		<top-bar title="我要提现" bgClass="orange"></top-bar>
		<view class="ptb30 pd30 row middle bb between">
			<view class="w150">收款账号</view>
			<view class="flex1 tr" v-if="bankInfo.bankName"><text>{{bankInfo.bankName}}</text><text class="cRed">{{bankInfo.bankAccount}}</text></view>
			<view class="cRed tr" @tap="$common.goPage('/pages/superBack/addBank')" v-else>立即绑定</view>
		</view>
		<view class="ptb30 pd30 row middle bb between">
			<view>提现超级返资金</view>
			<view class="tr cRed f40">￥{{money}}</view>
		</view>
		
		<view class="fetchMoney_box">
			<view class="submit_box">
				<view class="instructions ln2">
					<view class="title">温馨提示：</view>
					<rich-text :nodes="$storage.get('cjfConfig').cjfWithdrawalTip"></rich-text>
				</view>
				<view class="submit_btn" @tap="submit">申请提现 1-2工作日到账</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: {
		},
		data() {
			return {
				money:0,
				bankInfo:{
					bankName:'',
					bankAccount:'',
				}
			}
		}, 
		methods: {
			submit(){
				if(this.money<parseFloat(this.$storage.get('cjfConfig').withdrawalMinLimit)){
					return this.$msg.toast('账户余额不足');
				}
				if(!this.bankInfo.bankName){
					return this.$msg.toast('请先绑定银行信息');
				}
				this.$http.posts('/api/account/doWithdrawal',{money:this.money}).then((res)=>{
					this.$msg.toast(res.msg,'/pages/superBack/home');
				});
				
			}
		},
		watch: {

		},
		computed: {


		},
		onReady:function(){ 
		
		},
		onShow(){
			if(this.$storage.get('cjfOtherConfig')['bankStatus']>0){
				this.$http.posts('/api/account/getBankInfo')
				.then(res=>{
					this.bankInfo = res.data;
				})
			}
		},
		onUnload(){
			
		},
		onLoad: function(option) {
			this.money = parseFloat(option.money);
			this.$http.posts('/api/account/getWithdrawalInfo').then(res => {
				console.log(res)
			})
		},

	}
</script>
<style >
	/* 顶部 */
	@import "../../static/css/global.css";
	page{background:#fff;color:#333;}
	.btnAddBank{width:200rpx;text-align: center; height:50rpx;line-height:50rpx;border:1px solid #fd2f53;border-radius: 30rpx;font-size:28rpx;color:#fd2f53;}
	.fetchMoney_box{background: #fff;padding: 0 20rpx; margin-top: 20rpx; }
	.fetchMoney_box .lsit_box{height: 100rpx; line-height: 100rpx; border-bottom:1px solid #d8d8d8; display: flex; justify-content: center; align-items: center;}
	.fetchMoney_box .lsit_box .title{width: auto;}
	.fetchMoney_box .lsit_box .remain_money,.fetchMoney_box .lsit_box .backCode{flex: 1;text-align: right;}
	.fetchMoney_box .lsit_box .remain_money text,.fetchMoney_box .lsit_box .backCode text{color:#f33944; padding-left: 20rpx;}
	.fetchMoney_box .submit_box{margin-top: 20rpx;}
	.fetchMoney_box .submit_box .allMoney{ margin-top: 20rpx; display: flex; justify-content: center; align-items: center; padding-bottom: 20rpx; border-bottom: 1px solid #d8d8d8;}
	.fetchMoney_box .submit_box .allMoney text{font-size: 44rpx; width: auto;}
	.fetchMoney_box .submit_box .allMoney input{flex: 1; font-size:44rpx; padding-left: 20rpx;}
	.fetchMoney_box .submit_box .instructions{margin-top: 20rpx;}
	.fetchMoney_box .submit_box .instructions .title{margin-bottom: 20rpx;color:#f33944}
	.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#333; font-size:32rpx; border-radius:60rpx;background: #ffe300;margin: 80rpx 0;} 
	.fetchMoney_box.pt{position:fixed ;top:320rpx;left:0;right:0;bottom: 0;}
</style>
