<template>
	<view class="content">
		<top-bar title="申述详情" bgClass="orange"></top-bar>
		<view class="info_bar">
			<view class="order_row">
				<view class="order">任务编号：{{complaintInfo.orderId}}</view>
				<view class="time">{{complaintInfo.createTime}}</view>
			</view>
			<view class="goods_info">
				<view class="goods_pic">
					<image :src="complaintInfo.goodsImage"></image>
				</view>
				<view class="goods_name_box">
					<view class="goods_name ellipsis2">{{complaintInfo.goodsTitle}}</view>
					<view class="money" v-if="complaintInfo.realPrice">垫付：￥{{complaintInfo.realPrice}}元</view>
				</view>
			</view>
			<view class="complaint_title_box">
				<view class="title">申诉原因：<text>{{complaintInfo.reasonTypeText}}</text></view>
			</view>
			<view class="complaint_cont">
				<view class="title">申诉内容：</view>
				<view class="cont">{{complaintInfo.content}}</view>
			</view>
			<view class="complaint_pic" v-if="complaintInfo.imageTemp.length>0">
				<view class="title">申诉图片：</view>
				<view class="pic_box">
					<view class="pic" @tap="previewImg(item,complaintInfo.imageTemp)" v-for="(item,index) in complaintInfo.imageTemp" :key="index">
						<image :src="item"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="msg_title">
			<view class="title_box"><view class="title">处理历史</view></view>
		</view>
		<view class="msg_bar">
			<view class="msg_box" :class="item.class" v-for="(item,index) in complaintInfo.list" :key="index">
				<view class="title_row">
					<view class="title">{{item.complaintName}}</view>
					<view class="time">{{item.createTime}}</view>
				</view>
				<view class="msg_content">
					<view class="msg_main">
						<view class="wrap">{{item.content}}</view>
						<view v-if="item.image.length>0" class="pic" @tap="previewImg(item.image)">
							<image :src="item.image"></image>
						</view>
					</view>
				</view>
			</view>			
		</view>
		<!-- 底部菜单 -->
		<view class="footer" v-if="complaintInfo.status == 1">
			<view class="icons" v-if="complaintInfo.type == 1" @tap="completeComplaint">
				<view class="joinCart">完结申诉</view>
			</view>
			<view class="btn" @tap="goReply()">
				<view class="buy">回复申诉</view>
			</view>
		</view>
		
		<view class="complaint_bar" v-if="showReply">
			<view class="complaint_box">
				<view class="complaint_container">
					<text class="iconfont icon-close-x cancel" @tap="showReply=false"></text>
					<view class="textarea_box">
						<view class="title">回复内容</view>
						<view class="textarea_style">
							<textarea name="content" maxlength="100" placeholder="请输入回复内容......" value="" v-model="replyForm.content"/>
						</view>
					</view>
					<view class="photo_box">
						<view class="title mb20">请选择图片<text class="cRed">（选填）</text></view>
						<tui-upload @complete="result" @remove="remove" :limit="1"></tui-upload>
					</view>
					<view class="submit_btn" @tap="submitReply()">提交</view>
				</view>
			</view>
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
				id:'',
				complaintInfo:{imageTemp:[],list:[]},
				showReply:false,
				imageData:[],
				replyForm:{
					content:'',
					image:''
				}
			}
		}, 
		methods: {
			goReply(){
				this.$common.goPage('/pages/superBack/complaintReply?id='+this.id);
			},
			showComplaint(){
				this.show = true
			},
			hideComplaint(){
				this.show = false
			},
			previewImg(imgUrl,imgUrls){
				this.$common.previewImage(imgUrl,imgUrls);
			},
			getInfo(){
				let _this = this;
				this.$http.posts('/api/complaint/getDetail',{id:this.id}).then(res=>{
					res.data.imageTemp = [];
					res.data.image.map((item)=>{
						res.data.imageTemp.push(this.$common.imgThumb(item));
					})
					res.data.createTime = this.$common.timeFormat(res.data.createTime);
					res.data.goodsImage = this.$common.imgThumb(res.data.goodsImage);
					/*let complaintReason= this.$storage.get('cjfConfig').complaintReason;
					for(var index in complaintReason){
						if(res.data.reasonType == index){
							res.data.reasonTypeText = complaintReason[index];
						}
					}*/
					res.data.listTemp = [];
					if(res.data.list){
						res.data.list.map((item)=>{
							item.createTime = _this.$common.timeFormat(item.createTime);
							if(item.image[0]){
								item.image = _this.$common.imgThumb(item.image[0]);
							}
							if(item.complaintName == '买家'){
								item.class = 'me';
								item.complaintName = '我的';
							}else if(item.complaintName == '商家'){
								item.class = 'store';
							}else{
								item.class = 'admin';
							}
							res.data.listTemp.push(item);
						})
					}
					this.complaintInfo = res.data;
					this.showReply = false;
				});
			},
			submitReply(){
				if(!this.replyForm.content){
					return this.$msg.toast('请输入回复内容');
				}
				this.replyForm.id = this.id;
				if(this.imageData.length>0){
					this.replyForm.image = this.$common.imgRemovePre(this.imageData).join(',');
				}
				this.$http.posts('/api/complaint/doReply',this.replyForm).then((res)=>{
					if(res.status == 1){
						this.$msg.toast(res.msg);
						this.getInfo();
						this.replyForm = {content:'',image:''};
					}
				});
			},
			completeComplaint(){
				this.$http.posts('/api/complaint/doComplete',{id:this.id}).then((res)=>{
					if(res.status == 1){
						this.$msg.toast(res.msg,'/pages/superBack/complaint');
					}
				});
			},
			result: function(e) {
				this.imageData = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				this.imageData.splice(e.index,1);
			},
		},
		watch: {


		},
		computed: {

		},
		onReady:function(){ 

		},
		onShow(){
			this.getInfo();
		},
		onUnload(){
			this.getInfo();
		},
		onLoad(option) {
			this.id = option.id;
		},

	}
