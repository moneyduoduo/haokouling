<template>
	<view class="activities" >
		<template v-if="type==0">
			<view class="activity" >
				<view class="time">
					今天 10:10
				</view>
				<view class="ac-content">
					<view class="title-box">
						<view class="title-text">			
							你的地球日优惠福利来啦
						</view>
						<view class="status">
							进行中
						</view>
					</view>
					<view class="content-img">
						<image src="../../static/image/common/pageNull.png" mode=""></image>
						<view class="content-text">		
							部分绿色环保商品限时免单，饮食、居家类目等满减。福利天天有！最高直减160元，赶紧来看看吧！
						</view>
					</view>
					<view class="look-detail">
						<view class="">
							查看详情
						</view>
						<view class="right-icon">
							&#xe644;
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="type==1">
			<view class="server"  >
				<view class="time">
					今天 10:10
				</view>
				<view class="se-content">
					<view class="se-title-box">
						<view class="se-title-text">			
							您有1张优惠券到账了
						</view>
						<view class="se-status">
							
						</view>
					</view>
					<view class="se-content-box">
						<view class="content-text">		
							部分绿色环保商品限时免单，饮食、居家类目等满减。福利天天有！最高直减160元，赶紧来看看吧！
						</view>
						<view class="right-icon">
							&#xe644;
						</view>
					</view>
				</view>
			</view>
		</template>
		<template v-if="type==2" >
			<view class="system" @tap="goDetail">
				<view class="time">
					今天 10:10
				</view>
				<view class="sy-content">
					<view class="title-box">
						<view class="title-text">				
							超级返上线公告
						</view>
						<view class="point">
							
						</view>
					</view>
					<view class="content-img">
						<view class="content-text">		
							尊敬的用户，为了给您带来更好的体验，超级返业务将于2019年4月26日22：00-2019年4月27日09:00期间进行
						</view>
					</view>
					<view class="look-detail">
						<view class="">
							查看详情
						</view>
						<view class="right-icon">
							&#xe644;
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				title:['活动消息','服务消息','系统消息'],
				type:9999,
			}
		},
		methods: {
			goDetail(id) {
				uni.navigateTo({
					url: 'messageDetail'
				})
			}
		},
		onLoad(o) {
			this.type = o.type
			uni.setNavigationBarTitle({
				title: this.title[o.type]
			})
		}
	}
</script>
	
<style>
	@font-face {
	  font-family: 'iconfont';  /* project id 1124562 */
	  src: url('https://at.alicdn.com/t/font_1124562_i3ma4vwv9sq.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1124562_i3ma4vwv9sq.svg#iconfont') format('svg');
	}
	page {
		background-color: #f9f9f9;
		font-size: 28upx;
	}
	.activities {
		padding: 0 30upx 40upx;
	}
	.time {
		height: 88upx;
		line-height: 88upx;
		text-align: center;
		color: #a9a9a9;
	}
	
	.ac-content {
		background: #fff;
	}
	.title-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 34upx;
		height: 88upx;
		padding: 0 40upx;
	}
	.status {
		font-size: 28upx;
		height: 40upx;
		width: 120upx;
		text-align: center;
		line-height: 40upx;
		color: #fff;
		background: #FD4C66;
		border-radius: 40upx;
	}
	.content-img {
		padding: 0 40upx;
	}
	.content-img image {
		width: 100%;
		height: 260upx;
	}
	.content-text {
		color: #a9a9a9;
		line-height: 40upx;
		font-size: 26upx;
	}
	.look-detail {
		display: flex;
		padding: 0 40upx;
		height: 74upx;
		justify-content: space-between;
		align-items: center;
		color: #a9a9a9;
		border-top: 2upx solid #e6e6e6;
		margin-top: 20upx;
	}
	.right-icon {
		font-family: "iconfont";
		color: #a9a9a9;
	}
	.se-title-text {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 88upx;
		padding: 0 40upx;
		font-size: 30upx;
	}
	.se-content {
		background: #fff;
	}
	.se-content-box {
		display: flex;
		padding: 30upx 40upx;
		border-top: 1px solid #e6e6e6;
		align-items: center;
	}
	.point {
		width: 20upx;
		height: 20upx;
		background-color: #FD4C66;
		border-radius: 20upx;
	}
	.sy-content {
		background: #fff;
	}
</style>
