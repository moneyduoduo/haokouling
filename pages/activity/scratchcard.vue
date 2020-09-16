<template>
	<view>
		<ytHeader></ytHeader>
		<view class="lottery-draw-banner">
			<image src='../../static/img/beijingtu2.jpg' mode='widthFix'></image>
		</view>
		
		<view class="yj-relative">
			<view class="yt-guabtn">
				立即刮奖
			</view>
			<view class="garce-scratch-card-bg" :style="{ width: graceContextWidth + 'px', height : graceContextHeight + 'px'}">
			  
			  <view class="yt-huojiang">
				  <!-- 抽取红包成功-->
				  <view class="yj-text-center yj-mar-t-biger" v-if="isPrizeMoney">
				  	<text class="yj-text-sm yj-text-bold">小幸运</text>
					<view class="yj-text-sm yj-text-bold yj-mar-tb">
						刮到了
						<text class="yj-color-red yj-text-super">{{prizemoney}}</text>
						元红包
					</view>
					<view class="yj-text-min">可进入个人-> 收益查看</view>
					<!-- <view class="yj-btn yj-radius yj-mar-t" v-if="canClick" style="width: 40%;" @click="goGet">点击领取</view> -->
					<!-- <view class="yj-btn yj-radius yj-mar-t" v-else style="width: 40%;">领取成功</view> -->
				  </view>
				  <!-- 没有中奖 -->
				  <view class="yt-nogame yj-color-red" v-else>
				  	<view class="yj-text-big yj-text-bold yj-mar-tb-min">很遗憾，没有中奖</view>
				  	<view class="yj-text-min">小狼会不定期开启活动哦，奖励多多等你来</view>
					<view v-if="drawnum>0" class="yj-btn yj-radius yj-mar-t" style="width: 40%;" @click="againGame">在刮一次</view>
				  </view>
			  </view>
			  <!-- 登录 有次数-->
			  <canvas v-if="isGame && isCanvas" 
				canvas-id="graceCanvas" 
				:style="{width: graceContextWidth + 'px', height : graceContextHeight + 'px'}"
				@touchstart='touchstart'
				@touchmove='touchmove' 
				@touchend='touchend' 
				></canvas>
				<!-- 没有次数 -->
				<view class="yt-nogame yj-color-red" v-if="!isGame">
					<image src="../../static/img/zanwushuju.png" mode="widthFix" style="width: 50px; height: 59px;"></image>
					<view class="yj-text-big yj-text-bold yj-mar-tb-min">没有刮奖机会</view>
					<view class="yj-text-min">小狼会不定期开启活动哦，奖励多多等你来</view>
				</view>
			</view>
		</view>
		<view v-if="uid" style="color: #fff; text-align: right; margin: 0 auto;" :style="{ width: graceContextWidth + 'px'}">
			<!-- <text>今日还可以在抽{{drawnum}}次</text> -->
		</view>
		<view v-else style="color: #fff; text-align: right; margin: 20upx auto;" :style="{ width: graceContextWidth + 'px'}">
			<text>登录后可获取刮刮乐次数</text>
			<navigator class="sharecishu" url="../user/login">去登录</navigator>
		</view>
		<!-- <navigator class="yj-rule-left" url="../index/webview?url=http://">活动规则</navigator> -->
		<!-- 活动倒计时 -->
		<view class="yj-text-center yj-countDown" :style="{width: graceContextWidth + 'px'}" v-if="activity">
			本次活动还剩
			<text>{{hour}}</text> 时
			<text>{{minute}}</text> 分
			<text>{{second}}</text> 秒
		</view>
		<view  v-else>
			<view class="yj-text-center yj-countDown" :style="{width: graceContextWidth + 'px'}">
				本轮活动已结束
			</view>
			<view class="yj-text-center yj-color-fff yj-mar-t yj-text-sm">活动不定期开启，请授权app通知权限，以便及时收到活动信息</view>
			<!-- <view class="yj-text-center yj-color-fff yj-mar-t yj-text-sm">下轮刮刮乐时间为明日 {{startTime}} ~ {{endTime}} 敬请期待</view> -->
		</view>
		
		<view class="yt-guizenote">
			<navigator class="demo grace-animate flash" url="../index/webview?url=http://www.sqwolf.com/Rule/index/id/5">
				<view style="padding-top: 24upx; font-size: 24upx;">活动<br>规则</view>
			</navigator>
		</view>
		
	</view>
</template>
<script>
var  graceContext, _self,baseurl;

import ytHeader from '../../components/header.vue';

