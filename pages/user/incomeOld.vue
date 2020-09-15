<template>

	<view>
		<!-- ./withdraw -->
		<ytHeader title="收益"></ytHeader>
		<view class="bgInfo yj-pad-header">
			<image class="bgInfoimg" src="../../static/img/beijingtu.png" mode="widthFix"></image>
			<view class="yj-text-center yj-relative">
				<view style="margin-top: 80upx;">
					<view class="yj-color-gray ">可提现(元)</view>
					<view class=" yj-text-super yj-color-main yj-text-bold">{{money}}</view> 
				</view>
				<view class="yj-display-flex yj-pad-lr-biger" style="margin-top: 40upx;">
					<view class="yj-flex-1">
						<view class="yj-color-gray yj-text-sm">今日结算预估</view>
						<view class="yj-text-biger yj-text-bold">{{newsData.day?newsData.day.todayTotalCommissionBalance:0}}</view>
					</view>
					<view class="yj-flex-1">
						<view class="yj-color-gray yj-text-sm">本月结算预估</view>
						<view class="yj-text-biger yj-text-bold">{{newsData.month?newsData.month.thisTotalCommissionBalance:0}}</view>
					</view>
				</view>

			</view>
		</view>	
			
		<view class="yj-pad-lr yj-mar-b" >
			<!-- 上月预估 -->
			<view class="yj-list-item">
				<image class="yj-list-item-icon" src="../../static/img/prevmonth.png" mode="widthFix"></image>
				<text class="yj-list-item-text">上月月报<!-- <text class="yj-text-sm yj-color-red">(单位：元)</text> --></text>
			</view>
			<view class="yt-box-shadow-gray yj-radius-sm yj-pad-tb-big">
				<!-- <view class="yj-pad-l-biger">
					<view class="yj-text-sm yj-color-gray">实际预估收益（元）</view>
					<view class="yj-text-big yj-text-bold yj-color-red yj-mar-t-min">{{newsData.PrevMonthDoller?newsData.PrevMonthDoller:0}}</view>
				</view> -->
				<view class="yj-display-flex yj-pad-l-biger yj-mar-t">
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">上月结算预估收入</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month?newsData.month.lastTotalCommissionBalance:0}}</view>
					</view>
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">上月付款预估收入</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month ? newsData.month.lastTotalCommission : 0}}</view>
					</view>
				</view>
				<view class="yj-display-flex yj-pad-l-biger yj-mar-t">
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">上月结算笔数</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month?newsData.month.lastOrderNumBalance:0}}</view>
					</view>
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">上月付款笔数</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month ? newsData.month.lastOrderNum : 0}}</view>
					</view>
				</view>
			</view>
			<!-- 今日日报 -->
			<view class="yj-list-item">
				<image class="yj-list-item-icon" src="../../static/img/jinri.png" mode="widthFix"></image>
				<text class="yj-list-item-text">今日日报<!-- <text class="yj-text-sm yj-color-red">(单位：元)</text> --></text>
			</view>
			<view class="yt-box-shadow-gray yj-radius-sm yj-pad-tb-big">
				<view class="yj-display-flex yj-pad-l-biger yj-mar-t">
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">今日结算预估收入</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.day?newsData.day.todayTotalCommissionBalance:0}}</view>
					</view>
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">今日付款预估收入</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.day ? newsData.day.todayTotalCommission : 0}}</view>
					</view>
				</view>
				<view class="yj-display-flex yj-pad-l-biger yj-mar-t">
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">今日结算笔数</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.day?newsData.day.todayOrderNumBalance:0}}</view>
					</view>
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">今日付款笔数</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.day ? newsData.day.todayOrderNum : 0}}</view>
					</view>
				</view>
			</view>
			<!-- 本月月报 -->
			<view class="yj-list-item">
				<image class="yj-list-item-icon" src="../../static/img/benyue.png" mode="widthFix"></image>
				<text class="yj-list-item-text">本月月报<!-- <text class="yj-text-sm yj-color-red">(单位：元)</text> --></text>
			</view>
			<view class="yt-box-shadow-gray yj-radius-sm yj-pad-tb-big">
				<view class="yj-display-flex yj-pad-l-biger yj-mar-t">
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">本月结算预估收入</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month?newsData.month.thisTotalCommissionBalance:0}}</view>
					</view>
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">本月付款预估收入</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month ? newsData.month.thisTotalCommission : 0}}</view>
					</view>
				</view>
				<view class="yj-display-flex yj-pad-l-biger yj-mar-t">
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">本月结算笔数</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month?newsData.month.thisOrderNumBalance:0}}</view>
					</view>
					<view class="yj-flex-1">
						<view class="yj-text-sm yj-color-gray">本月付款笔数</view>
						<view class="yj-text-big yj-text-bold yj-mar-t-min">{{newsData.month ? newsData.month.thisOrderNum : 0}}</view>
					</view>
				</view>
			</view>
			<view style="color: #999; font-size: 24upx; padding: 30upx 30upx 0; text-align: right;">**每月25号结算上月收益</view>
		</view>
			

	</view>

