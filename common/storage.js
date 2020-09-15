const storageBase = '_jxsh';
export default{
	set(key, value, time){
	    uni.setStorageSync(key, value) 
	    var seconds = parseInt(time);
	    if (seconds > 0) {
	        var timestamp = Date.parse(new Date());
	        timestamp = timestamp / 1000 + seconds;
	        uni.setStorageSync(key + storageBase, timestamp + "")
	    } else {
	        uni.removeStorageSync(key + storageBase)
	    }
	},
	get(key, def){
		var deadtime = parseInt(uni.getStorageSync(key + storageBase))
		if (deadtime) {
		    if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
		        if (def) {
		            return def;
		        } else {
		            return false;
		        }
		    }
		}
		var res = uni.getStorageSync(key);
		if (res) {
		    return res;
		} else {
		    if (def == undefined  || def == "") {
		        def = false; 
		    }
		    return def;
		}
	},
	remove(key){
	    uni.removeStorageSync(key);
	    uni.removeStorageSync(key + storageBase);
	},
	clear(){
	    uni.clearStorageSync();
	}
}