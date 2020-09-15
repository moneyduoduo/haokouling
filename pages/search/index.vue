<template>
	<view>

		<!-- <view class="yj-bg-gray-light yj-pad-b"> -->
			<!-- <view class="yj-search-box">
				<input class="yj-search-input" type="text" @input="searchChange" v-model="search"  @confirm="searchNow" placeholder="关键字" focus="true" confirm-type="search">
				<text class="yj-color-gray yj-pad-l" @tap="back()">取消</text>
			</view> -->
			<view class="yj-search-box" :style="{paddingTop: 20 + statusBarHeight*2 +'rpx'}">
				<image class="yj-search-return yj-pad-r" src="../../static/image/home/return.png" @tap="back()"></image>
				<view class="grace-rows yj-search-input" style="align-items: center;vertical-align: middle;">
					<input type="text" style="flex:1" @input="searchChange" v-model="search"  @confirm="searchNow" placeholder="搜索商品名或者粘贴淘宝标题" focus="true" confirm-type="search">
					<text v-if="search" class="grace-iconfont icon-close" @tap="cancelText" style="color:#ccc;background:#fff;margin-left:10rpx;"></text>
				</view>
				<view class="yj-color-gray yj-pad-l yj-text-usual" @click="searchNow">搜索</view>
			</view>
		<view class="yt-search-record yt-search-next">
			
			<!-- 热门 -->
			<view class="yj-pad-t">
				<view class="yj-text-bold ">热门搜索</view>
				<view class="grace-tips">
					<view class="searchot" v-for="(item,index) in hotKey" :key="index" @click="searchgoods(item)">
						<image v-if="index == 0 || index ==1 " class="hot_img" src="../../static/image/index/hot.png" mode=""></image>
						{{item}}
					</view>
				</view>
			</view>
		</view>
		<view class="yt-search-record " >

			<!-- 搜索历史 -->
			<view class="yj-pad-t">
				<view class=" yj-display-flex yj-middle">
					<view class="yj-text-bold yj-flex-1">历史搜索</view>
					<image class="yj-icon" src="../../static/img/trash.png" mode="widthFix" @click="delSeaHis"></image>
				</view>
				<view class="grace-tips" v-if="searchHistory.length>0">
					<view v-for="(item,index) in searchHistory" :key="index" @click="searchgoods(item)">
						{{item}}
					</view>
				</view>
				<view v-else  class="grace-tips" style="color: #999; font-size: 24rpx;">
					<text>您还没有搜索历史哦</text>
				</view>
			</view>
		</view>
		<!-- 按下说话 -->
		<!-- <view class="grace-center yt-yuyinbox" @tap="startRecognize">
			<image class="speech" src="../../static/img/speech.png" mode="widthFix"></image>
			<view class="yj-color-gray-light yj-mar-t-sm yj-text-sm">语音搜索</view>
		</view> -->
		<scroll-view class="Results" :style="{top: 116 + statusBarHeight *2 + 'rpx', border:'none'}" v-if="searchlist" scroll-y>
			<view class="Resultslist" v-for="(item,index) in searchResults" :key="index" @tap="searchListgoods(item[0])">
				 <image class="resultsousuo" src="../../static/image/index/sousuo.png" mode=""></image>
				 <text style="font-size: 24rpx; color: #333;">{{item[0]}}</text>
				 <!-- <text style="font-size: 24rpx; color: #333;">{{searchKey}}</text> <text style="font-size: 24rpx; color: #999999;">{{keyArr[index]?keyArr[index]:'' }}</text> -->
			</view>
		</scroll-view>
	</view>