</script>
<style >
	@import "../../static/css/global.css";
	/* 顶部 */
	page{background:#f2f2f2;}
	.content {
		padding: 0;
	}
	.info_bar{background: #fff;padding:0 20rpx 20rpx 20rpx;}
	.order_row{display: flex; border-bottom: 1px solid #d8d8d8; padding:20rpx 0; justify-content: center; align-items: center;}
	.order_row .order{color:#fd2f53}
	.order_row .time{color:#999;text-align: right;}
	.goods_info{display: flex; margin-top: 20rpx;border-bottom: 1px solid #d8d8d8; padding-bottom: 20rpx; justify-content: center; align-items: center;}
	.goods_info .goods_pic{width: 200rpx; height:200rpx; margin-right: 20rpx;}
	.goods_info .goods_pic image{width: 100%; height: 100%;}
	.goods_info .goods_name_box{flex:1;height:200rpx;}
	.goods_info .goods_name_box .goods_name{height:120rpx;}
	.goods_info .goods_name_box .money{text-align: right; color:#fd2f53; font-size: 32rpx;}
	.complaint_title_box{margin-top: 20rpx;border-bottom: 1px solid #d8d8d8; padding-bottom: 20rpx; }
	.complaint_title_box text{color:#fd2f53;}
	.complaint_cont{margin-top: 20rpx;border-bottom: 1px solid #d8d8d8; padding-bottom: 20rpx;}
	.complaint_cont .cont{padding: 20rpx; background: #f3f3f3; margin-top: 20rpx; border-radius: 20rpx;}
	.complaint_pic{margin-top: 20rpx;}
	.complaint_pic .pic_box{margin-top: 20rpx; display: flex;  align-items: center;}
	.complaint_pic .pic_box .pic{width: 80px; height:80px; margin-right: 20rpx;}
	.complaint_pic .pic_box .pic image{width: 100%;height:100%;}
	.msg_title{padding: 20rpx; display: flex;justify-content: center;}
	.msg_title .title_box{width: 320rpx; height:60rpx; background:rgba(0, 0, 0, 0.5); border-radius: 60rpx; line-height: 60rpx;}
	.msg_title .title_box .title{color:#fff;text-align: center;}
	.msg_bar{padding:0rpx 40rpx;margin-bottom:120rpx;}
	.msg_bar .msg_box{margin-top: 30rpx;}
	.msg_bar .title_row{display: flex;justify-content: center;align-items: center;}
	.msg_bar .title_row .title,.msg_bar .title_row .temp_row{width: 200rpx;}
	.msg_bar .title_row .time{flex: 1;}
	.msg_bar .msg_content{margin-top: 20rpx; overflow: hidden;}
	.msg_bar .msg_main{background: #fff;padding: 20rpx; max-width: 570rpx; border-radius: 20rpx;position: relative; width: auto; float: left; margin-top: 20rpx;}
	.msg_bar .msg_main::after{content: '';position: absolute;top:-20rpx;left:30rpx;border:5px solid;border-color: transparent transparent #fff transparent;}
	.msg_bar .admin .title{color:#fd2f53}
	.msg_bar .store .title{color:#38f}
	.msg_bar .admin .msg_main{color:#fd2f53}
	.msg_bar .me .msg_main{background: #9eea6a;} 
	.msg_bar .me .msg_main::after{content: '';position: absolute;top:-20rpx;left:30rpx;border:5px solid;border-color: transparent transparent #9eea6a transparent;}
	.msg_bar .msg_content image{margin-top:10rpx;width: 200rpx; height:200rpx;}
	.msg_bar .msg_content image:nth-child(2){margin: 0;}
	
	.footer{position:fixed;bottom:0px;height:50px;border-top:solid 0.5px #eee;background-color:#fff;z-index:2;display:flex;justify-content:space-between;align-items:center;}
	.footer .icons{display:flex;height:100rpx;justify-content:space-between;}
	.footer .icons .joinCart{text-align: center;line-height: 100rpx; color:#fff;font-size: 32rpx;background: linear-gradient(45deg,#ffc605, #f6940b);}
	.footer .icons .joinCart.gray,.footer .btn .buy.gray{background: #ddd;}
	
	.footer .btn{height:100rpx; }
	.footer .btn .buy{background: linear-gradient(45deg,#fd7209, #ff440f); height:100rpx;color:#fff;font-size:32rpx;line-height: 100rpx;text-align:center;}
		
	.complaint_bar{position: fixed;top:0;left:0;right:0;bottom:0;background:rgba(0, 0, 0, 0.5);z-index:9}
	.complaint_box{padding: 40rpx;background: #fff;position: fixed;left:0;right:0;bottom:0;}
	.complaint_container{position: relative;}
	.complaint_container .cancel{position: absolute; top:-30rpx;right:-30rpx;width: 60rpx;height:60rpx;}
	.icon-close-x{font-size: 56rpx;}
	.complaint_box .complaint_input{display: flex; border-bottom: 1px solid #e1e1e1; padding-bottom: 20rpx;}
	.complaint_box .complaint_input .title{font-size: 32rpx;}
	.complaint_box .complaint_input .select{text-align: right; color:#999}
	.complaint_box .textarea_box .title{font-size: 32rpx;}
	.complaint_box .textarea_box .textarea_style textarea{background: #F3F4F5; margin-top: 20rpx;border-radius: 20rpx; font-size: 28rpx;padding: 30rpx; width: 100%; height: 200rpx;}
	.complaint_box .photo_box{margin-top: 40rpx;}
	.complaint_box .photo_box .title{font-size: 32rpx;}
	.add-btn{display:flex; flex-direction:column; align-items:center; justify-content:center;}
	.add-btn-text{font-size:26rpx; line-height:36rpx; text-align:center; color:#999999; width:100%;}
	.add-btn-add{font-size:100rpx !important; height:80rpx; line-height:80rpx; margin-bottom:20rpx; color:#999999;text-align: center;}
	.items{width:200rpx; height:200rpx; overflow:hidden; margin:10rpx 0; background:#F3F4F5; font-size:0; position:relative; border-radius:20rpx; margin-right:20rpx; margin-top: 20rpx;}
	.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#fff; font-size:36rpx; border-radius:60rpx;background: linear-gradient(-45deg,#f33944, #ed0388); margin-top: 60rpx;} 
</style>
