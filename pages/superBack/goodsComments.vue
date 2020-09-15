<template>
	<view>
		<top-bar title="晒评价" bgClass="orange"></top-bar>
		<view class="info_bar mt20 pd30">
			<view class="goods_info">
				<view class="goods_pic">
					<image :src="data.thumb"></image>
				</view>
				<view class="goods_name_box">
					<view class="goods_name ellipsis2">{{data.title}}</view>
				</view>
			</view>
	
			<view class="complaint_pic">
				<view class="title">请上传对应店铺的五星好评截图：</view>
				<view class="pic_box">
					<tui-upload @complete="result" @remove="remove" :limit="1"></tui-upload>
				</view>
			</view>
			<view class="detaile_bar mt20">
				<view class="title ptb10 f32 b">重要提示</view>
				<view class="storeDetails">
					<view class="ln2">
						<rich-text :nodes="$storage.get('cjfConfig').cjfCommentTip" ></rich-text>
					</view>
				</view>
			</view>
			<view class="submit_btn" @tap="submit">提交</view>
		</view>
	</view>
</template>
<script>
	import tuiUpload from '@/components/tui-upload/tui-upload'
	export default {
		components: {
			tuiUpload
		},
		data() {
			return {
				data:{},
				image:''
			}
		}, 
		methods: {
			goBack(){
				uni.navigateBack();
			},
			result: function(e) {
				this.image = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				this.image = '';
			},
			submit(){
				if(!this.image){
					return this.$msg.toast('请上传评价截图');
				}
				this.$http.posts('/api/order/doComment',{orderId:this.data.id,image:this.image}).then((res)=>{
					this.$msg.toast(res.msg,'/pages/superBack/orderList');
					this.$storage.remove('goodsInfo');
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
			this.data = this.$storage.get('goodsInfo');
		},

	}
</script>
<style >
	@import "../../static/css/global.css";
	.goods_info{display: flex;border-bottom: 1px solid #d8d8d8; padding-bottom: 20rpx; justify-content: center; align-items: center;}
	.goods_info .goods_pic{width: 200rpx; height:200rpx; margin-right: 10px;}
	.goods_info .goods_pic image{width: 100%; height: 100%;}
	.goods_info .goods_name_box{flex:1;height:200rpx;}
	.goods_info .goods_name_box .goods_name{height:120rpx;}
	.goods_info .goods_name_box .money{text-align: right; color:#fd2f53; font-size: 32rpx;}
	.complaint_title_box{margin-top: 20rpx;border-bottom: 1px solid #d8d8d8; padding-bottom: 20rpx; }
	.complaint_title_box text{color:#fd2f53;}
	.complaint_cont{margin-top: 20rpx;border-bottom: 1px solid #d8d8d8; padding-bottom: 20rpx;}
	.complaint_cont .cont{padding: 20rpx; background: #f3f3f3; margin-top: 20rpx; border-radius: 20rpx;}
	.complaint_pic{margin-top: 20rpx;}
	.complaint_pic .pic_box{margin-top: 20rpx;}
	.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#fff; font-size:36rpx; border-radius:60rpx;background: linear-gradient(-45deg,#f33944, #ed0388); margin-top: 100rpx;} 
	
</style>
