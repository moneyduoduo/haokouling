<template name="loadmore">
	<view class="yj-pad-tb yj-color-gray-light yj-text-center" v-if="show">
		<image class="yj-icon yj-mar-r-sm" :src="loadimg" v-if="loadType == 1"></image>
		<text>{{loadText[loadType]}}</text>
	</view>
</template>

<script>
	export default {
		name: "loadmore",
		props: {
			loadType: {
				type : Number,
				default: 0
			},
			loadText : {
				type  : Array,
				default : function () {
					return ["上拉加载更多", "加载中...", "已经加载全部数据"];
				}
			},
			show : {
			  type : Boolean,
			  default : true
			},
			loadimg:{
				type:String,
				default:'/static/img/loading.gif'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>

</style>
