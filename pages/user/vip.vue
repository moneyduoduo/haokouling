<template>

	<view class="vip" >
		<view class="vip-header" :style="{'paddingTop':statusBarHeight + 'px'}">
			<view class="left-box">
				<view class="vip-icon" @tap="back">
					&#xe74a;
				</view>
			</view>
		
			<view class="head-title">
				VIP升级
			</view>
			<view class="right-box">
				<!-- <view class="right-text">
				升级记录
			</view> -->
			</view>
		</view>
		<template v-if="isVip == 2">
			<view class="vip-content" :style="{paddingTop: (statusBarHeight*2)+88+'upx'}">
				<view class="label-text">
					活动类型
				</view>
				<view class="vip-type" @tap="openPopup">
					<view class="left-text">
						{{activityText? activityText:'请选择活动类型'}}
					</view>
					<view class="right-icon">
						&#xe652;
					</view>
				</view>
				<!-- <view class="vip-list">
				<view class="item-type" v-for="(item,index) in gradeList" :key="index" v-if="item.key != 1" >
					<view class="item-icon">
						&#xe604;
					</view>
					<view class="item-text">
						{{item.val}}剩余次数
					</view>
					<view class="item-num">
						{{upgradeNum}}
					</view>
				</view>
				<view class="item-type ">
					<view class="item-icon s-item">
						&#xe7ac;
					</view>
					<view class="item-text">
						VIP会员剩余次数
					</view>
					<view class="item-num">
						0
					</view>
				</view>
				
			</view> -->
				<view class="label-text">
					VIP升级信息
				</view>
				<view class="vip-type" @tap="openVip">
					<view class="left-text">
						{{gradeText? gradeText :'请选择升级等级'}}
					</view>
					<view class="right-icon">
						&#xe652;
					</view>
				</view>
				<view class="tel-box input-box">
					<input type="number" :disabled="isFocus" v-model="mobile" placeholder-style="color: #a9a9a9" placeholder="请输入会员手机号" maxlength="11" />
				</view>
				<view class="password-box input-box">
					<input type="password" :disabled="isFocus" v-model="password" placeholder-style="color: #a9a9a9" placeholder="请输入登录密码" />
				</view>
				<view class="comfirm" @tap="comfirm">
					确认升级
				</view>
			</view>
			<popup ref="popupone" type="center" @change="closePop">
				<view class="popup-box">
					<view class="popup-title">
						请选择活动名称
					</view>
					<view class="poput-list" v-for="(item,index) in activityList" :key="index" @tap="selectActivity(item.id,item.name)">
						{{item.name}}
					</view>
				</view>
			</popup>
			<popup ref="popuptwo" type="center" @change="closePop">
				<view class="popup-box">
					<view class="popup-title">
						请选择需要升级的会员类型
					</view>
					<view class="poput-list" v-for="(item,index) in gradeList" :key="index" v-if="item.key != 1" @tap="selectVip(item.key,item.val)">
						{{item.val}}
					</view>
				</view>
			</popup>
		</template>
		<view class="img" v-if="isVip == 1"  :style="{paddingTop: (statusBarHeight*2)+88+'upx'}">
			<image src="/static/image/home/vip.jpg" mode="widthFix"></image>
		</view>
	</view>

</template>

