<script>
	export default {
		onLaunch: function() {
			
			this.$bindSystem.init();
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			/* 
			//绑定推送别名
			let bindAliasAndTag = this.$store.state.bindAliasAndTag
			if(!bindAliasAndTag){
				this.$bindSystem.bindAliasAndTag(data.data.buyerInfo.id,[data.data.buyerDetailInfo.grade])
				this.$store.commit('bindAliasAndTag',true)
			}
			 */
			// 监听推送点击事件
			const _self = this;
			const _handlePush = function(message) {  
				uni.navigateTo({
					url: message.payload.pagePath  
				});
			};
			plus.push.addEventListener('click', _handlePush);
			plus.push.addEventListener('receive', _handlePush);

			if (uni.getSystemInfoSync().platform == "android" &&  !plus.storage.getItem('isAgree') ) {
				plus.webview.open('hybrid/html/popup/xieyi.html',
					'xieyi', {
					background: 'transparent',
					bottom: 0,
					zindex: 9999
				}); 
			}
			// #endif
		},
		onShow: function(e) {
			console.log('App Show');
			var _this = this;
			// #ifdef APP-PLUS
			if(!this.$store.state.jxConfig){
				this.$bindSystem.init();
			}
			//监听网络
			this.$bindSystem.changeNetwork()
			console.log(e)
			
			
			
			if(e.path.includes('superBack')) {
				return false
			}
			try {
				//获取剪贴板内容
				uni.getClipboardData({
					success: function(res) {
						try {
							if (typeof(res.data) === 'object') {
								var Context = plus.android.importClass("android.content.Context");
								var main = plus.android.runtimeMainActivity();
								var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
								res.data = plus.android.invoke(clip, "getText").toString();
							}
							//如果剪贴板内容和缓存的剪贴板内容一致不做弹窗
							if(res.data == _this.$store.state.sosoGoodsUrl){
								return false;
							}
							// if(uni.getStorageSync('clipboardContent') == res.data){
							// 	return false;
							// }
							//全部数字不弹窗
							if(!isNaN(res.data)){
								return false;
							}
							var pipei = res.data.match(/[\w|\d]{11}/g);
							//少于15位字符的不弹窗
							if(res.data.length<15&&!pipei){
								return false;
							}
							
							//如果匹配到淘宝商品id
							var matchIdParam = res.data.match(/id=(\d+)/);
							console.log(res.data)
							_this.$store.commit("sosoGoodsUrl", res.data)
							if(matchIdParam){
								return _this.$http.post('/api/goods/getDetail',{itemId:matchIdParam[1]}).then((r)=>{
									if(r.data.itemTitle){
										_this.goSoso({itemTitle:r.data.itemTitle,itemId:r.data.itemId,itemPic:_this.$common.imgThumbAli(r.data.itemPic)});
									}else{
										_this.goSoso({itemTitle:res.data});
									}
								});
							}
							//关闭已有的搜索弹窗
							if(plus.webview.getWebviewById('sousuo') !== null){
								plus.webview.getWebviewById('sousuo').close();
							}
							if(_this.$storage.get('jxConfig').config.isTpwdConvert == "1" && pipei){
								console.log(pipei)
								_this.$http.post('/api/goods/tpwdConvert',{tpwd:'￥'+pipei+'￥'}).then((v)=>{
									console.log(v)
									_this.goSoso(v.data);
								})
							}else{
								_this.goSoso({itemTitle:res.data});
							}
						} catch (e) {
							console.log(e)
						}
					}
				});
			} catch (e) {
				uni.showToast({
					title: '获取剪切板失败:' + e,
					icon: 'none'
				})
			}
			
			
			// #endif
		},
		methods: {
			goSoso(data){
				var topH = 0;
				if (plus.device.vendor == "Apple") {
					topH = -20
				};
				plus.webview.open('hybrid/html/popup/sousuo.html?' + encodeURIComponent(JSON.stringify(data)),
					'sousuo', {
					background: 'transparent',
					top: topH,
					bottom: 0,
					zindex: 997
				});

			}
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>