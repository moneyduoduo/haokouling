<template>
	<view>
		<movable-area :style="'height:' + scrollHeight + 'px;width:100%;'">
			<movable-view
				:style="'height:800px;width:100%;z-index:3;'"
				direction="vertical"
				:out-of-bounds="true"
				:disabled="!scrollmark || status == 3"
				:y="y"
				:damping="50"
				@touchstart="touchstart"
				@touchend="touchend"
				@change="change"
			>
				<view :style="'height:' + topHeight + 'px;position:relative;'">
					<view :style="'position: absolute;top: 0px;height: ' + 40 + 'px;line-height:' + 40 + 'px;width: 100%;text-align: center;'">
						<block v-if="status == 0">{{downPullToRefresh}}</block>
						<block v-if="status == 2">{{downReleaseToRefresh}}</block>
						<block v-if="status == 3">{{downRefreshing}}</block>
					</view>
				</view>
				<scroll-view
				:style="'height:' + scrollHeight + 'px;'"
				 class="scroll-inner"
				:scroll-y="status !== 3"
				:scroll-with-animation = "true"
				@scroll="scroll" 
				@scrolltolower="scrolltolower"  >
					<view>
						<slot></slot>
					</view>
				</scroll-view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
export default {
	props: {
		downLoading: {
			//控制下面下拉加载区的显示 , 默认关闭
			type: Boolean,
			default: false
		},
		scrollHeight: {
			//scroll显示区的高度(px)
			type: Number,
			default: 500
		},
		topHeight: {
			//下拉区的高度(px)
			type: Number,
			default: 60
		},
		interruptPosition: {
			//暂停区的高度(px)
			type: Number,
			default: 40
		},
		damping: {
			//回弹动画的速度 , 值越大越快
			type: Number,
			default: 50
		},
		scrollTop:{
			//即scroll-top属性 设置竖向滚动条位置
			type:Number,
			default:0
		},
	},
	data() {
		return {
			isTouch: false,//触摸的标识
			y:0,//控制y
			diff: 0,//定值topHeight-interruptPotion
			scrollmark: true,
			timeId: null,
			top: 0,
			status: 0,
			count: 0.01,
			scrollCount: 0.01,
			reachBottomDistance:50,
			downPullToRefresh:'下拉刷新',
			downReleaseToRefresh:'松开刷新',
			downRefreshing:'刷新中…',
		};
	},
	changePositon(){
		
	},
	created() {
		this.y = -this.topHeight;
		this.interruptPosition - this.topHeight
	},
	methods: {
		change(e) {
			//为3即是正在回弹状态
			if (this.status == 3 || !this.isTouch) return;
			if (e.detail.y >= this.diff) {
				this.status = 2;
			} else if (e.detail.y < this.diff) {
				this.status = 1;
			}
		},
		touchstart(e) {
			if (this.status == 3) {
				return;
			}
			this.isTouch = true;
		},
		touchend(e) {
			if (this.status == 3) return;
			this.isTouch = false;
			if (this.scrollmark) {
				if (this.status == 2) {
					this.status = 3;
					this.y = this.diff;
					this.$emit('onPullDown', () => {
						setTimeout(() => {
							this.y = -this.topHeight - 0.02;
							this.status = 0; //回弹过程中
						}, 200);
					});
				} else if (this.status == 1) {
					this.status = 3;
					this.y = -this.topHeight + this.count;
					//微小改变 否则无响应
					this.count = -this.count;
					setTimeout(() => {
						this.status = 0; //回弹过程中
					}, 200);
				}
			}
		},

		scroll(e) {
			//事件
			//this.$emit('scroll',e)
			clearTimeout(this.timeId);
			this.scrollmark = false;
			if(this.timeout) clearTimeout(this.timeout);
			this.timeId = setTimeout(() => {
				if (e.detail.scrollTop <= 15 || e.detail.scrollTop - e.detail.deltaY <= 0) {
					this.top = 0 + this.count;
					this.scrollCount = -this.scrollCount;
					this.scrollmark = true;
				}
				this.scrolltolower(e);
			}, 100);
		},
		scrolltolower(e) {
			let view = uni.createSelectorQuery().in(this).select(".scroll-inner");
			view.fields({ 
				size: true, 					
				scrollOffset: true
			}, data => {
				if(data.scrollTop >= (e.detail.scrollHeight - data.height - this.reachBottomDistance)&&e.detail.scrollHeight) {
					this.$emit('onLoadMore',e);
				}
			}).exec();
			
		}

	}
};
</script>

<style></style>
