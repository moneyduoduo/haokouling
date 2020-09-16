<template>
	<view class="content">
		<view  class="header">
			<view class="status_bar"><!-- 状态栏占位 --></view>
			<view class="superback_header">
				<view class="icon_left">
					<text class="iconfont icon-zuojiantou iconsize_left"  @tap="goBack"></text>
				</view>
				<view class="superback_title">
					<text class="superback_text">编辑银行卡信息</text>
				</view>
				<view class="icon_right">
		
				</view>
			</view>
		</view>
		<view class="bank_bar">
			<view class="bank_box">

				<view class="bank">
					<view class="bank_btn">
						<view class="title">姓名</view>
						<view class="input_box">
							<view class="text">工商银行</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">卡号</view>
						<view class="input_box">
							<view class="text">工商银行</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">银行</view>
						<view class="input_box">
							<view class="text">工商银行</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">银行地区</view>
						<view class="input_box">
							<view class="text">工商银行</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">开户行</view>
						<view class="input_box">
							<view class="text">工商银行</view>
						</view>
					</view>
					<view class="bank_btn">
						<view class="title">手机号</view>
						<view class="input_box">
							<view class="text">13888888888</view>
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

			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>，
<style>
/* 顶部 */
.header{position: fixed;top:0;left:0;height: 40px;}
.superback_header{height: 40px;background:#fd2f53; display: flex;}
.icon_left,.icon_right{width:80px; overflow: hidden;}

.superback_title{flex:1;}
.superback_text{text-align: center;font-size:18px;color:#fff;display:block;line-height: 40px;}

.iconsize_left{display:block; float: left; color:#fff;}
.iconsize_right{display:block; float: right;color:#fff;}
.icon-zuojiantou{font-size: 20px; margin: 10px 10px 0 10px;}
	
.bank_bar{background: #fff;padding: 20px;position: absolute;left:0;top:40PX;right:0;bottom:0;
/*  #ifdef  APP-PLUS  */
	top: calc(40px + var(--status-bar-height));
	/*  #endif  */
}
.bank_box .img_bar{margin: auto;width: 80px; height:80px;}
.bank_box .img_bar image{width: 100%; height:100%;}
.bank_box .bank{padding-top: 00px;}
.bank_box .bank_btn{border-bottom: 1px solid #ccc;padding: 10px 0;display: flex;justify-content: space-between; align-items: center; height:50px;}
.bank_box .bank_btn .title{color: #000;width: auto;}
.bank_box .bank_btn .input_box{flex: 1;}
.bank_box .bank_btn .input_box .text{text-align: right;}



</style>
