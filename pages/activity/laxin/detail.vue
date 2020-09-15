<template>
	<view>
		<view class="listBar">
			<view class="listBox" v-for="(item,index) in listData" :key="index">
				<view class="dataRow">
					<view class="date">{{item.list[0].dateTime}}</view>
					<view class="moneyBox">奖励：{{item.totalMoney}}元</view>
				</view>
				<view class="list" v-for="(items,indexs) in item.list" :key="indexs">
					<view class="column">
						<view class="name">{{items.nickName}}</view>
						<view class="date">{{items.dateTimes}}</view>
					</view>
					<view class="column textContent">
						<view>佣金</view>
						<view class="money">{{items.commission}}</view>
					</view>
					<view class="column textRight">
						<view class="state">{{items.isBey}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="pageNull" v-if="noDetaShow">
			<view class="pageNullBox">
				<image src="/static/image/common/pageNull.png" mode='widthFix'></image>
			</view>
		</view>
		<loadding :isShow='loadIsShow'></loadding>
	</view>

</template>
<script>

	export default {
		data() {
			return {
				noDetaShow:false,
				loadIsShow:true,
				listData:[],
				toDayMoney:[],
				time:''
			}
		},

		components: {

		},
		onLoad: function(opstion) {
			if(opstion){
				this.time = opstion.time
			}
			this.getData()
		},
		onShow: function() {

		},

		methods: {
			async getData(){
				// type 	类型（0全部，1一级好友，2二级好友，默认0）
				// time		时间（0全部，1今日/本周/本月/本年，2昨日/上周/上月/上年，其它为时间戳，默认0）
				// timeType 时间类型（1天，2周，3月，4年，默认1）
				let obj = {type:0,time:this.time,page:1,timeType:3,pageSize:10000}
				let res = await this.$http.post('/api/inviter/getList',obj)
				this.loadIsShow = false
				let data = res.data.list
				const newDateArr = []
				let page = 0
				data.forEach((item,index)=>{
					item.dateTime = this.$common.timeFormat(item.createTime,'yyyy-mm-dd')
					item.dateTimes = this.$common.timeFormat(item.createTime,'mmddhhii')
					item.isBey = item.commission == 0 ? '待购物' : '已购物'
					if(data[index-1]){
						if(item.dateTime !== data[index-1].dateTime){
							page++
						}
					}
					if(!newDateArr[page]){
						newDateArr[page] = {totalMoney:0,list:[]};
					}
					newDateArr[page].totalMoney += item.commission
					newDateArr[page].list.push(item);
				})
				this.listData = newDateArr
			}
			

		}
	}
</script>

<style>
	@import "../../../static/css/global.css";
	page{background: #ececec;}
	.pageNull{display: flex;justify-content: center;align-items: center; position: fixed;left:0;top:0;bottom:0;right:0;}
	.pageNullBox{width: 180rpx; height: 180rpx;}
	.dataRow{display: flex; justify-content: center;align-items: center; height:70rpx;line-height: 70rpx;}
	.dataRow .date{margin-right: 20rpx;text-align: right;}
	.listBox .list{background-color: #ffffff; padding: 20rpx; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;display: flex; justify-content: center;align-items: center;}
	.listBox .list .textContent{text-align: center;}
	.listBox .list .textRight{text-align: right;}
	.listBox .list .column .name{font-size: 36rpx;}
	.listBox .list .column .date{color:#888888; font-size: 24rpx; margin-top: 20rpx;}
	.listBox .list .column .money{color:#ec3f43; margin-top: 10rpx;}
	.listBox .list .column .state{color:#888888}
</style>
