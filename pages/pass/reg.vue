<template>
	<view class="login">
		<view class="logo-box">
			<image class="logo" src="../../static/image/pass/logo.png" mode=""></image>
		</view>
		<view class="form-box">
			<view class="input-box ">
				<image class="input-icon" src="../../static/image/pass/shouji.png" mode=""></image>
				<input type="tel" placeholder="输入手机号码" @focus="showClear('inphoneM')" @blur="hideClear('inphoneM')" v-model="phoneM" placeholder-class="placeholder" maxlength="11"/>

				<image   @tap="clearText('phoneM')" :class="[ 'clear-icon', phoneM.length != 0 && inphoneM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
			</view>
			<view class="input-box">
				<image class="input-icon" src="../../static/image/pass/yanzhengma.png" mode=""></image>
				<input type="tel" placeholder="短信验证码" @focus="showClear('invcodeM')"  @blur="hideClear('invcodeM')"  v-model="vcodeM" placeholder-class="placeholder" />
				<image  @tap="clearText('vcodeM')" :class="[ 'clear-icon', vcodeM.length != 0 && invcodeM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
				<view class="vcode" @tap="vcodetime">
					{{vcodetext}}
				</view>
			</view>
			<view class="input-box">
				<image class="input-icon" src="../../static/image/pass/mima.png" mode=""></image>
				<input v-if="!isShowPassword" type="password" placeholder="设置登录密码" @focus="showClear('inpasswordM')"  @blur="hideClear('inpasswordM')"  v-model="passwordM" placeholder-class="placeholder" />
				<input  v-if="isShowPassword" type="text" placeholder="设置登录密码" @focus="showClear('inpasswordM')"  @blur="hideClear('inpasswordM')"  v-model="passwordM" placeholder-class="placeholder" />
				<image  @tap="clearText('passwordM')" :class="[ 'clear-icon', passwordM.length != 0 && inpasswordM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
				<view :class="['show-password',isShowPassword? 'active-show':'']" @tap="showPassword">
					<view :class="['slide-box',isShowPassword? 'active-slide':'']">
					</view>
				</view>
			</view>			
		</view>
		<view class="forget-box">
			<view class="agree">
				<image @tap="comfirmAgree" :src=" isAgree? '/static/image/pass/gou.png' : '/static/img/icon/nochecked.png' " mode=""></image>已阅读并同意《<text @tap="goProtocol" class="agree-text">用户服务协议</text>》
			</view>
		</view>
		<view  :class="[isOk? 'on_submit_btn':'', 'login-btn']" @tap="submit">
			确认
		</view>
	</view>
</template>

<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		data() {
			return {
				isShowPassword: false,
				isAgree: true,
				scode:'',
				phoneM:"",
				passwordM:"",
				vcodeM:"",
				inphoneM:true,
				inpasswordM:true,
				invcodeM:true,
				vcodetext:"获取验证码",
				tabBtn:"验证码登录",
				time:60,
				intervalMark:false, // 多次点击
				imei:''
			}
		},
		onLoad(e) {
			if(typeof e ==="object"){
			  this.scode = e.scode
		     }
			 if(!this.$store.state.imei){
			 	this.$bindSystem.getDeviceInfo()
			 }
			 this.imei = this.$store.state.imei
		},
		onShow(){

		},
		methods: {
			goProtocol() {
				uni.navigateTo({
					url: '/pages/pass/protocol?type=1'
				})
			},
			showPassword() {
				this.isShowPassword = !this.isShowPassword
			},
			clearText(key) {
				this[key] = '' 
			},
			hideClear(key) {
				this[key] = false
			},
			showClear(key) {
				this[key] = true
			},
			comfirmAgree() {
				this.isAgree = !this.isAgree
			},
			async vcodetime(){
				let {checkNull,checkPhone} = this.$checkForm
				if(this.intervalMark||!checkNull(this.phoneM,'手机号码不能为空！')||!checkPhone(this.phoneM,'请输入正确的手机号码！')){
					return
				}
				let weixinData = this.$store.state.weixinOpenId
				console.log(weixinData)
				
				//101买家手机号注册，102买家第三方注册，103买家手机短信登录，104买家重置密码，105买家绑定支付宝，201买家绑定银行卡，
				let event = '101'
				if(weixinData){
					event = '102'
				}
				let data = await this.$http.posts('/api/sms/doSend',{mobile:this.phoneM,event:event,app:'1',isRegister:'1',userType:1})
				if(data) {
					this.intervalMark = true
					this.$msg.toast('验证码已发送，请查收')
				}
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
				
		
			},
			async submit(){
				let {checkNull,checkPhone,checkLength,isChinese} = this.$checkForm
				if(!checkNull(this.phoneM,'手机号码不能为空！')||!checkPhone(this.phoneM,'请输入正确的手机号码！')){
					return
				}
				if(!checkNull(this.vcodeM,'验证码不能为空！')||!checkLength(this.vcodeM,'4,6','请输入正确的验证码！')){
					return
				}
				if(!checkNull(this.passwordM,'密码不能为空！')||!isChinese(this.passwordM,'密码不支持中文！',true)){
					return
				}
				if(!this.isAgree) {
					this.$msg.toast('请阅读并同意用户服务协议')
					return
				}
				let weixinData = this.$store.state.weixinOpenId
				let opotion = {}
				let regApi = ''
				if(weixinData){
					let openId = weixinData.openid
					let unionId = weixinData.unionid
					let accessToken = weixinData.access_token
					opotion = {mobile:this.phoneM,password:this.passwordM,inviterCode:this.scode,verifyCode:this.vcodeM,imei:this.imei,accessToken:accessToken,unionId:unionId,openId:openId,type:'weixin'},
					regApi = '/api/buyer/doThirdLogin'
				}else{
					opotion = {mobile:this.phoneM,password:this.passwordM,inviterCode:this.scode,verifyCode:this.vcodeM,imei:this.imei},
					regApi = '/api/buyer/doRegister'
				}
				
				console.log(JSON.stringify(opotion))
				
				let data = await this.$http.post(regApi,opotion)
				let clientId = data.data.buyerInfo.id.toString()
				this.$bindSystem.bindAliasAndTag(clientId,['grade-'+data.data.buyerInfo.mobile])
				this.$store.commit('login',data.data.buyerInfo)
				this.$store.commit('token',data.data.tokenInfo.token)
				uni.reLaunch({
					url: '/pages/user/index'
				});
				
				
			}
		
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/pass/sharpCode'
			});
		},
		computed: {
			isOk: function () {
				if( this.phoneM.length == 11 && this.vcodeM.length == 4 && this.passwordM.length >=6 && this.isAgree) {
					return false
				}else {
					return true
				}
			}
		}
	}
