<template>
	<view>
		<view class="listBar">
			<view class="header_bar">
				<view class="header_img">
					<image :src="user.avatar" mode=""></image>
				</view>
				<view class="username_box">
					<view class="username">
						{{user.nickName}}
					</view>
					<view class="code">
						{{user.inviterCode}}
					</view>
				</view>
			</view>
			<view class="fans_num_box">
				<view class="fans_num_list">
					<view class="num_box">
						<text class="fans_num">26</text>
						<text>人</text>
					</view>
					<view class="time">
						今日
					</view>
				</view>
				<view class="fans_num_list">
					<view class="num_box">
						<text class="fans_num">26</text>
						<text>人</text>
					</view>
					<view class="time">
						今日
					</view>
				</view>
				<view class="fans_num_list">
					<view class="num_box">
						<text class="fans_num">26</text>
						<text>人</text>
					</view>
					<view class="time">
						直属粉丝
					</view>
				</view>
				<view class="fans_num_list">
					<view class="num_box">
						<text class="fans_num">26</text>
						<text>人</text>
					</view>
					<view class="time">
						直属粉丝邀请
					</view>
				</view>
			</view>
		</view>
		
		<view class="pro_box">
			<view class="pro_num_box pro_num_box1">
				<view class="pro_num">
					<text class="num">26</text>
					<text>人</text>
				</view>
				<view class="pro_text">
					直属推广
				</view>
			</view>
			<view class="pro_num_box pro_num_box2">
				<view class="pro_num">
					<text class="num">26</text>
					<text>人</text>
				</view>
				<view class="pro_text">
					总人数
				</view>
			</view>
		</view>
		<view class="searchBar">
			<view class="searchBox">
				<input class="searchInput" type="text" v-model="searchContent" placeholder="请输入昵称或手机号" @confirm="initList(0,0,'totalNum',searchContent)">
				<view class="icon" @tap="initList(0,0,'totalNum',searchContent)">
					<image src="/static/image/home/search-icon-gray.png"></image>
				</view>
			</view>
		</view>
		<view class="contentBar">
			
			<view class="inviteListBar" v-for="(item,index) in dataList" :key="index">
				<view class="inviterList" @click="lookFans(item.id)">
					<view class="userInfoBox">
						<view class="img">
							<image :src="item.avatar||'/static/image/home/user-icon.png'"></image>
						</view>
						<view class="info">
							<view class="name">{{item.nickName}}<text class="subText">{{item.mobile}}</text></view>
							<view class="tipsBox">
								<text class="tips">{{item.gradeName}}</text>
							</view>
							<view class="dateTime">{{item.createTime}}</view>
						</view>
					</view>
					<view class="orderCountBox">
						<view class="title">
							<view class="">
								{{item.totalNum}}
							</view>
							<view class="">
								邀请人数
							</view>
						</view>
						<view class="title">
							<view class="">
								{{item.orderCount}}
							</view>
							<view class="">
								订单数量
							</view>
						</view>
					</view>
				</view>
			</view>
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<loadding :isShow='loadIsShow'></loadding>
		<popup ref="popup" type="center">
			<view class="fans-info">
				<view class="avatar-box">
					<image class="avatar" :src="userinfo.avatar||defaultAvatar" mode=""></image>
				</view>
				<view class="fans-head">
					<view class="fans-bar">
						<view class="grade">
							{{gradeName}}
						</view>
						<view class="close-icon" @click="closePopup">
							&#xe608;
						</view>
					</view>
					<view class="name">
						{{userinfo.nickName}}
					</view>
					<view class="code">
						<text>邀请码：{{userinfo.inviterCode}}</text>
						<view class="copy" @tap="copyCode(userinfo.inviterCode)">
							复制
						</view>
					</view>
					<view class="wechat">
						微信号：{{userinfo.weixin? userinfo.weixin:"未填写"}}
					</view>
				</view>
				<view class="fans-body">
					<view class="fans-num">
						<view class="num">
							{{userinfo.totalNum}}
						</view>
						<view class="num-text">
							粉丝数
						</view>
					</view>
					<view class="income">
						<view class="last-month">
							<view class="income-num">
								{{userinfo.totalCommissionBalance}}元
							</view>
							<view class="income-text">
								上月预估收入
							</view>
						</view>
						<view class="line">

						</view>
						<view class="total-income">
							<view class="income-num">
								{{userinfo.totalMoney}}元
							</view>
							<view class="income-text">
								累积收益
							</view>
						</view>
					</view>
					<view class="register-time">
						注册时间：{{userinfo.createTime}}
					</view>
				</view>
			</view>

		</popup>
	</view>
