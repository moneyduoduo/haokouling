<template>
	<view class="fetchMoney">
		<view class="balance">
			<view class="">
				余额
			</view>
			<view class="money">
				{{money}}
			</view>
			<view class="">
				元
			</view>
		</view>
		<view class="zhifubao" @tap="goAddZhifubao">
			<image class="logo-icon" src="../../static/image/home/zhifub.png" mode=""></image>
			<view class="account" v-if="isAlipay">
				<view class="name">
					{{alipay.realName}}
				</view>
				<view class="account-num">
					{{alipay.alipayAccount}}
				</view>
			</view>
			<view class="account" v-if="!isAlipay">
				<view class="name">
					支付宝
				</view>
				<view class="account-num">
					还没有添加支付宝账号，请点击添加
				</view>
			</view>
			<image  class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
		</view>
		<view class="input-box">
			<input type="number" v-model="inputMoney" placeholder-style="color:#a9a9a9" :placeholder="'请输入提取金额,当前可提取金额'+withdrawMoney+'元'"/>
		</view>
		<view class="hint" v-if="!isOut">
			提现金额超限
		</view>
		<view class="fetch-btn" @tap="submit">
			我要提现（申请提现1-2工作日到账）
		</view>
		<view class="tips">
			<view class="tips-title">
				首次提现必看
			</view>
			<view class="important-tip">
				请务必核对【支付宝账号】以及【真实姓名】，如因提供信息有误导致的资金损失将由您个人承担。
			</view>
		<!-- 	<view class="text-box">
				<rich-text :nodes="strings"></rich-text>
			</view> -->
			<view class="else-box">
				<text class="else-title">提现规则：</text>请务必先确认支付宝账号与姓名正确
			</view>
			<view class="else-box">
				<text class="else-title">提现佣金：</text>最低提现<text class="else-important">10元佣金</text>（1元佣金=1元现金），提现金额必须为10以上的整数如10，12，13，20
			</view>
			<view class="else-box">
				<text class="else-title">到账时间：</text>提现申请后下一个工作日到账，如遇节假日顺延至下一个工作日
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
				withdrawMoney: 0,
				inputMoney:'',
				alipay:'',
				strings:'',
				isAlipay: false
			}
		}, 
		methods: {
			goBack(){
				uni.navigateBack();
			},
			goAddZhifubao(){
				uni.navigateTo({
					url: "./addZhiFuBao"
				});
			},
			getZhifubaoInfo(){
				this.$http.post('/api/alipay/getDetail')
				.then(res=>{
					if(res.code == -1) {
						return
						this.isAlipay = false
					}
					this.alipay = res.data
					this.isAlipay = true
					
				})
			},
			allMoneyBtn(){
				this.inputMoney = this.money
			},
			submit(){
				if(this.inputMoney==0||this.inputMoney>this.money){
					return this.$msg.toast('请输入正确的金额！')
				}
				if(this.inputMoney <10){
					return this.$msg.toast('提现金额低于最低提现金额！')
				}
				this.$http.post('/api/withdrawal/doWithdrawal',{money:this.inputMoney}).then(res=>{
					console.log(res)
					let tempMoney = this.$store.state.jxUserInfo
					this.money= tempMoney.withdrawMoney = res.data.withdrawMoney
					this.inputMoney = 0
					this.$store.commit('jxUserInfo',tempMoney)
					this.$msg.confirm({content:'申请提现成功，请留意收款账号。',cancelText:'关闭',confirmText:'返回'},()=>{
						uni.reLaunch({
							url: "/pages/user/index"
						})
					})
				})
			}

		},
		watch: {

		},
		computed: {
			isOut:function(){
				if(+this.inputMoney > +this.money ) {
					return false
				}else {
					return true
				}
			}
		},
		onReady:function(){ 
		
		},
		onShow(){
			let tempMoney = this.$store.state.jxUserInfo
			this.strings = this.$store.state.jxConfig.config.jxshWithdrawalTip
			this.money = tempMoney.buyerDetailInfo.withdrawMoney
			this.withdrawMoney = tempMoney.buyerDetailInfo.withdrawMoney.split('.')[0]
			this.getZhifubaoInfo()
			console.log('onShow fetchMoney')
		},
		onUnload(){
			
		},
		onLoad: function() {
			
		},

	}
</script>
<style >
	page {
		color:#333;
		font-size: 28upx;
	}
	.fetchMoney {
		border-top: 2upx solid #e0e2e4;
	}
	.balance {
		height: 60upx;
		padding-top: 40upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #868686;
		margin: 0 70upx;
	}
	.money {
		font-weight: bold;
		color: #ff0000;
		font-size: 40upx;
	}
	.zhifubao {
		display: flex;
		padding: 20upx 20upx;
		margin: 20upx 40upx 0;
		align-items: center;
		background-color: #f8f8f8;
	}
	.logo-icon {
		width: 80upx;
		height: 80upx;
		margin-right: 40upx;
	}
	.account {
		display: flex;
		height: 80upx;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		color: #a9a9a9;
	}
	.right-icon {
		width: 48upx;
		height: 48upx;
	}
	.input-box {
		margin-top: 20upx;
		padding: 0 40upx ;
		
	}
	.input-box input {
		height: 80upx;
		font-size: 28upx;
		padding-left: 36upx;
		border: 2upx solid #e6e6e6;
	}
	.hint {
		color: #ff0000;
		margin-top: 10upx;
		padding-left: 40upx;
	}
	.fetch-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFEB00;
		height: 82upx;
		margin:50upx 40upx 0;
		color: #333;
		border-radius: 82upx;
	}
	.tips-title {
		font-size: 36upx;
		font-weight: bold;
	}
	.tips {
		padding: 0 40upx;
		margin-top: 80upx;
	}
	.important-tip {
		color: #ff0000;
		line-height: 52upx;
		margin-top: 20upx;
	}
	.text-box {
		padding-left: 50upx;
	}
	.else-box {
		line-height: 52upx;
	}
	.else-title {
		font-size: 30upx;
		font-weight: bold;
	}
	.else-important {
		color: #FF0000;
	}
</style>
