<template>
	<view class="order-list">
		<view class="order-top" >
			<view class="menus">
				<view :class="['menu-item',orderType == 0? 'selected' : '']" @tap="changCate(0)">
					<image src="../../static/image/home/log-home.png" mode=""></image>
					<text>全部</text>
				</view>
				<view :class="['menu-item',orderType == 1? 'selected' : '']" @tap="changCate(1)">
					<image src="../../static/image/home/log-tb.png" mode=""></image>
					<text>淘宝</text>
				</view>
				<view :class="['menu-item',orderType == 2? 'selected' : '']" @tap="changCate(2)">
					<image src="../../static/image/home/log-jd.png" mode=""></image>
					<text>京东</text>
				</view>
				<view :class="['menu-item',orderType == 3? 'selected' : '']" @tap="changCate(3)">
					<image src="../../static/image/home/log-pdd.png" mode=""></image>
					<text>拼多多</text>
				</view>
			</view>
			<view class="tabs">
				<view :class="['tabs-item',tabCurrentIndex == 0? 'selected': '']" @tap="selectStatus(0)">
					全部
				</view>
				<view :class="['tabs-item',tabCurrentIndex == 1? 'selected': '']" @tap="selectStatus(12)">
					已付款
				</view>
				<view :class="['tabs-item',tabCurrentIndex == 2? 'selected': '']" @tap="selectStatus(3)">
					已完成
				</view>
				<view :class="['tabs-item',tabCurrentIndex == 3? 'selected': '']" @tap="selectStatus(13)">
					已失效
				</view>
			</view>
		</view>
		
		<swiper :current="swiperCurrentIndex" @change="chageStatus" :style="{height: swiperH}">
			<swiper-item v-for="(cate,inx) in orders" :key="inx">
				<view v-if="cate.list.length == 0"  :class="'goods_box'+inx" style="background-color :#ffffff;height: 100vh; ">
					<view class='nodata_box' v-if="cate.list.length == 0">
						<image class="nodata_img" src="/static/image/home/nodata.png" mode=""></image>
					</view>
				</view>
				<view v-if="cate.list.length != 0" :class="'goods_box'+inx" :style="{  backgroundColor :'#f5f5f5',}">
					<view class="" v-if="cate.list.length != 0">
						<view class="order" v-for="(item,index) in cate.list" :key="index">
							<view class="order-head">
								<image class="order_icon" :src="item.type == 1? '/static/image/home/icon_tb.png': item.type == 2? '/static/image/home/icon_jd.png': '/static/image/home/icon_pdd.png'"
								 mode=""></image>
								<text class="otype">{{item.type == 1? '淘宝': item.type == 2? '京东': '拼多多'}}</text>
								<text class="oid">{{item.orderTime}}</text>
								<text class="ostatus">{{item.status== 3? '已完成' : item.status== 12? '已付款':'已失效'}}</text>
							</view>
							<view class="order-content" @tap="goodsDetail(item.itemId,item.type)">
								<image :src="item.pic" mode=""></image>
								<view class="order-info">
									<view class="goods-name">
										{{item.title}}
									</view>
									<view class="pay">
										<text style="font-size: 24upx; margin-right: 12rpx;">&yen;</text>
										<text>{{item.payPrice}}</text>
									</view>
									<view class="commission">
										佣金{{item.commission}}元
									</view>
									<view class="gobuy">
										我要购买
									</view>
								</view>
							</view>
							<view class="order-edit">
								<view class="order-num">
									订单单号：<text class="" style="font-size: 28rpx;">{{item.tradeId}}</text>
								</view>
								<view class="oid-copy" @tap="copyOid(item.tradeId)">
									复制
								</view>
							</view>
						</view>
					</view>
					<load-more v-if="showLoding &&  cate.list.length != 0" :loadingType="loadingType" :contentText="contentText"></load-more>
				</view>

			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import mescroll from '@/components/mescroll.vue'
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		components: {
			mescroll
		},
		data() {
			return {
				statusBarHeight:statusBarHeight,
				scrollHeight: 500,
				showLoding: true,
				loadingType: 1,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				platform: ['全部', '淘宝', '京东', '拼多多'],
				oType: 1, //（0所有订单，1仅自己推广的，2所有粉丝订单）
				orderType: 0, // 订单平台类型（0全部，1淘宝，2京东，3拼多多）
				orderStatus: [0, 12, 3, 13], //订单状态0全部，3订单结算 ，13订单无效，12已付款
				orders: [{
						list: [], //订单
						page: 1 // 分页
					}, {
						list: [],
						page: 1
					},
					{
						list: [],
						page: 1
					},
					{
						list: [],
						page: 1
					}
				],
				swiperH: 'auto',
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "暂无更多数据"
				},
			}
		},
		onLoad: function(opstion) {
			if (opstion.tabIndex) {
				this.swiperCurrentIndex = opstion.tabIndex
				this.tabCurrentIndex = opstion.tabIndex
				this.orderType = opstion.orderType
				this.oType = opstion.oType
				uni.setNavigationBarTitle({
					title: this.platform[this.orderType]
				})
			}
			this.myOrder(this.orderStatus[opstion.tabIndex], this.orderType)
		},
		onShow: function() {

		},
		onReady: function() {},
		methods: {
			setSwiperHeight() {
				let ind = this.swiperCurrentIndex
				let view = uni.createSelectorQuery().in(this).select(`.goods_box${ind}`)
				view.fields({
					size: true,
					scrollOffset: true
				}, data => {
					this.swiperH = data.height + 'px'
				}).exec()
				this.$nextTick(() => {
					setTimeout( () => {
						let ind = this.swiperCurrentIndex
						let view = uni.createSelectorQuery().in(this).select(`.goods_box${ind}`)
						view.fields({
							size: true,
							scrollOffset: true
						}, data => {
							this.swiperH = data.height + 'px'
						}).exec()
					},100)
					
				})
			},
			//手动滑动
			chageStatus(e) {
				if (this.tabCurrentIndex == e.detail.current) {
					return
				}
				this.swiperCurrentIndex = e.detail.current
				this.tabCurrentIndex = e.detail.current
				this.myOrder(this.orderStatus[this.tabCurrentIndex], this.orderType)
			},

			//选中类别
			changCate(orderType) {
				if (orderType == this.orderType) {
					return
				}
				this.orders.forEach(item => {
					item.list = [],
						item.page = 1
				})
				this.orderType = orderType
				uni.setNavigationBarTitle({
					title: this.platform[orderType]
				})
				this.myOrder(this.orderStatus[this.tabCurrentIndex], orderType)
			},

			//选中订单状态
			selectStatus(orderStatus) {
				if (this.tabCurrentIndex == this.orderStatus.indexOf(orderStatus)) {
					return
				}
				this.swiperCurrentIndex = this.orderStatus.indexOf(orderStatus)
				this.tabCurrentIndex = this.orderStatus.indexOf(orderStatus)
				this.myOrder(orderStatus, this.orderType)

			},

			//加载数据
			myOrder(type, orderType) {
				let page = this.orders[this.tabCurrentIndex].page
				return this.$http.post('/api/order/getList', {
						page,
						status: type,
						type: orderType,
						oType: this.oType
					})
					.then(res => {
						uni.stopPullDownRefresh()
						this.loadingType = 2
						this.setSwiperHeight()
						if (res.data.list.length == 0) {
							return
						}
						this.orders[this.tabCurrentIndex].page++
						let orderTemp = res.data.list
						orderTemp.forEach((v, i) => {
							orderTemp[i].orderTime = this.reviseDate(res.data.list[i].orderTime)
							if (v.type == 1) {
								orderTemp[i].pic = this.$common.imgThumbAli(v.pic)
							}
							this.orders[this.tabCurrentIndex].list.push(orderTemp[i])
						})
						
					})

			},

			//日期格式化
			reviseDate(date) {
				return this.$common.timeFormat(date)
			},

			//复制订单号
			copyOid(tradeId) {
				uni.setClipboardData({
					data: `${tradeId}`,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 3000,
							icon: "none"
						});
					},
					fail: () => {
						uni.showToast({
							title: '复制失败',
							duration: 3000,
							icon: "none"
						});
					}
				})
			},

			// 去到商品详情
			goodsDetail: function(itemId, type) {
				if (type == 1) {
					uni.navigateTo({
						url: "../detail/index?itemId=" + itemId
					});
				} else if (type == 3) {
					uni.navigateTo({
						url: "../pdd/detail/index?itemId=" + itemId
					});
				}

			},
			
			//上拉加载
			scrollEnd() {
				
			},

			//下拉加载
			scrollTop(done) {
				
			}

		},
		onPullDownRefresh() {
			this.orders[this.tabCurrentIndex].list = []
			this.orders[this.tabCurrentIndex].page = 1
			const data = this.myOrder(this.orderStatus[this.tabCurrentIndex], this.orderType)
			
		},
		onReachBottom () {
			this.loadingType = 1
			this.myOrder(this.orderStatus[this.tabCurrentIndex], this.orderType)
		}
	}