</template>
<script>
	import popup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				defaultAvatar: '/static/image/home/user-icon.png',
				keyword: '',
				searchContent: '',
				time: 0, //时间（0全部，1今日/本月，2昨日/上月，其它为时间戳，默认0）
				type: 0, //（0全部，1一级好友，2二级好友，默认0）
				timeType: 1, //时间类型（1天，2周，3月，4年 默认1）
				page: 1,
				dataList: [],
				loadIsShow: true,
				totalData: '',
				loadingType: 0,
				totalList: -1,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "暂无更多数据"
				},
				dataMoer: false,
				listAcctive: [{
						name: 'totalNum',
						active: true
					},
					{
						name: 'subOneNum',
						active: false
					},
					{
						name: 'todayNum',
						active: false
					},
					{
						name: 'yestodayNum',
						active: false
					},
					{
						name: 'subOneNumS',
						active: false
					},
					{
						name: 'subTwoNum',
						active: false
					},
				],
				gradeName: '',
				userinfo: '',
				user:','
			}
		},

		components: {
			popup
		},
		onLoad: function() {
			this.getTotalData()
			this.getList()
			this.user = this.$storage.get('userInfo')
		},
		onShow: function() {

		},
		onReachBottom: function() {
			this.getList(true);
		},
		methods: {
			copyCode(code) {
				this.$common.copy(code)
			},
			closePopup() {
				this.$refs.popup.close()
			},
			lookFans(id) {
				this.$http.post('/api/inviter/getDetail', {
					buyerId: id
				}).then(res => {
					this.gradeName = this.$store.state.jxConfig.config.gradeList[res.data.grade]
					res.data.createTime = this.$common.timeFormat(res.data.createTime)
					res.data.avatar = this.$common.qiniuCdnUrl(res.data.avatar)
					this.userinfo = res.data
				})
				this.$refs.popup.open()
			},
			goDetail() {
				uni.navigateTo({
					url: './detail'
				})
			},
			initList(type, time, activeName, keyword) {
				this.type = type
				this.time = time
				this.page = 1
				this.dataList = []
				this.totalList = -1
				keyword ? this.keyword = keyword : this.keyword = ''
				if (activeName) {
					this.listAcctive.forEach((v, i) => {
						if (v.name == activeName) {
							v.active = true
						} else {
							v.active = false
						}
					})
				}
				this.getList()
			},
			async getList(more) {
				if (this.dataMoer) {
					return
				}
				if (!more) {
					this.loadIsShow = true
				}

				this.loadingType = 1
				let obj = {
					type: this.type,
					time: this.time,
					keyword: this.keyword,
					page: this.page,
					timeType: this.timeType,
					pageSize: 20
				}
				let res = await this.$http.post('/api/inviter/getList', obj)
				this.dataMoer = false
				this.loadIsShow = false
				if (this.totalList == this.dataList.length || res.data.total == 0) {
					this.loadingType = 2
					return
				}
				this.totalList = res.data.total
				let picUrl = this.$store.state.jxConfig.config.qiniuCdnUrl
				if (res.data.list.length > 0) {
					res.data.list.map((v, i) => {
						if (v.avatar) {
							v.avatar = picUrl + v.avatar
						}
						v.createTime = this.$common.timeFormat(v.createTime)
						v.gradeName = this.$store.state.jxConfig.config.gradeList[v.grade]
					})
				}

				this.dataList = this.dataList.concat(res.data.list)
				if (res.data.total == this.dataList.length) {
					this.loadingType = 2
					return
				}
				this.page++
			},
			async getTotalData() {
				let res = await this.$http.post('/api/inviter/getIndex')
				this.totalData = res.data
			}
		}

	}
</script>

