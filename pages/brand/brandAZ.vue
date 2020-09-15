<template>
	<view>
		
		<scroll-view ref="scrollView" scroll-y="true"  @scroll="scroll" :show-scrollbar="false" scroll-with-animation="true"  :scroll-into-view="scrollInto" class="scrollView">
			<view class="searchBar">
				<view class="searchBox">
					<image src="/static/image/common/search-icon3.png" class="searchBoxicon"></image>
					<input type="text" class="searchInput" v-model="searchText"  @confirm="searchNow" placeholder="搜索品牌">
				</view>
				
			</view>
			<view class="scrolListBox" v-for="(item,index) in listData" :key="index">
				<view class="title" :id="'mid-'+item.name">{{item.name}}</view>
				<view class="brandList" v-for="(items,indexs) in item.logoArr" :key="indexs"   @tap="brandGoods(items.brandId)">
					<image :src="items.brandLogo" class="searchBoxicon"></image>
					<view class="brandName" :class="{styleNone:items.style}">
						<text>{{items.tbBrandName}}</text>
					</view>
				</view>

			</view>
		</scroll-view>
		<view class="azListBar">
			<view class="azListBox">
				<view class="azList" v-for="(item,index) in listData" :key="index" @tap="gotoScroll('mid-'+item.name)">
					<view class="text" :class="{active:activeIndex == index}">{{item.name}}</view>
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
				scrollInto:'',
				brandCat:'',
				listData:[],
				listBarHeight:[],
				activeIndex:-1,
				searchText:''
			}
		},

		components: {

		},
		onReady() {
			uni.createSelectorQuery().in(this).selectAll('.scrolListBox').boundingClientRect((rects) => {
				rects.forEach((rect) => {
					this.listBarHeight.push(rect)
				})
			}).exec();
		},
		onLoad: function(opstion) {
			uni.setNavigationBarTitle({
				title: opstion.name+' - 品牌专区'
			});
			this.brandCat = opstion.brandCat
			this.getData()
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
					url: './brandList?brandId='+ id
				})
			},
			scroll(e){
				let scrollTop = e.detail.scrollTop
				let thisName = ''
				this.listBarHeight.forEach((item,index)=>{
					if(scrollTop>=item.top){
						this.activeIndex = index
						thisName = this.listData[index].name
					}
				})
			},
	
			searchNow(){
				if(!this.searchText){
					return
				}
				let searchData = ''
				let isSearch = false
				this.listData.forEach((item,index)=>{
					item.logoArr.forEach((v,i)=>{
						if(v.tbBrandName.includes(this.searchText)){
							isSearch = true
							searchData = item.name
						}
					})
				})
				isSearch ? this.gotoScroll('mid-'+searchData) : this.$msg.toast('没有该品牌数据！')
			},
			gotoScroll(index){
				this.scrollInto = index
			},
			async getData(){
				let allData = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
				let brandCat = this.brandCat
				let brandArr = []
				let newArrData = []
				brandData.data.forEach((v,i)=>{
					if(v.brandCat == brandCat){
						brandArr.push(v)
					}
				})
				
				Object.keys(allData).map((item,index)=>{
					allData[index] = {name:allData[index],logoArr:[]},
					brandArr.forEach((v,i)=>{
						if(v.initialPy == allData[index].name){
							allData[index].logoArr.push(v)
						}
					})
					
				})
				allData.map((item,index)=>{
					if(item.logoArr.length>0){
						let len = item.logoArr.length
						item.logoArr[len-1].style = true
						newArrData.push(item)
					}
				})
				console.log(newArrData)
				this.listData = newArrData
			}
		}
	}
</script>

<style>
	@import "../../static/css/global.css";
	.searchBar{
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f8f8f8;
		
	}
	.searchBox{
		height:80rpx;
		width: 600rpx;
		background-color: #ffffff;
		border-radius: 80rpx;
		display: flex;
		justify-content:flex-start;
		align-items: center;
	}
	.searchBox .searchInput{
		padding: 0 20rpx;
		flex: 1;
	}
	.searchBoxicon{width: 35rpx; height:35rpx; margin:0 20rpx;}
	.scrollView{
		position: fixed;
		top:0rpx;
		/*  #ifdef  H5  */
		top: calc(88rpx + var(--status-bar-height));
		/*  #endif  */
		left:0;
		right:0;
		bottom:0;
	}
	.azListBar{
		position: fixed;
		top:0rpx;
		/*  #ifdef  H5  */
		top: calc(88rpx + var(--status-bar-height));
		/*  #endif  */
		right:20rpx;
		bottom:0;
		display: flex;
		justify-content:center;
		align-items: center;
		width: 60rpx;
	}
	.azListBox{
		text-align: center;
		width: 40rpx;
	}
	.azListBox .text{padding: 5rpx 0;}
	.azListBox .text.active{color:#fa3300; background-color: #f2f2f2; border-radius: 40rpx;}
	.scrolListBox .title{
		height: 80rpx;
		padding: 0 20rpx;
		color:#fa3300;
		line-height: 80rpx;
		border-bottom: 1px solid #d8d8d8;
		border-top: 1px solid #d8d8d8;
		background-color: #f8f8f8;
	}
	.scrolListBox .brandList{display: flex;justify-content: center;align-items: center;}
	.scrolListBox .brandList image{
		width: 240rpx;
		height:120rpx;
	    padding: 20rpx;
	}
	.scrolListBox .brandList .brandName{flex: 1; border-bottom: 1px solid #d8d8d8;height:120rpx;padding: 20rpx;height:120rpx;display: flex;align-items: center;}
	.scrolListBox .brandList .brandName.styleNone{border-bottom:none}
</style>