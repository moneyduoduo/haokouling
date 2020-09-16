<template>
	<view>
		<view class="yj-header" style="background-color: #fff;color:#333">
			<view class="yj-header-return" @click="back()">
				<image src="../../static/img/fanhui_black.png" mode="widthFix"></image>
			</view>
			<view class="yj-header-title">品牌关注</view>
			<view class="yj-header-right" @click="opercoll">{{opertxt}}</view>
		</view>
		<view class="yj-content" :class="[isedit?'yj-mainHF':'yj-mainH']" style="height: 100vh;" v-if="show">
			<form @submit="formSubmit" v-if="colldata.length>0">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" class="yj-pad-t yj-border-box" style="height: 100%;" v-if="colldata.length>0">
					<!-- 一排显示 -->
					<checkbox-group name="seldata" class="yj-goods-sigle">
						<uni-swipe-action>
							<uni-swipe-action-item v-for="(items, index) in colldata" :key="index" :auto-close="!isedit" :show="!isedit" :disabled="isedit" :options="options" @click="singleDel(items.id)" >
								<view :class="[isedit?'oper':'']">
									<label class="yj-pad-r" v-if="isedit" @click="check('item',index)">
										<checkbox class="yj-none" :checked="items.checked" :value="items.brandId" />
										<image class="yj-icon-smlotter" :src="items.checked?'../../static/img/icon/checked.png':'../../static/img/icon/nochecked.png'"></image>
									</label>
									<view class="yj-goods-sigle-item" @click="goodsDetail(items.brandId)">
										<image class="yj-goods-sigle-img" :class="[gujia ? 'yj-gujia':'']" :src="items.brandLogo" mode="widthFix"></image>
										<view class="yj-goods-sigle-info">
											<view class="yj-elip-2" :class="[gujia ? 'yj-gujia':'']">
												<image class="yj-goods-from" v-if="items.shopType=='B'" src="../../static/img/tmall.png" mode="widthFix"></image>
												<image class="yj-goods-from" v-if="items.shopType=='C'" src="../../static/img/taobao.png" mode="widthFix"></image>
												{{items.tbBrandName}}
											</view>
											<view class="yj-goods-shopname yj-elip-1" :class="[gujia ? 'yj-gujia':'']">{{items.introduce}}</view>
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
				<view class="yj-footer yj-pad-tb-min yj-between yj-middle yj-bg-fff" v-if="isedit">
					<label @click="check('all')" class="yj-display-flex yj-middle yj-pad-l-big">
						<view class="yj-display-flex yj-middle">
							<image class="yj-icon-smlotter" :src="allChecked?'../../static/img/icon/checked.png':'../../static/img/icon/nochecked.png'"></image>
							<text class="yj-text-lotter yj-mar-l-min">全选</text>
						</view>
					</label>
					<view class="yj-pad-r-big">
						<button class=" yj-bg-yellow-dark yj-text-center" formType="submit" style="width: 240upx;">删除</button>
					</view>
				</view>
			</form>
			<view v-else>
				<emptydata></emptydata>
				<view class="yj-btn yj-block yj-radius yj-main yj-mar-t-big" style="margin:100upx 200upx 0;" @click="goCollection">去收藏</view>
			</view>
		</view>
		<loadding :isShow='loadIsShow'></loadding>
	</view>
</template>
<script>
	var _self,baseurl;
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import loadding from "../../components/loadding.vue";
	import emptydata from "../../components/emptydata.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
		data() {
			return {
				options:[ {
						text: '删除',
						style: {
							backgroundColor: '#FD4C66'
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
				totalCount:0
			}
		},
		onShow: function(option) {
			_self = this;
			
			//this.getTotalCount()
			//this.mybili()
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
				let data = await this.$http.post('/api/brand/getFollowList',{pages:this.page})
				console.log(data)
				this.gujia = false
				if(data.data.list.length>0){
					if(!number){
						this.colldata = []
					}
					data.data.list.forEach((v,i)=>{
						this.$set(v,"checked", false);
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
					this.$http.post('/api/brand/doBatchDel',{ids:seldata})
					.then(data=>{
						this.$msg.toast('删除成功')
						this.getData()
						this.opercoll()
					})
				})
				
			},
			
			
			//选中状态处理
			check(type, index){
				
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
			goodsDetail: function(brandId) {
				uni.navigateTo({
					url: "/pages/brand/brandList?brandId="+brandId
				});
				
			},


		}
	}
</script>
<style lang="less">
	@import "../../static/css/mycss.less";
	@baseW: 80upx;
	.oper{
		display: flex;
		align-items: center;
		width: 800upx;
		.yj-goods-sigle-item{
			flex: 1;
		}
	}
	
</style>
