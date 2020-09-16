<template>
	<view class="loadingbar" v-if="showloading">
		<view class="loading">
			<image src="/static/img/cst-loading.gif"></image>
			<view class="text">正在加载中，请稍后...</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props: {
		    showloading: {
		        type: Boolean,
		        default: false
		    }
		},
		methods:{  
		 }
	}
</script>

<style lang="scss">
	
	.loadingbar{display: flex;justify-content:center;align-items:center;margin-top: 100px;}
	.loading{text-align: center;}
	.loading image{width: 100px; height:100px;}
	.loading .text{font-size: 32upx;margin-top: 20upxs;}
</style>
