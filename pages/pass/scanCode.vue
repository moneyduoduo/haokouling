<template>
	<view id="scan-page">
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// #ifdef APP-PLUS
				barcode: [
					plus.barcode.QR
				], //码类型
				// #endif
			};
		},
		methods: {
			onmarked(type, result) {
				this.$storage.set('userCode', result)
				console.log(result)
				uni.navigateBack()
				// console.log(type +':'+ result);
				// this.$emit('getCode',result);
				// this.t=setTimeout(() => {
				// 	this.barcode.start();
				// }, 1000)
			}
		},
		onNavigationBarButtonTap() {
			const _this = this
			uni.chooseImage( {
				count:1,
				sourceType: ['album'],
				success: (e) => {
					 plus.barcode.scan(
						e.tempFilePaths[0], 
						(type, code, file)=> {
							_this.$storage.set('userCode', code)
							console.log(code)
							uni.navigateBack()
						}, 
						()=> {
							_this.$msg.alert({
								title: "提示",
								content: "未发现二维码"
							})
							console.log(123)
						});
				}
			})
		},
		onLoad() {

			var statusBarHeight = uni.getSystemInfoSync().statusBarHeight; //状态栏
			var height = statusBarHeight + 44 + 104 + 'px';
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			// #ifdef APP-PLUS
			var currentWebview = page.$getAppWebview();
			this.barcode = plus.barcode.create('scan-page', this.barcode, {
				top: '0',
				left: '0px',
				width: '100%',
				height: '100%', //180px
				position: 'static',
				frameColor: '#2b9939',
				scanbarColor: '#2b9939'
			});
			this.barcode.onmarked = this.onmarked;
			currentWebview.append(this.barcode);
			const res = uni.getSystemInfoSync();
			if (res.platform == 'android') { //安卓机
				this.barcode.start();
			}
			// #endif
		},
	}
</script>

<style>
	.scan-page {
		height: 100vh;
	}

	.scan-com {
		width: 100%;
		height: 100%;
	}
</style>
