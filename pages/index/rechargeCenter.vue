<template>
	<view class="content">
		<view class="sort_bar">
			<view class="sort_box">
				<view class="sort" v-for="(item,index) in sortlist" :key="index" :class="{active:item.active}" @tap="showsortlist(index)">
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" duration="300" @change="changeTab">
			<swiper-item class="swiper-item">
				<view class="item_page">
					<view class="btn_box" @tap="rechargeTypeShow()">
						<view class="btn" v-if="!rechargeTypeName">请选择充值类型*</view>
						<view class="btn" v-else>{{rechargeTypeName}}</view>
					</view>
					<view class="btn_box" @tap="regionTypeShow()">
						<view class="btn" v-if="!regionType">请选择省份&通信运营商*</view>
						<view class="btn" v-else>{{regionType}}</view>
					</view>
				</view>
				<view class="payMoney_box">
					<view class="title">
						<image class="title_icon" src="../../static/image/index/huafei_icon.png" mode=""></image>
						<text class="title_text">
							选择充值金额
						</text>
					</view>
					<view class="money_box">
						<view class="money" @tap="tapMoney(index)" :class="{'active':item.isActive}" v-for="(item,index) in phoneMoney"
						 :key='index'>
							<text v-if="rechargeType==0">{{item.label}}</text>
							<text v-else>{{item.value}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="video_box">
					<view class="title">选择会员平台</view>
					<view class="video_list_box">
						<view class="video_list" :class="{'active':item.active}" v-for="(item,index) in videoList" :key="index" @tap="selectVideoFn(index)">
							<view class="image_box">
								<image :src="item.img"></image>
							</view>
							<view class="text">{{item.name}}</view>
						</view>
					</view>
				</view>
				<view class="payMoney_box">
					<view class="title" style="justify-content: flex-start;">
						<text class="title_text">
							选择充值期限
						</text>
					</view>
					<view class="money_box">
						<view class="money" @tap="videoMoney(index)" :class="{'active':item.active}" v-for="(item,index) in videoMoneyList"
						 :key='index'>
							<text>{{item.name}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item">
				<view class="payMoney_box">
					<view class="title">
						<image class="title_icon" src="../../static/image/index/huafei_icon.png" mode=""></image>
						<text class="title_text">
							选择充值金额
						</text>
					</view>
					<view class="money_box">
						<view class="money" @tap="qqMoneyFn(index)" :class="{'active':item.active}" v-for="(item,index) in qqMoney" :key='index'>
							<text>{{item.label}}</text>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="submit_btn" @tap="submit(tabIndex)">确认充值</view>
		<w-picker mode="selector" @confirm="onConfirmRechargeType" ref="rechargeType" :selectList="rechargeTypeList"
		 themeColor="#f00" :defaultVal="[0]"></w-picker>
		<w-picker mode="linkage" :defaultVal="['广东省','移动']" :level="2" @confirm="onConfirmRegionType" ref="regionType"
		 :linkList="regionTypeList" themeColor="#f00"></w-picker>
	</view>
</template>
<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import provinces from '@/components/w-picker/city-data/province.js';
	export default {
		components: {
			wPicker
		},
		data() {
			return {
				rechargeTypeName: '',
				rechargeType: 0,
				regionType: '',
				sortlist: [{
						sortid: 0,
						name: "话费&流量",
						active: true
					},
					{
						sortid: 1,
						name: "视频娱乐",
						active: false
					},
					{
						sortid: 2,
						name: "Q币充值",
						active: false
					},
				],
				tabIndex: 0,
				videoList: [{
						name: '爱奇艺会员',
						img: '/static/img/video/aqy.png',
						active: false
					},
					{
						name: '优酷土豆会员',
						img: '/static/img/video/yk.png',
						active: false
					},
					{
						name: '腾讯视频会员',
						img: '/static/img/video/tx.png',
						active: false
					},
					{
						name: '搜狐视频会员',
						img: '/static/img/video/sh.png',
						active: false
					},
					{
						name: '芒果TV会员',
						img: '/static/img/video/mg.png',
						active: false
					},
					{
						name: '乐视会员',
						img: '/static/img/video/ls.png',
						active: false
					},
				],
				videoMoneyList: [{
						name: '1个月',
						active: false
					},
					{
						name: '3个月',
						active: false
					},
					{
						name: '6个月',
						active: false
					},
					{
						name: '12个月',
						active: false
					}
				],
				rechargeTypeList: [{
					label: '充话费',
					value: 0,
				}, {
					label: '充流量',
					value: 1
				}],
				regionTypeList: [],
				comm: [{
					label: "移动",
					value: "1010",
				}, {
					label: "联通",
					value: "1011",
				}, {
					label: "电信",
					value: "1012"
				}, ],
				phoneMoney: [{
						label: '10元',
						value: '100M',
						isActive: false
					},
					{
						label: '20元',
						value: '200M',
						isActive: false
					},
					{
						label: '30元',
						value: '300M',
						isActive: false
					},
					{
						label: '50元',
						value: '500M',
						isActive: false
					},
					{
						label: '100元',
						value: '1G',
						isActive: false
					},
					{
						label: '150元',
						value: '2G',
						isActive: false
					},
					{
						label: '200元',
						value: '3G',
						isActive: false
					},
					{
						label: '300元',
						value: '5G',
						isActive: false
					},
					{
						label: '500元',
						value: '10G',
						isActive: false
					},
				],
				moneyName: '',
				videoNmae: '',
				videoMoneyInput: '',
				qqMoney: [{
						label: '10元',
						active: false
					},
					{
						label: '20元',
						active: false
					},
					{
						label: '30元',
						active: false
					},
					{
						label: '50元',
						active: false
					},
					{
						label: '100元',
						active: false
					},
					{
						label: '150元',
						active: false
					},
					{
						label: '200元',
						active: false
					},
					{
						label: '300元',
						active: false
					},
					{
						label: '500元',
						active: false
					},
				],

			}
		},
		methods: {
			payCommArrFn() {
				let newProvinces = provinces;
				newProvinces.map((obj, index) => {
					this.$set(
						obj, "children", this.comm
					);
					if (obj.label == '香港' || obj.label == '澳门' || obj.label == '台湾' || obj.label == '新疆维吾尔自治区' || obj.label ==
						'宁夏回族自治区') {
						newProvinces.splice(index, index)
					}
				})
				this.regionTypeList = newProvinces;
				console.log(this.regionTypeList)
			},
			changeTab(e) {
				let index = e.detail.current
				this.changeIndex(index)
			},
			tapMoney(i) {
				this.phoneMoney.map((item, index) => {
					this.phoneMoney[index].isActive = false;
				})
				this.phoneMoney[i].isActive = true;
				this.rechargeType == 0 ? this.moneyName = this.phoneMoney[i].label : this.moneyName = this.phoneMoney[i].value
			},
			videoMoney(index) {
				this.videoMoneyList.forEach((v, i) => {
					if (index == i) {
						v.active = true
						this.videoMoneyInput = v.name
					} else {
						v.active = false
					}
				})
			},
			qqMoneyFn(index) {
				this.qqMoney.forEach((v, i) => {
					if (index == i) {
						v.active = true
						this.videoMoneyInput = v.name
					} else {
						v.active = false
					}
				})
			},
			showsortlist(index) {
				this.changeIndex(index)
			},
			changeIndex(index) {
				this.tabIndex = index
				this.sortlist.forEach((v, i) => {
					if (index == i) {
						v.active = true
					} else {
						v.active = false
					}
				})
			},
			selectVideoFn(index) {
				this.videoList.forEach((v, i) => {
					if (index == i) {
						v.active = true
						this.videoNmae = v.name
					} else {
						v.active = false
					}
				})
			},
			onConfirmRechargeType(val) {
				this.rechargeTypeName = val.result;
				this.rechargeType = val.defaultVal[0];
			},
			onConfirmRegionType(val) {
				this.regionType = val.checkArr[0] + val.checkArr[1];
			},
			rechargeTypeShow() {
				this.$refs.rechargeType.show();
			},
			regionTypeShow() {
				this.$refs.regionType.show();
			},
			submit(i) {
				let searchName = ''
				let {
					checkNull
				} = this.$checkForm
				let region
				switch (i) {
					case 0:
						if (!checkNull(this.rechargeTypeName, '请选择一个充值类型！') || !checkNull(this.regionType, '请选择充值地区！') || !checkNull(this
								.moneyName, '请选择充值金额！')) {
							return
						}
						if (this.rechargeType == 1) {
							searchName = '流量'
							this.phoneMoney.forEach((v, i) => {
								if (v.isActive) {
									this.moneyName = v.value
								}
							})
						} else {
							searchName = '话费'
							this.phoneMoney.forEach((v, i) => {
								if (v.isActive) {
									this.moneyName = v.label
								}
							})
						}

						if (this.regionType.includes('省')) {
							region = this.regionType.replace('省', '')
						} else if (this.regionType.includes('市')) {
							region = this.regionType.replace('市', '')
						} else if (this.regionType.includes('壮族自治区')) {
							region = this.regionType.replace('壮族自治区', '')
						} else if (this.regionType.includes('自治区')) {
							region = this.regionType.replace('自治区', '')
						}
						let data = `${region}${this.moneyName}${searchName}`
						uni.navigateTo({
							url: `/pages/search/content?search=${data}`
						});
						break
					case 1:
						if (!checkNull(this.videoNmae, '请选择一个会员平台类型！')) {
							return
						}
						uni.navigateTo({
							url: `/pages/search/content?search=${this.videoNmae}`
						});
						break
					case 2:
						uni.navigateTo({
							url: `/pages/search/content?search=Q币充值`
						});
						break
					default:
						break;
				}
			}
		},
		onReady: function() {

		},
		onLoad: function(e) {
			this.payCommArrFn()
		}
	}
</script>
<style>
	@import "../../static/css/global.css";

	/* 头部种类 */
	page,
	.content {
		height: 100%;
		padding: 0;
		background-color: #f5f5f5;
	}

	.sort_bar {
		background-color: #fff;
	}

	.sort_bar .sort_box {
		display: flex;
		height: 94rpx;
		justify-content: center;
		align-items: center;
		color: #666666;
	}

	.sort_bar .sort_box .sort {
		height: 94rpx;
		line-height: 94rpx;
		text-align: center;
		font-size: 24rpx;
		position: relative;
	}

	.sort_bar .sort_box .sort.active {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		
	}
	.sort_bar .sort_box .sort.active:after {
		content: '';
		position: absolute;
		width: 101rpx;
		height: 13rpx;
		background: url(../../static/image/index/nav_icon.png) no-repeat;
		background-size: 100% 100%;
		bottom: 16rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.item_page {
		padding: 40rpx;
		background-color: #fff;
	}

	.item_page .btn_box {
		background-color: #f2f2f2;
		border-radius: 80rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin-bottom: 15px;
		color: #999999;
	}
	.item_page .btn_box .btn {
		color: #999999;
	}
	.payMoney_box {
		padding: 35rpx;
		background-color: #fff;
		margin: 32rpx 38rpx 0  38rpx;
		width: auto;
	}

	.payMoney_box .title {
		
		
		display: flex;
		align-items: center;
		justify-content: center;
		
		
	}
	.payMoney_box .title .title_icon {
		height: 32rpx;
		width: 27rpx;
		margin-right:10rpx
	}
	.payMoney_box .title .title_text {
		color: #36A9FF;
		font-weight:bold;
		font-size: 26rpx;
	}
	.payMoney_box .money_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.payMoney_box .money_box .money {
		width: 182rpx;
		height: 96rpx;
		border-radius: 10rpx;
		line-height: 96rpx;
		text-align: center;
		margin-top: 25rpx;
		border: 1px solid #D0D0D0;
		font-size: 28rpx;
		color: #7C7C7C;
	}

	.payMoney_box .money_box .active {
		color: #000;
		font-weight: 800;
		background: url(../../static/image/index/select_icon.png) no-repeat ;
		background-size: 100% 100%;
		border-color: rgba(0,0,0,0);
	}

	.video_box {
		padding: 34rpx;
		background-color: #fff;
		margin: 32rpx 38rpx 0 38rpx;
		width: auto;
		
	}

	.video_box .title {
		font-weight:bold;
		font-size: 26rpx;
		color:#2CA5FF ;
	}

	.video_box .video_list_box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.video_box .video_list {
		width: 182rpx;
		height: 125rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin-top: 25rpx;
		border: 1px solid #e8e8e8;
	}

	.video_box .video_list.active {
		color: #000;
		font-weight: 800;
		background: url(../../static/image/index/select_icon_big.png) no-repeat;
		background-size: 100% 100%;
		border-color: rgba(0,0,0,0);
	}

	.video_box .video_list .image_box {
		width: 60rpx;
		height: 60rpx;
		margin: 12rpx auto 0;
	}

	.video_box .video_list .image_box image {
		width: 100%;
		height: 100%;
	}

	.video_box .video_list .text {
		font-size: 24rpx;
		margin-top: 6rpx;
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.submit_btn {
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		color: #000;
		font-size: 38rpx;
		font-size: 36rpx;
		background: #fff600;
		margin-top: 80rpx;
		position: fixed;
		left: 0;
		bottom: 0;
	}
</style>