<style>
	@import "../../static/css/global.css";

	page {
		background-color: #fff;
	}

	@font-face {
		font-family: 'iconfont';
		/* project id 1124562 */
		src:
			url('https://at.alicdn.com/t/font_1124562_89udr5pl09k.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1124562_89udr5pl09k.svg#iconfont') format('svg');
	}
	
	.pro_box {
		display: flex;
		
		margin-top:100rpx;
		justify-content: space-between;
	}
	.pro_num_box {
		height: 176rpx;
		width: 368rpx;
		display: flex;
		padding-left: 188rpx;
		flex-direction: column;
		
	}
	.pro_num_box .pro_num {
		margin-top: 20rpx;
	}
	.pro_num_box .num {
		font-size: 56rpx;
		font-weight: bold;
	}
	.pro_num_box1 {
		background: url(../../static/image/home/fans.png) no-repeat;
		background-size: 100% 100%;
	}
	.pro_num_box2 {
		background: url(../../static/image/home/fans_blue.png) no-repeat;
		background-size: 100% 100%;
	}
	.listBar {
		background-color: #fff;
	}
	.fans_num_box {
		width: 720rpx;
		height: 144rpx;
		background-color: #fff;
		border-radius: 144rpx;
		position: absolute;
		border-radius: 144rpx;
		bottom: -72rpx;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 54rpx;
		display: flex;
		box-shadow:1px 10px 16px 0px rgba(118,118,118,0.07);
		
	}
	.fans_num_list {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.fans_num_list  .num_box {
		/* text-align: center; */
		margin-top: 26rpx;
	}
	.fans_num {
		font-size: 44rpx;
		font-weight: bold;
	}
	.time {
		font-size: 24rpx;
		margin-top: 4rpx;
	}
	.header_bar {
		display: flex;
		height: 300rpx;
		background: #ffe600;
		align-items: center;
		padding-left: 46rpx;
		padding-bottom: 70rpx;
		
	}
	.header_img {
		width: 134rpx;
		height: 134rpx;
	}
	.header_img  image{
		width: 134rpx;
		height: 134rpx;
		border-radius: 134rpx;
	}
	.username_box {
		height: 134rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		flex: 1;
		margin-left: 20rpx;
	}
	.username_box  .username {
		font-size: 38rpx;
		font-weight: bold;
		margin-bottom: 16rpx;
	}
	.username_box  .copy  {
		font-size: 34rpx;
	}
	.fans-info {
		height: 800upx;
		width: 600upx;
		background-color: #fff;
		border-radius: 30upx;
		position: relative;
		color: #333;
		margin: 0 auto;
	}

	.avatar-box {
		position: absolute;
		width: 130upx;
		height: 130upx;
		border-radius: 130upx;
		background-color: #fff;
		top: -30upx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar {
		width: 106upx;
		height: 106upx;
		border-radius: 106upx;
		border: 2upx solid #333333;

	}

	.fans-head {
		height: 360upx;
		background-color: #f8d94a;
		border-top-left-radius: 30upx;
		border-top-right-radius: 30upx;
	}

	.fans-bar {
		display: flex;
		height: 72upx;
		align-items: center;
		justify-content: space-between;
	}

	.grade {
		background-color: #333;
		width: 122upx;
		color: #FFE000;
		border-radius: 10upx;
		font-size: 24upx;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
		margin-left: 20upx;
	}

	.close-icon {
		font-family: 'iconfont';
		font-size: 24upx;
		width: 72upx;
		text-align: center;
		line-height: 72upx;
		height: 72upx;

	}

	.fans-info .name {
		color: #333;
		font-size: 32upx;
		margin-top: 40upx;
		text-align: center;
		line-height: 32upx;
	}

	.fans-info .code {
		display: flex;
		padding-left: 130upx;
		margin-top: 40upx;
	}

	.fans-info .wechat {
		padding-left: 130upx;
		margin-top: 20upx;
	}

	.fans-info .copy {
		width: 100upx;
		height: 40upx;
		background-color: #fff;
		text-align: center;
		line-height: 40upx;
		border-radius: 10upx;
		font-size: 26upx;
		border: 2upx solid #334455;
		margin-left: 16upx;
	}

	.fans-body {
		background-color: #fff;
		overflow: hidden;
		height: 440upx;
		border-bottom-left-radius: 30upx;
		border-bottom-right-radius: 30upx;
	}

	.fans-body .fans-num {
		margin-top: 20upx;
	}

	.fans-num .num {
		font-size: 80upx;
		text-align: center;
		line-height: 80upx;
		height: 80upx;
	}

	.fans-num .num-text {
		text-align: center;
		font-size: 26upx;
		margin-top: 10upx;
	}

	.income {
		display: flex;
		height: 96upx;
		align-items: center;
		margin-top: 30upx;
	}

	.last-month,
	.total-income {
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: center;
	}

	.income-num {
		text-align: center;
		font-size: 32upx;
	}

	.income-text {
		text-align: center;
	}

	.income .line {
		height: 60upx;
		width: 2upx;
		background-color: #dddddd;
	}

	.register-time {
		text-align: center;
		margin-top: 100upx;
		font-size: 24upx;
	}

	.listBar {
		position: relative;
	}

	.listBar .topBar {
		padding: 20rpx;
		position: absolute;
		left: 0;
		bottom: -210rpx;
	}

	/* 浮动*/
	.listBar .topBar .topBox {
		background-color: #ffffff;
		border-radius: 20rpx;
	}

	.topBox .totalbar {
		border-bottom: 1px solid #f0f0f0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}

	.topBox .totalbar .fansCountBar {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.topBox .totalbar .fansCountBar .fansCountBox {
		width: 200rpx;
		height: 200rpx;
		border-radius: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 20rpx solid #e4e4e4;
	}

	.topBox .totalbar .fansCountBar .fansCountBox.active {
		border: 20rpx solid #fd9067
	}

	.fansCount .title,
	.fansCount .count {
		text-align: center;
		
	}

	.fansCountBox.active .fansCount .count text {
		color: #de4724;
		font-weight: bold;
		font-size: 32rpx;
	}

	.fansRow {
		padding: 20rpx;
	}

	.fansRow .flexBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fansRow .flexBox .count {
		border-right: 1px solid #f0f0f0;
		text-align: center;
	}

	.fansRow .flexBox .count:last-child {
		border: none
	}

	.fansRow .flexBox .count.w20 {
		width: 20%;
	}

	.fansRow .flexBox .count.w30 {
		width: 30%;
	}

	.fansRow .flexBox .count text {
		font-weight: bold;
		font-size: 32rpx;
	}

	.fansRow .flexBox .count.active .colorStyle,
	.fansRow .flexBox .count.active text {
		color: #ec3f43;
	}

	.contentBar {	
		margin: 20rpx;
		background-color: #f6f6f6;
		padding: 14rpx;
		box-sizing: border-box;
		width: auto;
		border-radius: 12rpx;
	}
	
	.searchBar,
	.inviteListBar {
		background-color: #ffffff;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.searchBar .searchBox {
		background-color: #f0f0f0;
		border-radius: 30rpx;
		padding: 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.searchBar .searchBox .icon {
		width: 37rpx;
		height: 37rpx;
	}

	.searchBar .searchBox .icon image {
		width: 100%;
		height: 100%;
	}

	.searchBar .searchBox .searchInput {
		flex: 1;
	}

	.inviteListBar {
		width: 682rpx;
		margin: 0 auto 14rpx ;
	}

	.inviteListBar .inviterList {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inviteListBar .inviterList .userInfoBox {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.inviteListBar .inviterList .orderCountBox {
		width: auto;
		padding-left: 20rpx;
		border-left: 1px solid #f0f0f0;
	}
	.inviteListBar .inviterList .orderCountBox .title {

		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.inviteListBar .inviterList .orderCountBox .title view {
		font-size: 22rpx;
	}
	.userInfoBox .img {
		width: 136rpx;
		height: 136rpx;
		margin-right: 20rpx;
		border-radius: 50%;
	}

	.userInfoBox .img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.userInfoBox .info {
		flex: 1;
	}

	.userInfoBox .info .name {
		font-size: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.userInfoBox .info .name .subText {
		font-size: 24rpx;
		color: #909090;
		margin-right: 18rpx;
	}

	.userInfoBox .info .tipsBox {
		margin: 10rpx 0;
	}

	.userInfoBox .info .tips {
		font-size: 20rpx;
		background-color: #f2f2f2;
		color: #909090;
	}

	.userInfoBox .info .dateTime {
		color: #909090;
	}

	.inviteListBar .inviterList .orderCountBox .title:last-child {
		margin-top: 10rpx;
	}

	.inviteListBar .inviterList .orderCountBox .count {
		padding: 0 10rpx;
	}
</style>
