<template>
	<view class="login">
		<view :style="{ height: statusBarHeight+'px' }" class="uni-status-bar"></view>
		<view class="logo-box">
			<image class="colse" src="../../static/image/pass/close.png" mode="" @tap="goBack"></image>
			<image class="logo" src="../../static/image/pass/logo.png" mode=""></image>
		</view>
		<view class="form-box">
			<view class="input-box ">
				<image class="input-icon" src="../../static/image/pass/shouji.png" mode=""></image>
				<input type="number" placeholder="手机账号" @focus="showClear('inphoneM')" @blur="hideClear('inphoneM')" v-model="phoneM" placeholder-class="placeholder" maxlength="11"/>
				<image   @tap="clearText('phoneM')" :class="[ 'clear-icon', phoneM.length != 0 && inphoneM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
			</view>
			<view class="input-box" v-if="!type">
				<image class="input-icon" src="../../static/image/pass/mima.png" mode=""></image>
				<input v-if="!isShowPassword" type="password" placeholder="登录密码" @focus="showClear('inpasswordM')"  @blur="hideClear('inpasswordM')"  v-model="passwordM" placeholder-class="placeholder" />
				<input  v-if="isShowPassword" type="text" placeholder="登录密码" @focus="showClear('inpasswordM')"  @blur="hideClear('inpasswordM')"  v-model="passwordM" placeholder-class="placeholder" />
				<image  @tap="clearText('passwordM')" :class="[ 'clear-icon', passwordM.length != 0 && inpasswordM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
				<view :class="['show-password',isShowPassword? 'active-show':'']" @tap="showPassword">
					<view :class="['slide-box',isShowPassword? 'active-slide':'']">
					</view>
				</view>
			</view>
			<view class="input-box" v-if="type">
				<image class="input-icon" src="../../static/image/pass/yanzhengma.png" mode=""></image>
				<input type="text" placeholder="短信验证码" @focus="showClear('invcodeM')"  @blur="hideClear('invcodeM')"  v-model="vcodeM" placeholder-class="placeholder" />
				<image  @tap="clearText('vcodeM')" :class="[ 'clear-icon', vcodeM.length != 0 && invcodeM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
				<view class="vcode" @tap="vcodetime">
					{{vcodetext}}
				</view>
			</view>
		</view>
		<view class="forget-box">
			<view class="agree">
				<image @tap="comfirmAgree" :src=" isAgree? '/static/image/home/checked.png' : '/static/img/icon/nochecked.png' " mode=""></image>已阅读并同意《<text class="agree-text" @tap="goProtocol">隐私协议</text>》
			</view> <text class="forget" @tap="goReset">忘记密码</text>
		</view>
		<view  :class="[isOk? 'on_submit_btn':'', 'login-btn']" @tap="submit">
			登录
		</view>
		<view class="regist-box"  @tap="goReg">
			<text class="regist">创建账号</text>
		</view>
		<view class="line-box">
			<view class="line">
			</view>
			<view class="tip">
				OR
			</view>
			<view class="line">
			</view>
		</view>
		<view class="login-else" @tap="doThirdLogin">
			<image src="../../static/image/pass/weixin.png" mode=""></image>
			<text>微信账号登录</text>
			<view class="perch">
				<!-- 占位 -->

			</view>
		</view>
		<view :class="['login-else', type? 'selected':'']" @tap="tabBtnFn">
			<image src="../../static/image/pass/anquan.png" mode=""></image>
			<text>验证码登录</text>
			<view class="perch">
				<!-- 占位 -->

			</view>
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
				statusBarHeight,
				openId:'',
				unionId:'',
				accessToken:'',
				imei:'',
				type:false, // false 密码登录 ，true 验证码登录
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
				backUrl:''
			}
		},
		onshow(){

		},
		onLoad(options) {
			if(options.back){
				this.backUrl = options.back
			}
			if(!this.$store.state.imei){
				this.$bindSystem.getDeviceInfo()
			}
			this.imei = this.$store.state.imei
		},
		methods: {
			goProtocol() {
				uni.navigateTo({
					url: '/pages/pass/protocol'
				});
			},
			showPassword() {
				this.isShowPassword = !this.isShowPassword
			},
			hideClear(key) {
				this[key] = false
			},
			showClear(key) {
				this[key] = true
			},
			clearText(key) {
				this[key] = ''
			},
			comfirmAgree() {
				this.isAgree = !this.isAgree
			},
			goBack() {
				uni.navigateBack();
			},
			goReg() {
				uni.navigateTo({
					url: '/pages/pass/sharpCode'
				});
			},
			goReset() {
				uni.navigateTo({
					url: '/pages/pass/reset'
				});
			},
			async doThirdLogin() {
				let data = await this.weilogin()
				this.openId = data.openid
				this.unionId = data.unionid
				this.accessToken = data.access_token
				let obj = {
					type: 'weixin',
					accessToken: this.accessToken,
					unionId: this.unionId,
					openId: this.openId,
					imei: this.imei
				}
				let res = await this.$http.post('/api/buyer/doThirdLogin', obj)
				console.log(JSON.stringify(res))
				res.data.buyerInfo.avatar = this.$common.qiniuCdnUrl(res.data.buyerInfo.avatar)
				this.$store.commit('login', res.data.buyerInfo)
				this.$store.commit('token', res.data.tokenInfo.token)
				uni.reLaunch({
					url: '/pages/user/index'
				});
			},
			weilogin() {
				let _this = this
				return new Promise(resolve => {
					//#ifdef H5
					// h5测试
					let data = {
						"authResult": {
							"access_token": "26_ORusGu9kQ9vlPrsjDocRN1jYGQw-s-IvldMHHX05DDKtC9qjFJi0jgJhooLoK2cX2VmMB9wD2HH5sZ9hTGD3uiLWSP3ur-7sV9J35fuEUNk",
							"expires_in": 7200,
							"refresh_token": "26__VP6CAN8feGQWt-Au9_DQGyJx7BtZ0GPsP-pY0P9cq0WW8dsFppijDfmjTFqFLu5aok-snSgQzKgw0H0xLxARbmr8gfjz_nrai59vozX7fg",
							"openid": "oCNCXwBAs6fw5U7tBXVcjSBRPJs8",
							"scope": "snsapi_userinfo",
							"unionid": "ok2bov2l8MrjtfWsflrVeqa12b8g"
						},
						"errMsg": "login:ok"
					}
					this.$store.commit('weixinOpenId', data.authResult)
					resolve(data.authResult)
					//测试ending
					//#endif
					// #ifdef APP-PLUS
					uni.login({
						provider: 'weixin',
						success: (res) => {
							console.log(JSON.stringify(res))
							this.$store.commit('weixinOpenId', res.authResult)
							resolve(res.authResult)
						},
						fail: (err) => {
							console.log(err)
							uni.showToast({
								title: "微信登录授权失败",
								icon: 'none'
							});
						}
					})
					// #endif
				});
			},
			tabBtnFn(){
				this.type = !this.type
				this.tabBtn = this.type?"密码登录":"验证码登录"
			},
			async vcodetime(){
				let {checkNull,checkPhone} = this.$checkForm
				if(this.intervalMark||!checkNull(this.phoneM,'手机号码不能为空！')||!checkPhone(this.phoneM,'请输入正确的手机号码！')){
					return
				}
				let data = await this.$http.posts('/api/sms/doSend',{mobile:this.phoneM,event:'103',app:1,isRegister:0,userType:1})
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
				let options={mobile:this.phoneM,imei:this.imei}
				if(this.type == true){
					if(!checkNull(this.vcodeM,'验证码不能为空！')||!checkLength(this.vcodeM,'4,6','请输入正确的验证码！')){
						return
					}
					options = {...options,verifyCode:this.vcodeM}
				}else{
					if(!checkNull(this.passwordM,'密码不能为空！')||!isChinese(this.passwordM,'密码不支持中文！',true)){
						return
					}
					options = {...options,password:this.passwordM}
				}
				if(!this.isAgree) {
					this.$msg.toast('请阅读并同意隐私协议')
					return
				}
				console.log(JSON.stringify(options))
				let data = await this.$http.post('/api/buyer/doLogin',options)
				let clientId = data.data.buyerInfo.id.toString()
				this.$bindSystem.bindAliasAndTag(clientId,['grade-'+data.data.buyerInfo.mobile])
				data.data.buyerInfo.avatar = this.$common.qiniuCdnUrl(data.data.buyerInfo.avatar)
				this.$store.commit('login',data.data.buyerInfo)
				this.$store.commit('token',data.data.tokenInfo.token)
				if(this.backUrl!=''){
					let res = await this.$http.post('/api/buyer/getIndex')
					res.data.buyerInfo.avatar = this.$common.qiniuCdnUrl(res.data.buyerInfo.avatar)
					this.userData = res.data.buyerInfo
					this.moneyData = res.data.buyerDetailInfo
					this.$store.commit('jxUserInfo',res.data)
					uni.reLaunch({
						url: `/${this.backUrl}`
					});
				}else{
					uni.reLaunch({
						url: '/pages/user/index'
					});
				}
			}
		
		},
		computed: {
			isOk: function () {
				if( this.phoneM.length == 11 && !this.type  && this.isAgree && this.passwordM.length >=6) {
					return false
				}else if ( this.phoneM.length == 11 && this.type && this.isAgree && this.vcodeM.length ==4){
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
		background: #fff;
		color: #ccc;
		width: 172upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		height: 60upx;
		border-radius: 60upx;
		border: 2rpx solid #FFEB00;
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
		height: 88upx;
		border-radius: 88upx;
		line-height: 88upx;
		text-align: center;
		font-size: 32upx;
		color: #333;
		/* background: linear-gradient(-45deg, #f33944, #ed0388); */
		background: #ffeb00;
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
		border: 1px solid #ffeb00;
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
		background: #ccc !important;
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
		background-color: #FFEB00;
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
