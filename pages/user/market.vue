<template>

	<view>

		<view class="bgInfo">
			<view style="color:#fff">
				<view class='grace-h3 grace-iconfont icon-arrow-left' style="margin-left: 5%;margin-top: 50upx;" @tap="back()"></view>
				<view class="grace-h3 grace-center" style="margin-top: -70upx;">粉丝</view>
			</view>
			<view class=" dollerInfos">
				<view class="grace-center">
					<view style="margin-top: 80upx;">我的粉丝</view>
					<view class="dollerMoney">{{fansnum}}</view>
					<view style="margin-top: 40upx;margin-bottom: 50upx;">我的邀请码  </view>
				</view>
			</view>
			<!-- 类目 -->
			<scroll-view class="grace-tab-title grace-center" scroll-x="true" id="grace-tab-title">
				<view v-for="(tab, index) in tabs" :key="index" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
				 @tap="tabChange">{{tab.name}}</view>
			</scroll-view>

			<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">

				<swiper-item v-for="(news, newsIndex) in tabs" :key="newsIndex">
					<scroll-view scroll-y="true" :data-scindex="newsIndex" @scrolltolower="scrollend">
						<!-- 首页 类目-->
						<view class="list_bar">
							<view class="list"  v-for="(item, index) in tabs[newsIndex].list" :key="index">
								<view class="row">
									<view class="avatar"><image :src="item.avatar||'/static/img/taobao-icon.png'"></image></view>
									<view class="userNmae">{{item.mobile}}</view>
								</view>
							</view>
							<view style="margin-top: 30px;text-align: center;" v-if="noData">暂无数据</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	var _self, page = 1,
		result = '';
		var baseurl;
	//默认新闻数据（来自api请求）
	//每个选项下面的新闻列表
	var news = [];
	//对应下面3个标签的新闻内容数据
	var newsAll = [news, news, news];
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import graceSwiper from "../../graceUI/components/graceSwiper.vue";
	import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
	export default {
		data() {
			return {
				header: '',
				fansnum:0,
				noData:true,
				newsMent: [],
				newsMaterial: [], //专属粉丝,
				newsHeart: [], //普通
				showLoding: true,
				show: false,
				show1: false,
				show2: false,
				searchKey: "",
				searchClose: false,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '全部',
						id: 'index0',
						cid: '0',
						loadingType: 0,
						page: 1,
						list:''
					},
					{
						name: '	专属邀请人',
						id: 'nvzhuang',
						cid: '1',
						loadingType: 0,
						page: 1,
						list:''
					},
					{
						name: '普通邀请人',
						id: 'nanzhuang',
						cid: '2',
						loadingType: 0,
						page: 1,
						list:''
					}

				],
				fansInfo:[],
				popup:false,
				newsAll: newsAll,
				shangjip:false,
				parentInfo:{}
			}
		},

		components: {
			graceSwiper, //轮播图
			graceLoading, //数据库流
		},
		
		onShow: function() {
			this.fansList(0)
		},
		onReady: function() {
			//获取屏幕高度及比例
			var winInfo = uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					//获取头部标题高度
					var dom = uni.createSelectorQuery().select('#grace-tab-title')
					dom.fields({
						size: true
					}, res2 => {
						if (!res2) {
							return;
						}
						//计算得出滚动区域的高度
						_self.tabHeight = windowHeight - res2.height - 230;
					}).exec();
				}
			});
		},
		methods: {
			back: function() {
				uni.navigateBack();
			},
			doller: function() {
				uni.navigateTo({
					url: './invite'
				})
			},
			async fansList(index){
				let obj = {type:this.tabs[index].cid,page:this.tabs[index].page}
				let data = await this.$http.post('/api/inviter/getList',obj)
				index==0 ? this.fansnum = data.data.total : ''
				data.data.list.map((v,i)=>{
					data.data.list[i].avatar = this.$common.imgThumb(v.avatar);
				})
				this.tabs[index].list = data.data.list
				if(this.tabs[index].list.length>0){
					this.noData=false
				}else{
					this.noData=true
				}
				console.log(data)
			},

			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.fansList(index)
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				_self = this;
				var index = e.currentTarget.dataset.scindex;
				if (this.tabs[index].loadingType === 1) {
					return false;
				}
				
				this.tabs[index].loadingType = 1; //加载中
				//模拟延迟 
				switch (index){
					case 1:
						_self.fansZhuanMore(index);
						break;
					case 2:
						_self.fansPuMore(index);
						break;
					default:
						break;
				}

			},
			
			//显示粉丝信息弹窗
			showfansInfo:function(data){
				let _self = this;
				_self.fansInfo = data;
				/* _self.fansInfo.push(data); */
				_self.popup = true;
				//console.log(JSON.stringify(data));
			},
			//隐藏粉丝信息弹窗
			popuphide: function(){
				this.popup=false;
				_self.shangjip=false;
			},
			//复制邀请码
			copy: function(data){
				console.log(data);
				uni.setClipboardData({
					data: data,
					success: function() {
						uni.showToast({
							title: '邀请码复制成功',
							icon:'none'
						});
					}
				});
			},
			//复制
			copywx: function(data){
				console.log(data);
				//let aa;
				let wxid = data ? data : 'yuntu168888';
				uni.setClipboardData({
					data: wxid,
					success: function() {
						/* uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon:'none'
						}); */
						uni.showModal({
							content: '复制成功,是否去微信粘贴？',
							cancelText: '暂不粘贴',
							confirmText: '去微信',
							success: function(res) {
								if (res.confirm) {
									plus.runtime.launchApplication({
										pname: 'com.tencent.mm',
										action: 'weixin://'
									});
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
			
		}
	}
</script>
<style lang="less">
	@import "../../graceUI/graceUI.css";
	@import "../../static/css/mycss.less";
	page{
		background-color: #fff;
	}
	.list_bar{padding: 10px;box-sizing: border-box;}
	.list_bar .list{border-bottom: 1px solid #e8e8e8;padding: 10px 0;}
	.list_bar .list .row{display: flex; justify-content: center;align-items: center;}
	.list_bar .list .row .avatar{width: 60rpx; height:60rpx;margin:0 10px;}
	.list_bar .list .row .avatar image{width: 100%;height:100%;border-radius: 30rpx;}
	.list_bar .list .row .userNmae{flex: 1;}
	.parentsmain{
		position: absolute;
		width: 60%;
		height: 340upx;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		border-radius: 10upx;
		overflow: hidden;
		background-color: #fff;
	}
	.yt-popup-bg{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 9;
		background-color: rgba(0,0,0,.4);
		/* display: none; */
	}
	.popupshow{
		display: block !important;
	}
	.fans_box{
		position: absolute;
		width: 500upx;
		height: 630upx;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		border-radius: 10upx;
		overflow: hidden;
		background-color: #fff;
	}
	.fans_head{
		width: 100%;
		height: 330upx;
		background-image: linear-gradient(left,#F3CD7C,#BB9858);
		color: #fff;
	}
	.fans_income{
		padding: 50upx 0;
		border-bottom: 1upx solid #ddd;
		display: flex;
		align-items: center;
	}
	.fans_income_item{
		flex: 1;
	}
	.fans_income_item text{
		font-size: 36upx;
	}
	.fans_img{
		padding: 40upx 0 20upx;
	}
	.fans_img image{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.fans_name{
		font-size: 36upx;
	}
	.fans_account{
		display: flex;
		align-items: center;
		padding-top: 30upx;
	}
	.fans_account_item{
		flex: 1;
	}
	.fans_regtime{
		padding: 30upx 0;
		color: #666;
	}
	.closeIcon{
		position: absolute;
		top: 10upx;
		right: 10upx;
	}
	
	.grace-tab-title view {
		color: #000;
		margin-left: 15%;
	}

	.grace-comment-face {
		width: 100upx;
		height: 100upx;
		margin-left: 20upx;
	}

	.grace-comment-top text {
		color: #666;
		font-size: 30upx;
	}

	.grace-newsInfo {
		margin-right: 5%;
		border: 1px solid #fe4a65;
		background: #FFEDED;
		border-radius: 8px;
		font-size: 0.8rem;
		color: #FFFFFF;
		text-align: center;
		line-height: 15px;
		width: 20%;
		height: 25px;
		line-height: 25px;
	}

	.grace-items-demo1 {
		background: #00B26A;
	}

	.grace-items-demo2 {
		background: #F76260;
	}

	.grace-gradient-bg::after {
		width: 105%;
		height: 100px;
		content: "";
		left: -5%;
		top: 180px;
		position: absolute;
		display: block;
		background: #FFF;
		border-radius: 80px;
	}

	.grace-news-list-img {
		width: 250upx;
		margin-top: 10upx;
		border-radius: 12px;
		margin-bottom: 10upx;
	}

	.grace-news-list-title-main {
		font-size: 25upx;
		font-weight: bold;

	}

	.grace-news-list-title {
		margin-left: 5%;
		margin-top: 20upx;
		/* border-bottom: 0.5px solid #F0EDE5; */

	}

	.paddLeft {

		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	/* .paddLefts {
		padding-left: 10upx;
	} */

	.grace-news {
		color: #fe4a65;
	}



	.grace-h4 {
		border-bottom: 1px solid #F0EDE5;
	}

	.grace-boxes-img image {
		width: 80%;
	}

	.grace-img-lazy {
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	.del {
		text-decoration: line-through;
	}

	.delLeft {
		margin-left: 50upx;
	}



	.dollerLeft {
		float: left;
		margin-left: 5%;
	}

	.dollerLefts {
		float: left;
	}

	.dollerNum {
		color: #999999;
		margin-top: 5upx;
	}


	.bgInfo {
		background-image: linear-gradient(to right, #FFAB51, #FF7E51);
		width: 100%;
		height: 450upx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		-moz-background-size: 100% 100%;
		position: absolute;
	}

	.dollerInfos {
		color: #fff
	}

	.dollerMoney {
		margin-top: 10upx;
		font-size: 50upx;
	}

	.grace-list {
		width: 100%;
		background: #FFF;
		padding: 5px 0;
		height: 100upx;
		border-bottom: 1upx solid #D1D1D1;
	}

	.grace-list .items {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
	}

	.grace-list .items .icons {
		flex: 1;
		margin: 18px 0 15px 15px;
		flex-shrink: 0;
		overflow: hidden;
		font-size: 0;
		display: flex;
	}

	.userphoto {
		width: 100rpx;
		height: 100rpx;
		margin-right: 10rpx;
		border-radius: 50%;
	}

	.grace-list .items .title {
		width: 100%;
		margin-left: 10px;
		padding: 18px 30px 18px 0;
		font-size: 16px;
		height: 20px;
		line-height: 20px;
		overflow: hidden;
		border-bottom: 1px solid #E9E9E9;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.grace-list .title text {
		font-size: 13px;
		color: #B2B2B2;
		margin-left: 10px;
		float: right;
		margin-top: -20upx;

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
		/* position: absolute;
		z-index: 1;
		right: 0;
		top: 0; */
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
	
	
	
	.yt-grade-type {
		display: inline-block;
		background-image: linear-gradient(to right,#9f9f9f,#828282);
		padding: 0 20upx 0 5upx;
		height: 34upx;
		line-height: 34upx;
		color: #fff;
		border-radius: 34upx;
		font-size: 20upx;
		font-weight: bold;
	}
	
	.yt-grade-type image {
		width: 34upx;
		height: 34upx;
		float: left;
		margin-right: 5upx;
		/* vertical-align: middle; */
	}
	.grade_3 {
		/* color:#FFF427; */
		padding-left: 15upx;
	}
	
	.grade_2 {
		/* color:#FF343D; */
		padding-left: 15upx;
	}
	.username{
		width: 120rpx;
	}
	
</style>
