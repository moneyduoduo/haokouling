<template>
	<view class="content">
		<view class="pass_bar">
			<view class="status_bar"><!-- 状态栏占位 --></view>
			<view class="pass_bg">
				<view class="img_bar">
					<image src="/static/img/pass/pass_bg.png"></image>
					<view class="cancel iconfont iconsize icon-close-x" @tap="goBack">
						<text></text>
					</view>
				</view>
				<view class="btn" @tap="goreg">注册</view>
				<view class="login_bar">
					<view class="login_btn" @tap="gologin">
						<text class="icon icon_phone"></text>
						<text class="btnTxte">手机登录</text>
					</view>
					<view class="login_btn">
						<text class="icon icon_weixin"></text>
						<text class="btnTxte" @tap="doThirdLogin">微信登录</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				openId:'',
				unionId:'',
				accessToken:'',
				imei:''
			}
		},
		onshow(){
			this.imei = this.$storage.get('imei')
		},
		onLoad() {
			this.imei = this.$storage.get('imei')
		},
		methods: {
			goBack(){
				uni.navigateBack();
				// uni.switchTab({
				// 	url: '/pages/tabBar/home/index'
				// });

			},
			gologin(){
				uni.navigateTo({
					url: '/pages/pass/login'
				});
			},
			async doThirdLogin(){
				let data = await this.weilogin()
				this.openId = data.openid
				this.unionId = data.unionid
				this.accessToken = data.access_token
				let obj = {type:'weixin',accessToken:this.accessToken,unionId:this.unionId,openId:this.openId,imei:this.imei}
				let res = await this.$http.post('/api/buyer/doThirdLogin',obj)
				console.log(JSON.stringify(res))
				res.data.buyerInfo.avatar = this.$common.qiniuCdnUrl(res.data.buyerInfo.avatar)
				this.$store.commit('login',res.data.buyerInfo)
				this.$store.commit('token',res.data.tokenInfo.token)
				uni.reLaunch({
					url: '/pages/user/index'
				});
			},
			weilogin(){
				let _this = this
				return new Promise(resolve=>{
					//#ifdef H5
					// h5测试
					let data = {"authResult":{"access_token":"26_ORusGu9kQ9vlPrsjDocRN1jYGQw-s-IvldMHHX05DDKtC9qjFJi0jgJhooLoK2cX2VmMB9wD2HH5sZ9hTGD3uiLWSP3ur-7sV9J35fuEUNk","expires_in":7200,"refresh_token":"26__VP6CAN8feGQWt-Au9_DQGyJx7BtZ0GPsP-pY0P9cq0WW8dsFppijDfmjTFqFLu5aok-snSgQzKgw0H0xLxARbmr8gfjz_nrai59vozX7fg","openid":"oCNCXwBAs6fw5U7tBXVcjSBRPJs8","scope":"snsapi_userinfo","unionid":"ok2bov2l8MrjtfWsflrVeqa12b8g"},"errMsg":"login:ok"}
					this.$store.commit('weixinOpenId',data.authResult)
					resolve(data.authResult)
					//测试ending
					//#endif
				// #ifdef APP-PLUS
                uni.login({
					provider: 'weixin',
                    success: (res) => {
                       console.log(JSON.stringify(res))
						this.$store.commit('weixinOpenId',res.authResult)
						resolve(res.authResult)
                    },
                    fail: (err) => {
						console.log(err)
                        uni.showToast({title:"微信登录授权失败"});
                    }
                })
				// #endif
			});
			},
			goreg(){
				uni.navigateTo({
					url: '/pages/pass/sharpCode'
				});
			}
			
		}
	}
</script>，
<style>
@import "../../static/css/global.css";
.pass_bar{background: #fff;padding: 20px;position: absolute;left:0;top:0;right:0;bottom:0;}
.pass_bar{
	/*  #ifdef  APP-PLUS  */
	padding-top: calc(20px + var(--status-bar-height));
	/*  #endif  */
}
.img_bar{padding: 10px;position: relative; width: 300px; height:312px;margin: auto;}
.img_bar image{width: 100%; height:100%;}
.img_bar .cancel{width: 30px; height:30px;position:absolute;top:0px;right:0;border: 1px solid #525b6c;border-radius: 30px;text-align: center;}

.iconsize{font-size: 25px;color:#525b6c ;}
.btn{height: 50px; line-height: 50px; text-align: center; color:#fff; font-size:18px; border-radius: 30px;background: linear-gradient(-45deg,#f33944, #ed0388);margin-top: 40px; } 
.login_bar{margin-top:40px;display: flex;justify-content:space-between;}
.login_bar .login_btn{background: #f2f2f2; width:45%; border-radius: 30px;height: 50px;display: flex;justify-content: flex-start;}
.login_bar .login_btn .icon{width: 40px; height:40px; margin:5px 15px 0 5px ;border-radius: 40px;}
.login_bar .login_btn .icon_phone{background-image: url(../../static/img/sharemenu/phone.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;}
.login_bar .login_btn .icon_weixin{background-image: url(../../static/img/sharemenu/wechat_friend.png);background-repeat: no-repeat;
    background-size: 100% 100%;}
.login_bar .login_btn .btnTxte{line-height: 50px; font-size: 16px;text-align: center;}
</style>
