<template>
	<view class="content">
		<view class="login_bar">
			<view class="status_bar"><!-- 状态栏占位 --></view>
			<view class="login_box">
				<view class="img_bar">
					<image src="/static/img/taobao-icon.png"></image>
				</view>

				<view class="login">
					<view class="login_btn">
						<input class="phone input-placeholder" type="number" v-model="phoneM" placeholder="请输入手机号">
					</view>
					<view class="login_btn" v-if="!type">
						<input class="password input-placeholder" type="password" v-model="passwordM" placeholder="请输入登录密码">
					</view>
					<view class="login_btn" v-if="type">
						<input class="phone input-placeholder" type="text" v-model="vcodeM" placeholder="请输入验证吗">
						<text class="vcode" @tap="vcodetime">{{vcodetext}}</text>
					</view>
					<view class="tab_btn" @tap="tabBtnFn">{{tabBtn}}</view>
					<view :class="[isOk? 'on_submit_btn':'', 'submit_btn']" @tap="submit">登录</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				type:false, // false 密码登录 ，true 验证码登录
				phoneM:"",
				passwordM:"",
				vcodeM:"",
				vcodetext:"获取验证码",
				tabBtn:"验证码登录",
				time:60,
				intervalMark:false, // 多次点击
				imei:'',
				backUrl:''
			}
		},
		onLoad(options) {
			this.imei = this.$store.state.imei
			if(options.back){
				this.backUrl = options.back
			}
			console.log(JSON.stringify(this.backUrl))
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
				this.intervalMark = true
				let data = await this.$http.posts('/api/sms/doSend',{mobile:this.phoneM,event:'103',app:1,isRegister:0,userType:1})
				
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
				console.log(JSON.stringify(options))
				let data = await this.$http.post('/api/buyer/doLogin',options)
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
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/pass/sharpCode'
			});
		},
		computed: {
			isOk: function () {
				if( this.phoneM.length == 11 && !this.type && this.passwordM.length >=6) {
					return false
				}else if ( this.phoneM.length == 11 && this.type && this.vcodeM.length ==4){
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
	padding-top: calc(0px + var(--status-bar-height));
	/*  #endif  */
}
.login_box .img_bar{margin: auto;width: 80px; height:80px;}
.login_box .img_bar image{width: 100%; height:100%;}
.login_box .login{margin-top: 30px;}
.login_box .login_btn{border-bottom: 1px solid #ccc;padding: 10px 0;display:flex;}
.login_box .login_btn .phone{color: #000;height: 30px; flex: 1;}
.login_box .login_btn .vcode{color: #999;padding-right: 10px;line-height: 30px;font-size: 16px; width: auto;}
.login_box .tab_btn{font-size: 14px;margin-top: 20px;color: #555;}
.submit_btn{height: 50px; line-height: 50px; text-align: center; color:#fff; font-size:18px; border-radius: 50px;background: linear-gradient(-45deg,#f33944, #ed0388);margin-top: 40px;} 
.on_submit_btn {
	background: #ff8da7 !important;
}

</style>
