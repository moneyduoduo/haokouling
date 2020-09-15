<template>
	<view class="change-tel">
		<view class="title">
			绑定新手机
			<!-- <view class="step-one">
				1.验证原号码
			</view>
			<view class="step-two">
				2.绑定新手机
			</view> -->
		</view>
		<view class="old-tel-box">
			<input type="tel" placeholder="请输入手机号码" v-model="newTel" placeholder-style="color:#e6e6e6" />
			<view class="send-code" @tap="sendCode">
				{{vcodetext}}
			</view>
		</view>
		<view class="code-box">
			<input type="tel" placeholder="请输入验证码" v-model="code" placeholder-style="color:#e6e6e6" />
		</view>
		<view class="next-btn" @tap="goNext">
			确定
		</view>
		<view class="tip">
			<view class="">
				温馨提示
			</view>
			<view class="">
				手机号码修改成功后需要使用新的手机号码进行登录。
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				code: '',
				newTel: '',
				vcodetext: '获取验证码',
				intervalMark: false,
				time: 60,
				oldCode: ''
			}
		},
		methods:{
			sendCode(){
				if(this.intervalMark) {
					return
				}
				let {checkNull,checkPhone} = this.$checkForm
				if(this.intervalMark||!checkNull(this.newTel,'手机号码不能为空！')||!checkPhone(this.newTel,'请输入正确的手机号码！')){
					return
				}
				this.$http.posts('/api/sms/doSend',{mobile:this.newTel, event:'101',app:1,isRegister:1,userType:1}).then( res => {
					this.intervalMark = true
					this.$msg.toast('验证码已发送，请查收')
					let interval = setInterval(()=> {
					  if ((this.time --) <= 0) {
					    this.time = 60
					    this.vcodetext="获取验证码";
					    clearInterval(interval);
					    this.intervalMark=false;
					  }else{
					    this.vcodetext = this.time+'s';
					  }
					}, 1000)
				})
			},
			goNext() {
				this.$http.post('/api/buyer/doChangeMobile',{oriVerifyCode:this.oldCode,newMobile: this.newTel,newVerifyCode:this.code}).then( res => {
					uni.showToast({
						title:'手机换绑成功',
						duration: 3000,
						icon:"none"
					})
					setTimeout( ()=> {
						this.$http.post('/api/buyer/doLogout')
						this.$store.commit('logout')
						uni.reLaunch({
							url: "/pages/user/index"
						})
					},1000)
					
				})
			}
		},
		
		onLoad(options){
			this.oldCode = options.oldCode
		}
	}
</script>

<style>
	page {
		background-color: linear-gradient(#ffffff, #a9a9a9);
		font-size: 28upx;
		
	}
	.title {
		height: 240upx;
		line-height: 240upx;
		padding-left: 40upx;
		color: #333;
		font-size: 36upx;
	}
		
/* 	.title {
		display: flex;
		height: 92upx;
		
	} */
	.step-one , .step-two {
		flex: 1;
		text-align: center;
		line-height: 92upx;
		
	}
	.step-one {
		color: #f04844;
		
	}
	.step-two {
		color: #a9a9a9;
		background-color: #fff;
	}
	.old-tel-box {
		display: flex;
		height: 92upx;
		align-items: center;
		padding: 0 40upx;
		border-top: 2upx solid #e6e6e6;
		border-bottom: 2upx solid #e6e6e6;
	}
	
	.old-tel {
		color: #333;
		flex: 1;
		
	}
	.send-code{
		height: 60upx;
		width: 172upx;
		background: #fff;
		color: #ccc;
		border: 2rpx solid #FFEB00;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
	}
	.code-box {
		display: flex;
		height: 92upx;
		align-items: center;
		color: #333;
		border-bottom: 2upx solid #e6e6e6;
		padding-left: 40upx;
	}
	input {
		flex: 1;
		font-size: 28upx;
	}
	.next-btn {
		width: 590upx;
		height: 88upx;
		background-color: #FFEB00;
		border-radius: 88upx;
		margin: 80upx auto ;
		color: #333;
		text-align: center;
		line-height: 88upx;
		font-size: 32rpx;
	}
	.tip {
		padding: 0 30upx;
		line-height: 52upx;
		color: #a9a9a9;
	}
</style>
