<template>
	<view>
		<top-bar title="发起申诉" bgClass="orange"></top-bar>
		<view class="complaint_bar">
			<view class="complaint_box">
				<view class="complaint_input row middle">
					<view class="title">申诉原因</view>
					<view class="select" @tap="showResonPicker">
						<input class="input" type="text" v-model="form.reasonTypeText" placeholder="请选择申诉原因" disabled>
					</view>
				</view>
				<view class="textarea_box">
					<view class="title">申诉内容</view>
					<view class="textarea_style">
						<textarea maxlength="100" placeholder="请输入申诉内容......" value="" v-model="form.content"/>
					</view>
				</view>
				<view class="photo_box">
					<view class="title">上传申诉图片<text class="cRed">（选填）</text></view>
					<!-- <view class="add-btn items">
						<view class="add-btn-add">+</view>
						<view class="add-btn-text">添加图片</view>
					</view> -->
					<tui-upload @complete="result" @remove="remove" :limit="2"></tui-upload>
				</view>
				<view class="submit_btn" @tap="submit">提交</view>
			</view>
		</view>
		<w-picker mode="selector" :defaultVal="[1]" @confirm="onConfirm" ref="selector" :selectList="complaintList"></w-picker>
	</view>
</template>
<script>
	import tuiUpload from '@/components/tui-upload/tui-upload';
	import wPicker from "@/components/w-picker/w-picker.vue";
	export default {
		components: {
			tuiUpload,wPicker
		},
		data() {
			return {
				complaintList:[],
				imageData:[],
				form:{
					orderId:0,
					reasonType:0,
					reasonTypeText:'',
					content:'',
					image:''
				}
			}
		}, 
		methods: {
			showResonPicker() {
				this.$refs.selector.show()
			},
			onConfirm(e){
				this.form.reasonTypeText = e.result;
				this.form.reasonType = e.checkArr.value;
			},
			result: function(e) {
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				this.imageData.splice(e.index,1);
			},
			submit(){
				if(!this.form.reasonType){
					return this.$msg.toast('请选择申述原因');
				}
				if(!this.form.content){
					return this.$msg.toast('请输入申述内容');
				}
				this.form.image = this.$common.imgRemovePre(this.imageData).join(',');
				this.$http.posts('/api/complaint/doComplaint',this.form).then(res=>{
					this.$msg.toast(res.msg,'/pages/superBack/complaint');
				});
			}
			

		},
		watch: {

		},
		computed: {

		},
		onReady:function(){

		},
		onShow(){
			//读取取消原因配置
			let complaintReason= this.$storage.get('cjfConfig').complaintReason;
			for(var index in complaintReason){
				let temp = {};
				temp.value = index;
				temp.label = complaintReason[index];
				this.complaintList.push(temp);
			}
		},
		onUnload(){
			
		},
		onLoad: function(option) {
			this.form.orderId = option.orderId;
		},

	}
</script>
<style >
@import "../../static/css/global.css";
	.complaint_box{padding:20rpx 40rpx;}
	.complaint_box .complaint_input{display: flex; border-bottom: 1px solid #e1e1e1; padding-bottom: 20rpx;}
	.complaint_box .complaint_input .title{width: auto;}
	.complaint_box .complaint_input .select,.complaint_box .complaint_input input{text-align: right; flex: 1; font-size: 28rpx;}
	.complaint_box .textarea_box{margin-top: 40rpx;}
	.complaint_box .textarea_box .textarea_style textarea{background: #F3F4F5; margin-top: 20rpx;border-radius: 20rpx; font-size: 28rpx;padding: 30rpx; width: 100%;height: 200rpx;}
	.complaint_box .photo_box{margin-top: 40rpx;}
	.complaint_box .photo_box .title{margin-bottom: 20rpx;}
	.add-btn{display:flex; flex-direction:column; align-items:center; justify-content:center;}
	.add-btn-text{font-size:26rpx; line-height:36rpx; text-align:center; color:#999999; width:100%;}
	.add-btn-add{font-size:100rpx !important; height:80rpx; line-height:80rpx; margin-bottom:20rpx; color:#999999;text-align: center;}
	.items{width:200rpx; height:200rpx; overflow:hidden; margin:10rpx 0; background:#F3F4F5; font-size:0; position:relative; border-radius:20rpx; margin-right:20rpx; margin-top: 20rpx;}
	.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#333; font-size:36rpx; border-radius:60rpx;background: #FFF000; margin-top: 100rpx;} 
</style>
