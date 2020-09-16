<template>
	<view class="content">
		<top-bar title="回复申述" bgClass="orange"></top-bar>
		<view class="complaint_box">
			<view class="textarea_box">
				<view class="title">回复内容</view>
				<view class="textarea_style">
					<textarea maxlength="100" placeholder="请输入回复内容......" value="" v-model="form.content"/>
				</view>
			</view>
			<view class="photo_box">
				<view class="title">回复图片<text class="cRed">（选填）</text></view>
				<tui-upload @complete="result" @remove="remove" :limit="1"></tui-upload>
			</view>
			<view class="submit_btn" @tap="submit">提交</view>
		</view>
	</view>
</template>
<script>
	import tuiUpload from '@/components/tui-upload/tui-upload';
	export default {
		components: {
			tuiUpload
		},
		data() {
			return {
				imageData:[],
				form:{
					id:0,
					content:'',
					image:''
				}
			}
		}, 
		methods: {
			result: function(e) {
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				this.imageData.splice(e.index,1);
			},
			submit(){
				if(!this.form.content){
					return this.$msg.toast('请输入申述内容');
				}
				if(this.imageData.length>0){
					this.form.image = this.$common.imgRemovePre(this.imageData).join(',');
				}
				this.form.image = this.$common.imgRemovePre(this.form.image);
				this.$http.posts('/api/complaint/doReply',this.form).then(res=>{
					this.$msg.toast(res.msg,'/pages/superBack/complaintDetail?id='+this.form.id);
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

		},
		onUnload(){
			
		},
		onLoad: function(option) {
			this.form.id = option.id;
		},

	}
</script>
<style>
	@import "../../static/css/global.css";
	.content {
		padding: 0;
	}
	.complaint_box{padding: 20rpx 40rpx;}
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
	.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#fff; font-size:36rpx; border-radius:60rpx;background: linear-gradient(-45deg,#f33944, #ed0388); margin-top: 100rpx;} 
</style>
