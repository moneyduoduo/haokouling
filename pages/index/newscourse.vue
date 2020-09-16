<template>
	<view>
		<ytHeader></ytHeader>
		<view class="yj-pad-lr yj-pad-b-big yj-content yj-mainH">
			<view class="yj-course-title yj-text-center">
				<text class="yj-text-bold yj-mar-t">好口令</text>
				<view class="yj-mar-t yj-text-usual">省钱必看 - 如何查看“隐藏优惠券”</view>
			</view>
			<!-- :class="{'fullvideo':isfull}" -->
			<!--
			<video class="yj-mar-t-biger myvideo" :src="rootUrl+'public/static/Home/images/lingquan.mp4'"
			 :autoplay="false" :poster="rootUrl+'public/static/sqapp/fengmian.png'" :direction="0"></video>-->
			<view class="yj-step yj-mar-t-big">
				<image class="yj-step-img" src="../../static/img/newscourse/step1.png" mode="widthFix"></image>
				<view class="yj-step-con">
					<image src="../../static/img/newscourse/step1_con.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="yj-step yj-mar-t-big">
				<image class="yj-step-img" src="../../static/img/newscourse/step2.png" mode="widthFix"></image>
				<view class="yj-step-con">
					<image src="../../static/img/newscourse/step2_con.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="yj-step yj-mar-t-big">
				<image class="yj-step-img" src="../../static/img/newscourse/step3.png" mode="widthFix"></image>
				<view class="yj-step-con">
					<image src="../../static/img/newscourse/step3_con.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ytHeader from '../../components/header.vue';
	var videoContext;
	export default {
		data() {
			return {
				isfull:false,
				rootUrl:'',
			};
		},
		components: {
			ytHeader
		},
		onLoad: function(option) {
			///plus.screen.lockOrientation("portrait-primary"); 
			this.rootUrl = getApp().globalData.baseUrl;
		},
		onReady: function(res) {
			videoContext = uni.createVideoContext('myVideo')
		},
		methods: {
			/* videoplay(){
				this.isfull = true;
			},
			videoend(){			
				this.isfull = false;
			},
			videopause(){
				this.isfull = false;
			} */
		
		}
	};
</script>

<style lang="less">
	@import '../../static/css/mycss.less';

	page {
		background-color: #ff4a26;
		color: #fff;
	}

	.yj-course-title {
		/* margin-top: 20upx; */
		font-size: 60upx;
		color: #fff;
	}
	.myvideo{
		width: 100%;
		height: 388upx;
	}
	.fullvideo{
		position: fixed;
		width: 100%;
		height: 100vh;
		z-index: 9;
		top: 0;
		margin-top: calc(var(--window-bottom) * -2);
		left: 0;
	}
	.yj-step {
		text-align: center;
		background-color: #FFDBC1;
		border-radius: 20upx;
		margin-top: 100upx;

		&-img {
			width: 276upx;
			height: 69upx;
			margin-top: -69upx;
		}

		&-con {
			padding: 40upx 50upx 30upx;

			image {
				width: 100%;
			}
		}
	}
</style>
