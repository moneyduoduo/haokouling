<template>
	<view>
		<view class="index_banner">
			<view class="swiper" v-if="banner.length > 0">
				<swiper class="swiper-container" :autoplay="true" :interval="3000" :circular="true" :indicator-dots="true"
				 indicator-active-color="#666666" indicator-color="#cccccc">
					<block v-for="(item,index) in banner" :key="index">
						<swiper-item class="swiper-wrapper">
							<image :src="item" mode="widthFix"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="brandList" v-for="(item,index) in brandCat" :key="index" v-if='item.name'>
			<view class="brandTitle">
			  <view class="title">{{item.name}}</view>
			  <view class="brandMoer iconfont" @tap="brandMoer('./brandAZ',index,item.name)">查看全部</view>
			</view>
			<view class="brandLogoBox">
				<view class="brandLogoList">
					<view class="logoBar" v-for="(items,indexs) in item.logoArr" :key="indexs"  @tap="brandGoods(items.brandId)">
						<image :src="items.brandLogo"></image>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>
<script>
    import brandData from "@/static/js/getBrandList.json";
	export default {
		data() {
			return {
				banner:[],
				brandCat:[],
				
			}
		},

		components: {

		},
		onLoad: function() {
			this.getData()
			//console.log(brandData)
			
		},
		onShow: function() {

		},

		methods: {
			brandMoer(url,id,name){
				uni.navigateTo({
					url: url+'?brandCat='+ id+'&name='+name
				})
			},
			brandGoods(id){
				uni.navigateTo({
					url:'./brandList?brandId='+ id
				})
			},
			async getData(){
				let res = await this.$http.post('/api/brand/getBrandTodayRecommend')
				this.banner = res.data.multiple
				let resData = res.data.brandCat
				Object.keys(resData).forEach((item,index)=>{
					if(resData[index]){
						resData[index] = {name:resData[index],logoArr:[]},
						brandData.data.forEach((v,i)=>{
							if(v.brandCat == index){
								if(resData[index].logoArr.length<9){
									resData[index].logoArr.push(v)
								}
							}
						})
					}
					
				})
				this.brandCat =  resData
			}
		}
	}
</script>

<style>
	@import "../../static/css/global.css";
	.index_banner{border-bottom: 1px solid #d8d8d8;}
	.index_banner .swiper-container{height:750rpx}
	.index_banner swiper-item {height:750rpx;}
	.brandTitle{display: flex; justify-content: space-between;align-items: center; height:80rpx;line-height: 80rpx; padding: 0 20rpx;border-right: 1px solid #d8d8d8;border-left: 1px solid #d8d8d8;}
	.brandTitle .title{font-size: 32rpx; flex: 1; font-weight: bold;}
	.brandTitle .brandMoer{width: auto;position: relative;font-size: 24rpx; color:#989898; padding-right: 40rpx;}
	.brandTitle .brandMoer::before{content:'\E633';position: absolute;top:4rpx;right:0; width: 20rpx;height: 20rpx;}
	.brandLogoList{border: 1px solid #d8d8d8; display: flex; justify-content:flex-start;flex-wrap:wrap;border-bottom: none;}
	.brandLogoList .logoBar{border-right: 1px solid #d8d8d8; border-bottom: 1px solid #d8d8d8;width: 248rpx;}
	.brandLogoList .logoBar:nth-child(3n){border-right: none;}
	.brandLogoList .logoBar image{width: 100%;  height: 120rpx;}
</style>