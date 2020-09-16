<template>
	<view class="set">
		<view class="header">
			<image class="header_img" :src="userinfo.avatar" mode=""></image>
			<view class="username_box">
				<view class="username">
					{{userinfo.nickName}}
				</view>
				<view class="code">
					ID:{{userinfo.inviterCode}}
				</view>
			</view>
		</view>
		
		
		<view class="set-list" @tap="goAboutUs">
		
			<view class="list-left">
				<image  class="icon_img" src="../../static/image/home/qiye.png" mode=""></image>
				关于我们
			</view>
			<view class="list-right">
				<image class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
			</view>
		</view>
		<view class="set-list" @tap="goAdvice">
		
			<view class="list-left">
				<image  class="icon_img" src="../../static/image/home/jianyi.png" mode=""></image>
				意见反馈
			</view>
			<view class="list-right">
				<image class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
			</view>
		</view>
		<view class="set-list" @tap="goVersions">
			
			<view class="list-left">
				<image  class="icon_img" src="../../static/image/home/banben.png" mode=""></image>
				版本说明
			</view>
			<view class="list-right">
				<text>{{version}}</text>
				<image class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
			</view>
		</view>
		<view class="set-list" @tap="clearCache">
			<view class="list-left">
				<image  class="icon_img" src="../../static/image/home/qingli.png" mode=""></image>
				<view class="">
					清除缓存
				</view>
			</view>
			<view class="list-right">
				<text>{{fileSizeString}}</text>
				<image class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
			</view>
		</view>
		<view class="set-list" @tap="goRate">
			
			<view class="list-left">
				<image class="icon_img" src="../../static/image/home/haoping.png" mode=""></image>
				好评鼓励
			</view>
			<view class="list-right">
				<image class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
			</view>
		</view>
		<view class="set-list" @tap="goLogout">
			<view class="list-left">
				<image  class="icon_img" src="../../static/image/home/logout.png" mode=""></image>
				注销账号
			</view>
			<view class="list-right">
				<image class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
			</view>
		</view>
<!-- 		<view class="set-list" @tap="goCenter">
			<view class="list-left">
				服务中心
			</view>
			<view class="list-right">
				<image class="right-icon" src="../../static/image/pass/right.png" mode=""></image>
			</view>
		</view> -->
		<view class="layout" @click="outLogin">
			退出登录
		</view>
	</view>
</template>
<script>
	import open from "@/common/market.js"
	export default {
		data() {
			return {
				fileSizeString: '' ,//缓存大小
				userinfo:'',
				version:''
			}
		},
		onLoad: function(option) {
			this.userinfo = this.$storage.get('userInfo')
			this.version = this.$storage.get('version')
		},
		onShow() {
			this.formatSize()
		},
		methods: {
			goLogout() {
				uni.navigateTo({
					url: '/pages/pass/logout'
				})
			},
			goCenter() {
				uni.navigateTo({
					url: '/pages/user/serverCenter'
				})
			},
			goRate() {
				open.open({
				    key:'好口令',
					ios: '1485167876'
				});
			},
			goAdvice() {
				uni.navigateTo({
					url: '/pages/user/advice'
				})
			},
			goAboutUs() {
				uni.navigateTo({
					url: '/pages/user/aboutUs'
				})
			},
			goVersions() {
				uni.navigateTo({
					url: '/pages/user/versions'
				})
			},
			async loginOut() {
				let data = await this.$http.post('/api/buyer/doLogout')
				this.$store.commit('logout')
				uni.reLaunch({
					url: "/pages/user/index"
				})

			},
			outLogin() {
				let obj = {
					title: '提示',
					content: '确定要退出登录？'
				}
				this.$msg.confirm(obj, () => {
					this.loginOut();
				})
			},

			goReset() {
				uni.navigateTo({
					url: "/pages/pass/reset"
				})
			},
			formatSize() {
				let allSize = 0
				let that = this;
				uni.getSavedFileList({
					success: function(e) {
						e.fileList.forEach((v,i) => {
							allSize+=v.size
						})
						that.getCacheSize(allSize)
					}
				})
				
				plus.cache.calculate(function(size) {
					console.log(size)
					let sizeCache = parseInt(size);
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
			},
			getCacheSize (tempSize = 0) {
				let that = this;
				plus.cache.calculate(function(size) {
					let sizeCache = parseInt(size);
					sizeCache += tempSize
					if (sizeCache == 0) {
						that.fileSizeString = "0B";
					} else if (sizeCache < 1024) {
						that.fileSizeString = sizeCache + "B";
					} else if (sizeCache < 1048576) {
						that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
					} else if (sizeCache < 1073741824) {
						that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
					} else {
						that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
					}
				});
			},
			// 清除文件
			cleadFile ( ) {
				uni.getSavedFileList({
					success: function(e) {
						e.fileList.forEach((v,i) => {
							console.log(v.filePath)
							uni.removeSavedFile({filePath:v.filePath})
						})
					}
				})
				this.$storage.remove('launchFlag')
			},
			goClearCache() {
				this.$msg.confirm({
					content: '确定要清除缓存吗？'
				},this.clearCache())
			},
			clearCache() {
				if(this.fileSizeString == '0B') {
					uni.showToast({
						title: '暂无缓存，无须清除',
						icon:'none',
						duration: 2000
					});
					return 
				}
				uni.showLoading({
				    title: '缓存清除中'
				});
				this.cleadFile()
				let that = this;
				let os = plus.os.name;
				if (os == 'Android') {
					let main = plus.android.runtimeMainActivity();
					let sdRoot = main.getCacheDir();
					let files = plus.android.invoke(sdRoot, "listFiles");
					let len = files.length;
					for (let i = 0; i < len; i++) {
						let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
						console.log(filePath)
						plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
									uni.hideLoading();
									uni.showToast({
										title: '缓存清理完成',
										duration: 2000
									});
									that.formatSize(); // 重新计算缓存  
								}, function(e) {
									console.log(e.message)
								});
							} else {
								entry.remove();
							}
						}, function(e) {
							uni.showToast({
								title: '清除失败，请稍后重试',
								icon:'none',
								duration: 2000
							});
						});
					}
				} else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
					plus.cache.clear(function() {
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000
						});
						that.formatSize();
					});
				}
				
			}
		}
	}
</script>
<style>
	page {
		background: #f6f6f6;
	}
	.list-left {
		display: flex;
		align-items: center;
		
	}
	.icon_img {
		width: 50rpx;
		height: 50rpx;
		margin-top: 10rpx;
		margin-right: 18rpx;
		
	}
	.header {
		height: 200rpx;
		display: flex;
		padding-left: 36rpx;
		align-items: center;
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.header_img {
		width: 134rpx;
		height: 134rpx;
		
		border-radius: 134rpx;
		
	}
	.username_box {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
		
	}
	.username {
		font-size: 46rpx;
		font-weight: bold;
	
	}
	.code {
		margin-top: 10rpx;
	}
	.set {
		/* padding-top: 30upx; */
		font-size: 28upx;
	}
	
	.set-list {
		display: flex;
		height: 108upx;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		background-color: #fff;
		border-bottom: 2upx solid #F1F1F1;
		color: #333;
	}

	.right-icon {
		width: 40upx;
		height: 40upx;
	}

	.layout {
		background-color: #FFEB00;
		width: 340upx;
		margin: 100upx auto 0;
		text-align: center;
		line-height: 88upx;
		color: #333;
		font-size: 32upx;
		border-radius:88upx;
	}

	.list-right {
		display: flex;
		align-items: center;
		color: #666;
		font-size: 24rpx;
	}
</style>
