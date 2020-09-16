<template>
	<view class="income">
		<view class="head-box">
			<view class="balance-title">
				账户余额（元）
			</view>
			<view class="balance-num">
				&yen; {{totalIncome}}
			</view>
			<view class="bill-detail" @tap="goBill">
				账单详情
			</view>
			<view class="tip">
				<text class="icon">&#xe65b;</text>每月25号结算上月收益
			</view>
			<view class="cash" @tap="goCash">
				提现
			</view>
		</view>
		<view class="type-box">
			<view :class="[ 'type-list', swiperCurrentIndex == 0? 'active':'']" @tap="changeSwiper(0)">
				淘宝
			</view>
			<view :class="[ 'type-list', swiperCurrentIndex == 1? 'active':'']" @tap="changeSwiper(1)">
				京东
			</view>
			<view :class="[ 'type-list', swiperCurrentIndex == 2? 'active':'']"@tap="changeSwiper(2)">
				拼多多
			</view>
		</view>
		<view class="swiper-box">
			<swiper :current="swiperCurrentIndex" @change="chageStatus" style="height: 876upx;">
				<swiper-item class="sitem" style="height: 876upx;" v-for="(item,index) in typeData" :key="index">
					<view class="day-head">
						<view class="sitem-title">
							日预估收入
						</view>
						<view class="description-box" @tap="showRule('day')">
							<view class="title-text">
								说明
							</view>
							<text class="title-icon">
								&#xe644;
							</text>
						</view>
					</view>
					<view class="day-income">
						<image class="day-icon" src="../../static/image/home/icon_jinri.png" mode=""></image>
						<view class="pay-num">
							<view class="day-text">
								付款笔数
							</view>
							<view class="day-num">
								{{item.day.todayOrderNum}}
							</view>
						</view>
						<view class="income">
							<view class="day-text">
								成交预估收入
							</view>
							<view class="day-num">
								&yen; {{item.day.todayTotalCommission}}
							</view>
						</view>
						<view class="income">
							<view class="day-text">
								结算预估收入
							</view>
							<view class="day-num">
								&yen; {{item.day.todayTotalCommissionBalance}}
							</view>
						</view>
					</view>
					<view class="day-income lastday">
						<image class="day-icon" src="../../static/image/home/icon_zuotian.png" mode=""></image>
						<view class="pay-num">
							<view class="day-text">
								付款笔数
							</view>
							<view class="day-num">
								{{item.day.yestodayOrderNum}}
							</view>
						</view>
						<view class="income">
							<view class="day-text">
								成交预估收入
							</view>
							<view class="day-num">
								&yen; {{item.day.yestodayTotalCommission}}
							</view>
						</view>
						<view class="income">
							<view class="day-text">
								结算预估收入
							</view>
							<view class="day-num">
								&yen; {{item.day.yestodayTotalCommissionBalance}}
							</view>
						</view>
					</view>
					<view class="day-head">
						<view class="sitem-title">
							月预估收入
						</view>
						<view class="description-box" @tap="showRule('month')">
							<view class="title-text">
								说明
							</view>
							<text class="title-icon">
								&#xe644;
							</text>
						</view>
					</view>
					<view class="month-income">
						<view class="income-box">
							<view class="income">
								<view class="month-text">
									本月消费预估收入
								</view>
								<view class="month-num">
									&yen; {{item.month.thisTotalCommission}}
								</view>
							</view>
							<view class="income">
								<view class="month-text">
									本月结算预估收入
								</view>
								<view class="month-num">
									&yen; {{item.month.thisTotalCommissionBalance}}
								</view>
							</view>
						</view>
						<view class="income-box">
							<view class="income">
								<view class="month-text">
									上月消费预估收入
								</view>
								<view class="month-num">
									&yen; {{item.month.lastTotalCommission}}
								</view>
							</view>
							<view class="income">
								<view class="month-text">
									上月结算预估收入
								</view>
								<view class="month-num">
									&yen; {{item.month.lastTotalCommissionBalance}}
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="rule" @tap="showRule('all')">
			规则说明
		</view>
		<popup ref="popup" type="center">
			<view class="rule-detail" v-if="ruleType == 'day'">
				<view class="rule-title">
					日预估收入说明
				</view>
				<view class="rule-content">
					<view class="rule-item">
						<text class="rule-label">
							1.付款笔数：
						</text>
						<text class="rule-text">
							今/昨当日付款笔数
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-label">
							2.成交预估收入：
						</text>
						<text class="rule-text">
							今/昨订单还没有确认收货的佣金
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-label">
							3.结算预估收入：
						</text>
						<text class="rule-text">
							今/昨确认收货的订单包括上月的订单在今/昨确定
						</text>
					</view>
				</view>
				<view class="popup-btn" @tap="closeRule">
					知道了
				</view>
			</view>
			<view class="rule-detail" v-if="ruleType == 'month'">
				<view class="rule-title">
					月预估收入说明
				</view>
				<view class="rule-content">
					<view class="rule-item">
						<text class="rule-label">
							1.月消费预估收入：
						</text>
						<text class="rule-text">
							本月/上月卖出去的所有佣金
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-label">
							2.本月消费结算预估收入：
						</text>
						<text class="rule-text">
							在本月内确认收货的订单，包括上月的订单在本月内确认的
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-label">
							3.上月消费结算预估收入：
						</text>
						<text class="rule-text">
							本月25号可提现金额。（如果该数据为0，即本月不可提现）
						</text>
					</view>
				</view>
				<view class="popup-btn" @tap="closeRule">
					知道了
				</view>
			</view>
			<view class="rule-detail" v-if="ruleType == 'all'">
				<view class="rule-title">
					规则说明
				</view>
				<view class="rule-content">
					<view class="rule-item">
						<text class="rule-text">
							1.下单支付后在预估收入里查看（会有不定期的延时
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">
							2.订单在确认收货（结算）后才会呈现在结算预估收入里
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">
							3.当申请售后（维权）成功后会从预估收入及结算预估收入中剔除
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">
							4.退款退货、取消订单、申请售后维权都会产生预估收入和结算收入的数据变动
						</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">
							5.如若遇到其他以上之外的情况，请直接联系客服
						</text>
					</view>
				</view>
				<view class="popup-btn" @tap="closeRule">
					知道了
				</view>
			</view>
		</popup>
	</view>
