<template>
	<view class="protocol">
		<view class="protocol-head">
			{{details.head}}
		</view>
		<view class="item-box" v-for="(v,i) in details.content" :key="i">
			<view class="item-title">
				{{v.title}}
			</view>
			<view class="item-content" v-for="(value,index) in v.item" :key="index">
				{{value}}
			</view>
		</view>
	</view>
</template>
	
<script>
	import protocol from "@/common/protocol.js"
	export default {
		data() {
			return {
				details: protocol.privacy
			}
		},
		onShow () {

		},
		onLoad (options) {
			if(options.type == 1) {
				uni.setNavigationBarTitle({
					title: '用户服务协议'
				})
				this.details = protocol.user
			}else if(options.type == 2) {
				uni.setNavigationBarTitle({
					title: '隐私政策'
				})
			}
		}
	}
	
</script>

<style>
	.protocol {
		padding: 50upx;
		font-size: 28upx;
		color: #858585;
		line-height: 48upx;
	}
	.item-box {
		margin-top: 100upx;
	}
	.item-title {
		font-weight: bold;
	}
</style>
