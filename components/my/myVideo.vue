<template>
	<!-- @play="videoStart()" @pause="videoPause()" :initial-time="startTime"-->
	<view>
		<video class="video" :src="src" :controls="false" :show-play-btn="false" 
			:style="{ height: height,width: width }" :loop="true" @play="videoStart()" @waiting="waiting"  @error="videoError()"
			:enable-progress-gesture="false"  
			:id="`video_${src}`" ref="`video_${src}`" @click="clickVideo">
			<cover-view class="videoimg" :style="{ height: height,width: width }" v-if="pause">
				<image class="videoIcon" src="../../static/img/video/stop.png" resize="contain"></image>
			</cover-view>
			<cover-view class="videoimg" :style="{ height: height,width: width }" v-if="playError">
				<!-- <image class="videoIcon" src="../../static/img/video/stop.png" resize="contain"></image> -->
				<text style="color: #fff;">视频播放出错</text>
			</cover-view>
		</video><!--  @timeupdate="timeupdate" -->
		<!-- <cover-view class="progressBar" :style="{ width: barWidth }"></cover-view> -->
	</view>
</template>

<script>
	export default{ 
		props:{
			controls:{
				type:Boolean,
				default:false
			},
			src:{
				type:String,
				default:''
			},
			play:{
				type:Boolean,
				default:false
			},
			ishide:{
				type:Number,
				default:0
			},
			height:{
				type:String,
				default:''
			},
			width:{
				type:String,
				default:''
			},
			duration:{
				type:Number,
				default:0
			},
			initialTime:{
				type:Number,
				default:0
			}
		},
		data(){
			return{
				time:0,
				videoplay:true,
				playError:false,		//播放出错
				pause:false,		//暂停
				
			}
		},
		onHide:function(){
			console.log("________________________");
			this.play = false;
		},
		methods:{
			videoStart(){
				this.pause = false;
			},
			videoPause(){
				this.pause = true;
			},
			
			/* timeupdate(event){
				if(!this.play) return
				if(this.time>=this.duration) this.time=0
				this.time = this.time + 0.25 
				if(this.duration == 0) this.time = 0
			}, */
			waiting(){
				
			},
			
			videoError(){
				this.playError = true;
			},
			clickVideo(){
				//this.$emit('click')
				//console.log(0);
				this.play = !this.play;
			},
			videoPlay(){
				if(this.play){
					this.videoCtx = uni.createVideoContext(`video_${this.src}`,this);
					this.videoCtx.play();
					this.pause = false;
				}else{
					this.videoCtx = uni.createVideoContext(`video_${this.src}`,this);
					this.videoCtx.pause();
					this.pause = true;
					//this.$emit('pause',this.time)
				}
				this.playError = false;
			},
		},
		watch:{
			play(newVal,oldVal){
				console.log('watch:'+this.src);
				this.videoPlay()
			},
			ishide(){
				this.play = false;
			},
			/* startTime:{
				immediate: true,
				handler(newVal,oldVal){
					this.time = newVal
					if(this.duration == 0) this.time = 0
				}
			} */
		},
		computed:{
			/* barWidth(){
				let width = this.time/this.duration*parseInt(this.width)
				console.log(this.time);
				console.log(this.duration);
				console.log(this.width);
				return `${width}px`
			},
			startTime(){
				return this.initialTime
			} */
		}
	}
</script>

<style scoped>
	.video{
		width: 100%;
		height: 100%;
	}
	.progressBar{
		border-radius: 2upx;
		height: 4upx;
		background-color: #FFFFFF;
		z-index: 999999;
		position: absolute;
		bottom: 40upx;
		//#ifndef APP-PLUS-NVUE
		animation: flicker 4s linear infinite;
		animation-direction:alternate;
		//#endif
	}
	//#ifndef APP-PLUS-NVUE
	@keyframes flicker {
		0% { box-shadow:0 0 0 #FFFFFF; }
	     /** 暂停效果 */
		10% { box-shadow:0 0 2upx #FFFFFF; }
	    50% { box-shadow:0 0 10upx #FFFFFF; }
	    60% { box-shadow:0 0 12upx #FFFFFF; }
	    90% { box-shadow:0 0 18upx #FFFFFF; }
	    100% { box-shadow:0 0 20upx #FFFFFF; }
	
	}
	//#endif
	
	
	.videoimg{
		position: absolute;
		top: 0;
		left: 0;
		justify-content:center;
		align-items: center; 
	}
	.videoIcon{
		width: 78rpx;
		height: 98rpx;
	}
</style>
