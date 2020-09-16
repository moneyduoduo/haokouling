<template>
	<view class="page_content">
		<top-bar title="编辑账号信息" bgClass="orange"></top-bar>
		<view class="notice pd20 bg1 row" v-if="refuseReason">
			<text class="iconfont icon-info ce f40"></text>
			<view class="notice ml10 h80 ce">{{refuseReason}}</view>
		</view>
		
		<view class="main_tilte">账号信息</view>
		<view class="user_bar">
			<view class="user_box">
				<view class="user">
					<view class="user_btn">
						<view class="title">请选择性别</view>
						<view class="input_box">
							<radio-group @change="changeSex" class="row right">
								<label :class="[{active:item.checked},'btn']" v-for="(item,index) in sexData" :key="index"><radio :value="item.value" :checked="item.checked"/>
									{{item.label}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">收货地区</view>
						<view class="input_box" @tap="showCityPicker">
							<input class="input" type="text" v-model="form.address" placeholder="请选择收货地区" disabled>
						</view>
					</view>
					<view class="user_btn noborder">
						<view class="title">出生日期</view>
						<view class="input_box" @tap="showTimePicker">
							<input class="input" type="text" v-model="form.birth" placeholder="请选择出生日期" disabled>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main_tilte">淘宝账号信息</view>
		<view class="user_bar">
			<view class="user_box">
				<view class="user">
					<view class="user_btn">
						<view class="title">淘宝账号</view>
						<view class="input_box">
							<view class="text">{{taobaoUserNick}}</view>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">常购类目</view>
						<view class="input_box" @tap="showCategory">
							<input class="input" type="text" v-model="form.category" placeholder="请选择3个常购类目" disabled>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">开通花呗</view>
						<view class="input_box">
							<radio-group @change="changeIsHuaBei" class="row right">
								<label :class="[{active:item.checked},'btn']" v-for="(item,index) in isHuaBeiData" :key="index"><radio :value="item.value" :checked="item.checked"/>
									{{item.label}}
								</label>
							</radio-group>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">淘气值</view>
						<view class="input_box">
							<input class="input" type="number" maxlength="6" v-model="form.taobaoScore" placeholder="请输入淘气值">
						</view>
					</view>
					<view class="user_btn noborder">
						<view class="title">信誉等级</view>
						<view class="input_box" @tap="showGradePicker">
							<input class="input" type="text" v-model="creditGradeText" placeholder="请选择等级" disabled>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="main_tilte">联系信息</view>
		<view class="user_bar">
			<view class="user_box">
				<view class="user">
					<view class="user_btn">
						<view class="title">手机号</view>
						<view class="input_box">
							<view class="text">{{mobile}}</view>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">联系QQ</view>
						<view class="input_box">
							<input class="input" type="number" v-model="form.qq" placeholder="请输入联系QQ">
						</view>
					</view>
					<view class="user_btn">
						<view class="title">联系微信</view>
						<view class="input_box">
							<input class="input" type="text" v-model="form.weixin" placeholder="请输入联系微信">
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="submit_box"><view class="submit_btn" @tap="submit">提交</view></view>
		
		<graceBottomDialog :show="showcategory" :closeDialog="closeCategory">
			<view slot="btns">
				<view class="grace-btdialog-btns row between h80 middle bb pd20">
					<text @tap="closeCategory">取消</text>
					<!-- <view class="title">请选择三个常购类目</view> -->
					<text style="color:#fd2f53;" @tap="confirmCategory">确定</text>
				</view>
			</view>
			<view slot="content">
				<view class="grace-select-tags" style="background:#F8F8F8;">
					<checkbox-group @change="creditGradeChange">
						<label v-for="(item, index) in categoryData" :key="index" :class="[item.checked ? 'grace-checked' : '']">
							<checkbox :value="item.value" :checked="item.checked" :disabled="item.disabled"></checkbox> {{item.value}}
						</label>
					</checkbox-group>
				</view>
			</view>
		</graceBottomDialog>
		<w-picker mode="region" @confirm="onConfirmCity" ref="region"></w-picker>
		<w-picker mode="date" :defaultVal="[30,0,0]" :current="false" @confirm="onConfirmBirth" ref="date"></w-picker>
		<w-picker mode="selector" :defaultVal="[1]" @confirm="onConfirmGrade" ref="selector" :selectList="creditGradeData"></w-picker>
	</view>
</template>
<script>
	import graceBottomDialog from '@/components/graceBottomDialog.vue';
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		data() {
			return {
				refuseReason:'',
				showcategory : false,
				categoryData: [],
				creditGradeData:[],
				isAction:false,
				sexData:[
					{value:'1', label:'男', checked: false},
					{value:'2', label:'女', checked: false}],
				isHuaBeiData:[
					{value:'1', label:'是', checked: false},
					{value:'0', label:'否', checked: false}],
				creditGradeText:'',
				themeColor: '#fd2f53',
				mobile:'',
				taobaoUserNick:'',
				form:{
					sex:'',
					address:'',
					birth:'',
					category:'',
					isHuabei:'',
					taobaoScore:'',
					creditGrade:'',
					qq:'',
					weixin:''
				}
			}
		},
		components: {
			graceBottomDialog,wPicker
		},
		onLoad: function(e) {
			this.getData();
		},
		methods: {
			async getData(){
				this.refuseReason = this.$storage.get('cjfOtherConfig').refuseReason;
				//读取手机号和淘宝账号
				this.mobile = this.$storage.get('jxUserInfo').buyerInfo.mobile;
				this.taobaoUserNick = this.$storage.get('jxUserInfo').buyerInfo.taobaoUserNick;
				//读取常购类目配置
				let cjfOrderCategory = this.$storage.get('cjfConfig').cjfOrderCategory;
				//读取信誉等级
				let cjfGrade= this.$storage.get('cjfConfig').cjfGrade;
				for(var index in cjfGrade){
					let temp = {};
					temp.value = index;
					temp.label = cjfGrade[index];
					this.creditGradeData.push(temp);
				}
				if(!this.$storage.get('cjfUserInfo')){
					let data = await this.$http.posts('/api/buyer/getIndex');
					this.$storage.set('cjfUserInfo',data.data);
				}
				
				let buyerInfo = this.$storage.get('cjfUserInfo').buyerInfo;
				let buyerDetailInfo = this.$storage.get('cjfUserInfo').buyerDetailInfo;
				this.form.sex = buyerInfo.sex;
				if(buyerInfo.sex == 1){
					this.sexData[0].checked = true;
				}else if(buyerInfo.sex == 2){
					this.sexData[1].checked = true;
				}
				this.form.birth = buyerInfo.birth;
				if(buyerDetailInfo.receiveProvince){
					this.form.address = buyerDetailInfo.receiveProvince+','+buyerDetailInfo.receiveCity+','+buyerDetailInfo.receiveCounty;
				}
				let tempStr = ','+buyerDetailInfo.buyCate+',';
				let tempCategory = [];
				for(var index in cjfOrderCategory){
					let temp = {};
					temp.index = index;
					temp.value = cjfOrderCategory[index];
					temp.checked = false;
					if(tempStr.indexOf(','+index+',') != -1){
						temp.checked = true;
						tempCategory.push(temp.value);
					}
					this.categoryData.push(temp);
				}
				if(tempCategory.length > 2){
					this.form.category = tempCategory.join(',');
				}
				this.form.isHuabei = buyerDetailInfo.isHuabei;
				if(buyerDetailInfo.isHuabei === 1){
					this.isHuaBeiData[0].checked = true;
				}else if(buyerDetailInfo.isHuabei === 0){
					this.isHuaBeiData[1].checked = true;
				}
				this.form.taobaoScore = buyerDetailInfo.taobaoScore;
				this.creditGradeText = this.creditGradeData[buyerDetailInfo.creditGrade-1].label;
				this.form.qq = buyerInfo.qq;
				this.form.weixin = buyerInfo.weixin;
			},
			goBack(){
				uni.navigateBack();
			},
			changeSex(e){
				let values = e.detail.value;
				this.sexData.forEach((v,i)=>{
					if(values.includes(v.value)){
						v.checked = true ;
						this.form.sex = v.value;
					}else{
						v.checked = false ;
					}
				})
				
			},
			changeIsHuaBei(e){
				let values = e.detail.value;
				this.isHuaBeiData.forEach((v,i)=>{
					if(values.includes(v.value)){
						v.checked = true ;
						this.form.isHuabei = v.value;
					}else{
						v.checked = false ;
					}
				})
			},
			showCategory(){
				this.showcategory = true;
			},
			closeCategory(){
				this.showcategory = false;
				this.categoryData.forEach((v,i)=>{
					v.checked = false
				})
			},
			confirmCategory(){
				this.showcategory = false;
			},
			creditGradeChange(e) { 
				let values = e.detail.value;
				if(values.length>=3){
					this.categoryData.forEach((v,i)=>{
						if(values.includes(v.value)){
							this.$set(this.categoryData[i],'disabled',false)
							if(values.length==3){v.checked = true ;}
						}else{
							this.$set(this.categoryData[i],'disabled',true)
						}
					})
				}else{
					this.categoryData.forEach((v,i)=>{
						this.$set(this.categoryData[i],'disabled',false)
						if(values.includes(v.value)){
							v.checked = true ;
						}else{
							v.checked = false ;
						}
					})
				}
				this.form.category = values.join(',');
			},
			showCityPicker() {
				this.$refs.region.show()
			},
			onConfirmCity(e) {
				this.form.address = e.checkArr.join(',')
			},
			onConfirmBirth(e){
				this.form.birth = e.result
			},
			showTimePicker() {
				this.$refs.date.show()
			},
			showGradePicker() {
				this.$refs.selector.show()
			},
			onConfirmGrade(e){
				this.creditGradeText =  e.result;
			},
			submit(){
				let th = this;
				if(this.isAction){
					return false;
				}
				if(!this.form.sex){
					return this.$msg.toast('请选择性别');
				}
				if(!this.form.address){
					return this.$msg.toast('请选择收货地区');
				}
				if(!this.form.birth){
					return this.$msg.toast('请选择出生日期');
				}
				if(!this.form.category){
					return this.$msg.toast('请选择3个常购类目');
				}
				if(this.form.category.split(',').length<3){
					return this.$msg.toast('请选择3个常购类目');
				}
				console.log(this.form);
				if(this.form.isHuabei === ''){
					return this.$msg.toast('请选择是否开通花呗');
				}
				if(this.form.taobaoScore == ''){
					return this.$msg.toast('请输入淘气值');
				}
				if(!this.creditGradeText){
					return this.$msg.toast('请选择等级');
				}
				if(this.form.qq == '' && this.form.weixin == ''){
					return this.$msg.toast('QQ和微信必须填写一项');
				}
				
				let address = this.form.address.split(',');
				this.form.receiveProvince = address[0];
				this.form.receiveCity = address[1];
				this.form.receiveCounty = address[2];
				
				let buyCateArr = [];
				this.form.category.split(',').map(function(a){
					th.categoryData.map(function(b){
						if(a == b.value){
							buyCateArr.push(b.index);
						}
					})
				})
				this.form.buyCate = buyCateArr.join(',');
				
				this.creditGradeData.map(function(a){
					if(th.creditGradeText == a.label){
						th.form.creditGrade = a.value;
					}
				})
				this.isAction = true;
				this.$http.post('/api/buyer/doUpdateInfo',this.form)
				.then(res =>{
					this.isAction = false;
					if(res.status == 1){
						th.$msg.toast(res.msg,'/pages/superBack/home');
					}
				}).catch((e)=>{
					this.isAction = false;
				});
			}
		}
	}
