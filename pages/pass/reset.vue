<template>
	<view class="login">
		<view class="form-box">
			<view class="input-box ">
				<image class="input-icon" src="../../static/image/pass/shouji.png" mode=""></image>
				<input type="text" placeholder="手机账号" @focus="showClear('inphoneM')" @blur="hideClear('inphoneM')" v-model="phoneM" placeholder-class="placeholder" />
				<image   @tap="clearText('phoneM')" :class="[ 'clear-icon', phoneM.length != 0 && inphoneM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
			</view>
			<view class="input-box">
				<image class="input-icon" src="../../static/image/pass/yanzhengma.png" mode=""></image>
				<input type="text" placeholder="短信验证码" @focus="showClear('invcodeM')"  @blur="hideClear('invcodeM')"  v-model="vcodeM" placeholder-class="placeholder" />
				<image  @tap="clearText('vcodeM')" :class="[ 'clear-icon', vcodeM.length != 0 && invcodeM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
				<view class="vcode" @tap="vcodetime">
					{{vcodetext}}
				</view>
			</view>
			<view class="input-box">
				<image class="input-icon" src="../../static/image/pass/mima.png" mode=""></image>
				<input v-if="!isShowPassword" type="password" placeholder="登录密码" @focus="showClear('inpasswordM')"  @blur="hideClear('inpasswordM')"  v-model="passwordM" placeholder-class="placeholder" />
				<input  v-if="isShowPassword" type="text" placeholder="登录密码" @focus="showClear('inpasswordM')"  @blur="hideClear('inpasswordM')"  v-model="passwordM" placeholder-class="placeholder" />
				<image  @tap="clearText('passwordM')" :class="[ 'clear-icon', passwordM.length != 0 && inpasswordM ?'show-clear-icon':'']" src="../../static/image/pass/guanbi.png" mode=""></image>
				<view :class="['show-password',isShowPassword? 'active-show':'']" @tap="showPassword">
					<view :class="['slide-box',isShowPassword? 'active-slide':'']">
					</view>
				</view>
			</view>			
		</view>
		<view  :class="[!isCode? 'on_submit_btn':'', 'login-btn']" @tap="comfirm">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data () {
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
			}
		},
		methods: {
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
			vcodetime(){
				const event = 104
				let {checkNull,checkPhone} = this.$checkForm
				if(this.intervalMark||!checkNull(this.phoneM,'手机号码不能为空！')||!checkPhone(this.phoneM,'请输入正确的手机号码！')){
					return
				}
				this.$msg.toast('验证码已发送')
				this.$http.posts('/api/sms/doSend',{mobile:this.phoneM,event:event,app:'1',isRegister:'0',userType:1}).then( res =>{
					this.intervalMark = true
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
			comfirm() {
				if(!this.isCode) {
					return
				}
				let {checkNull,isChinese} = this.$checkForm
				if(!checkNull(this.passwordM,'新密码不能为空！')||!isChinese(this.passwordM,'密码不支持中文！',true)){
					return
				}
				
				this.$http.post('/api/buyer/doResetPwd',{mobile:this.phoneM,newPassword:this.passwordM,verifyCode:this.vcodeM}).then( res =>{
					this.$msg.toast('密码重置成功','/pages/pass/login')
				})
			}
		},
		computed: {
			isLength: function () {
				if(this.passwordM.length >= 6) {
					return true
				}
				return false
			},
			isCode: function () {
				if(  this.isLength && this.vcodeM.length == 4 && this.phoneM.length == 11) {
					return true
				}
				return false
			}
 		},
		
	}
</script>

<style>
	.login {
		padding: 0 80upx 80upx;
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
		color: #a9a9a9;
		width: 172upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		height: 60upx;
		border-radius: 60upx;
		border: 2rpx solid #ffeb00;
	}
	.placeholder {
		color: #a9a9a9;
	}
	
	.login-btn {
		margin-top: 56upx;
		height: 88upx;
		border-radius: 88upx;
		line-height: 88upx;
		text-align: center;
		font-size: 32upx;
		color: #fff;
		/* background: linear-gradient(-45deg, #f33944, #ed0388); */
		background-color: #ffeb00;
		color: #000;
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