</template>
<script>
	var _self;
	var baseurl;
	import ytHeader from '../../components/header.vue';
	export default {
		components: {
			ytHeader
		},
		data() {
			return { 
				header: '',
				newsData:[],
				linkurl:'',
				money:0
			}
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
		methods: {
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
				let data = await this.$http.post('/api/buyer/getEarnings',{})
				this.newsData = data.data
				console.log(data)
			},
			

		}
	}
</script>
<style lang="less">
	@import "../../static/css/mycss.less";
	page{
		background-color: #fff;
	}
	.bgInfo {
		width: 750upx;
		height: 517upx;
		position: relative;
		.yj-border-box;
	}
	.bgInfoimg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.dollerInfo {
		width: 90%;
		
		/* height: 200upx; */
		margin-left: 5%;
		margin-top: 20upx;
		position: relative;
	}

/* 	.dollerLeftInfo {
		float: left;
		margin-left: 5%;
	} */

	.dollerMoney {
		margin-top: 10upx;
		font-size: 40upx;
		color: #FD4D67;
	}

	.dollerMoneyInfo {
		margin-top: 20upx;
		font-size: 50upx;
		color: #FD4D67;
	}
	.yt-income-gai{
		display: flex;
		padding:0 60upx;
	}
	.dollerLeft {
		flex: 1;
		text-align: center;
	}

	.grace-list {
		width: 100%;
		background: #FFF;
		padding: 5px 0;
		height: 80upx;
	}

	.grace-list .items {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		position: relative;
	}

	.grace-list .items .icons {
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		flex-shrink: 0;
		overflow: hidden;
		font-size: 0;
	}

	.grace-list .items .icons image {
		width: 40upx;
		height: 40upx;
	}

	.grace-list .items .title {
		width: 100%;
		margin-left: 20upx;
		font-size: 32upx;
		height: 40upx;
		line-height: 40upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.grace-list .title text {
		font-size: 26upx;
		color: #B2B2B2;
		margin-left: 20upx;
		float: right;
	}

	.grace-list>.items:last-child .title {
		border: none !important;
	}

	.grace-list .items .arrow-right {
		font-family: "grace-iconfont" !important;
		font-size: 36rpx;
		font-style: normal;
		height: 56px;
		line-height: 56px;
		text-align: center;
		width: 30px;
		position: absolute;
		z-index: 1;
		right: 0;
		top: 0;
	}

	.grace-list .items .arrow-right:before {
		content: "\e601";
		color: #B2B2B2;
	}

	.grace-list .items .icon-r {
		position: absolute;
		z-index: 1;
		right: 35px;
		top: 0px;
	}
	.dollerNum{
		color:#999;
	}
	.yt-box-shadow-gray{
		box-shadow: 2upx 2upx 20upx #eee,-2upx -2upx 20upx #eee;
	}
	.yt-header,.yt-display-flex{
		display: flex;
	}
	.yt-flex-1,.yt-header-title{
		flex: 1;
		text-align: center;
	}
	.yt-income-info{		
		border-radius: 24upx;
		padding:40upx 0;
	}
	
</style>
