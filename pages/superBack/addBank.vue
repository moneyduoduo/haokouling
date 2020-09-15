<template>
	<view class="page-content">
		<top-bar title="编辑银行信息" bgClass="orange"></top-bar>
		<view class="notice pd20 bg1 row" v-if="bankRefuseReason">
			<text class="iconfont icon-info ce f40"></text>
			<view class="notice ml10 h80 ce">{{bankRefuseReason}}</view>
		</view>
		
		<view class="bank_bar">
			<view class="bank_box">
				<view class="bank">
					<view class="bank_btn">
						<view class="title">姓名</view>
						<view class="input_box">
							<input class="input" type="text" maxlength="4" v-model="form.realName" placeholder="请输入姓名">
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">卡号</view>
						<view class="input_box">
							<input class="input" type="number" v-model="form.bankAccount" placeholder="请输入银行卡号" @input="chanGe">
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">银行</view>
						<view class="input_box"  @tap="showBankPicker">
							<input class="input" type="text" v-model="form.bankName" placeholder="请选择银行" disabled>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">银行地区</view>
						<view class="input_box"  @tap="showBankCityPicker">
							<input class="input" type="text" v-model="address" placeholder="请选择银行地区" disabled>
						</view>
					</view>
					<view class="row middle" style="height:100rpx;line-height:100rpx;border-bottom: 1px solid #ccc;">
						<view class="title" style="width:250rpx;">开户行</view>
						<view class="ellipsis2 c0" style="width:500rpx;line-height:50rpx;text-align: right;" @tap="showBranchPicker">
							<text v-if="!form.branchName" class="c7">请选择开户行</text>
							<text class="tr" v-else>{{form.branchName}}</text>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">手机号</view>
						<view class="input_box">
							<view class="text">{{form.mobile}}</view>
						</view>
					</view>
					<view class="bank_btn row middle between">
						<view class="title">验证码</view>
						<view class="input_box">
							<input class="input" type="text" v-model="form.verifyCode" placeholder="请输入验证码">
						</view>
						<count-down-sms :option="{event:201,app:2,is_register:0}"></count-down-sms>
					</view>
					<view class="submit_btn" @tap="submit">提交</view>
				</view>
			</view>
		</view>
		<w-picker mode="selector" :defaultVal="[3]" @confirm="onConfirmBank" ref="selector" :selectList="bankList"></w-picker>
		<w-picker mode="region" @confirm="onConfirmCity" ref="region"></w-picker>
	</view>
</template>
<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import countDownSms from "@/components/superBack/countDownSms.vue";
	import bankCheck from '@/common/bankCheck.js';
	export default {
		data() {
			return {
				bankRefuseReason:'',
				bankList: [],
				branchList:[],
				isAction:false,
				address:'',
				form:{
					realName:'',
					bankName:'',
					branchName:'',
					bankAccount:'',
					verifyCode:'',
					address:'',
					lhh:'',
					keyword:'',
					mobile:'',
				},
				themeColor: '#fd2f53',
			}
		},
		components: {
			wPicker,countDownSms
		},
		onLoad:function() {
			if(this.$storage.get('cjfOtherConfig').bankStatus>-1){
				this.bankRefuseReason = this.$storage.get('cjfOtherConfig').bankRefuseReason;
			}
			//读取手机号和淘宝账号
			this.form.mobile = this.$storage.get('jxUserInfo').buyerInfo.mobile;
			//读取银行列表
			let cjfBankList = this.$storage.get('cjfConfig').cjfBankList;
			for(var index in cjfBankList){
				let temp = {};
				temp.label = cjfBankList[index];
				this.bankList.push(temp);
			}
			this.$storage.remove('lhh');
			this.$storage.remove('khh');
			if(this.$storage.get('cjfOtherConfig')['bankStatus']>0){
				this.$http.posts('/api/account/getBankInfo')
				.then(res=>{
					this.form = res.data;
					if(res.data.province){
						this.address = res.data.province+','+res.data.city+','+res.data.county;
					}	
				})
			}
		},
		onShow:function(){
			let th = this;
			if(this.$storage.get('lhh')){
				this.form.lhh = this.$storage.get('lhh')?this.$storage.get('lhh'):'';
			}
			if(this.$storage.get('khh')){
				this.form.branchName = this.$storage.get('khh')?this.$storage.get('khh'):'';
			}
		},
		methods: {
			showBankCityPicker() {
				this.$refs.region.show();
			},
			showBankPicker() {
				this.$refs.selector.show()
			},
			showBranchPicker() {
				if(!this.form.bankName){
					return this.$msg.toast('请先选择银行');
				}
				if(!this.address){
					return this.$msg.toast('请先选择地区');
				}
				return uni.navigateTo({
					url:'/pages/superBack/branchList?bankName='+this.form.bankName+'&address='+this.address
				})
			},
			onConfirmBank(e) {
				this.form.bankName = e.result;
			},
			onConfirmCity(o) {
				let address = o.checkArr.join(',');
				if(this.address == address){
					return;
				}
				this.address = address;
				this.form.branchName = '';
			},
			submit(){
				if(this.isAction){
					return;
				}
				if(this.form.realName.length<2){
					return this.$msg.toast('请输入正确的姓名');
				}
				if(this.form.bankAccount.length<10){
					return this.$msg.toast('请输入正确的银行卡号');
				}
				if(!this.form.bankName){
					return this.$msg.toast('请选择银行');
				}
				if(!this.address){
					return this.$msg.toast('请选择银行地区');
				}
				if(!this.form.branchName){
					return this.$msg.toast('请选择开户行');
				}
				if(!this.form.verifyCode){
					return this.$msg.toast('请输入验证码');
				}
				let address = this.address.split(',');
				this.form.province = address[0];
				this.form.city = address[1];
				this.form.county = address[2];
				this.isAction = true;
				this.$http.posts("/api/account/doBindBank",this.form)
				.then(res=>{
					this.isAction = false;
					if(res.status == 1){
						this.$storage.remove('khh');
						this.$storage.remove('lhh');
						let otherConfig = this.$storage.get('cjfOtherConfig');
						otherConfig.bankStatus = 1;
						this.$storage.set('cjfOtherConfig',otherConfig);
						this.$msg.toast(res.msg,'back');
					}
				}).catch((res)=>{
					this.isAction = false;
				})	
			}
		}
	}
</script>
<style>
@import "../../static/css/global.css";
/* 顶部 */
.bank_bar{padding:0 20rpx;}
.bank_box .img_bar{margin: auto;width: 160rpx; height:160rpx;}
.bank_box .img_bar image{width: 100%; height:100%;}
.bank_box .bank_btn{border-bottom: 1px solid #ccc;display: flex;justify-content: space-between; align-items: center;height:100rpx;}
.bank_box .bank_btn .title{color: #000;width: auto;}
.bank_box .bank_btn .input_box{flex: 1;}
.bank_box .bank_btn .input_box input,.bank_box .bank_btn .input_box .text{text-align: right; font-size: 28rpx;}

.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#fff; font-size:36rpx; border-radius:60rpx;background: linear-gradient(-45deg,#f33944, #ed0388);margin-top: 80rpx;}

.bank_info{position: relative; padding: 0 40rpx;}
.bank_info .mark{background: #000; position: absolute; height: 60rpx; opacity: 0.7; border-radius: 16rpx; left:0;top:0;}
.bank_info .text{color:#fff; line-height: 60rpx;position: absolute;text-align: center; left:0;top:0}
</style>