<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	import popup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				statusBarHeight,
				password: '',
				gradeList: [],
				activityList: [],
				upgradeNum: 0,
				activityId: '',
				activityText: '',
				grade: '',
				gradeText: '',
				mobile: '',
				isVip: 3, // 1普通 2 vip
				isFocus: false
			}
		},
		
		methods: {
			closePop(e) {
				this.isFocus = e.show
			},
			selectActivity(id, name) {
				this.activityId = id
				this.activityText = name
				this.$refs.popupone.close()
			},
			selectVip(id, name) {
				this.grade = id
				this.gradeText = name
				this.$refs.popuptwo.close()
			},
			back() {
				uni.navigateBack()
			},
			openVip() {
				this.$refs.popuptwo.open()
			},
			openPopup() {
				this.$refs.popupone.open()
			},
			getActivity() {
				this.$http.post("/api/buyerUpgradeApply/getActivity").then(res => {
					this.activityList = res.data.activityList
					this.upgradeNum = res.data.upgradeNum
				})
			},
			comfirm() {
				if (!this.activityId) {
					this.$msg.toast('请选择活动类型!')
					return
				}
				if (!this.grade) {
					this.$msg.toast('请选择升级等级!')
					return
				}
				let {
					checkNull,
					checkPhone,
					isChinese
				} = this.$checkForm
				if (this.intervalMark || !checkNull(this.mobile, '手机号码不能为空！') || !checkPhone(this.mobile, '请输入正确的手机号码！')) {
					return
				}
				if (!checkNull(this.password, '密码不能为空！') || !isChinese(this.password, '密码不支持中文！', true)) {
					return
				}
				this.$http.post('/api/buyerUpgradeApply/apply', {
					activityId: this.activityId,
					grade: this.grade,
					mobile: this.mobile,
					password: this.password
				}).then(res => {
					this.$msg.toast('申请成功，请等待审核')
					setTimeout(function() {
						uni.navigateBack()
					}, 1000);
				})

			}
		},
		components: {
			popup
		},
		onShow() {},
		onLoad(e) {
			let gradeList = this.$storage.get('jxConfig').config.gradeList
			for (let key in gradeList) {
				this.gradeList.push({
					key: key,
					val: gradeList[key]
				})
			}
			this.getActivity()
			if (e.grade > 1) {
				this.isVip = 2
			}else {
				this.isVip = 1
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: 'iconfont';
		/* project id 1124562 */
		src: url('https://at.alicdn.com/t/font_1124562_i3ma4vwv9sq.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1124562_i3ma4vwv9sq.svg#iconfont') format('svg');
	}

	page {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100%;
	}
	.img {
		width: 750upx;
		/* height: 1996upx; */
	}
	.img image {
		width: 100%;
		/* height: 100%; */
	}
	.vip {
		font-size: 28upx;
		/* background: linear-gradient(#f99a12,#ff7133); */
		background: linear-gradient(#fdf8e5, #edddc6);
		/* background: #fffacd; */
		flex: 1;
	}

	.vip-header {
		display: flex;
		position: fixed;
		top: 0;
		width: 100%;
		height: 88upx;
		align-content: center;
		justify-content: space-between;
		background-color: #fff;
	}

	.right-box,
	.left-box {
		flex: 1;
		display: flex;
		align-items: center;

	}

	.right-box {
		justify-content: flex-end;
	}

	.head-title {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
	}

	.vip-icon {
		font-family: 'iconfont';
		font-size: 40upx;
		padding-left: 20upx;
		width: 100upx;
	}

	.right-text {
		padding-right: 20upx;
	}

	.vip-content {
		padding: 0 20upx 60upx;
	}

	.label-text {
		margin-top: 20upx;
		height: 88upx;
		display: flex;
		align-items: center;
		font-size: 34upx;
	}

	.vip-type {
		width: 100%;
		box-sizing: border-box;
		height: 92upx;
		padding: 0 40upx 0 20upx;
		border: 2upx solid #e3d8cf;
		border-radius: 16upx;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left-text {
		color: #beab97;
		font-size: 30upx;
	}

	.right-icon {
		font-family: 'iconfont';
		font-size: 36upx;
		color: #beab97;
	}

	.vip-list {
		padding: 40upx 40upx 10upx 40upx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 0.4);
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		border-radius: 16upx;
		margin-top: 60upx;
	}

	.item-type {
		height: 76upx;
		display: flex;
		align-items: center;
		margin-bottom: 30upx;
	}

	.item-icon {
		font-family: 'iconfont';
		font-size: 60upx;
		color: #bca288;
		margin-right: 30upx;
	}

	.s-item {
		font-size: 64upx;
	}

	.item-text {
		flex: 1;
	}

	.item-num {
		color: #beab97;
	}

	.input-box {
		border: 2upx solid #e3d8cf;
		height: 92upx;
		border-radius: 16upx;
		margin-top: 26upx;
		background-color: #fff;
	}

	input {
		padding-left: 20upx;
		font-size: 28upx;
		height: 100%;
		color: #333;
	}

	.comfirm {
		height: 92upx;
		color: #fff;
		font-size: 32upx;
		text-align: center;
		line-height: 92upx;
		border-radius: 16upx;
		margin-top: 250upx;
		background: linear-gradient(-45deg, #e1160f, #f55f0d);
	}

	.popup-box {
		width: 620upx;
		box-sizing: border-box;
		padding: 16upx 0 16upx 30upx;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 16upx;
	}

	.popup-title {
		height: 88upx;
		width: 100%;
		line-height: 88upx;
		font-size: 38upx;
	}

	.poput-list {
		height: 84upx;
		line-height: 80upx;
		font-size: 32upx;
	}
</style>
