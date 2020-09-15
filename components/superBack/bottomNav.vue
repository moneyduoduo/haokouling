<template>
	<view class="tabbar">
		<view class="tab_nav_box">
			<view class="box" :class="{active:index==currentTabIndex}" v-for="(item,index) in footerNav" :key="index" @tap="goToPage(item,index)">
				<!-- <view class="icon iconfont" :class="item.iconName"></view> -->
				<image class="select_img" :src="index==currentTabIndex? item.selectedIconPath:item.iconPath " mode=""></image>
				<view class="text">{{item.name}}</view>
				<text class="red_dot" v-if="item.redDot">{{item.redDot}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				footerNav: [{
						name: '超级返',
						iconName: 'icon-fanli',
						url: '/pages/superBack/index',
						iconPath: "/static/image/superBack/fan.png",
						selectedIconPath: "/static/image/superBack/fan1.png"
						
					},
					{
						name: '我要赚钱',
						iconName: 'icon-yiban',
						url: '/pages/superBack/inviterIndex',
						iconPath: "/static/image/superBack/zhuan.png",
						selectedIconPath: "/static/image/superBack/zhuan1.png"
					},
					{
						name: '订单',
						iconName: 'icon-dingdan1',
						url: '/pages/superBack/orderList',
						iconPath: "/static/image/superBack/order.png",
						selectedIconPath: "/static/image/superBack/order1.png"
					},
					{
						name: '个人中心',
						iconName: 'icon-denglu',
						url: '/pages/superBack/home',
						iconPath: "/static/image/superBack/person.png",
						selectedIconPath: "/static/image/superBack/person1.png"
					},
				],
				currentTabIndex: this.current,
				unfinishedOrderNum: 0,
				unfinishedComplaintNum: 0
			};
		},
		mounted: function() {
			//超级返初始化接口
			let cjfConstantVersion = '';
			if (this.$storage.get('cjfConfig')) {
				cjfConstantVersion = this.$storage.get('cjfConfig').cjfConstantVersion;
			}
			this.$http.posts('/api/index/getIndex', {
					cjfConstantVersion: cjfConstantVersion
				})
				.then(res => {
					if (res.data.config.cjfConstantVersion) {
						this.$storage.set('cjfConfig', res.data.config);
					}
					this.$storage.set('cjfOtherConfig', res.data.otherConfig);
					//缓存本地时间和服务器时间差，用于倒计时换算
					let nowTime = new Date().getTime() / 1000;
					this.$storage.set('timeDistance', parseInt(res.data.otherConfig.serverTime - nowTime));
					this.unfinishedOrderNum = res.data.otherConfig.unfinishedOrderNum;
					this.unfinishedComplaintNum = res.data.otherConfig.unfinishedComplaintNum;
					this.setNav();
					this.$emit('loadConfig');
				});
		},
		created() {

		},
		methods: {
			setNav() {
				let unfinishedOrderNum = this.unfinishedOrderNum;
				let unfinishedComplaintNum = this.unfinishedComplaintNum;
				this.footerNav.forEach((v, i) => {
					if (unfinishedOrderNum > 0 && i == 2) {
						this.$set(this.footerNav[i], "redDot", unfinishedOrderNum)
					}
					if (unfinishedComplaintNum > 0 && i == 3) {
						this.$set(this.footerNav[i], "redDot", unfinishedComplaintNum)
					}
				})
			},
			goToPage(item, index) {
				if (index == this.currentTabIndex) {
					return false;
				}
				/*
				return uni.redirectTo({
					url: item.url
				});*/
				this.$common.goPage(item.url, 'fade-in');
			}
		}
	};
</script>

<style>
	/* 底部导航 */
	@import "../../static/css/global.css";
	.select_img {
		width: 48rpx;
		height: 48rpx;
	}
	.tabbar .tab_nav_box {
		height: 100%;
	}
	.tabbar {
		z-index: 999;
	}
	.tabbar .tab_nav_box .box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.tabbar .tab_nav_box .box.active .icon,
	.tabbar .tab_nav_box .box.active .text {
		color: #333333 !important;
	}
	.tabbar .tab_nav_box .box .red_dot {
		background-color: #ff7132;
	}
</style>
