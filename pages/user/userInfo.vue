<template>
	<view>
		<!-- <ytHeader title="个人中心" bgcolor="#ffeb00" txtcolor="#333" returnimg="../../static/img/fanhui_black.png"></ytHeader> -->
		<view class="yj-content yj-mainH" style="padding-top: 0;">
			
			<view class="yj-pad">
				<view class="grace-list grace-bg-white grace-common-mt">
				
					<view class='items '>
						<view class="title">头像<text style='margin-right:35px;'></text></view>
						<view class="headimgurl">
							<image @tap="changeAvatar" :src="user.avatar||'/static/img/taobao-icon.png'"></image>
						</view>
					</view>
				
				</view>
				
				<!-- 昵称 -->
				<view class="grace-list grace-bg-white grace-common-mt">
					<view class='items '>
						<view class="title">昵称<text style='margin-right:2%; '>{{user.nickName||'集享'}}</text></view>
					</view>
				</view>
				<!-- 微信号 -->
				<view class="grace-list grace-bg-white grace-common-mt">
					<view class='items'>
						<view class='items'>
							<view class="title">淘宝绑定
								<text v-if="taobaoNick">{{taobaoNick}}</text>
								<text  v-else  @click="bindTaobaoFn">未绑定</text>
							</view>
						</view>
					</view>
				</view>
				<view class="grace-list grace-bg-white grace-common-mt">
					<view class='items'>
						<view class="title">手机号<text>{{user.mobile}}</text></view>
					</view>
				</view>
				
				<!-- 微信授权 -->
				<view class="grace-list grace-bg-white grace-common-mt">
					<view class='items'>
						<view class="title" v-if="wechatAutho">微信绑定<text>已绑定</text></view>
						<view class="title"  @click="doThirdLogin" v-else>微信绑定<text >马上绑定</text></view>
					</view>
				</view>
				<view class="grace-list grace-bg-white grace-common-mt">
					<view class='items'>
						<view class="title">修改手机号<text   @tap="changeTel">点击修改</text></view>
					</view>
				</view>
				
				<!-- 修改密码 -->
				<view class="grace-list grace-bg-white grace-common-mt">
					<view class='items'>
						<view class="title"  >修改密码<text  @tap="changePassoword">点击修改</text></view>
					</view>
				</view>
				
				<view style="width:80%; margin-top:100upx; margin-left: 10%; height: 88rpx;" @click="outLogin">
					<view style="width:100%; text-align: center;line-height: 88rpx; font-size: 32rpx; border: none; background:#ffeb00; height: 88rpx;  border:0;color:#333;border-radius: 88upx;">退出登录</view>
				</view>
			</view>

		</view>
		

	</view>
</template>
<script>
	import ytHeader from '../../components/header.vue';
	export default {
		data() {
			return {
				userData: [], //个人信息
				uid: '',
				type: '',
				showName: false,
				joinCode: '',
				wechatAutho:false,
				returnStep:1,
				user:'',
				src: '',
				changeInfoType:1,
				placeholderTxt:'请填写要修改的昵称',
				taobaoNick:''
			}
		},
		components: {
			ytHeader
		},
		onLoad:function(option) {
			
		},
		onShow(){
			this.user = this.$storage.get('userInfo')
			this.userData = this.$store.state.jxUserInfo
			this.taobaoNick = this.userData.buyerInfo.taobaoUserNick
			if(this.userData.buyerInfo.isBindWeixin==1){
				this.wechatAutho = true
			}
			console.log('is show setPage')
		},
		methods: {
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const fileUrl =  res.tempFilePaths[0]
						const option = {}
						option.event = 1
						option.num = 1
						option.app = 1
						this.$http.posts('/api/common/getQiniuToken',option).then( data => {
							uni.uploadFile({
								url:data.data.uploadPath,
								name: 'file',
								filePath:fileUrl,
								formData: {
									token: data.data.token,
									// key: fileUrl.substr(1)//去掉第一个‘/’
								},
								success: (res) => {
									let avatar = JSON.parse(res.data).data.url
									this.$http.post('/api/buyer/doUpdateAvatar',{avatar}).then( res => {
										this.$msg.toast(res.msg)
										this.user.avatar = this.$common.qiniuCdnUrl(avatar)
										this.$storage.set('userInfo',this.user)
										this.$store.commit('login',this.user)
									})
								}
							})
						})
					}
				})
			},
			changePassoword() {
				uni.navigateTo({
					url:"../pass/editPassword"
				})
			},
			changeTel(){
				uni.navigateTo({
					url:"../pass/changeTel"
				})
			},
			weilogin(){
				let _this = this
				// #ifdef APP-PLUS
					return new Promise(resolve=>{
			                uni.login({
							provider: 'weixin',
			                    success: (res) => {
								//this.$store.commit('weixinOpenId',res.authResult)
								resolve(res.authResult)
			                    },
			                    fail: (err) => {
								console.log(err)
								_this.$msg.toast('微信登录授权失败')
			                    }
			                })
						
					});
				// #endif
				},
			async doThirdLogin(){ //微信授权
				if(this.userData.buyerInfo.isBindWeixin==1){
					return
				}
				let data = await this.weilogin()
				
				let userInfo = this.$store.state.userInfo
				let jxUserInfo = this.$store.state.jxUserInfo
				let obj = {accessToken:data.access_token,unionId:data.unionid,openId:data.openid}
				let res = await this.$http.post('/api/buyer/doBindWeiXin',obj)
				console.log(JSON.stringify(res))
				let avatar = this.$common.qiniuCdnUrl(res.data.avatar)
				let nickName = res.data.nickName
				userInfo.avatar = avatar
				userInfo.nickName = nickName
				jxUserInfo.buyerInfo.avatar = avatar
				jxUserInfo.buyerInfo.nickName = nickName
				jxUserInfo.buyerInfo.isBindWeixin = 1
				this.wechatAutho = true
				this.$store.commit('jxUserInfo',jxUserInfo)
				this.$store.commit('login',userInfo)
				this.$msg.toast('绑定成功!')
				console.log(JSON.stringify(res))
			},
			bindTaobaoFn(){ //绑定淘宝授权
				this.$bindSystem.checkBindTaoBao()
			},
			
			showModalinfo() {
				this.show = true;
			},
			
			back: function() {
				uni.navigateBack({
					delta:this.returnStep
				});
			},
		async loginOut() {
				let clientId = this.$store.state.jxUserInfo.buyerInfo.id.toString()
				let data = await this.$http.post('/api/buyer/doLogout')
				this.$bindSystem.unbindAlias(clientId)
				this.$store.commit('logout')
				uni.reLaunch({
					url: "/pages/user/index"
				})
				
			},
			outLogin(){
				let obj = {title:'提示',content:'确定要退出登录？'}
				this.$msg.confirm(obj,()=>{
					this.loginOut();
				})
			},
			
			goReset() {
				uni.navigateTo({
					url:"/pages/pass/reset"
				})
			}


		}
	}