</template>
<script>
	var _self;
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		data() {
			return {
				statusBarHeight:statusBarHeight,
				searchKey: "",
				searchClose: false,
				search: '',
				hotKey:[], //热门搜索
				searchHistory:[],  //搜索历史
				searchtypenum:0,
				searchResults:[
				],
				searchlist:false,
				keyArr :[]
			}
		},
		onShow() {
			_self = this;
			_self.searchHistory = uni.getStorageSync('searchHistory');
			_self.hotSearchKey();
		},
		methods: {
			hotSearchKey(){
				if(_self.$storage.get('hotKey')){
					return _self.hotKey = _self.$storage.get('hotKey');
				}
				uni.request({
					url: 'http://v2.api.haodanku.com/hot_key/apikey/jixiangshenghuo',
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded",
					},
					data: {},
					success: msg => {
						if(msg.data.code==1){
							_self.hotKey = [];
							msg.data.data.map((v)=>{
								//保存24个
								if(_self.hotKey.length<13){
									_self.hotKey.push(v.keyword);
								}
							})
							//缓存三天
							_self.$storage.set('hotKey',_self.hotKey,86400*3);
						}else{
							_self.hotKey = ['机器人',  '垃圾袋', '秋装' ];
						}
					},
					fail: () => {
						_self.hotKey = ['机器人',  '口红', '秋装' ];
					}
				});
			},
			startRecognize: function() {
				var options = {};
				var that = this;
				options.engine = 'iFly';
				options.punctuation = false;
				// options.lang = 'en-us'; //英语类中
				that.search = "";
				plus.speech.startRecognize(options, function(s) {
					//console.log(s);	s返回的是object格式
					
					//that.search += s.substr(0, s.length - 1);
					let a = JSON.stringify(s).split('"')[1];
					console.log(a);
					that.search = a;
					console.log(that.search);
					that.searchNow();
				}, function(e) {
					uni.showToast({
						title: "没听清您在说什么",
						icon: "none"
					})
					console.log("语音识别失败：" + e.message);
				});
			},
			//切换搜索状态
			searchtype: function(e){
				_self.searchtypenum = e;
				//console.log(e);
			},
			searchChange: function(e) {
				var key = e.detail.value;
				this.searchKey = key;
				let _this = this
				// #ifdef H5
				uni.request({
					url: '/sug/sug?code=utf-8&q=' + key,
					dataType: "json",
					success: (rsp) => {
						_this.searchResults = rsp.data.result
						
						if (key.length >= 1) {
							_this.searchClose = true;
							_this.searchlist = true;
						} else {
							_this.searchClose = false;
							_this.searchlist = false;
						}
					}
				});
				//#endif
				
				// #ifdef APP-PLUS
				uni.request({
					url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + key,
					dataType: "json",
					success: (rsp) => {
						_this.searchResults = rsp.data.result
						_this.keyArr = []	
						_this.searchResults.forEach( (item ,index ) =>{
							_this.keyArr.push (item[0].split(key)[1])
						})
						if (key.length >= 1) {
							_this.searchClose = true;
							_this.searchlist = true;
						} else {
							_this.searchClose = false;
							_this.searchlist = false;
						}
					}
				});
				//#endif
				
			},
			searchgoods:function(e){
				this.saveSeaHistory(e);
				uni.navigateTo({
					url: './content?search='+e+'&type='+_self.searchtypenum
				});
			},
			searchListgoods:function(e){
				uni.navigateTo({
					url: './content?search='+e+'&type='+_self.searchtypenum
				});
			},
			clearKey: function() {
				this.searchClose = false;
				this.searchKey = "";
			},
			cancelText(){
				this.searchlist = false;
				this.search = ''
			},
			searchNow: function() {
				if(this.search==''){
					this.$msg.toast('请输入商品关键字！')
					return
				}
				//this.saveSeaHistory(this.search);
				uni.navigateTo({
					url: './content?search=' + this.search+'&type='+_self.searchtypenum
				});
			},
			//保存搜索记录
			saveSeaHistory:function(e){
				let _self = this;
				let _val = e;
				let index = _self.searchHistory.indexOf(_val);
				if ( index != -1) {
					//获取 _val 在数组中的位置
					let thisindex = 0;
					for (var i = 0; i < _self.searchHistory.length; i++) { 
						if (_self.searchHistory[i] == _val)
						thisindex = i;
					}
					//将 _val 在数组中删除
					_self.searchHistory.splice(thisindex, 1);
				}
					//将 _val 重新追加到数组第一位
				  _self.searchHistory.unshift(_val);
				  //超过10位移除
					_self.searchHistory.splice(10,1);
				//存入缓存
				uni.setStorageSync('searchHistory', _self.searchHistory);
				uni.getStorage({
				  key: 'searchHistory',
				  success: function(res) {
					//console.log(JSON.stringify(res));
				  }
				})
			},
			//删除搜索记录
			delSeaHis:function(){
				 uni.removeStorageSync('searchHistory');
				 this.searchHistory = [];
			},
			
			back: function() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="less">
	@import "../../graceUI/graceUI.css";
	@import "../../static/css/mycss.less";
	
	page {
		background: #f6f6f6;
	}
	.resultsousuo {
		width: 24rpx;
		height: 24rpx;
		margin-right: 20rpx;
	}
	.Resultslist {
		margin-top: 20rpx;
		margin-left: 30rpx;
		padding-top: 0;
		padding-bottom: 0;
		margin-bottom: 0;
		border: none !important;
		height: 28rpx;
		line-height: 28rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		
	}
	.yt-search-next {
		margin-bottom: 20rpx!important;
	}
	.yt-search-record {
		margin-top: 0 !important;
	}
	.yj-search-box {
		padding: 20rpx 36rpx 40rpx 36rpx;
		background-color: #ffe600;
	}
	.yj-search-box  .yj-search-return {
		width: 20rpx;
		height: 36rpx;
		padding-right:46rpx
	}
	.yj-search-box .yj-search-input {
		height: 56rpx;
		background-image: url(../../static/image/index/sousuo.png);
		background-size: 32rpx 32rpx;
		
	}
	.yj-search-box .yj-search-input input {
		font-size: 24rpx;
	}
	.yj-search-box .yj-text-usual {
		height: 54rpx;
		line-height: 54rpx;
		font-size: 32rpx;
		background-color: #333333;
		color: #FFF600;
		width: 104rpx;
		border-radius: 54rpx;
		text-align: center;
		margin-left: 18rpx;
		padding: 0;
	}
	.grace-gradient-bg{
		height: 80upx;
	}
	.speech {
		width: 68upx;
		height: 68upx;
		background: #eee;
		padding:30upx;
		border-radius: 68upx;
	}
	.yt-yuyinbox{
		width: 100%;
		position: absolute;
		bottom: 80upx;
		left: 0;
	}
	.yt-search-record{
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		margin-top: -20upx;
		padding: 0 30upx;
	}
	.grace-tips{
		margin-top: 20upx;
		
	}
	.searchot {
		position: relative;
	}
	.grace-tips .hot_img {
		position: absolute;
		width: 26rpx;
		height: 30rpx;
		top: -14rpx;
		right: -6rpx;
		
	}
	.grace-tips view{
		height: 36upx;
		line-height: 36upx;
		padding: 0 16upx;
		background-color: #F7F6F6;
		color: #999999;
		border-radius: 36upx;
		border:none;
		font-size: 22upx;
		margin-right:20upx;
		margin-bottom:20upx;
		text-align: center;
		max-width: 700upx;
		min-width: 90rpx;
		// overflow: hidden;
		// white-space: nowrap;
		// text-overflow: ellipsis;
	}
	.Results{background: #fff;position: absolute; top:75px;left:0;right:0;bottom:0;border-top: 1px solid #d8d8d8;}
	.Results .Resultslist{border-bottom: 1px solid #d8d8d8; padding:10px;}
</style>