</template>
<script>
	var _self;
	var baseurl;
	import popup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return { 
				swiperCurrentIndex:0,
				header: '',
				newsData:[],
				linkurl:'',
				money:0,
				typeData: [],
				totalIncome: '',
				ruleType: ''
			}
		},
		components: {
			popup
		},
		filters: {
			numFilter(value) {
				// 截取当前数据到小数点后两位
				let realVal = parseFloat(value).toFixed(2)
				// num.toFixed(2)获取的是字符串
				return parseFloat(realVal)

			}
		},
		onShow: function() {
			this.userInfo()
			console.log('is incomePage')
		},
		onLoad: function() {

		},
		onPullDownRefresh() {
			this.userInfo()
			
		},
		methods: {
			closeRule() {
				this.$refs.popup.close()
			},
			showRule( type ) {
				this.ruleType = type
				this.$refs.popup.open()
			},
			goBill() {
				uni.navigateTo({
					url:'/pages/user/bill'
				})
			},
			goCash() {
				uni.navigateTo({
					url: '/pages/user/fetchMoney'
				})
			},
			changeSwiper(index) {
				this.swiperCurrentIndex = index
			},
			chageStatus(e) {
				if(this.swiperCurrentIndex == e.detail.current) {
					return
				}
				this.swiperCurrentIndex = e.detail.current
			},
			back: function() {
				uni.navigateBack();
			},
			tixian:function(){
				this.$http.post('/api/alipay/getDetail')
				.then(res=>{
					if(res.code<0){
						this.$msg.confirm({
							title:'温馨体系',
							content:'请先绑定支付宝账号！'
						},function(){
							uni.navigateTo({
								url: "./addZhiFuBao"
							})
						})
						
					}else{
						uni.navigateTo({
							url: "./fetchMoney"
						})
					}
				})
			},
			async userInfo() {
				// 判断用户是否登录，并判断用户时候有个推
				console.log(baseurl);
				let taobao = await this.$http.post('/api/buyer/getEarnings',{type:1})
				let jingdong = await this.$http.post('/api/buyer/getEarnings',{type:2})
				let pinduoduo = await this.$http.post('/api/buyer/getEarnings',{type:3})
				let total = await this.$http.post('/api/buyer/getEarnings',{type:3})
				this.totalIncome = total.data.total.withdrawMoney
				this.typeData.push(taobao.data) 
				this.typeData.push(jingdong.data) 
				this.typeData.push(pinduoduo.data)
				uni.stopPullDownRefresh();
			},
			

		}
	}
