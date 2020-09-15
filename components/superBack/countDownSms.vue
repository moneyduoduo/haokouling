<template>
	<view class="countDownSms" v-if="time>0">{{time}}s</view>
	<view class="sendCode" v-else @tap="sendCode">获取验证码</view>
</template>

<script>
	export default {
		props:{
			option:{
				type:Object,
				default:function(){
					return {};
				}
				
			}
		},
		data() {
			return {
				time:0,
				isLock:false
			};
		},
		mounted:function(){
			this.$common.countDownSms(this);
		},
		methods:{
			sendCode(){
				if(this.isLock){
					return;
				}
				let th = this;
				this.isLock = true;
				this.$common.sendCode(this.option,function(status){
					th.isLock = false;
					th.time=60;
					if(status == 1){
						return th.$common.countDownSms(th);
					}
				});
			},
		}
	}
</script>

<style>
	/*发送验证码*/
	.sendCode{width: 200rpx; margin-left: 30rpx; background: #f33944; text-align:center; color:#fff;border-radius: 30rpx; height:60rpx;line-height:60rpx;}
	.countDownSms{width: 100rpx; margin-left: 30rpx; background: #ddd; text-align:center; color:#fff;border-radius: 30rpx; height:60rpx;line-height:60rpx;}
</style>