</script>
<style lang="less">
	@import "../../static/css/mycss.less";
	@import "../../graceUI/graceUI.css";
	.yt-none{
		display: none;
	}
	page{
		background-color: #fff;
	}
	/* 普通列表 */
	.grace-list {
		width: 100%;
		border-bottom: 1px solid #eee;
		background: #FFF;
		padding: 5px 0;
	}

	.grace-list .items {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		position: relative;
	}

	.grace-list .items .icons {
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		margin: 18px 0 15px 15px;
		flex-shrink: 0;
		overflow: hidden;
		font-size: 0;
	}

	.grace-list .items .icons image {
		width: 20px;
		height: 20px;
	}

	.grace-list .items .title {
		width: 100%;
		padding: 18upx 30upx 18upx 0;
		font-size: 32upx;
		height: 40upx;
		flex: 1;
		line-height: 40upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.grace-list .title text {
		font-size: 28upx;
		color: #B2B2B2;
		
		float: right;
	}

	.grace-list>.items:last-child .title {
		border: none !important;
	}

	.grace-list .items .arrow-right {
		font-family: "grace-iconfont" !important;
		font-size: 36rpx;
		font-style: normal;
		height: 56px;
		line-height: 56px;
		text-align: center;
		width: 30px;
		position: absolute;
		z-index: 1;
		right: 0;
		top: 0;
	}

	.grace-list .items .arrow-right:before {
		content: "\e601";
		color: #B2B2B2;
	}

	.grace-list .items .icon-r {
		position: absolute;
		z-index: 1;
		right: 35px;
		top: 0px;
	}

	.headimgurl {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 5%;
		border: 1px solid #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;	
	}
	.headimgurl  image {
		width: 100%;
		height: 100%;
	}
	.uni-list-item {
		width: 200upx;
		text-align: center;
		line-height: 80upx;
		border-bottom: 1px #f5f5f5 solid;
	}

	.uni-list-item:last-child {
		border: none;
	}

	.content {
		padding: 60upx 0;
		text-align: center;
	}

	.fixed-box {
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 100;
		width: 100%;
		bottom: 0;
		background-color: #000;
		z-index: 999;
		display: flex;
		flex-direction: column;

		.main {
			flex: 1;
			position: relative;
			overflow: hidden;
			width: 100%;
			height: 100%;
			.img-box {
				overflow: hidden;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				z-index: 10;

				.drag {
					background-color: rgba(255,0,0,.4);
					position: absolute;
					left: 0;
					top: 0;
					z-index: 20;
				}
			}
		}

		.btn-group {
			height: 40px;
			z-index: 8888;
			color: #fff;
			width: 100%;
			display: flex;
			background-color: #f00;

			.btn {
				flex: 1;
				line-height: 40px;
				font-size: 32upx;
			}

			.cancel {
				background-color: #fff;
				color: #f00;
			}
		}
	}

	.cut-img {
		margin: 40upx auto;

		image {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	canvas {
		display: block;
	}

	.input {
		text-align: center;
		border-bottom: 1px solid #eee;
	}
</style>