export default {
	components:{
		ytHeader
	},
	data() {
		return {
			uid:'',//用户id
			graceContextWidth  : 300,
			graceContextHeight : 160,
			drawnum:0,	//剩余抽奖次数
			/* prizes : [
			  // 格式 : {name:奖品名称, img : 奖品图片地址 (宽高等于 graceContextWidth 和 graceContextHeight 或者等比例放大)}
			  { name: "小米8青春版", img: "https://staticimgs.oss-cn-beijing.aliyuncs.com/mi8.png"},
			  { name: "感谢参与", img: "https://staticimgs.oss-cn-beijing.aliyuncs.com/xxcy.png" }
			],
			prizesBGimg : '', */
			clearArea : [],
			isClearEnd : false,
			speakerIconImg:'https://staticimgs.oss-cn-beijing.aliyuncs.com/speaker.png',
			prizemoney:'**',
			speakerMsgs: [],	//获奖人
			isGame:false,
			isPrizeMoney:true ,//是否抽取 红包 false没有抽取
			isCanvas:true,
			canClick:true,
			getmoney:'',
			startTime:'',
			endTime:'',
			hour:0,
			minute:0,
			second:0,
			activity:false	//活动开启，判断是否在时间段内
			
		};
	},
	onLoad: function (options) {
		_self = this;
		baseurl = getApp.globalData.baseUrl;
		try {
			const value = uni.getStorageSync('uid');
			if (value) {
				_self.uid = value;
				_self.chou();
			} else {
				_self.isGame = false;
				console.log("未登录")
			}
		} catch (e) {
			_self.isGame = false;
			console.log("未登录")
		}
		_self.canvasInit();
	},
	onShow: function () {
		//_self.getdrawnum();	
		//_self.timeload();
		
	},

	methods:{
		// 初始化
		canvasInit : function(){
			_self.isClearEnd = false;
			_self.isCanvas = true;
			graceContext = uni.createCanvasContext('graceCanvas');
			// 绘制遮盖层
			graceContext.setFillStyle("#D1D2D3");
			graceContext.fillRect(0, 0, _self.graceContextWidth, _self.graceContextHeight);
			graceContext.save();
			// 绘制刮字背景
			const pattern = graceContext.createPattern('../../static/imgs/gua.png', 'repeat');
			graceContext.fillStyle = pattern;
			graceContext.fillRect(0, 0, _self.graceContextWidth, _self.graceContextHeight);
			graceContext.save();
			// 绘制文字
			graceContext.setFillStyle("#666");
			graceContext.setFontSize(16);
			graceContext.setTextAlign('center')
			graceContext.fillText("刮一刮，好运来!", _self.graceContextWidth / 2, _self.graceContextHeight/2);
			graceContext.draw();
		},
				
		touchstart : function(e){
			if (_self.isClearEnd ){return;}
			var startX = e.touches[0].x;
			var startY = e.touches[0].y;
			_self.clearArea.push({ x: startX, y: startY});
			_self.clearBase();
		},
		touchmove: function (e) {
			if (_self.isClearEnd) { return; }
			var endX = e.touches[0].x;
			var endY = e.touches[0].y;
			// 记录要擦除的区域
			_self.clearArea.push({ x: endX, y: endY });
			_self.clearBase();
		},
		touchend: function (e) {
			if (_self.isClearEnd ){return;}
			// 计算是否全部展示
			// 获取 最小的 x y
			var minX = _self.clearArea[0].x;
			var minY = _self.clearArea[0].y;
			var maxX = _self.clearArea[0].x;
			var maxY = _self.clearArea[0].y;
			for (var i = 1; i < _self.clearArea.length; i++){
			  if (_self.clearArea[i].x > maxX){
				maxX = _self.clearArea[i].x;
			  }
			  if (_self.clearArea[i].y > maxY) {
				maxY = _self.clearArea[i].y;
			  }
			  if (_self.clearArea[i].x < minX) {
				minX = _self.clearArea[i].x;
			  }
			  if (_self.clearArea[i].y < minY) {
				minY = _self.clearArea[i].y;
			  }
			}
			var width = maxX - minX;
			var height = maxY - minY;
			var acreage = width * height;
			if (acreage * 6 > _self.graceContextWidth * _self.graceContextHeight){
			  _self.isClearEnd = true;
			  graceContext.clearRect(0, 0, _self.graceContextWidth, _self.graceContextHeight);
			  graceContext.draw();
			  _self.clearArea = [];
			  //抽奖次数减1
			  _self.createPrize();
			  _self.drawnum--;
			  _self.isCanvas = false; //关闭canvas
			}
		},
		clearBase : function(){
			graceContext.setFillStyle("#D1D2D3");
			graceContext.fillRect(0, 0, _self.graceContextWidth, _self.graceContextHeight);
			const pattern = graceContext.createPattern('../../static/imgs/gua.png', 'repeat')
			graceContext.fillStyle = pattern
			graceContext.fillRect(0, 0, _self.graceContextWidth, _self.graceContextHeight);
			for (var i = 0; i < _self.clearArea.length; i++){
			  graceContext.clearRect(_self.clearArea[i].x, _self.clearArea[i].y, 50, 50);
			}
			graceContext.draw();
		},
		
		againGame:function(){
			console.log('再来一次');
			_self.isCanvas = true;
			_self.isGame = true;
			_self.canvasInit();
		},
		//获奖声音
		sound:function(){
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.src = '../../static/sound/money.mp3';
			innerAudioContext.autoplay = true;
			innerAudioContext.onPlay(() => {
			  console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
			  console.log(res.errMsg);
			  console.log(res.errCode);
			});
		},
		sound2: function() {
			var p = plus.audio.createPlayer(baseurl + "public/static/Home/pc/static/sound/money.mp3");
			console.log(p);
			p.play(function() {
				console.log("Audio play success!");
			}, function(e) {
				console.log("Audio play error: " + e.message);
			});
		},
		/* sound2: function() {
			var p = plus.audio.createPlayer("/static/sound/money.mp3");
			console.log(p);
			p.play(function() {
				console.log("Audio play success!");
			}, function(e) {
				console.log("Audio play error: " + e.message);
			});
		}, */
		chou:function(){
			uni.request({
				url: 'http://www.sqwolf.com/index.php/User/scrUp',
				data: {
					type:1,
					uid: _self.uid
				},
				method:'POST',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success: (res) => {
					console.log(JSON.stringify(res.data));
					//console.log();
					//判断是否活动中
					if(res.data.code=='1'){
						_self.startTime = res.data.opentime * 1000;
						_self.endTime = res.data.endtime * 1000;
						_self.activity = true; 
						
						// 开启倒计时
						_self.intervalTime();
						
						//判断是否有抽奖次数
						if(res.data.count<=0){ 
							/* uni.showToast({
								title:'您没有抽奖次数',
								icon:'none'
							}) */
							//没有抽奖次数 游戏状态关闭
							_self.isGame = false;
						}else{
							// 有次数，游戏状态开启
							_self.drawnum = res.data.count;
							_self.isGame = true;
						}
						
					}else{
						uni.showToast({
							title:'活动暂未开启',
							icon:'none'
						})
						_self.isGame = false;
					}
				}
			});
		},
		
		/* 
		* 
		* 该方法 刮奖成功后触发，触发方法在 touchend()中
		* 
		*  */
		
		createPrize:function(){
			uni.request({
				url: 'http://www.sqwolf.com/index.php/User/scrUp',
				data: {
					type:2,
					uid: _self.uid
				},
				method:'POST',
				header : {'content-type':'application/x-www-form-urlencoded'},
				success: (res) => {
					console.log(JSON.stringify(res.data));
					//判断刮奖状态
					if(res.data.code=='0'){
						let doller = res.data.doller;
						//获得奖金
						if(doller>0){
							//执行背景音
							_self.sound2();
							_self.isPrizeMoney = true;
							_self.prizemoney = doller;
						}else{
							uni.showToast({
								title:'很遗憾，没有中奖',
								icon:'none'
							})
							_self.isPrizeMoney = false;
						}
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						_self.isGame = false;
					}
				}
			});
		},
		intervalTime: function(){
			
			var interval = setInterval(function(){
				_self.timeload(_self.startTime,_self.endTime);
				if(!_self.activity){
					clearInterval(interval);
				}
			},1000);
				
			
		},
		//是否可以抽奖
		isGameFun: function(){
			if(_self.drawnum > 0){
				_self.isGame = true
			}else{
				_self.isGame = false;
			}
			console.log(_self.drawnum);
		},
		goGet: function(){
			console.log('领取');
			_self.sound2();
			uni.showModal({
				title: '领取成功',
				content: '可进入收益页面查看',
				success: function (res) {
					if (res.confirm) {
						_self.canClick = false;
					} else if (res.cancel) {
						_self.canClick = false;
					}
				}
			});
		},
		
		
		
		//获取倒计时状态
		timeload:function(startTime,endTime){
			let myDate = new Date();
			let localtime = myDate.getTime();
			//console.log(localtime);
			if(localtime>=startTime && localtime<=endTime){
				_self.activity = true;
				let shengtime = endTime - localtime;
				_self.formatDateTime(shengtime);
			}else{
				_self.activity = false;
				_self.isGame = false;
			};
			
		},
		
		
		//剩余时间戳转过为 h:m:s倒计时
		formatDateTime:function (inputTime){
			//console.log(inputTime);
			var date = new Date(inputTime);
			  /* console.log(data); */
			var hour = parseInt(inputTime/3600000);
		
			var minute = date.getMinutes();
			var second = date.getSeconds();
			hour = hour < 10 ? ('0' + hour) : hour;
			minute = minute < 10 ? ('0' + minute) : minute;
			second = second < 10 ? ('0' + second) : second;
			_self.hour=hour;
			_self.minute=minute;
			_self.second=second;		
			/* console.log("hour："+hour);
			console.log("minute："+minute);
			console.log("second："+second); */
		},
	}
}
</script>

