<!-- 公告 -->
<template>
	<view class="page-content">
		<top-bar title="常见问题" bgClass="orange"></top-bar>
		<view @tap="$common.getKefu()" class="mt30 mb30 row center bb bt bg0">
			<image src="/static/img/superback/service.png" style="width:550rpx;height:147rpx;"></image>
		</view>
		<view class="ptb20 f30 pd30 c6">超级返常见问题</view>
		<view class="pd30 bg0">
			<navigator class="bb" v-for="(val,index) in list" :key="index" hover-class="none" @tap="show(index)">
				<view class="row between ptb30">
					<view class="f30">
						{{val.title}}
					</view>
					<text class="iconfont icon-youjiantou c3 f30 ml20" v-if="!val.display"></text>
					<text class="iconfont icon-xiajiantou1 c3 f30 ml20" v-else></text>
				</view>
				<rich-text class="ptb20 pd30 mb10 c6" v-if="val.display" :nodes="val.content">
				</rich-text>
			</navigator>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 50
			}
		},
		components: {},
		methods: {
			getList: function() {
				let _this = this;
				this.$http.posts('/api/article/getFaqList', {})
					.then(res => {
						if (res.data) {
							res.data.map(function(a) {
								a.display = false;
								_this.list.push(a);
							})
						}
					});
			},
			show: function(index) {
				this.list.map((value, key) => {
					if (key == index) {
						this.list[index].display = !this.list[index].display;
					} else {
						this.list[key].display = false;
					}
				})
			}
		},
		onPullDownRefresh() {
			this.list = []
			this.page = 1
			this.getList()
		},
		mounted() {
			this.getList()
		},
	}
</script>
<style scoped>
	@import "../../static/css/global.css";

	page {
		background: #f2f2f2;
	}
</style>
