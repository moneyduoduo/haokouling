<template>
	<view class="page-content">
		<view :class="{pd30:title=='公告详情'}">
			<!--<view class="ptb20 f32 c3 bb">
				{{notice.title}}
				<view class="mt10 f26 c9">
					{{notice.createTime}}
				</view>
			</view>-->
			<view :class="{pt20:title=='公告详情'}" class="f30 c6">
				<rich-text :nodes="notice.content" ></rich-text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				notice:{},
				title:'公告详情'
			}
		},
		components: {},
		methods: {},
		onLoad: function(e) {
			let requestData = {},
				th = this;
			requestData.id = e.id;
			if(e.title){
				this.title = e.title;
				uni.setNavigationBarTitle({
					title: this.title
				});
			}
            this.$http.posts('/api/article/getNoticeDetail',requestData)
            .then(res =>{
                if(res.data){
                    res.data.createTime = '发布时间 '+th.$common.timeFormat(res.data.createTime);
					
					let richtext = res.data.content;
					const regex = new RegExp('<img', 'gi');
					let content = richtext.replace(regex, '<img style="max-width: 100%;"');
					
					res.data.content = content
                    th.notice = res.data;
                }
            });
		},
		mounted() {},
	}
</script>
<style>
@import "../../static/css/global.css";
 rich-text img{
	width: 100%;
}
</style>
