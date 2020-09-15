<template>
	<view class="content">
		<view class="login_bar">
			<view class="status_bar"><!-- 状态栏占位 --></view>
			<view class="login_box">
				<view class="login_inp">
					<input class="phone input-placeholder" maxlength="6" type="text" v-model="sharpCode" placeholder="请输入邀请码" @input="chanGe">
					<image  @tap= "goScan" src="../../static/image/pass/saomiao.png" mode=""></image>
				</view>
				<view class="sharpUser" v-if="sharpCodeIn">
					<view class="img_bar">
						<image :src="avatar"></image>
					</view>
					<view class="userNmaeAdd">
						<view class="name">{{nickName}}</view>
						<view class="add"><text class="iconfont icon-shouhuodizhi iconsize">邀请您加入集享</text></view>
					</view>
				</view>
				<view class="submit_btn" :class="{active:sharpCodeIn}" @tap="submit">{{!sharpCodeIn?'请输入正确的邀请码':'下一步'}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				sharpCode:"",
				btntext:"请输入正确的邀请码",
				sharpCodeIn:false,
				nickName:"",
				avatar:"/static/img/taobao-icon.png",
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.sharpCode = ''
			let sharpCode = this.$storage.get('userCode') || ''
			console.log(this.$storage.get('userCode'))
			if(sharpCode && sharpCode.search(/inviterCode/) == -1) {
				this.$storage.remove('userCode')
				this.$msg.toast('请扫描集享用户的二维码')
				return
			}
			this.sharpCode =  sharpCode.split('inviterCode=')[1]
			this.chanGe()
			if(this.sharpCode) {
				this.$storage.remove('userCode')
			}
		},
		methods: {
			goBack(){
				uni.navigateBack();
				// uni.switchTab({
				// 	url: '/pages/tabBar/home/index'
				// });
			},
			chanGe(e){
				if(e) {
					this.sharpCode = e.detail.value
				}
				if(this.sharpCode.length==6){
					this.$http.post('/api/buyer/getInviterInfo',{inviterCode:this.sharpCode})
					.then(data =>{
						this.nickName = data.data.nickName
						if(data.data.avatar!=''){
							this.avatar = this.$common.qiniuCdnUrl(data.data.avatar)
						}
						this.sharpCodeIn = true
						return
					})
				}
				this.sharpCodeIn = false
			},
			submit(){
				if(!this.sharpCodeIn){
					return;
				}
				uni.navigateTo({
					url: '/pages/pass/reg?scode='+this.sharpCode
				});
			},
			goScan () {
				uni.navigateTo({
					url:'scanCode'
				})

			}

		}
	}
</script>，
<style>
.login_bar{background: #fff;padding: 20px;position: absolute;left:0;top:0;right:0;bottom:0;}
.login_bar{
	/*  #ifdef  APP-PLUS  */
	padding-top: calc(20px + var(--status-bar-height));
	/*  #endif  */
}
.login_box{margin-top: 20px;}

.login_box .login_inp{border-bottom: 1px solid #ccc;padding: 10px 0;display:flex; align-items: center; width: 100%;}
.login_box .login_inp image{ width: 42upx ; height: 42upx;}
.login_box .login_inp .phone{color: #000;height: 30px; width: 100%; font-size: 18px; padding: 0 10px; flex: 1;}
.login_box .login_inp .input-placeholder{font-size: 16px;}
.sharpUser{display:flex; border: 1px solid #ccc; padding:15px; border-top:none;align-items:center;justify-content:flex-start;}
.login_box .img_bar{margin: auto;width: 60px; height:60px;}
.login_box .img_bar image{width: 100%; height:100%;}

.login_box .userNmaeAdd{margin-left: 15px; flex:1;}
.login_box .userNmaeAdd .name{font-size: 18px; color:#525B6C; padding-bottom:5px;}
.login_box .userNmaeAdd .add{color:#888; }
.iconsize{font-size: 12px;}

.icon-shouhuodizhi:before{margin-right: 5px; font-size: 16px; color:#ec3f43;}
.login_box .tab_btn{font-size: 14px;margin-top: 20px;color: #555;}
.submit_btn{height: 88rpx; line-height: 88rpx; text-align: center; color:#333; font-size:32rpx; border-radius: 88rpx;background:#ccc;margin-top: 40px;}
.submit_btn.active{background: #FFEB00;}
</style>
