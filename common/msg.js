
const msg = {
	toast:(message,toPage) =>{
		uni.showToast({
			title:message,
		    duration: 3000,
			icon:toPage?"success":"none"
		});
		//用于提交表单成功后跳转页面
		if(toPage){
			setTimeout(function(){
				if(toPage!='back'){
					uni.navigateTo({
						url:toPage
					})
				}else{
					uni.navigateBack();
				}
			},2000);
		}
	},
	alert:(options,confirmCB) =>{
		uni.showModal({
			title: options.title,
		    content:options.content,
			confirmColor:'#333333',
			confirmText:options.confirmText|| '确定',
			showCancel:false,
		    success: function (res) {
				if(typeof confirmCB === "function"){
					confirmCB()
				}
		    }
		});
	},
	confirm:(options,confirmCB,cancelFn) =>{
		uni.showModal({
			title: options.title || '提示信息',
		    content:options.content,
			confirmColor:options.confirmColor || '#fb285d',
			cancelColor:options.cancelColor || '#999999',
			cancelText:options.cancelText || '取消',
			confirmText:options.confirmText || '确定',
		    success: function (res) {
		        if (res.confirm) {
		            if(typeof confirmCB === "function"){
		            	confirmCB()
		            }
		        } else if (res.cancel) {
		            if(typeof cancelFn === "function"){
		            	cancelFn()
		            }
		        }
		    }
		});
	}
}

export default msg ;
