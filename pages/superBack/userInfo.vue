<template>
	<view class="page-content">
		<top-bar title="账号信息"  bgClass="orange"></top-bar>
		<view class="notice pd20 bg1 row" v-if="notice">
			<text class="iconfont icon-info ce f40"></text>
			<view class="notice ml10 h80 ce">{{notice}}</view>
		</view>
		<view class="main_tilte">账号信息</view>
		<view class="user_bar">
			<view class="user_box">
				<view class="user">
					<view class="user_btn">
						<view class="title">请选择性别</view>
						<view class="input_box">
							<view class="text" v-if="data.buyerInfo.sex==1">男</view>
							<view class="text" v-else>女</view>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">收货地区</view>
						<view class="input_box">
							<view class="text">{{data.buyerDetailInfo.receiveProvince}},{{data.buyerDetailInfo.receiveCity}},{{data.buyerDetailInfo.receiveCounty}}</view>
						</view>
					</view>
					<view class="user_btn noborder">
						<view class="title">出生日期</view>
						<view class="input_box">
							<view class="text">{{data.buyerInfo.birth}}</view>
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
							<view class="text">{{data.taobaoUserNick}}</view>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">常购类目</view>
						<view class="input_box">
							<view class="text">{{data.category}}</view>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">开通花呗</view>
						<view class="input_box">
							<view class="text"  v-if="data.buyerDetailInfo.isHuabei">是</view>
							<view class="text" v-else>否</view>
						</view>
					</view>
					<view class="user_btn">
						<view class="title">淘气值</view>
						<view class="input_box">
							<view class="text">{{data.buyerDetailInfo.taobaoScore}}</view>
						</view>
					</view>
					<view class="user_btn noborder">
						<view class="title">信誉等级</view>
						<view class="input_box">
							<view class="text">{{data.buyerDetailInfo.grade}}</view>
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
							<view class="text">{{data.mobile}}</view>
						</view>
					</view>
					<view class="user_btn" v-if="data.buyerInfo.qq">
						<view class="title">联系QQ</view>
						<view class="input_box">
							<view class="text">{{data.buyerInfo.qq}}</view>
						</view>
					</view>
					<view class="user_btn" v-if="data.buyerInfo.weixin">
						<view class="title">联系微信</view>
						<view class="input_box">
							<view class="text">{{data.buyerInfo.weixin}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				notice:'',
				data:{},
			}
		},
		onShow() {

		},
		onLoad(e){
			if(this.$storage.get('cjfOtherConfig').checkStatus == 1){
				this.notice = this.$storage.get('cjfConfig').cjfAccountTip;
			}
			this.data = this.$storage.get('cjfUserInfo');
			this.data.mobile = this.$storage.get('jxUserInfo').buyerInfo.mobile;
			this.data.taobaoUserNick = this.$storage.get('jxUserInfo').buyerInfo.taobaoUserNick;
			//读取常购类目配置
			let cjfOrderCategory = this.$storage.get('cjfConfig').cjfOrderCategory;
			let categoryArr= this.data.buyerDetailInfo.buyCate.split(',');
			let grade= this.data.buyerDetailInfo.grade;
			let cjfGrade= this.$storage.get('cjfConfig').cjfGrade;
			this.data.buyerDetailInfo.grade = cjfGrade[this.data.buyerDetailInfo.creditGrade];
			this.data.category = [];
			let th = this;
			for(var index in cjfOrderCategory){
				categoryArr.map(function(item){
					if(item == index){
						th.data.category.push(cjfOrderCategory[index])
					}
				})
			}
			this.data.category = this.data.category.join(',');
		},
		methods: {
			
		}
	}
</script>，
<style>
@import "../../static/css/global.css";
/* 顶部 */
.user_bar{background: #fff;padding:0 40rpx;}
.user_box .img_bar{margin: auto;width: 160rpx; height:160rpx;}
.user_box .img_bar image{width: 100%; height:100%;}
.user_box .user_btn{border-bottom: 1px solid #ccc;padding: 10px 0;display: flex;justify-content: space-between; align-items: center;height:50px;}
.user_box .user_btn .title{color: #000;width: auto;}
.user_box .user_btn .input_box{flex: 1;}
.user_box .user_btn .input_box input,.user_box .user_btn .input_box .text{text-align: right;}
.user_box .user_btn .vcode{width: auto; margin-left: 15px; background: linear-gradient(-45deg,#f33944, #ed0388); padding: 5px 10px; color:#fff;border-radius: 15px;}
.user_box .user_btn.noborder{border:none;}
.main_tilte{height:80rpx;line-height: 80rpx;  font-size: 32rpx; padding-left: 40rpx;background:#eee;font-weight:bold;}
</style>