</script>
<style>
	@font-face {
	  font-family: 'iconfont';  
	  src: 
	  url('https://at.alicdn.com/t/font_1124562_0hiuxltmd7tm.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1124562_0hiuxltmd7tm.svg#iconfont') format('svg');
	}
	page{
		background-color: #f9f9f9;
		color: #333;
		font-size: 28upx;
		padding-bottom: 50upx;
	}
	.head-box {
		background-color: #fbe950;
		padding: 20upx 50upx;
		box-sizing: border-box;
		position: relative;
	}
	.balance-num {
		font-size: 64upx;
	}
	.bill-detail {
		margin-top: 16upx;
		height: 48upx;
		width: 160upx;
		border-radius: 60upx;
		text-align: center;
		line-height: 48upx;
		border: 2upx solid #333;
	}
	.cash {
		position: absolute;
		width: 152upx;
		text-align: center;
		line-height: 44upx;
		background-color: #333;
		color: #e8e8e8;
		right: 50upx;
		top: 60upx;
		border-radius: 44upx;
	}
	.tip {
		background-color: #fef85d;
		font-size: 24upx;
		padding: 0 20upx;
		margin-top: 20upx;
		line-height: 40upx;
		border-radius: 40upx;
		width: 280upx;
	}
	.icon {
		font-size: 24upx;
		color: #f5bf43;
		font-family: 'iconfont';
		margin-right: 6upx;
	}
	.type-box {
		height: 80upx;
		display: flex;
		background-color: #fff
	}
	.type-list {
		flex: 1;
		text-align: center;
		font-size: 34upx;
		color: #a3a3a3;
		line-height: 80upx;
		position: relative;
	}
	.active {
		color: #333;
	}
	.active::after {
		content: '';
		display: block;
		position: absolute;
		width: 30upx;
		height: 6upx;
		background: #fbe950;
		border-radius: 6upx;
		left: 50%;
		bottom: 6upx;
		transform: translateX(-50%);
	}
	swiper-item {
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.day-head {
		display: flex;
		height: 80upx;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		
	}
	.sitem-title {
		font-size: 30upx;
	}
	.description-box {
		display: flex;
		align-items: center;
		height: 100%;
	}
	.title-text {
		color: #a3a3a3;
		
	}
	.title-icon {
		font-family: 'iconfont';
		font-size: 18upx;
		height: 30upx;
		width: 30upx;
		border-radius: 50%;
		text-align: center;
		line-height: 30upx;
		color: #a3a3a3;
		background: #eceff2;
		border-radius: 30upx;
		margin-left: 4upx;
	}
	.day-income {
		padding: 40upx 0;
		position: relative;
		display: flex;
		background-color: #fff;
		border-radius: 20upx;
	}
	.day-income .pay-num, .day-income .income {
		flex: 1;
	}
	.day-text,.month-text {
		text-align: center;
		color: #a3a3a3;
	}
	.pay-num .day-num  {
		color: #76c3fa;
	}
	.day-num ,.month-num {
		margin-top: 10upx;
		color: #e0ad5b;
		text-align: center;
		font-size: 32upx;
	}
	.day-icon {
		position: absolute;
		width: 64upx;
		height: 64upx;
		top: 0;
		left: 0;
	}
	.lastday {
		margin-top: 20upx;
	}
	.month-income {
		background-color: #fff;
		border-radius: 20upx;
	}
	.income-box{
		display: flex;
		padding: 30upx 0;
	}
	.income-box .income {
		flex: 1;
	}
	.income-box .income .month-num {
		margin-top: 26upx;
	}
	.income-box:last-child {
		border-top: 2upx solid #f2f2f2;
	}
	.rule {
		position: relative;
		width: 120upx;
		text-align: center;
		right: -600upx;
		color: #e0ad5b;
		border-bottom: 2upx solid #e0ad5b;
		
	}
	.rule-detail {
		width: 500upx;
		background: #fff;
		border-radius: 20upx;
		overflow: hidden;
		padding-bottom: 40upx;
	}
	.rule-title {
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 30upx;
	}
	.rule-content {
		padding: 0 40upx;
		font-size: 24upx;
	}
	.rule-item {
		margin-bottom: 20upx;
	}
	.rule-label {
		color: #333;
	}
	.rule-text {
		color: #ccc;
	}
	.popup-btn {
		height: 72upx;
		width: 200upx;
		border-radius: 72upx;
		background: #fed906;
		color: #333;
		line-height: 72upx;
		text-align: center;
		font-size: 30upx;
		margin: 60upx auto 0;
	}
</style>
