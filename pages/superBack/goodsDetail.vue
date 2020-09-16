<template>
	<view class="contentBox">
		<!-- <top-bar title="下单流程" bgClass="orange"></top-bar> -->
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="joinCart" @tap="launchApp">
					<text v-if="orderInfo.taskType == 1">复制关键词打开淘宝</text>
					<text v-if="orderInfo.taskType == 2">打开淘宝商品下单</text>
					<text v-if="orderInfo.taskType == 3">复制淘口令打开淘宝</text>
				</view>
			</view>
			<view class="btn">
				<view class="buy" @tap="inputOrder">回填单号</view>
			</view>
		</view>
		<!-- 订单号弹窗 -->
		<view class="orede_bar" v-if="showBox">
			<view class="mask"></view>
			<view class="orede_ops">
				<view class="oreder_box">
					<view class="cancelicon"><i class="iconfont icon-close-x" @tap="closeBox"></i></view>
					<view class="rowLine">
						<view class="title">
							<view class="line">
								1、回填订单号
							</view>
						</view>
						<view class="order_number_box">
							<view class="order_number">
								<input class="orderNumber" type="text" placeholder="点击按钮粘贴淘宝订单号" v-model="form.thirdOrderId" disabled>
							</view>
							<view class="box">
								<view class="btn" style="color:#fff;" @tap="pasteOrder(1)">粘贴</view>
							</view>
						</view>
					</view>
					<view class="rowLine">
						<view class="row between middle">
							<view class="line">
								2、核实金额
							</view>
							<view class="text">请填写实际付款金额</view>
						</view>
						<view class="title">
							
						</view>
						<view class="money_row">
							<text>此单实付金额为</text>
							<view class="input_box">
								<input class="money" type="number" v-model="form.orderPrice" @input="input">
								<i class="iconfont icon-close" v-if="form.orderPrice" @tap="setEmpty"></i>
							</view>
							<text>元</text>
						</view>
						<view class="prompt">
							多次填错实拍金额，会被永久限制参与。
						</view>
					</view>
					<view class="btn_box">
						<view class="disabled" :class="{active:readyOrder}" @tap="submit">{{btnText}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="prompt_top">
			<view class="ln2">
				<rich-text :nodes="$storage.get('cjfConfig').cjfOrderTip" ></rich-text>
			</view>
		</view>
		<view class="backgefi_box" @tap="goPageGoods()">
			<view>返回查看礼品详情</view>
		</view>
		
		<view class="detaile_bar">
			<view class="title">
				<view>目标商品信息</view>
				<view class="right" @tap="$common.getTaskArticle()">操作教程</view>
			</view>
			<view class="storeDetail">
				<view class="store_img">
					<image :src="orderInfo.goodsThumb"></image>
				</view>
				<view class="storeInfo">
					<view class="ln1 ellipsis1" v-if="orderInfo.taskType == 1">
						<text class="b">店铺名：</text>
						<text>{{orderInfo.shopName}}</text>
					</view>
					<view class="ln1 ellipsis2" v-if="orderInfo.taskType == 2 || orderInfo.taskType == 3">
						<text class="b">商品名称：</text>
						<text>{{orderInfo.goodsTitle}}</text>
					</view>
					<view class="money_color">实拍价：{{orderInfo.realPrice}}元 返利{{orderInfo.returnPrice}}元</view>
					<view class="text">按照“<text>{{orderInfo.taobaoOrderText}}</text>”排序</view>
				</view>
			</view>
		</view>
		
		<view class="detaile_bar">
			<view class="title">
				<view class="color">商家额外要求</view>
			</view>
			<view class="storeDetail">
				<view class="store_text wrap" v-if="orderInfo.goodsDesc">{{orderInfo.goodsDesc}}</view>
				<view class="store_text" v-else>无额外要求</view>
			</view>
		</view>
		
		<view class="detaile_bar">
			<view class="title">
				<view>下单流程</view>
			</view>
			<view class="storeDetails">
				<view class="ln2">
					<rich-text v-if="orderInfo.taskType == 1" :nodes="$storage.get('cjfConfig').cjfTaskTip1" ></rich-text>
					<rich-text v-if="orderInfo.taskType == 2" :nodes="$storage.get('cjfConfig').cjfTaskTip2" ></rich-text>
					<rich-text v-if="orderInfo.taskType == 3" :nodes="$storage.get('cjfConfig').cjfTaskTip3" ></rich-text>
				</view>
			</view>
		</view>
		<view  v-if="orderInfo.taskType == 1">
			<view class="goodschecktext">若不确定是否目标商品，长按该商品标题复制链接，此处验证</view>
			<view class="checkUrl">
				<view class="box">
					<view class="text">{{goodsUrl}}</view>
					<view class="content" @tap="checkGoodsUrl(0)">一键商品验证</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import checkForm from '@/common/checkForm'
export default {
	data() {
		return {
			btnText:'',
			showBox:false,
			orderInfo: {},
			form:{
				orderId:0,
				orderPrice:'',
				thirdOrderId:''
			},
			goodsUrl:'',
			readyOrder:false
		};
	},
	onLoad(option) {
		this.form.orderId = option.orderId;
		this.$http.posts('/api/order/getOrderDetail',{orderId:this.form.orderId}).then(res=>{
			this.orderInfo = res.data;
			this.orderInfo.goodsThumb = this.$common.imgThumb(res.data.goodsThumb);
		})
	},
	onReady(){
		
	},
	mounted () {
		
	},
	onUnload(){
		
	},
	
	methods: {
		goPageGoods(){
			this.$common.goPage('/pages/superBack/goods?orderId='+this.form.orderId);
		},
		launchApp() {  
			// #ifdef APP-PLUS
			let copyText = '';
			if(this.orderInfo.taskType == 2){
				return this.$bindSystem.baiChuan.detail(this.orderInfo.thirdGoodId);
			}else if(this.orderInfo.taskType == 1){
				copyText = this.orderInfo.keyword;
			}else if(this.orderInfo.taskType == 3){
				//缓存剪贴板内容，用户切换会app不做弹窗
				copyText = this.orderInfo.taoPassword;
				this.$storage.set('clipboardContent',copyText);
			}
			this.$common.copy(copyText,()=>{
				if (plus.os.name == 'Android') {
					plus.runtime.launchApplication({pname: 'com.taobao.taobao'}, (e)=>{
						this.$msg.toast('请先安装淘宝');
					});  
				} else if (plus.os.name == 'iOS') {  
					plus.runtime.launchApplication({ action: 'taobao://' }, (e)=>{
						this.$msg.toast('请先安装淘宝');
					});   
				}
			});
			// #endif
		},
		countDownTip(){
			this.showBox = true;
			let times = 6;
			this.readyOrder = false;
			this.btnText = '务必再核对好金额 '+times+'s';
			clearInterval(this.intervalID);
			this.intervalID = setInterval(()=>{
				times--;
				this.btnText = `务必再核对好金额 ${times}s`;
				if(times==0){
					this.readyOrder = true;
					this.btnText = '确认并提交';
					clearInterval(this.intervalID);
				}
			},1000)
		},
		inputOrder(){
			if(this.$storage.get('isNoActionTip')){
				return this.countDownTip();
			}
			this.$msg.confirm({
				title:"提示信息",
				content:this.$storage.get('cjfConfig').cjfActionTip,
				cancelText:'忽略提醒',
				confirmText:'好的'
			},(data) =>{
				this.countDownTip();
			},(data)=>{
				this.$storage.set('isNoActionTip',true);
				this.countDownTip();
			})
		},
		submit(){
			let {checkNull,checkNumber,checkLength,checkMaxorMin} = checkForm
			let oN = this.form.thirdOrderId;
			let m = this.form.orderPrice;
			if(this.readyOrder){
				//订单号校验
				if(!checkNull(oN,'订单号不能为空')||!checkNumber(oN,'订单号格式错误')||!checkLength(oN,'18,18','订单号为18位！')){
					return
				}
				 //金额校验
				if(!checkNull(m,'金额不能为空')||!checkMaxorMin(m,`${m-50},${m+50}`,'请输入正确的金额！')){
					return
				}
				this.$http.posts('/api/order/doTaskOrder',this.form).then(res=>{
					if(res.status == 1){
						clearInterval(this.intervalID);
						this.$common.goPage('/pages/superBack/orderList');
					}
				});
			}
		},
		input(e){
			this.form.orderPrice = e.detail.value
		},
		closeBox(){
			clearInterval(this.intervalID)
			this.showBox = false;
		},
		setEmpty(){
			this.form.orderPrice = '';
		},
		pasteOrder(){
			//this.form.thirdOrderId = this.$common.paste();
			this.$common.paste((data)=>{
				this.form.thirdOrderId = data;
			});
		},
		checkGoodsUrl(index){
			let _this = this
			
			// #ifdef APP-PLUS
			
			uni.getClipboardData({
			    success: function (res) {
					if(index==0){
						_this.goodsUrl = res.data
						_this.$http.posts('/api/order/doValidateUrl',{url:res.data,orderId:_this.form.orderId}).then(data=>{
							_this.$msg.toast("商品链接验证正确，请放心购买！")
						}).catch(err => {
							_this.$msg.toast("商品链接错误请勿购买！")
						})
					}else{
						if(res.data.length == 18){
							_this.$msg.toast("订单号错误！")
							return
						}
						let reg = /^[0-9]+$/; 
						if(!reg.test(res.data)){
							_this.$msg.toast("订单号无效！")
							return
						}
						_this.orderNumber = res.data
					}
					
			    }
			});
			// #endif

		},
		// 分享
		share(){
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			setTimeout(() => {
				this.shareClass = 'none';
			}, 150);
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		

	}
};
</script>

<style lang="scss">
@import "../../static/css/global.css";
.contentBox{padding-bottom:100rpx;}
.content{padding:0;}
.prompt_top{background: #fdfbec;padding:30rpx;}
.prompt_top view{ color:#f3447b;margin-bottom: 20rpx;}

.backgefi_box{padding: 30rpx;}
.backgefi_box view{height:80rpx;line-height: 80rpx;background: #f2457b; color:#fff; text-align: center; border-radius:40rpx;}

.detaile_bar,.sharp_text{padding: 0 30rpx;background: #fff;margin-bottom: 20rpx;}
.detaile_bar .title{margin-top: 20rpx;display:flex;justify-content:center;align-items:center; font-weight: bold;}
.detaile_bar .title view{font-size: 32rpx;}
.detaile_bar .title view.right{color: #f3447b;text-align: right;}
.detaile_bar .title view.color{color: #f3447b;}

.detaile_bar .storeDetail{display:flex;margin-top: 30rpx;}
.detaile_bar .storeDetail .store_img{width: 260rpx; height:260rpx; margin-right: 20rpx; }
.detaile_bar .storeDetail .store_img image{width: 100%; height:100%;}
.detaile_bar .storeDetail .storeInfo{flex: 1;}
.storeInfo .storeName{font-weight: bold;}
.storeInfo .money_color{color:#f3447b;font-weight: bold;font-weight: bold;margin-top: 10rpx;}
.storeInfo .text{font-weight: bold;margin-top: 40rpx;}
.storeInfo .text text{color:#f3447b;}
.storeDetails{margin-top: 30rpx;}
.storeDetails .store_text{margin-bottom: 20rpx;}

.goodschecktext{text-align: center; color:#666;font-size: 24rpx;margin-top: 60rpx;}
.checkUrl{padding: 30rpx;padding-bottom: 30px;}
.checkUrl .box{height:100rpx;background: #fff; text-align: center; border-radius:60rpx;padding: 20rpx;display:flex;justify-content:flex-end;align-items:center;border:1px solid #ddd;}
.checkUrl .box .text{flex:1;overflow: hidden;white-space : nowrap;margin: 0 30rpx;}
.checkUrl .box .content{width: auto; height:70rpx; line-height:70rpx; margin-right: 10px; color:#fd7209;padding-left: 20rpx; border-left:1px solid #fd7209;}


.orede_bar .mask{background-color:rgba(0,0,0,0.5);position:fixed;width:100%;height:100%;top:0;z-index:11}
.orede_bar .orede_ops{position:fixed;z-index:12;top:0;left: 0;right:0; bottom:0;display:flex;justify-content:center;align-items:center;}
.orede_bar .orede_ops .oreder_box{width: 80%;margin: auto; background: #fafafa;border-radius: 20rpx;}
.oreder_box .cancelicon{height:80rpx;padding:0 20rpx;display:flex;justify-content:flex-end;align-items:center;}
.oreder_box .cancelicon i{width: 60rpx; height:60rpx; font-size: 60rpx; color:#a6a6a6;}
.oreder_box .rowLine{padding:30rpx;margin-bottom: 40rpx;}
.oreder_box .rowLine .title{display:flex;justify-content:center;align-items:center;}
.oreder_box .rowLine .line{font-weight: bold;color:#000;}
.oreder_box .rowLine .link,.oreder_box .row .title .text{width: auto;}
.oreder_box .rowLine .link{color:#de5140;}
.oreder_box .rowLine .text{font-size: 18rpx;}
.order_number_box{border-radius:60rpx;padding: 20rpx 10rpx;height:80rpx;display:flex;justify-content:flex-end;align-items:center; border:1px solid #a6a6a6; margin-top: 30rpx;}
.order_number_box .order_number{flex:1;}
.order_number_box .orderNumber{color:#000;padding-left: 20rpx;}.placeholder {color: #999999;}

.order_number_box .box{width: 120rpx;height:60rpx;line-height:60rpx;border-radius:40rpx;background:#de5140;text-align: center;}
.order_number_box .box .content{width: auto; height:70rpx; line-height:70rpx; margin-right: 40rpx; color:#de5140;padding-left: 40rpx; border-left:1px solid #de5140;}

.oreder_box .rowLine .money_row{display:flex;justify-content:space-between;align-items:center; margin-top: 30rpx;}
.oreder_box .rowLine .money_row text{color:#999;width: auto;}
.oreder_box .rowLine .money_row .input_box{flex:1; border-bottom:1px solid #de5140;display:flex;justify-content:center;align-items:center;}
.oreder_box .rowLine .money_row .input_box .money{color:#de5140; font-weight: bold;text-align: center;flex:1;}
.oreder_box .rowLine .money_row .input_box i{width:50rpx;height: 50rpx; font-size: 40rpx;}
.oreder_box .rowLine .prompt{text-align: center;margin-top: 20rpx; color:#de5140;}

.oreder_box .btn_box{padding: 30rpx;padding-top: 0;}
.oreder_box .btn_box .disabled{background:#fb9d95; color:#fff; text-align: center; border-radius:40rpx;height:80rpx;line-height: 80rpx;}
.oreder_box .btn_box .disabled.active{background: #de5140;}


.footer{position:fixed;bottom:0px;height:100rpx;border-top:solid 1px #eee;background-color:#fff;z-index:2;display:flex;justify-content:space-between;align-items:center;}
.footer .icons{display:flex;height:100rpx;justify-content:space-between;}

.footer .icons .joinCart{text-align: center;line-height: 100rpx; color:#fff;font-size: 30rpx;background: linear-gradient(45deg,#ffc605, #f6940b);}
.footer .btn{height:100rpx; }

.footer .btn .buy{background: linear-gradient(45deg,#fd7209, #ff440f); height:100rpx;color:#fff;font-size:32rpx;line-height: 100rpx;text-align:center;}

</style>
