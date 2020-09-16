<template>
	<view class="page_content">
		<!-- <top-bar title="我要赚钱" bgClass="orange" :isClose="true" :isKefu="false"></top-bar> -->
		<view class="container">
			<view class="swiper-box">
				<image src="/static/image/superBack/shareMoney.jpg"></image>
			</view>
		<!-- 	<view class="rule_text ln2">
				<rich-text :nodes="$storage.get('cjfConfig').cjfInviterTip" ></rich-text>
			</view> -->
			<view class="tip_img1_box">
				<image src="../../static/image/superBack/wenxingtishi.png" mode=""></image>
			</view>
			<view class="tips_box">
				<view class="tips_item tips_item1">
					超级返用户邀请好友参与超级返即可成为超级返达人
				</view>
				<view class="tips_item tips_item2">
					超级返达人享名下一级二级用户超级返下单的奖励分成
				</view>
				<view class="tips_item tips_item3">
					系统根据超级返用户邀请请人数将达人分为3个等级
				</view>
			</view>
			<view class="tip_img2_box">
				<image src="../../static/image/superBack/daren.png" mode=""></image>
			</view>
			<view class="daren_box">
				<image src="../../static/image/superBack/daren1.png" mode=""></image>
				<view class="daren_num" style="color: #353535;">
					成功邀请人数<{{cjfConfig.buyerGrade2.number}}人
				</view>
				<view class="daren_rule daren_rule1">
					奖励规则: {{cjfConfig.buyerGrade1.level1}}元一级每单  {{cjfConfig.buyerGrade1.level2}}元/二级每单
				</view>
			</view>
			<view class="daren_box">
				<image src="../../static/image/superBack/daren2.png" mode=""></image>
				<view class="daren_num">
					成功邀请人数≥{{cjfConfig.buyerGrade2.number}}人
				</view>
				<view class="daren_rule daren_rule2">
					奖励规则: {{cjfConfig.buyerGrade2.level1}}元一级每单  {{cjfConfig.buyerGrade2.level2}}元/二级每单
				</view>
			</view>
			<view class="daren_box">
				<image src="../../static/image/superBack/daren3.png" mode=""></image>
				<view class="daren_num">
					成功邀请人数≥{{cjfConfig.buyerGrade3.number}}人
				</view>
				<view class="daren_rule daren_rule3">
					奖励规则: {{cjfConfig.buyerGrade3.level1}}元一级每单  {{cjfConfig.buyerGrade3.level2}}元/二级每单
				</view>
			</view>
			<view class="link_btn">
				<view class="btn" @tap="goSharePage">邀请赚金</view>
			</view>
			<view class="paihang_box">
				<image class="paihang_img" src="../../static/image/superBack/paihang.png" mode=""></image>
				<view class="paihang">
					<view class="title">
						<view class="title_text">
							排名
						</view>
						<view class="title_text">
							用户
						</view>
						<view class="title_text">
							总奖金(元)
						</view>
					</view>
					<view class="user" >
						<view class="user_info">
							<image class="grade_img" src="../../static/image/superBack/huangguan.png" mode=""></image>
							<view class="grade">
								冠军王者
							</view>
						</view>
						<view class="user_info">
							<image class="user_img" :src="userList[0].avatar" mode=""></image>
							<view class="tel">
								{{userList[0].mobile}}
							</view>
						</view>
						<view class="user_info">
							<view class="money_num">
								{{userList[0].awardAccount}}
							</view>
						</view>
					</view>
					<view class="user" >
						<view class="user_info">
							<image class="grade_img" src="../../static/image/superBack/huangguan_1.png" mode=""></image>
							<view class="grade">
								推广中心
							</view>
						</view>
						<view class="user_info">
							<image class="user_img" :src="userList[1].avatar" mode=""></image>
							<view class="tel">
								{{userList[1].mobile}}
							</view>
						</view>
						<view class="user_info">
							<view class="money_num">
								{{userList[1].awardAccount}}
							</view>
						</view>
					</view>
					<view class="user" >
						<view class="user_info">
							<image class="grade_img" src="../../static/image/superBack/huangguan_2.png" mode=""></image>
							<view class="grade">
								达人高手
							</view>
						</view>
						<view class="user_info">
							<image class="user_img" :src="userList[2].avatar" mode=""></image>
							<view class="tel">
								{{userList[2].mobile}}
							</view>
						</view>
						<view class="user_info">
							<view class="money_num">
								{{userList[2].awardAccount}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<bottom-nav current="1" @loadConfig="loadConfig"></bottom-nav>
	</view>
</template>
<script>
	import bottomNav from '@/components/superBack/bottomNav.vue'
	export default {
		components: {
			bottomNav
		},
		data() {
			return {
				cjfConfig:{},
				userList:[]
			}
		}, 
		methods: {
			goBack(){
				uni.navigateBack();
			},
			goSharePage(){
				uni.navigateTo({
					url: '/pages/superBack/sharePage'
				})
			},
			getAccountRankList() {
				this.$http.posts('/api/account/getAccountRankList',{page:1,pageSize:3}).then( res =>{
					console.log(res)
					res.data.forEach( (item ) => {
						item.avatar =  this.$common.qiniuCdnUrl(item.avatar)
					} )
					this.userList = res.data
				}) 
			}
		},
		onReady:function(){
		},
		onLoad: function() {
			this.cjfConfig = this.$storage.get('cjfConfig');
			console.log(this.cjfConfig);
			this.getAccountRankList()
		}
}
</script>
<style>
	@import "../../static/css/global.css";
	.user {
		display: flex;
		margin-top: 26rpx;
		padding-bottom: 36rpx;
	}
	.user_info .money_num {
		color: #FF6204;
		font-weight: bold;
		text-align: center;
		line-height: 24rpx;
	}
	.user_info  .tel {
		margin-top: 12rpx;
		font-size: 20rpx;
		color: #FF6204;
		text-align: center;
		line-height: 24rpx;
	}
	.user_info  .user_img {
		width: 64rpx;
		height: 64rpx;
		border-radius: 64rpx;
		
	}
	.user_info .grade {
		margin-top: 12rpx;
		text-align: center;
		color: #FF6204;
		font-size: 24rpx;
		font-weight: bold;
		line-height: 24rpx;
		letter-spacing: 4rpx;
		
	}
	.user_info .grade_img {
		width: 42rpx;
		height: 36rpx;
	}
	.user_info {
		flex: 1;
		height: 94rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}
	.paihang_box .title {
		display: flex;
		
	}
	.paihang_box .title .title_text {
		padding-top: 40rpx;
		flex: 1;
		text-align: center;
		color: #666666;
		font-size: 30rpx;
		line-height: 30rpx;
		letter-spacing: 4rpx;
	}
	.paihang {
		width: 670rpx;
		height: 567rpx;
		position: absolute;
		bottom: 14rpx;
		left: 12rpx;
		z-index: 2;
		background-color: #fff;
		border-radius: 32rpx;
	}
	.paihang_box {
		width: 694rpx;
		height: 840rpx;
		margin: 64rpx auto 0;
		position: relative;
	}
	.paihang_box .paihang_img {
		position: absolute;
		z-index: 1;
		width: 694rpx;
		height: 840rpx;
		top: 0;
	}
	.daren_num {
		font-size: 32rpx;
		color: #646464;
		position: absolute;
		width: auto;
		top: 100rpx;
		left: 276rpx;
	}
	.daren_rule{
		position: absolute;
		/* width: 541rpx; */
		width: auto;
		height: 40rpx;
		left: 52rpx;
		bottom: 48rpx;
		font-size: 24rpx;
		line-height: 40rpx;
		padding-left: 16rpx;
		padding-right: 16rpx;
		color: #fff;
	}
	.daren_rule1 {
		background: url(../../static/image/superBack/daren11.png);
		background-size: 100% 100%;
	}
	.daren_rule2 {
		background: url(../../static/image/superBack/daren22.png);
		background-size: 100% 100%;
	}
	.daren_rule3 {
		background: url(../../static/image/superBack/daren33.png);
		background-size: 100% 100%;
	}
	.daren_box {
		width: 714rpx;
		height: 277rpx;
		background-size: 100% 100%;
		margin: 0 auto;
		position: relative;
	}
	.daren_box image {
		width: 100%;
		height: 100%;
	}
	.tips_box {
		margin-top: 52rpx;
	}
	.tips_item {
		width: 681rpx;
		height: 75rpx;
		padding-left: 93rpx;
		line-height: 75rpx;
		font-size: 22rpx;
		margin:0 auto 12rpx;
	}
	.tips_item1 {
		background: url(../../static/image/superBack/01.png);
		background-size: 100% 100%;
	}
	.tips_item2 {
		background: url(../../static/image/superBack/02.png);
		background-size: 100% 100%;
	}
	.tips_item3 {
		background: url(../../static/image/superBack/03.png);
		background-size: 100% 100%;
	}
	.tip_img2_box {
		width: 242rpx;
		height: 88rpx;
		margin: 80rpx auto 0;
	}
	.tip_img2_box image {
		width: 100%;
		height: 100%;
	}
	.tip_img1_box{
		width: 196rpx;
		height: 88rpx;
		margin: 70rpx auto 0;
	}
	.tip_img1_box image {
		width: 100%;
		height: 100%;
	}
	.container{background: #FEDD12; padding-bottom: 180rpx;}
	.container .swiper-box {height: auto;}
	.container .swiper-box image{width: 100%; height: 988upx;}
	.rule_text{padding: 40rpx;color:#fff;margin-top: 40rpx ;}
	.level_box{ margin-top: 20rpx;padding: 40rpx;}
	.level_box .level{padding: 40rpx; background: #fff; margin-top: 40rpx;border-radius: 16rpx;}
	.level_box .level .row{display: flex; justify-content: center; align-items: center;}
	.level_box .level .row:nth-child(2){margin-top: 20rpx;}
	.level_box .level .row .title{font-size: 32rpx; font-weight: bold; border-radius: 6rpx;}
	.level_box .level .row .rule{color:#999;}
	.level_box .level .row .title,.level_box .level .row .rule{width: auto; margin-right: 40rpx;}
	.level_box .level .row .subtext{flex: 1; }
	.level_box .level .row .flex{display: flex;justify-content: center;align-items: center;}
	.level_box .level .row .flex text{font-size: 32rpx; font-weight: bold;}
	
	.level_box .level_01{border:3px solid #f78c8c;}
	.level_box .level_01 .row .title{ border-bottom: 3px solid #f9b8ca;}
	.level_box .level_01 .row .title,.level_box .level_01 .row .subtext,.level_box .level_01 .row .flex .text{
		background-image: -webkit-linear-gradient(bottom, #ed295e, #f05a8a);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	.level_box .level_02{border:3px solid #cccbce;}
	.level_box .level_02 .row .title{ border-bottom: 3px solid #c8c8c8;}
	.level_box .level_02 .row .title,.level_box .level_02 .row .subtext,.level_box .level_02 .row .flex .text{
		background-image: -webkit-linear-gradient(bottom, #595959, #a8a8a8);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	.level_box .level_03{border:3px solid #dbea82;}
	.level_box .level_03 .row .title{ border-bottom: 3px solid #e0ec81;}
	.level_box .level_03 .row .title,.level_box .level_03 .row .subtext,.level_box .level_03 .row .flex .text{
		background-image: -webkit-linear-gradient(bottom, #c0ad1f, #d2c518);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.link_btn{margin: 44rpx auto 0; width: 380rpx; border-radius: 88rpx; letter-spacing: 2rpx; box-shadow: 2px 2px 100rpx 0px rgba(118,118,118,0.18);}
	.link_btn .btn{height: 88rpx; line-height: 88rpx; border-radius: 88rpx;  background: #ffe74d; text-align: center; font-size: 36rpx ;color:#333333;}
</style>