</script>

<style lang="less">
	page {
		display: flex;
		font-size: 28upx;
		padding-top: 302rpx;
		background-color: #f5f5f5;
		
	}
	.load-more {
		padding-bottom: 20rpx;
	}
	.goods_box {
		height: 100%;
		overflow: scroll;
	}

	.nodata_box {
		display: flex;
		width: 100%;
		align-items: center;
	}

	.nodata_img {
		width: 665rpx;
		height: 396rpx;
		margin: 30rpx auto 0;

	}

	.order-list {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.sitem {
		background-color: #fff;
	}

	.nodata {
		background-color: #f5f5f5 !important;

	}
	.order-top {
		position: fixed;
		width: 100%;
		z-index: 9999;
		background-color: #fff;
		top: 0;
	}
	.menus {

		display: flex;
		justify-content: space-between;
		height: 236upx;
		box-sizing: border-box;
		padding: 40upx 40upx 20upx 40rpx;

		.menu-item {
			min-width: 80upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 26rpx;

			&.selected {
				image {
					transform: scale(1.2);
				}

			}

			image {
				transition: all ease 0.3s;
				width: 106upx;
				height: 106upx;
			}
		}
	}

	.otype {
		font-size: 24rpx;
	}

	.tabs {
		height: 66upx;
		display: flex;
		justify-content: space-between;

		.tabs-item {
			// padding: 0 14upx;
			flex: 1;
			text-align: center;
			font-size: 28rpx;
			color: #929292;
			position: relative;
			line-height: 66rpx;

			&.selected {
				font-size: 36rpx;
				color: #000000;

				&:after {
					content: '';
					position: absolute;
					width: 74rpx;
					height: 8rpx;
					background-color: #ffeb00;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					border-radius: 8rpx;
				}
			}

		}
	}

	swiper {
		flex: 1 1 0%;
		background: #f6f6f7;
	}

	.order {
		margin: 20upx 18upx 0 18upx;
		border: 2upx solid #ededed;
		border-radius: 10upx;
		background: #fff;
		padding: 0 24rpx;

		.order-head {
			height: 64upx;
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #e7e7e7;

			.order_icon {
				width: 35rpx;
				height: 35rpx;
				margin-right: 16rpx;
			}

			.oid {
				margin-left: 16upx;
				margin-right: 14upx;
				color: #000;
				font-size: 24rpx;
			}

			.oid-copy {
				width: 82upx;
				height: 38upx;
				line-height: 38upx;
				font-size: 24upx;
				text-align: center;
				color: #FD4C66;
				border: 2upx solid #FD4C66;
				border-radius: 38upx;
			}

			.ostatus {
				text-align: right;
				flex: 1;
				color: #CBCBCB;
				font-size: 26rpx;
			}
		}

		.order-content {
			display: flex;
			padding: 18rpx 30rpx 20rpx 0;
			position: relative;

			image {
				width: 180upx;
				height: 180upx;
				border-radius: 10rpx;
			}

			.order-info {
				flex: 1;
				margin-left: 24upx;
				height: 180upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.goods-name {
					flex: 1;
					line-height: 36upx;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.order-time {
					font-size: 24upx;
					margin-top: 12upx;
					margin-bottom: 12upx;
				}

				.commission {
					font-size: 24rpx;
					color: #FC2727;
					margin-top: 10rpx;
				}

				.gobuy {
					position: absolute;
					width: 158rpx;
					height: 46rpx;
					background: linear-gradient(0deg, rgba(252, 104, 111, 1), rgba(255, 147, 76, 1));
					border-radius: 24rpx;
					text-align: center;
					line-height: 46rpx;
					font-size: 28rpx;
					color: #fff;
					bottom: 20rpx;
					right: 10rpx;
				}

				.pay {
					font-size: 40upx;
					color: #FC2121;
					height: 52rpx;
					// display: flex;
				}

			}
		}

		.order-edit {
			display: flex;
			height: 90upx;
			border-top: 2upx solid #f6f6f6;
			align-items: center;

			.order-num {
				font-size: 24rpx;
				color: #5D5D5D;
				flex: 1;
			}

			.oid-copy {
				width: 74rpx;
				font-size: 24rpx;
				border: 2rpx solid #5D5D5D;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
				border-radius: 18rpx;
				margin-right: 10rpx;
				color: #5D5D5D;
			}
		}
	}
</style>
