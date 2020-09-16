<!-- 选项列表 -->
<template>
	<view class="content">
		<view class="header bg0">
			<view class="status_bar"><!-- 状态栏占位 --></view>
			<view class="h100 row middle">
				<view class="w130 row middle between">
					<text class="iconfont icon-zuojiantou c3 f40 ml20" @tap="$common.goPage(-1)"></text>
					<text class="iconfont icon-close-x f56 c3" @tap="$common.goPage(-1)"></text>
				</view>
				<view class="search_box ml20 mr20 flex1 row middle">
					<text class="iconfont icon-sousuo c7 f46"></text>
					<input class="ml10 flex1" type="text" v-model="keyword" placeholder="开户行关键字" @input="search()">
				</view>
			</view>
		</view>
		<view class="bb pd20 bg0 row between middle" v-for="(val, index) in list" :key="index" @click="select(val)">
			<view class="ptb30 f30"><text>{{val.khh}}</text></view>
			<text class="iconfont icon-youjiantou iconsize"></text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list:[],
				address:'',
				bankName:'',
				keyword:'',
			}
		},
		onLoad: function(e) {
			this.address = e.address;
			this.bankName = e.bankName;
			this.getLhhList();
		},
		components: {},
		methods: {
			goBack(){
				uni.navigateBack();
			},
			search(){
				let th = this;
				setTimeout(function(){
					th.getLhhList(th.keyword);
				},200)
			},
			getLhhList(keyword){
				let address = this.address.split(',');
				let requestData = {};
				let th = this;
				this.branchList = [];
				if(address[1] == '市辖区' || address == '县'){
					requestData.city = address[0];
				}else{
					requestData.city = address[1];
				}
				requestData.county = address[2];
				requestData.bankName = this.bankName;
				if(keyword){
					requestData.keyword = keyword;
				}
				this.$http.posts("/api/account/getLhhList",requestData)
				.then(res=>{
					if(res.data.length<1){
						this.$msg.toast('搜索不到开户行信息，检查输入信息或者联系在线客服');
					}
					this.list = res.data;
				})				
			},
			select(obj) {
				this.$storage.set('khh',obj.khh);
				this.$storage.set('lhh',obj.lhh);
				uni.navigateBack();
			}
		},
		mounted() {},
	}
</script>
<style>
@import "../../static/css/global.css";
</style>