<style lang="less">
@import "../../static/css/mycss.less";
@import url("../../graceUI/animate.css");
page{background:#2e2b91;}
.yt-nogame{
	width: 100%;
	height: 100%;
	background-color: #FFD2D5;
	position: absolute;
	z-index:2; 
	left:0; 
	top:0;
	text-align: center;
	margin-top: 50upx;
}
.yj-rule-left{
	position: fixed;
	z-index: 10;
	bottom: 200upx;
	left: 0;
	padding: 20upx 40upx;
	background-color: rgba(255,255,255,.3);
	border-top-right-radius: 40upx;
	border-bottom-right-radius: 40upx;
	color: #fff
}

.yj-countDown{
	padding: 20upx;
	text-align: center;
	background-color: rgba(255, 255, 255, .3);
	color: #fff;
	border-radius: 10upx;
	margin: 0 auto;
}

.yt-guabtn{
	width: 147px;
	height: 39px;
	line-height: 39px;
	background-image: url('../../static/img/guajiang.png');
	background-size: 100% 100%;
	position: absolute;
	z-index: 9;
	left: 0;
	right: 0;
	top: -19px;
	text-align: center;
	color: #fff;
	margin: auto;
	font-size: 15px;
	font-weight: bolder;
}
.yt-huojiang{
	width: 100%;
	height: 100%;
	color: #2e2b91;
}
.sharecishu{
	display: inline-block;
	background-color: #FD4D66;
	color: #fff;
	padding:10upx 20upx;
	margin-left: 10upx;
	font-size: 25upx;
	border-radius: 5upx;
}
.yt-shengyu{
	padding: 10upx 30upx;
	background-color: rgba(0,0,0,.1);
	color: #fff;
	text-align: center;
	margin: 0 auto;
	border-radius: 10upx;
}

.yt-guizenote{
	width: 150upx;
	height: 150upx;
	position: fixed;
	right: 0;
	bottom: 0;
	z-index: 9;
}
.flash{animation:flash 3000ms infinite;width: 100upx; height: 100upx; line-height: 30upx; text-align: center; color: #fff; font-size: 24upx; background-color: #FD4C66; border-radius: 50%; box-shadow: 5upx 5upx 20upx #fff;}

.lottery-draw-msg {width:80%; border:2px solid #FC5566; border-radius:50px;color:#E81B54; background:rgba(255, 255,255, 0.8); margin:0 auto; margin-top:15px; padding:0 15px; height:36px;line-height:36px; overflow:hidden;}
.lottery-draw-banner{width:100%;}
.lottery-draw-banner image{width:100%;}

.garce-scratch-card-bg {
	position: relative;
	margin:-20px auto 20px; 
	overflow:hidden; 
	background:#FFD2D5; 
	border:2px solid #FFCD11; 
	border-radius: 10px;
}
.garce-scratch-card-bg image{width:100%;}
.garce-scratch-card-bg canvas{position:absolute; z-index:2; left:0; top:0;}
.grace-countdown{padding:2upx 0; flex-wrap:nowrap; justify-content:center;}
.grace-countdown-splitor{width:auto !important; justify-content:center; line-height:44upx; padding:0 5upx;}
.grace-countdown-numbers{line-height:44upx; width:auto !important; padding:0 10upx; justify-content:center; height:44upx; border-radius:8upx; margin:0 5upx; border:1px solid #000000; font-size:22upx;}
</style>