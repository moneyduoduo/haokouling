<template>
	<view>
		<web-view class="mt100" :src="url"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				url: "",
				title:""
			}
		},
		onReady:function() {
			// setTimeout(()=>{
			// 	uni.setNavigationBarTitle({  //预防标题被修改
			// 		title: this.title
			// 	});
			// }, 5000);

		 },
		onLoad: function(option) {
			this.url = decodeURIComponent(option.url);
			if(option.token){
				this.url = this.url+'?'+'token='+option.token;
			}
			this.title = decodeURIComponent(option.title);
			uni.setNavigationBarTitle({
				title: option.title
			});
			
		},
		components: {},
		methods: {},
		mounted() {},
	}
</script>
<style scoped>
	@import "../../static/css/global.css";
</style>
