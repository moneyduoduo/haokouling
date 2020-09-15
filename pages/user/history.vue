<template>
	<view class="history">
		<!-- <view :style="{ height: statusBarHeight+'px' }" class="uni-status-bar"></view> --> <!-- 状态栏占位符 --> 
		<view class="header" :style="{paddingTop: statusBarHeight+'px'}">
			<view class="header-return" @click="back()">
				<image class="return-icon" src="../../static/image/home/return.png" ></image>
			</view>
			<view class="header-title">我的足迹</view>
			<view class="header-right" @click="opercoll">
				<text class="right-text">{{opertxt}}</text>
			</view>
		</view>
		<view class="content" :style="{paddingTop: (statusBarHeight*2)+88+'upx'}">
			<!-- <mescroll @onPullDown="scrollTop" @onLoadMore="scrollEnd"  :scrollHeight="scrollHeight"> -->
			<uni-swipe-action>
				<view class="time-period" v-for="(item,index) in goodsList" :key="index">
					<template v-if="item.list.length != 0">
						<text class="time-head">{{item.time}}</text>
							<template>
								<uni-swipe-action-item v-for="(itemSon,indexSon) in item.list" :key="itemSon.itemId" :auto-close="!isDel" :show="!isDel" :disabled="isDel" :options="options" @click="singleDel(itemSon.id,indexSon,index)" >
								    <view class="goods-list" >
								    	<view class="goods-item">
								    		<view class="del" v-if='isDel'>
								    			<image class="del-img" @tap.stop="addDel(itemSon.id,indexSon,index)" :src="itemSon.isDel ? '/static/img/icon/checked.png':'/static/img/icon/nochecked.png'" mode=""></image>
								    		</view>
								    		<image class="goods-image" :src="itemSon.itemPic" @tap="goGoodsDetail(itemSon.itemId,itemSon.type)"></image>
								    		<view class="goods-info" @tap="goGoodsDetail(itemSon.itemId,itemSon.type)">
								    			<text class="goods-name">{{itemSon.itemTitle}}</text>
								    			<view class="goods-price">
								    				<text class="old-price"><text class="icon-money">&yen;</text>{{itemSon.itemPrice}}</text>
								    				<text class="coupon-money">{{itemSon.couponMoney}}劵</text>
								    			</view>
								    		</view>
								    	</view>
								    </view>
								</uni-swipe-action-item>
							</template>
					</template>
				</view>
			</uni-swipe-action>
			<template v-if="isShow">
				<load-more  :loadingType="loadingType" :contentText="contentText"></load-more>
			</template>
				
			<!-- </mescroll> -->
		</view>
		<view class="del-box" v-if='isDel'>
			<view class="all-del" @tap="addAllDel">
				<image class="add-del-img" :src="isAllDel ? '/static/img/icon/checked.png':'/static/img/icon/nochecked.png'" mode=""></image>
				<text>全选</text>
			</view>
			<view class="del-btn" @tap="comfirmDel">
				删除
			</view>
		</view>
	</view>
	
</template>

