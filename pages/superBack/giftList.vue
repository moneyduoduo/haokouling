<template>
	<view class="page_content">
		<top-bar title="选择礼物" bgClass="orange"></top-bar>
		<view class="gift_bar">
			<view class="gift_list tc column center" v-for="(item,index) in list" :key="index" @tap="giftTab(index)">
				<view class="pic">
					<image :src="item.thumb"></image>
					<view class="iconfont icon-queren icon"  v-if="item.active"></view>
					<view class="mark" v-if="item.active"></view>
				</view>
				<view class="title ellipsis2 wrap">{{item.name}}</view>
			</view>
		</view>
		<view class="submit_btn" @tap="submit">马上抢购</view>
	</view>
</template>
<script>
	export default {
		components: {
		},
		data() {
			return {
				list:[],
				page:1,
				pageSize:50,
				giftId:0,
			}
		}, 
		methods: {
			goBack(){
				uni.navigateBack();
			},
			giftTab(index){
				this.list.forEach((v,i)=>{
					v.active = false;
					if(index==i){
						v.active = true;
						this.giftId = v.id;
					}
				})
			},
			submit(){
				uni.redirectTo({
					url: '/pages/superBack/index?giftId='+this.giftId
				});
			}
		},
		watch: {

		},
		computed: {

		},
		onReady:function(){ 
		
		},
		onShow:function(){

		},
		onLoad: function() {
			let requestData = {};
			let th = this;
			requestData.page = this.page;
			requestData.pageSize= this.pageSize;

			this.$http.posts('/api/gift/getList',requestData)
			.then(res =>{
				res.data.list.map(function(a) {
					a.active = false;
					a.thumb = th.$common.imgThumb(a.thumb,'300');
					th.list.push(a);
				})
			});
		}
	}
</script>
<style >
	@import "../../static/css/global.css";
	.gift_bar{padding:10rpx;display: flex;flex-wrap: wrap;justify-content: space-between; padding-bottom: 100rpx;}
	.gift_list{width: 360rpx;height:400rpx;background: #fff;margin-top: 20rpx;overflow: hidden;}
	.gift_list:nth-child(odd){margin-right: 10rpx;}
	.gift_list .pic{width:300rpx;height:300rpx;position:relative;}
	.gift_list image{width:300rpx; height:300rpx;}
	.gift_list .title{}
	.gift_list .mark{position: absolute;left:0; right:0; top:0; bottom:0;background: rgba(0,0,0,0.5);z-index: 2;width:300rpx;height:300rpx;}
	.gift_list .icon{position: absolute; top:20rpx; right:30rpx; width: 40rpx; height:40rpx; background: #fd2f53;z-index: 3; border-radius: 20rpx;}
	.gift_list .icon-queren:before{color:#fff;font-size: 40rpx;}
	.submit_btn{height: 80rpx; line-height: 80rpx; text-align: center; color:#fff; font-size:36rpx;background: #ff7132;margin-top: 80rpx; position: fixed;left:0;bottom: 0;z-index: 5;}
</style>
