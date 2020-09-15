<template>
	<view>
		<view class="yj-header" style="background-color: #ffe600;color:#000">
			<view class="yj-header-return" @click="back()">
				<image src="../../static/image/home/return.png" style="width: 20rpx;height: 36rpx;" ></image>
			</view>
			<view class="yj-header-title">我的收藏</view>
			<view class="yj-header-right" @click="opercoll">{{opertxt}}</view>
		</view>
		<view class="yj-content" :class="[isedit?'yj-mainHF':'yj-mainH']" :style="{paddingTop: 88 +statusBarHeight *2 +'rpx',height: '100vh'}" v-if="show">
			<form @submit="formSubmit" v-if="colldata.length>0">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" class="yj-pad-t yj-border-box" style="height: 100%;padding-top: 0;" v-if="colldata.length>0">
					<!-- 一排显示 -->
					<checkbox-group name="seldata" class="yj-goods-sigle">
						<uni-swipe-action>
							<uni-swipe-action-item v-for="(items, index) in colldata" :key="index" :auto-close="!isedit" :show="!isedit" :disabled="isedit" :options="options" @click="singleDel(items.id)" >
								<view style="width: 100%;display: flex; padding: 22rpx;">
									<label class="yj-pad-r" v-if="isedit" @click="check('item',index)">
										<checkbox class="yj-none" :checked="items.checked" :value="items.id" />
										<image class="yj-icon-smlotter" :src="items.checked?'../../static/image/home/checked.png':'../../static/image/home/nochecked.png'"></image>
									</label>
									<view class="yj-goods-sigle-item" @click="goodsDetail(items.type,items.itemId)">
										<image class="yj-goods-sigle-img" :class="[gujia ? 'yj-gujia':'']" :src="items.itemPic" mode="widthFix"></image>
										<view class="yj-goods-sigle-info" style="margin-left: 20rpx; padding: 0;">
											<view class="yj-elip-2" :class="[gujia ? 'yj-gujia':'']">
												<image class="yj-goods-from" v-if="items.type ==1 && items.shopType=='1'" src="../../static/img/tmall.png" mode="widthFix"></image>
												<image class="yj-goods-from" v-if="items.type ==1 && items.shopType=='2'" src="../../static/img/taobao.png" mode="widthFix"></image>
												<image class="yj-goods-from" v-if=" items.type=='3'" src="../../static/image/home/pdd_icon.png" mode="widthFix"></image>
												{{items.itemTitle}}
											</view>
											<view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']">{{items.itemDesc}}</view>
											<view class="yj-goods-sigle-info-base" style="width: 100%;">
												<view>
													<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']">
														<!-- <view class="yj-zhuan" v-if="!gujia">
															赚&yen;{{items.zhuan | numFilter}}
														</view> -->
														<view class="yj-quan">{{items.couponMoney | numFilter2}}元券</view>
														<view class="yj-quan yongjin">预估收益{{items.zhuan}}元</view>
													</view>
												</view>
												
												<view class="yj-goods-info-bar" :class="[gujia ? 'yj-gujia':'']">
													<view class="yj-display-flex yj-middle" v-if="!gujia">
														<text class="yj-goods-pirce yj-left">
															<text class="yj-text-sm">&yen;</text>{{items.itemEndPrice | numFilter}}
														</text>
														<text class="yj-color-gray-light yj-text-min yj-del yj-mar-l-min yj-goods-price-aftercon yj-left">{{items.itemPrice | numFilter}}</text>
													</view>
													<view class="yj-color-gray-light yj-text-min" v-if="!gujia">月销{{items.itemSale}}</view>
												</view>
										
											</view>
										</view>
									</view>
								</view>
							</uni-swipe-action-item>
						</uni-swipe-action>
					</checkbox-group>
					<graceLoading :loadingType="loadingType"></graceLoading>
				</scroll-view>
				
				<view v-else>
					<emptydata></emptydata>
				</view>
				<!-- 底部 -->
				<view class="yj-footer yj-pad-tb-min yj-between yj-middle yj-bg-fff bottom_bar"   v-if="isedit">
					<label @click="check('all')" class="yj-display-flex yj-middle yj-pad-l-big">
						<view class="yj-display-flex yj-middle">
							<image class="yj-icon-smlotter" :src="allChecked?'../../static/image/home/checked.png':'../../static/image/home/nochecked.png'"></image>
							<text class="yj-text-lotter yj-mar-l-min">全选</text>
							<view class="select_num">
								已选中{{selectNum}}件
							</view>
						</view>
					</label>
					<view class="yj-pad-r-big">
						<button class=" yj-bg-yellow-dark yj-text-center" formType="submit" style="width: 240upx;">删除</button>
						<view @tap="shareGoods" class="share_btn">
							分享
						</view>
					</view>
					
				</view>
			</form>
			<view v-else>
				<emptydata emptytitle='亲 暂无更多数据'></emptydata>
				<view class="yj-btn yj-block yj-radius yj-main yj-mar-t-big " style="margin:40upx auto 0;font-size: 32rpx;" @click="goCollection">去收藏</view>
			</view>
		</view>
		<loadding :isShow='loadIsShow'></loadding>
		<view class="hideCanvasView" style="position: fixed;  top: 9999999999px; left: 999999999999px; z-index: -9999;">
			<canvas class="hideCanvas" canvas-id="qrcode" :style="{ width: canvasW + 'px', height: canvasH + 'px' }"></canvas>
		</view>
	</view>
