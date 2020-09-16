<!-- 公告 -->
<template>
	<view class="page-content">
		<view class="pd30">
			<navigator class="ptb20 bb bg0" v-for="(val,index) in list" :key="index" :url='val.url'>
				<view class="f30 c3">
					{{val.title}}
				</view>
				<view class="c9 f26">
					{{val.createTime}}
				</view>
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
				var requestData = {},
					th = this;
				requestData.page = this.page;
				requestData.pageSize = this.pageSize;
				this.$http.posts('/api/article/getNoticeList',requestData)
				.then(res =>{
					if(res.data){
						res.data.map(function(a) {
							a.createTime = th.$common.timeFormat(a.createTime);
							a.url = "/pages/superBack/noticeDetail?id=" + a.id;
							th.list.push(a);
							console.log(1);
						})
					}
				});
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
</style>