</script>

<style>
	.login {
		padding: 0 80upx 80upx;
	}

	.logo-box {
		position: relative;
		width: 100%;
		height: 400upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logo {
		width: 152upx;
		height: 152upx;
		border-radius: 12upx;
	}

	.colse {
		width: 40upx;
		height: 40upx;
		position: absolute;
		top: 20upx;
		right: -40upx;
	}

	.form-box {}

	.input-box {
		display: flex;
		border-bottom: 2upx solid #e6e6e6;
		height: 88upx;
		align-items: center;
		margin-bottom: 20upx;
	}

	.input-icon {
		width: 40upx;
		height: 40upx;
		margin: 0 20upx;
	}

	input {
		padding-left: 10upx;
		color: #333;
		font-size: 28upx;
		flex: 1;
	}
	.vcode {
		background: #FD4C66;
		color: #fff;
		width: 172upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		height: 60upx;
		border-radius: 8upx;
	}
	.placeholder {
		color: #a9a9a9;
	}

	.forget-box {
		display: flex;
		font-size: 28upx;
		margin-top: 30upx;
		justify-content: space-between;
	}
	.forget {
		color: #FD4C66;
	}
	.agree {
		display: flex;
		color: #a9a9a9;
	}
	.agree image {
		width: 36upx;
		height: 36upx;
		margin-right: 10upx;
	}
	.agree-text {
		color: #FD4C66;
	}
	.login-btn {
		margin-top: 56upx;
		height: 100upx;
		border-radius: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 34upx;
		color: #fff;
		background: linear-gradient(-45deg, #f33944, #ed0388);
		;
	}

	.regist-box {
		margin-top: 56upx;
		text-align: center;
		color: #FD4C66;
		font-size: 28upx;
	}

	.line-box {
		height: 60upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 40upx 0;
	}

	.line {
		height: 2upx;
		background: #e6e6e6;
		flex: 1;
	}

	.tip {
		color: #bbb;
		font-size: 32upx;
		margin: 0 40upx;
	}

	.login-else {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 88upx;
		font-size: 30upx;
		color: #a9a9a9;
		border: 1px solid #e6e6e6;
		border-radius: 88upx;
		padding: 0 20upx;
		margin-top: 30upx;
	}
	.selected {
		border: 1px solid #FD4C66;
	}
	.login-else image {
		width: 52upx;
		height: 52upx;
	}

	.perch {
		width: 52upx;
		height: 52upx;
	}
	.on_submit_btn {
		background: #ff8da7 !important;
	}
	.clear-icon {
		width: 40upx;
		height: 40upx;
		margin-right: 6upx;
		opacity: 0;
		transition: all 0.3s ease;
	}
	.show-clear-icon {
		opacity: 1;
	}
	.show-password {
		width: 100upx;
		height: 36upx;
		padding: 8upx;
		background: #e6e6e6;
		border-radius: 40upx;
	}
	.active-show {
		background-color: #FD4C66;
	}
	.slide-box {
		height: 36upx;
		width: 36upx;
		border-radius: 36upx;
		background: #fff;
		transition: all 0.2s ease;
	}
	.active-slide {
		transform: translateX(64upx);
	}
</style>