</script>，
<style>
@import "../../static/css/global.css";
/* 顶部 */
.user_bar{background: #fff;padding:0 40rpx;}
.user_box .img_bar{margin: auto;width: 160rpx; height:160rpx;}
.user_box .img_bar image{width: 100%; height:100%;}
.user_box .user_btn{border-bottom: 1px solid #ccc;padding: 20rpx 0;display: flex;align-items: center;height:100rpx;}
.user_box .user_btn .title{color: #000;width: auto;}
.user_box .user_btn .input_box{flex: 1;}
.user_box .user_btn .input_box input,.user_box .user_btn .input_box .text{text-align: right; font-size: 28rpx; width: 100%;}
.user_box .user_btn .vcode{width: auto; margin-left: 30rpx; background: linear-gradient(-45deg,#f33944, #ed0388); padding: 10rpx 20rpx; color:#fff;border-radius: 30rpx;}
.user_box .user_btn.noborder{border:none;}
.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#fff; font-size:36rpx; border-radius:60rpx;background: linear-gradient(-45deg,#f33944, #ed0388);} 
.main_tilte{height:80rpx;line-height: 80rpx;  font-size: 32rpx; padding-left: 40rpx;background:#eee;font-weight:bold;}
.user_toast{padding: 20rpx 40rpx; height:100rpx; background: #fff;}
.user_info{position: relative;}
.user_info .mark{background: #000; position: absolute; height: 60rpx; opacity: 0.7; border-radius: 16rpx; left:0;top:0;}
.user_info .text{color:#fff; line-height: 60rpx;position: absolute;text-align: center; left:0;top:0}
.submit_box{padding: 40rpx;}

.user_box .input_box{display: flex;justify-content: flex-end; align-items: center;}
.user_box .input_box .btn{width: 100rpx; height:60rpx;line-height: 60rpx; border-radius: 60rpx;text-align: center;margin-left: 20rpx; border:1px solid #e1e1e1;color:#888; display:block;}
.user_box .input_box uni-radio-group{display: flex;justify-content: center;align-items: center;}
.user_box .input_box .btn.active{ background: #fd2f53;color:#fff; border:1px solid #fd2f53;}
.user_box .input_box  label checkbox, .user_box .input_box label radio{display:none;}
/* 多选 */
.grace-btdialog-btns{width: auto;height:100rpx;}
.grace-btdialog-btns .title{flex: 1;text-align: center; color:#000;}
.grace-select-tags uni-radio-group{justify-content: center;align-items: center;}
.grace-select-tags{padding:30rpx;}
.grace-select-tags checkbox-group, .grace-select-tags radio-group{width:100%; display:flex; flex-wrap:wrap;}
.grace-select-tags label{display:block; width:31.3%; overflow:hidden; padding:5px; text-align:center; height:80rpx; line-height:60rpx; margin:6px 1%; background:#FFFFFF; font-size:26rpx; border-radius:8rpx;}
.grace-select-tags label checkbox, .grace-select-tags label radio{display:none;}
.grace-checked{background: linear-gradient(-45deg,#f33944, #ed0388) !important; color:#FFFFFF;}

</style>
