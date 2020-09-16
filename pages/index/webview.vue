<template>
	<view>
		<web-view :src="url" @message="getMessage">

		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '',
			}
		},
		onLoad(options) {

			if (options && options.url) {
			  if (options.url == 'ali_bc') {
					 console.log(options.keyword);
					this.url = "https://oauth.taobao.com/authorize?response_type=code&client_id=25265093&redirect_uri=http://aa.sqwolf.com/index/Auth/quDao&view=wap&state="+options.keyword;  //阿里百川
					// this.url = "https://chaoshi.m.tmall.com/"; //天猫超市 
				}else {
					this.url = options.url;
				} 

			}
		},
		methods: {
			getMessage(event) {
				console.log(JSON.stringify(event.detail))
// 					uni.redirectTo({
// 						url:'../detail/index?id='+event.detail.data[0].GoodsID
// 					})
// 					console.log(event.detail.data[0].GoodsID);
				uni.showModal({
					content: JSON.stringify(event.detail),
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