</template>
<script>
	var _self,baseurl;
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import loadding from "../../components/loadding.vue";
	import emptydata from "../../components/emptydata.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import QRCode from "@/common/qrcode.js"
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		data() {
			return {
				statusBarHeight:statusBarHeight,
				options:[ {
						text: '删除',
						style: {
							backgroundColor: '#f64719'
						}
					}
				],
				gujia:true,
				show:false,
				uid:'',
				opertxt:'编辑',
				allChecked:false,	//是否全选
				loadIsShow: true,
				userData: [],
				userpid: '',
				bili: 0,
				allianceScale:0,
				colldata: [],
				isedit:false,
				page:1,
				loadingType: 0,
				totalCount:0,
				selectNum:0,
				goodPic:[],
				canvasW:'',
				canvasH:'',
				selectGood:[]
			}
		},
		onShow: function(option) {
			_self = this;
			
			this.getTotalCount()
			this.mybili()
			this.getData()
		},
		components: {
			graceLoading, //数据库流
			loadding,
			emptydata,
			uniSwipeAction ,
			uniSwipeActionItem
		},

		filters: {
			numFilter(value) {
				let realVal = parseFloat(parseFloat(value).toFixed(2));
				return realVal
			},
			numFilter2(value) {
				let realVal2 = parseInt(value);
				return realVal2
			}
		},
		methods: {
			shareGoods() {
				this.selectGood =[]
				this.goodPic = []
				this.colldata.forEach( (item,index) => {
					if(item.checked) {
						this.selectGood.push(item)
					}
				}) 
				if(this.selectGood.length != 0) {
					uni.showLoading({
						title:'请求中...',
						mask:true,
					})
					this.createPic(0)
				}
			},
			createPic(index) {
				let _this = this
				//this.canvasShow = true
				let jxConfig = this.$store.state.jxConfig
				let userInfo = this.$store.state.jxUserInfo.buyerInfo
				let inviterUrl = `${this.$config.couponeBaseUrl}/1-${this.selectGood[index].itemId}-${userInfo.inviterCode}`
				// if(!this.itemPic) {
				// 	this.itemPic = this.smallImages[0].pic
				// }
				// console.log(_this.canvasW)
				
				let canvasW = null;
				let canvasH = null;
				this.canvasW >= 375 ? canvasW = 375 : canvasW = this.canvasW
				this.canvasH >= 667 ? canvasH = 667 : canvasH = this.canvasH
				new QRCode({
					context: _this,
					canvasId: 'qrcode',
					text: inviterUrl, // 二维码链接
					width: _this.canvasW,
					height: _this.canvasH,
					showLoading: false,
					// loadingText: '海报生成中...',
					size: 100, // 二维码大小
					canvasOpotion: { //海报尺寸
						canvasWidt: canvasW,
						canvasheight: canvasH
					},
					goods: { //商品信息
						shopType: this.selectGood[index].shopType == 1 ?  `/static/img/tmall.png` : `/static/img/taobao.png`,
						itemTitle: this.selectGood[index].itemTitle,
						itemEndPrice: this.selectGood[index].itemEndPrice,
						couponMoney: this.selectGood[index].couponMoney,
						itemPrice: this.selectGood[index].itemPrice,
						itemSale: this.selectGood[index].itemSale,
						itemPic: this.selectGood[index].itemPic
			
					},
					cbResult: function(res) { // 生成海报的回调
						console.log("生成海报成功！")
						_this.canvasImgSrc = res //base64 图片格式
						_this.goodPic.push(res)
						if(index == _this.selectGood.length-1) {
							uni.hideLoading()
							plus.share.sendWithSystem({
								type:"image",
								pictures:_this.goodPic
							})
							return
						}
						_this.createPic(index+1)
						console.log('321')
					},
				});
			},
			singleDel(id) {
				let obj = {title:'提示',content:'确定要删除此条收藏吗？'}
				this.$msg.confirm(obj,()=>{
					this.$http.post('/api/goodsFavourite/doBatchDel',{ids:id})
					.then(data=>{
						this.$msg.toast('删除成功')
						this.getData()
					})
				})
			},
			back: function() {
				uni.navigateBack();
			},
			async getTotalCount(){
				let data = await this.$http.post('/api/goodsFavourite/getCount')
				console.log(data)
				this.totalCount = data.data.count
				console.log(this.totalCount)
			},
			async getData(number){
				let data = await this.$http.post('/api/goodsFavourite/getList',{pages:this.page})
				console.log(data)
				this.gujia = false
				if(data.data.list.length>0){
					if(!number){
						this.colldata = []
					}
					data.data.list.forEach((v,i)=>{
						// this.$set(v,"checked", false);
						v.itemEndPrice = v.itemPrice - v.couponMoney
						v.zhuan = 0
						if (v.type == 3) {
							v.zhuan = (v.rates*v.itemEndPrice/1000 *this.bili).toFixed(2)
						}else {
							v.zhuan = (v.rates*v.itemEndPrice*this.bili*this.allianceScale/100).toFixed(2)
						}
						// this.$set(v,"zhuan", zhuan);
						let zhigoushen = parseFloat(v.couponMoney)+parseFloat(v.zhuan)
						this.$set(v,"zhigoushen", zhigoushen);
						
					
						this.colldata.push(v)
					})
					
				}
				if(data.data.list.length==0||data.data.list.length<=20||this.totalCount==data.data.list.length){
					this.loadingType = 2
				}
				this.show = true
				this.loadIsShow = false
				this.colldata = data.data.list
				console.log(this.colldata)
				this.canvasW = this.$store.state.systemInfo.windowWidth
				this.canvasH = this.$store.state.systemInfo.windowHeight
			},
			mybili:function(){
				this.$http.post('/api/index/getScale')
				.then(res =>{
					this.bili = res.data.scale
					this.allianceScale = res.data.allianceScale
					console.log(this.bili)
				})
			},

			collectgoods:function(){
				
			},
			
			
			formSubmit: function(e) {
				let seldata = (e.detail.value.seldata).join(',');
				console.log(seldata);
				let obj = {title:'提示',content:'确定要删除所选收藏吗？'}
				this.$msg.confirm(obj,()=>{
					this.$http.post('/api/goodsFavourite/doBatchDel',{ids:seldata})
					.then(data=>{
						this.$msg.toast('删除成功')
						this.getData()
						this.opercoll()
						this.selectNum = 0
					})
				})
				
			},
			
			
			//选中状态处理
			check(type, index){
				let selectNum = 0
				if(type === 'item'){
					this.colldata[index].checked = !this.colldata[index].checked;
				}else{
					const checked = !this.allChecked
					const list = this.colldata;
					list.forEach(item=>{
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.colldata.forEach( (item,index) => {
					if(item.checked) {
						selectNum ++
					}
				}) 
				this.selectNum = selectNum
				if( selectNum == this.colldata.length) {
					this.allChecked = true
				}else {
					this.allChecked = false
				}
				console.log(this.colldata[index].checked)
			},
			opercoll:function(){
				this.isedit = !this.isedit;
				this.opertxt = this.isedit?'完成':'编辑'
			},
	
		
			//每个选项滚动到底部
			scrollend: function(e) {
				this.page++
				this.getData(0)
				
				
			},
			
			goCollection:function(){
				uni.switchTab({
					url:'../index/index'
				})
			},
			//商品详情
			goodsDetail: function(type,itemId) {
				if(type == 1){
					uni.navigateTo({
						url: "../detail/index?itemId="+itemId
					});
				}
				if(type == 3){
					uni.navigateTo({
						url: "/pages/pdd/detail/index?itemId="+itemId
					});
				}
				
			},


		}
	}
</script>
<style lang="less">
	@import "../../static/css/mycss.less";
	@baseW: 80upx;
	.yj-goods-info-bar{
		justify-content: flex-start;
	}
	.yongjin {
		background-color: #fff100 !important;
		margin-left: 16rpx;
		color: #000;
	}
	.yj-header-title{
		font-size: 36upx;
		font-weight: normal;
	}
	.yj-goods-pirce {
		color: #000 !important;
		font-size: 40rpx;
	}
	.yj-quan {
		background: #f64719;
		border-radius: 4rpx;
	}
	.bottom_bar {
		padding: 0;
		height: 98rpx;
		.yj-mar-l-min {
			color: #959595;
		}
		.yj-bg-yellow-dark {
			width: 146rpx !important;
			height: 58rpx;
			border: 2rpx solid #FF4723;
			font-size: 28rpx;
			text-align: center;
			line-height: 58rpx;
			background-color: #fff;
			color: #5E5E5E;
			border-radius: 58rpx!important;
			padding: 0!important;
			margin: 0!important;
		}
		.share_btn {
			width: 146rpx !important;
			height: 58rpx;
			font-size: 28rpx;
			text-align: center;
			line-height: 58rpx;
			background-color: #FFF000;
			color: #5E5E5E;
			border-radius: 58rpx!important;
			padding: 0!important;
			margin-left: 20rpx;
			
		}
		.yj-pad-r-big {
			display: flex;
			flex: 1;
			justify-content: flex-end;
			align-items: center;
		}
	}
	.yj-goods-sigle-item{
		flex: 1;
		margin-bottom: 0;
	}
	.yj-goods-sigle {
		padding: 16rpx 12rpx 0 12rpx;
	}
	.yj-pad-r {
		display: flex;
		align-items: center;
	}
	.yj-goods-sigle-img {
		width: 232rpx;
		height: 232rpx;
	}
	.select_num {
		font-size: 22rpx;
		margin-left: 20rpx;
		color: #959595;
	}
	.yj-mar-t-big {
		width: 264rpx;
		height: 66rpx;
		color: #000;
		font-size: 36rpx;
		line-height: 66rpx;
		text-align: center;
		border-radius: 66rpx;
		background-color: #ffeb00;
		letter-spacing: 4rpx;
		padding: 0 !important;
	}
</style>
