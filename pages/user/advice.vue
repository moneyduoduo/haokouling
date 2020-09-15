<template>
	<view class="advice">
		<view class="title">
			请选择反馈类型
		</view>
		<view class="type_box">
			
			<view :class="['type_list',item.id == selectId? 'active':'' ]" v-for="(item ,index ) in ranges" :key="index" @tap="selectType(item.id)">
				<image v-if="item.id == selectId" class="type_gou" src="../../static/image/home/gou.png" mode=""></image>
				<image  v-if="item.id != selectId"  class="type_gou" src="../../static/image/home/nochecked.png" mode=""></image>
				<view class="">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- <view class="type-btn"  @click="open">
			<view class="type-tip">
				{{selectRange? selectRange.name:'请选择反馈类型'}}
			</view>
			<view class="icon-right">
				&#xe644;
			</view>
		</view> -->
		<view class="title">
			意见及问题描述
		</view>
		<textarea :placeholder="placeholder" v-model="content" placeholder-style="color:#e6e6e6" maxlength=100></textarea>
		<view class="title">
			您的联系方式
		</view>
		<input class="input-link" placeholder="手机/邮箱/QQ(选题)" placeholder-style="color:#e6e6e6" type="text" v-model="link" />
		<view class="upload-box">
			<view class="upload-title" style=" font-size: 30rpx;color: #000;">
				上传图片（最多6张）
			</view>
			<view class="img-box">
				<upload class="upload-img" imgWidth="100px" imgHeight="100px" :isCallback="true" :limit='6' :app="1" :event="2" @getImg= "getImg"></upload>
			</view>
		</view>
		<view class="sub" @tap="sub">
			提交
		</view>
		<uni-popup ref='popup' type='bottom' @change = changeShow>
			<view class="edit-box">
				<view class="edit" @tap="cancel">
					取消
				</view>
				<view class="select-type">
					反馈类型
				</view>
				<view class="edit" @tap="comfirm">
					确定
				</view>
			</view>
			<picker-view v-if="isShow" indicator-style='height: 62upx' @change="selectPicker" class="piacker-view" :value="selected">
				<picker-view-column class="pi-column">
					<view class="piacker-item" v-for="item in ranges" :key = 'item.id'>
						{{item.name}}
					</view>
				</picker-view-column>
			</picker-view>
		</uni-popup>
	</view>
</template>

<script>
	import upload from '@/components/tui-upload/tui-upload.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data () {
			return {
				placeholder: '请写下您对集享的感受，我们将认真听取您的意见，努力提供更优质的服务',
				link: '',
				ranges:[],
				selected: [0],
				selectRange: '',
				index: 0,
				tempRange:'',
				isShow:false,
				content:'',
				imgList: [],
				selectId:'',
			}
		},
		methods:{
			selectType(id) {
				if(this.selectId == id) {
					this.selectId = ''
				}else {
					this.selectId = id
				}
				
			},
			selectPicker(e) {
				console.log(e)
				this.tempRange = this.ranges[e.detail.value[0]]
				this.index = e.detail.value[0]
			},
			open() {
				this.$refs.popup.open()
				
			},
			cancel() {
				this.$refs.popup.close()
				
			},
			changeShow(e){
				this.isShow = e.show
			},
			comfirm() {
				this.selectRange = this.tempRange
				this.selected[0]= this.index
				this.$refs.popup.close()
				
			},
			getImg(val) {
				this.imgList = val
			},
			sub () {
				let upImg = []
				this.imgList.forEach( (item) =>{
					upImg.push(item.split('.com')[1])
				})
				let imgString = upImg.join(',')
				let option = {}
				option.type = this.selectId
				option.content = this.content
				option.images = imgString
				option.contact = this.link
				if(!option.type) {
					this.$msg.toast('请选择反馈类型')
					return
				}
				this.$http.post('/api/feedback/add',option).then( res => {
					this.$msg.toast('意见反馈已提交，谢谢您的反馈')
					setTimeout(function() {
						uni.navigateBack()
					}, 1000);
				})
			}
			
		},
		onLoad() {
			let rangeTemp = this.$storage.get('jxConfig').config.feedbackType
			for ( let key in rangeTemp) {
				this.ranges.push({id:key,name:rangeTemp[key]})
			}
			this.tempRange = this.ranges[0]
		},
		components:{
			upload,
			uniPopup
		}
	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont'; 
	  src: url('https://at.alicdn.com/t/font_1124562_v4gvrjx69c.ttf') format('truetype');
	}
	page {
		background-color: #fff;
		padding: 0 40upx;
		color: #999;
		font-size: 28upx;
		box-sizing: border-box;
	}
	.type_box {
		margin-top: 30rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.type_gou {
		width: 33rpx;
		height: 33rpx;
		margin-right: 28rpx;
		margin-left: 14rpx;
		
	}
	.type_list {
		width: 204rpx;
		height: 76rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		color: #333;
		border-radius: 10rpx;
		margin-right: 16rpx;
	}
	.type_list.active {
		background-color: #ffe500;
	}
	.advice {
		
	}
	.type-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		border: 2upx solid #e4e4e4;
		height: 80upx;
		padding: 0 24upx;
		border-radius: 12upx;
	}
	.icon-right {
		font-family: 'iconfont'; 
	}
	textarea {
		margin-top: 30upx;
		box-sizing: border-box;
		color: #333;
		font-size: 28upx;
		background-color: #fff;
		width: 100%;
		border-radius: 12upx;
		border: 2upx solid #e4e4e4;
		padding: 20upx;
	}
	input {
		font-size: 28upx;
	}
	.input-link {
		margin-top: 30upx;
		box-sizing: border-box;
		background-color: #fff;
		border: 2upx solid #e4e4e4;
		height: 80upx;
		padding: 0 24upx;
		border-radius: 12upx;
	}
	.title {
		font-size: 30rpx;
		color: #000;
		margin-top: 44rpx;
	}
	.upload-title {
		height: 80upx;
		line-height: 80upx;
	}
	.sub {
		width: 552upx;
		height: 80upx;
		border-radius: 80upx;
		text-align: center;
		line-height: 80upx;
		color: #333;
		font-size: 32upx;
		background-color: #FFEB00;
		margin: 80upx auto 50rpx;
	}
	.piacker-view {
		height: 480upx;
		background-color: #fff;
		text-align: center;
	}
	.edit-box {
		height: 80upx;
		background: #fff;
		border-bottom: 2upx solid #e6e6e6;
		padding: 10upx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.edit {
		width: 100upx;
		text-align: center;
		color: #FD4C66;
	}
	.select-type {
		color: #333;
	}
	.piacker-item {
		height: 62upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

</style>
