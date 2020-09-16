<template>
	<view class="edit">
		<view class="edit-box">
			<view class="label-text">
				旧密码
			</view>
			<input type="password" v-model="oldP" placeholder="请输入旧密码" placeholder-style="color:#e6e6e6"/>
		</view>
		<view class="edit-box">
			<view class="label-text">
				新密码
			</view>
			<input type="password" v-model="newP" placeholder="请输入新密码" placeholder-style="color:#e6e6e6"/>
		</view>
		<view class="edit-box" style="border-bottom: 2upx solid #e6e6e6;">
			<view class="label-text">
				确认密码
			</view>
			<input type="password" v-model="confirmP" placeholder="请再次输入新密码" placeholder-style="color:#e6e6e6"/>
		</view>
		<view class="comfirm" @tap="confirm">
			确认
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				oldP:'',
				newP:'',
				confirmP:'',
			}
		},
		methods:{
			confirm(){
				let {checkNull,checkLength,isChinese} = this.$checkForm
				if(!checkNull(this.oldP,'旧密码不能为空！')||!isChinese(this.oldP,'旧密码不支持中文！',true)){
					return
				}
				if(!checkNull(this.newP,'新密码不能为空！')||!isChinese(this.newP,'新密码不支持中文！',true)||!checkLength(this.newP,'6,20','新密码应为6-20位数字或字母')){
					return
				}
				if(!checkNull(this.newP,'请再次输入确认密码')){
					return
				}
				if(this.newP != this.confirmP) {
					this.$msg.toast('新密码不一致，请重新输入')
					return
				}
				this.$http.post('/api/buyer/doChangePwd',{oriPassword:this.oldP,newPassword:this.newP}).then( res =>{
					this.$msg.toast('密码修改成功')
					setTimeout( ()=> {
						this.$http.post('/api/buyer/doLogout')
						this.$store.commit('logout')
						uni.reLaunch({
							url: "/pages/user/index"
						})
					},1000)
				})
			}
		}
		
	}
</script>

<style>
	page {
		color: #333;
		font-size: 28upx;
		background-color: linear-gradient(#ffffff, #a9a9a9);
	}
	.edit-box {
		height: 92upx;
		display: flex;
		border-top: 2upx solid #e6e6e6;
		padding-left: 40upx;
		align-items: center;
	}
	.label-text {
		width: 160upx;
		
	}
	input {
		flex: 1;
		padding-left: 20upx;
		font-size: 28upx;
	}
	.comfirm{
		width: 596upx;
		color: #333;
		height: 88upx;
		background-color: #FFEB00;
		border-radius: 88upx;
		margin: 70upx auto 0;
		font-size: 32upx;
		text-align: center;
		line-height: 88upx;
	}
</style>
