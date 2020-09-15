<template>
	<view class="bank_box">
		<view class="bank">
			<view class="input_box">
				<input class="input" type="text" v-model="myName" placeholder-style="color:#a9a9a9" placeholder="输入收款人真实姓名">
			</view>
			<view class="input_box">
				<input class="input" type="text" v-model="zhifubaoCode" placeholder-style="color:#a9a9a9" placeholder="输入支付宝账号(邮箱/手机)">
			</view>
			<view class="bank_btn">
				<view class="input_box">
					<input class="input" type="text" v-model="vcodeM" placeholder-style="color:#a9a9a9" placeholder="输入手机验证码">
				</view>
				<view class="vcode" @tap="vcodetime">{{vcodetext}}</view>
			</view>
			<view class="tip">
				小提示：验证码将发送至您绑定的手机上({{$common.telFormat(phoneM)}})
			</view>
			<view class="submit_btn" @tap="submit">完成</view>
			<view class="focus">
				注：请仔细核对用户信息
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				type: false,
				myName: "",
				zhifubaoCode: "",
				vcodeM: "",
				phoneM: '',
				vcodetext: "获取验证码",
				time: 60,
				intervalMark: false, // 多次点击

			}
		},
		components: {},
		onLoad: function(opotion) {

		},
		onShow() {
			let userInfo = this.$store.state.userInfo
			this.phoneM = userInfo.mobile
			this.getZhifubaoInfo()
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			getZhifubaoInfo() {
				this.$http.post('/api/alipay/getDetail')
					.then(res => {
						if (res.code == 0) {
							this.myName = res.data.realName
							this.zhifubaoCode = res.data.alipayAccount
						}
					})
			},
			async vcodetime() {
				//101买家手机号注册，102买家第三方注册，103买家手机短信登录，104买家重置密码，105买家绑定支付宝，201买家绑定银行卡，
				if (this.intervalMark) return
				this.intervalMark = true
				let data = await this.$http.posts('/api/sms/doSend', {
					mobile: this.phoneM,
					event: '105',
					app: '1',
					isRegister: '0',
					userType: 1
				})
				if(data){
					this.$msg.toast('验证码已发送，请查收')
				}
				let interval = setInterval(() => {
					if ((this.time--) <= 0) {
						this.time = 60
						this.vcodetext = "获取验证码";
						clearInterval(interval);
						this.intervalMark = false;
					} else {
						this.vcodetext = this.time + 's';
					}
				}, 1000)
			},
			submit: function() {
				let {
					checkNull,
					checkLength
				} = this.$checkForm
				if (!checkNull(this.myName, '请输入您的真实姓名！') || !checkNull(this.zhifubaoCode, '请输入您的支付宝账号！')) {
					return
				}
				if (!checkNull(this.vcodeM, '验证码不能为空！') || !checkLength(this.vcodeM, '4,6', '请输入正确的验证码！')) {
					return
				}
				this.$http.post('/api/alipay/doBind', {
						realName: this.myName,
						mobile: this.phoneM,
						alipayAccount: this.zhifubaoCode,
						code: this.vcodeM
					})
					.then(res => {
						this.$msg.toast('绑定支付宝成功！')
						setTimeout(function() {
							uni.navigateTo({
								url: "./fetchMoney"
							});

						}, 2000)
					})

			}

		}
	}
</script>，
<style>
	.bank_box{
		border-top: 2upx solid #e0e2e4;
		padding: 30upx;
		font-size: 28upx;
	}
	.input_box {
		margin-bottom: 30upx;
	}
	.input {
		height: 88upx;
		background: #f8f8f8;
		font-size: 28upx;
		color: #333;
		padding-left: 20upx;
		border-radius: 8upx;
	}
	.bank_btn {
		display: flex;
	}
	.bank_btn .input_box{
		flex: 1;
	}
	.vcode {
		height: 88upx;
		width: 220upx;
		/* border-radius: 8upx; */
		background: #fff;
		color: #ccc;
		border: 2rpx solid #FFEB00;
		border-radius: 88upx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 20upx;
	}
	.tip {
		font-size: 24upx;
		color: #c9c9c9;
	}
	.submit_btn {
		height: 88upx;
		/* background: linear-gradient(-45deg, #f33944, #ed0388); */
		background: #FFEB00;
		margin: 0 64upx;
		border-radius: 88upx;
		color: #333;
		font-size: 32upx;
		text-align: center;
		line-height: 88upx;
		margin-top: 70upx;
	}
	.focus {
		text-align: center;
		margin-top: 64upx;
		font-size: 24upx;
		color: #c9c9c9;
	}
</style>