<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	import mescroll from '@/components/mescroll.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		components: {
			mescroll,
			uniSwipeActionItem,
			uniSwipeAction
		},
		data (){
			return {
				 options:[ {
						text: '删除',
						style: {
							backgroundColor: '#FD4C66'
						}
					}
				  ],
				isAllDel:false,
				isDel:false,
				isShow:true,
				scrollHeight:500,
				statusBarHeight:statusBarHeight,
				opertxt:'编辑',
				loadingType:1,
				page:1,
				allDelList: new Set(), //删除所有的
				idDelList: [], //需要删除的足迹
 				goodsList:[{time:'今天',list:[]},{time:'昨天',list:[]}],
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "暂无更多数据"
				},
			}
		},
		methods: {
			back()  {
				uni.navigateBack()
			},
			getGoods() {
				return this.$http.post('/api/goodsHistory/getList',{page:this.page}).then( res => {
					this.loadingType = 2
					
					if (res.data.list.length == 0) {
						return
					}
					this.page++ 
					const data = new Date()
					res.data.list.forEach((item, index) => {
						this.allDelList.add(item.id)
						if(this.isAllDel) {
							item.isDel = true
						}else {
							item.isDel = false
						}
						let tempTime = this.$common.timeFormat(item.updateTime,'yyyy-mm-dd')
						let time = tempTime.split('-')
						item.updateTime = this.$common.timeFormat(item.updateTime)
						if(time[0] == data.getFullYear() && time[1] == (data.getMonth() + 1) && time[2] == data.getDate()){ //今天浏览的商品
							this.goodsList[0].list.push(item)
						}else if (time[0] == data.getFullYear() && time[1] == (data.getMonth() + 1) && time[2] == (data.getDate()-1)){ //昨天浏览的商品
							this.goodsList[1].list.push(item)
						}else {
							let flag = false
							for (let i = 0; i < this.goodsList.length; i++) {
								if(this.goodsList[i].time == tempTime) {
									this.goodsList[i].list.push(item)
									flag = true
									break
								}
							}
							if(!flag) {
								let tempGood = {}
								tempGood.time = tempTime
								tempGood.list = [item]
								this.goodsList.push(tempGood)
							}
						}
					})
				})
			},
			goGoodsDetail(itemId,type) {
				if(type == 1) {
					uni.navigateTo({
						url: "../detail/index?itemId=" + itemId
					});
				}
				if(type == 3) {
					uni.navigateTo({
						url: "/pages/pdd/detail/index?itemId=" + itemId
					});
				}
				
			},
			opercoll() {
				if(this.isDel) {
					this.isDel = false
					this.opertxt = '编辑'
				}else {
					this.isDel = true
					this.opertxt = '完成'
					this.idDelList = []
					this.goodsList.forEach(item =>{
						item.list.forEach(v =>{
							v.isDel = false
						})
					})
				}
				
			},
			//添加删除
			addDel(id,indexSon,index) {
				if( this.idDelList.indexOf(id) != -1) {
					this.idDelList.splice(this.idDelList.indexOf(id),1)
					this.goodsList[index].list[indexSon].isDel = false
				}else {
					this.idDelList.push(id)
					this.goodsList[index].list[indexSon].isDel = true
				}
				
			},
			//添加删除全部
			addAllDel() { 
				if( !this.isAllDel ) {
					this.isAllDel = true
					// this.$msg.toast('仅删除已加载的')
					this.idDelList = [...this.allDelList]
					this.goodsList.forEach(item =>{
						item.list.forEach(v =>{
							v.isDel = true
						})
					})
				}else {
					this.isAllDel = false
					this.goodsList.forEach(item =>{
						item.list.forEach(v =>{
							v.isDel = false
						})
					})
					this.idDelList = []
				}
			},
			comfirmDel() {
				let obj = {title:'提示',content:'确定要删除所选足迹记录吗？'}
				this.$msg.confirm(obj,()=>{
					this.goDel();
				})
			},
			goDel() {
				let ids = ''
				let data = null
				if(this.isAllDel) {
					ids = [...this.allDelList].join(',')
					data = this.$http.post('/api/goodsHistory/doBatchDel',{ids}).then( res => {
						this.$msg.toast('删除成功')
						this.isAllDel = false
						this.goodsList =[{time:'今天',list:[]},{time:'昨天',list:[]}]
						this.page =1
						this.getGoods();
					})
				}else if(this.idDelList.length != 0){
					ids = this.idDelList.join(',')
					data = this.$http.post('/api/goodsHistory/doBatchDel',{ids}).then( res => {
						this.$msg.toast('删除成功')
						this.goodsList =[{time:'今天',list:[]},{time:'昨天',list:[]}]
						this.page =1
						this.getGoods();
					})
				}else {
					this.$msg.toast('请选择删除数据')
					return
				}
			},
			singleDel(id,sonIndex,index) {
				let obj = {title:'提示',content:'确定要删除此条足迹记录吗？'}
				this.$msg.confirm(obj,()=>{
					this.$http.post('/api/goodsHistory/doBatchDel',{ids:id}).then( res => {
						this.$msg.toast('删除成功')
						this.allDelList.delete(id)
						console.log(this.goodsList)
						
						this.goodsList[index].list.splice(sonIndex,1)
					})
				})
			}
		
		},
		watch: {
			idDelList: function () {
				if(this.idDelList.length == this.allDelList.size) {
					this.isAllDel = true
				}else {
					this.isAllDel = false
				}
			}
		},
		onReachBottom:function(){
			this.loadingType = 1;
			this.getGoods();
		},
		onPullDownRefresh() {
			this.loadingType = 1;
			let data = null;
			this.goodsList =[{time:'今天',list:[]},{time:'昨天',list:[]}]
			this.page =1
			data = this.getGoods();
			if(data){
				uni.stopPullDownRefresh();
			}
		},
		onReady() {
			let view = uni.createSelectorQuery().in(this).select(".content");
			view.fields({
				size: true,
				scrollOffset: true
			}, data => {
				this.scrollHeight = data.height
				console.log(data.height)
			}).exec();
		},
		onLoad:function() {
			this.getGoods()
		}
	}
