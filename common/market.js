
/**
 * 打开应用市场
 * @param {Object} options 应用市场参数
 *     ios: appstore中应用的id标识，应用的页面地址（如https://apps.apple.com/cn/app/id682211190）的id后面的数字
 *     android: 应用的包名，apk文件中AndroidManifest.xml中的package字段值
 *     key: 为设置id标识或包名时，打开搜索页面使用的关键词
 * 如果未设置参数，则打开应用市场的搜索页面
 */
function openMarket(options){
	try{
	var os = plus.os.name;
	options = options||{};
	if('iOS' == os){
		if(options.ios&&''!=options.ios){
			//itms-apps://itunes.apple.com/app/id682211190
			plus.runtime.openURL('itms-apps://itunes.apple.com/app/id'+options.ios);
		}else{
			//itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/search?q=helloh5
			plus.runtime.openURL('itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/search?q='+options.key);
		}
	}else{
		if(options.android&&''!=options.android){
			//io.dcloud.helloh5
			var uri = plus.android.invoke('android.net.Uri', 'parse', 'market://details?id='+options.android);
			var Intent = plus.android.importClass('android.content.Intent');
			var intent = new Intent(Intent.ACTION_VIEW, uri);
			intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			var main = plus.android.runtimeMainActivity();
			main.startActivity(intent);
		}else{
			//market://search?q=helloh5
			plus.runtime.openURL('market://search?q='+options.key);
		}
	}
	}catch(e){
		console.error('error @openMarket!!');
	}
}


module.exports = {
	open: openMarket
}
