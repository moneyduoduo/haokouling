<template>
	<view class="content">
		<view class="login_bar">
			<view class="status_bar"><!-- 状态栏占位 --></view>
			<view class="login_box">
				<view class="img_bar">
					<image src="../../static/img/taobao-icon.png"></image>
				</view>

				<view class="login">
					<view class="login_btn">
						<input class="phone input-placeholder" type="number" v-model="phoneM"  placeholder="请输入手机号">
					</view>
					<view class="login_btn">
						<input class="phone input-placeholder" type="text" v-model="vcodeM"  placeholder="请输入验证码">
						<text class="vcode" @tap="vcodetime">{{vcodetext}}</text>
					</view>
					<view class="login_btn">
						<input class="password input-placeholder" type="password" v-model="passwordM"  placeholder="请输入登录密码">
					</view>
					<view class="login_btn">
						<text class="sharpcode">{{scode}}</text>
					</view>
					<view :class="[isOk? 'on_submit_btn':'', 'submit_btn']" @tap="submit">注册</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				scode:'',
				phoneM:"",
				passwordM:"",
				vcodeM:"",
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
			 this.imei = this.$store.state.imei
			
		},
		onShow(){
			
		},
		methods: {
			goBack(){
				uni.navigateBack();
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
				let weixinData = this.$store.state.weixinOpenId
				console.log(weixinData)
				this.intervalMark = true
				//101买家手机号注册，102买家第三方注册，103买家手机短信登录，104买家重置密码，105买家绑定支付宝，201买家绑定银行卡，
				let event = '101'
				if(weixinData){
					event = '102'
				}
				let data = await this.$http.posts('/api/sms/doSend',{mobile:this.phoneM,event:event,app:'1',isRegister:'1',userType:1})
				
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
				if( this.phoneM.length == 11 && this.vcodeM.length == 4 && this.passwordM.length >=6) {
					return false
				}else {
					return true
				}
			}
		}
	}
</script>，
<style>
	@import "../../static/css/global.css";
.login_bar{background: #fff;padding: 20px;position: absolute;left:0;top:0;right:0;bottom:0;}
.login_bar{
	/*  #ifdef  APP-PLUS  */
	padding-top: calc(20px + var(--status-bar-height));
	/*  #endif  */
}
.login_box{margin-top: 0px;}
.login_box .img_bar{margin: auto;width: 80px; height:80px;}
.login_box .img_bar image{width: 100%; height:100%;}
.login_box .login{margin-top: 30px;}
.login_box .login_btn{border-bottom: 1px solid #ccc;padding: 10px 0;display: flex; height:50px;}
.login_box .login_btn .phone{color: #000;height: 30px; flex: 1;}
.login_box .login_btn .vcode{color: #999;padding-right: 10px;line-height: 30px; font-size: 16px;width: auto;}
.login_box .login_btn .sharpcode{line-height: 30px;font-size: 16px;}
.login_box .tab_btn{font-size: 14px;margin-top: 20px;color: #555;}
.submit_btn{height: 50px; line-height: 50px; text-align: center; color:#fff; font-size:16px; border-radius: 50px;background: linear-gradient(-45deg,#f33944, #ed0388);margin-top: 50px;} 
.on_submit_btn {
	background: #ff8da7 !important;
}
</style>
