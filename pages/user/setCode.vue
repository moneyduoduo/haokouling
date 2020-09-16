<template>
	<view class="content">
		<view class="title">
			当前邀请码
		</view>
		<view class="code">
			{{oldCode}}
		</view>
		<view class="new-title title">
			我的自定义邀请码
		</view>
		<input class="code" type="text" v-model="newCode" maxlength="6" placeholder="请填写新邀请码" placeholder-style="color:#7c7d8f" />
		<view class="tips">
			<view class="tip">
				1.自定义的邀请码与之前系统分配的邀请码同时有效，你可以自由选择，之前推广的不影响。
			</view>
			<view class="tip">
				2.邀请码格式可以是“纯数字或者英文”，位数不低于6位，或“纯文字”，至少三个字。也可以汉字加数字英文组合，汉字还是三个或以上。
			</view>
			<view class="tip">
				3.请不要使用敏感关键字邀请码，否则官方有权利禁用您的邀请码。
			</view>
		</view>
		<view class="sub" @tap="submit">
			99元购买我的专属邀请码
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newCode: '',
				oldCode: '',
				oredrInfo:''
			}
		},
		methods: {
			goPay() {
				// uni.getProvider()
				// uni.requestPayment({
				// 	provider: 'alipay',
				// 	orderInfo: 'orderInfo', //微信、支付宝订单数据
				// 	success: function(res) {
				// 		console.log('success:' + JSON.stringify(res));
				// 	},
				// 	fail: function(err) {}
				// })
			},
			async submit(){
				let _this = this
				let {checkNull,checkLength,checkZmOrNum} = this.$checkForm
				if(!checkNull(this.newCode,'邀请码不能为空！')||!checkLength(this.newCode,'6,6','请输入正确的邀请码！')||!checkZmOrNum(this.newCode,'请输入正确的邀请码！')){
					return
				}
				if(!this.$bindSystem.isOpenPush()) {
					this.$msg.confirm({
						title: '提示',
						content: '请先开启通知权限'
					},() => {
						this.$bindSystem.gotoAppPermissionSetting()
					})
					return false
				}
				let oredr =  await this.$http.post('/api/deal/create',{inviterCode:this.newCode,type:1}) // 创建订单
				let getoredrInfo =  await this.$http.post('/api/pay/unity',{dealId:oredr.data.dealId,payType:1}) // 获取oredrInfo。支付宝：payType=1
				//let res =  await this.$http.post('/api/pay/alipayNotify') //支付宝回调支付状态 */
				console.log(JSON.stringify(getoredrInfo.data.data))
				_this.orderInfo = getoredrInfo.data.data.replace(/&amp;/g,"&")
				console.log(_this.orderInfo)

				uni.requestPayment({
					provider: 'alipay',
					orderInfo:_this.orderInfo , //支付宝订单数据
					success: function(res) {
						_this.$msg.toast('支付成功！')
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log(err)
					}
				})
				
			}
		},
		onLoad() {
			this.oldCode = this.$storage.get('jxUserInfo').buyerInfo.inviterCode
			
		}
	}
</script>

<style>
	page {
		background: #f4f5fa;
		font-size: 28upx;

	}

	.content {
		padding: 0 32upx;
	}

	.title {
		margin: 60upx 0 36upx;
		color: #333;
		font-size: 36upx;
	}

	.new-title {
		margin-top: 120upx;
	}

	.code {
		height: 120upx;
		background: #ffffff;
		line-height: 120upx;
		padding-left: 30upx;
		color: #7c7d8f;
		margin-bottom: 46upx;
		font-size: 28upx;
	}

	.tips {
		color: #9494b8;
	}

	.sub {
		text-align: center;
		line-height: 88upx;
		height: 88upx;
		margin-top: 160upx;
		color: #333;
		border-radius: 16upx;
		background-color: #ffeb00;
		font-size: 32upx;
	}
</style>