</script>

<style >
	/* #ifndef APP-PLUS */
	page {
	    width: 100%;
	    min-height: 100%;
	    display: flex;
	}
	 /* #endif */
	 page {
		background-color: #f2f2f2;
		font-size: 28upx;
	 }
	 .uni-status-bar {
		 position: fixed;
		 top: 0;
		 width: 100%;
		 background-color: #fff;
	 }
	 .history {
	     flex: 1;
	     flex-direction: column;
	     overflow: hidden;
	     background-color: #f2f2f2;
	 }
	.header{
		display: flex;
		position: fixed;
		top: 0;
		padding-top: 40upx;
		width: 100%;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		text-align: center;
		height: 88upx;
		background-color: #FFEB00;
		color:#333;
		z-index: 8888;
	}
	.header-return {
		width: 100upx;
		height: 88upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.return-icon{
		width: 20upx;
		height: 36upx;
		line-height: 40upx;
	}
	.header-title {
		flex: 1;
		align-items: center;
		font-size: 36upx;
	}
	.header-right {
		font-size: 30upx;
		height: 100upx;
		width: 132upx;
		text-align: center;
		line-height: 100upx;
	}
	.right-text {
		font-size: 30upx;
	}
	.content {
		padding-top: 140upx;
	}
	.time-period {
		width: 100%;
		background-color: #fff;
	}
	.time-head {
		color: #999;
		
	}
	.goods-image {
		width: 260upx;
		height: 260upx;
		margin-right: 20upx;
		border-radius: 20upx;
	}
	.time-head {
		font-size: 28upx;
		height: 80upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 30upx;
		border-bottom: 2upx solid #f2f2f2;
	}
	.goods-item {
		position: relative;
		padding: 16upx  30upx;
		border-bottom: 2upx solid #f2f2f2;
		display: flex;
		/* align-items: center; */
	}
	.goods-info {
		display: flex;
	/* 	height: 100%; */
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		transition: all 0.5s ease;
	}
	.goods-name {
		font-size: 30upx;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.goods-price {
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.old-price {
		color: #FD4C66;
		font-size: 32upx;
	}
	.icon-money {
		font-size: 24upx;
	}
	.coupon-money {
		display: flex;
		padding: 0 20upx;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 44upx;
		border-radius: 10upx;
		font-size: 24upx;
		min-width: 60Upx;
		text-align: center;
		color: #fff;
		background: linear-gradient(to right, #FF778B, #FD4D66)
	}
	.coupon-money::before {
		    content: "";
		    position: absolute;
		    width: 8px;
		    height: 8px;
		    z-index: 1;
		    left: -4px;
		    top: 50%;
		    margin-top: -4px;
		    background: #fff;
		    display: block;
		    border-radius: 10px
	}
	.coupon-money::after {
		    content: "";
		    position: absolute;
		    width: 16upx;
		    height: 16upx;
		    z-index: 1;
		    right: -8upx;
		    top: 50%;
		    margin-top: -8upx;
		    background: #fff;
		    display: block;
		    border-radius: 20upx
	}
	.del {
		width: 40upx;
		height: 40upx;
		position: relative;
		top: 50%;
		margin: auto 0;
		margin-right: 20upx;
		transform: translateY(-50%);
		
	}
	.del-img {
		width: 100%;
		height: 100%;
	}
	.del-box {
		display: flex;
		justify-content: space-between;
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		height: 100upx;
		padding: 10upx 40upx;
		background-color: #fff;
		
	}
	.all-del {
		display: flex;
		align-items: center;
	}
	.add-del-img {
		width: 40upx;
		height: 40upx;
		margin-right: 10upx;
	}
	.del-btn {
		width: 240upx;
		background-color: #FFEB00;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12upx;
		font-size: 32upx;
	}
</style>
