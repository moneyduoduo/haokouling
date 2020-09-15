<template>
  <view class="updata_bg">
    <view class="yt-popup-bg" >
    	<view class="yt-popup-con" v-if="showView">
    		<image src="/static/img/huodong_header.png" />
    		<view class="yt-popup-title">
    			<view>新版本来啦！</view>
    			<view class="yt-title-note">v{{version}}</view>
    		</view>
    		<view class="yt-popup-main">
    			<view class="yt-popup-info">{{content}}</view>
    			<view class="yt-popup-confirm downapp">立即更新</view>
    		</view>
    	</view>
    	<view class="yj-jindubox" v-if="showlod">
    		<progress :percent="downloadProgress" stroke-width="4" activeColor="#FD667C" />
    		<view class="jindunote">{{downloadText}}</view>
    	</view>
    </view>
  </view>
</template>

<script>
export default {
  components: {
		
  },
  data() {
    return {
		showlod:false,
		showView:true,
		version:'1.0.0',
		downloadProgress:0,
		dtask:null,
		content:'快来体验新版本啦！',
		downloadText:'正在下载中...'
    }
  },
  onLoad(option) {
	 let res = option.data
	 console.log(res)
  },

  onShow() {

  },

  methods: {
    installPackge(res) {
		if(res.downloadUrl){
			if (plus.device.vendor == 'Apple') {
				plus.runtime.openURL(res.downloadUrl);
			}else{
				this.uploadApp(res.downloadUrl)
			}
		}else{
			this.uploadApp(res.wgtUrl)
		}
		
    },
    // APP更新
    uploadApp(appUrl) {
		uni.downloadFile({
			url: appUrl,
			success: (data) => {
				if (data.statusCode === 200) {
					plus.runtime.install(data.tempFilePath, {
						force: false
					}, function() {
						plus.runtime.restart();
					}, function(e) {
						//console.error('install fail...');
						_this.$msg.toast('更新失败！')
					});
				}
			}
		})
		this.createTask()
    },
    //下载进度
    loadedSize() {
		let _this = this
		this.dtask.onProgressUpdate((res) => {
		  this.downloadProgress = res.progress
		  this.downloadText = `正在下载中...${res.progress}%`
		})
    },


  }
}
</script>

<style>
	.updata_bg{}
	.yt-popup-bg{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.4);
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.yt-popup-con{
		width: 300px;
		/* height: 30rem; */
		margin: auto;
		position: relative;
	}
	.yt-popup-con image{
		width:100%;
		height:164px;
		vertical-align: middle;
	}
	.yt-popup-title{
		position: absolute;
		top: 2.5rem;
		left: 1rem;
		font-size: 1.2rem;
		color: #fff;
	}
	.yt-title-note{
		font-size: .8rem;
	}
	.yt-popup-main{
		background-color: #fff;
		padding:0 2rem 1rem;
		border-bottom-right-radius: 1rem;
		border-bottom-left-radius: 1rem;
		font-size: 1rem;
		box-shadow: 1px 1px 1em #FD4C66;
	}
	.yt-popup-info{
		max-height: 10em;
		overflow: auto;
		padding:1rem 0;
		color: #666;
		font-size: .8rem;
	}
	.yt-popup-confirm{
		height: 2.6rem;
		line-height: 2.6rem;
		text-align: center;
		border-radius: 2.6rem;
		color: #fff;
		background-image: linear-gradient(to right,#FD667C,#FD4C66);
		box-shadow: 1px 1px 1em #FD667C,-10px -10px 20px #fff;
		margin: 1rem auto 1rem;
	}
	.yt-popup-note-center{
		text-align: center;
		color: #999;
		font-size: .8rem;
	}
	.yj-jindubox{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 75%;
		padding:20px;
		height: 1.8em;
		border-radius: 10px;
		background-color: #fff;
	}
	.jindubar{
		width: 100%;
		height: 5px;
		background-color: #ccc;
		border-radius: 5px;
		overflow: hidden;
	}
	.jindunote{
		font-size: 13px; 
		text-align: center;
		margin-top: 10px;
	}
	#jindureadybar{
		width: 2%;
		height: 5px;
		background-color: #FE4D47;
		border-radius: 5px;
		float: left;
	}
</style>
