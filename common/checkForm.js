import msgAlert from './msg' 
const myCheck = {
	checkNull:(value,msg)=>{ //是否为空
		if (value.length == 0) { 
			msgAlert.toast(msg)
			return false; 
		}
		return true; 
	},
	checkLength:(value,len,msg)=>{ //长度限制 //len格式为字符串"3,10"
		let minMax = len.split(',');
		minMax[0] = Number(minMax[0]); // 最小长度
		minMax[1] = Number(minMax[1]);	// 最大长度
		if(value.length>minMax[1]||value.length<minMax[0]) 
		{ 
			//alert('长度不能大于length！');
			msgAlert.toast(msg)
			return false; 
		}
		return true; 
	},
	checkMaxorMin:(value,len,msg)=>{ //大小校验 //max格式为字符串"3,10"
		let minMax = len.split(',');
		minMax[0] = Number(minMax[0]); // 最小
		minMax[1] = Number(minMax[1]);	// 最大
		if(value>minMax[1]||value<minMax[0]) 
		{
			msgAlert.toast(msg)
			return false; 
		}
		return true; 
	},
	isChinese:(value,msg,Boolean)=>{//汉字校验 
		let reg=/^[\u0391-\uFFE5]+$/; 
		if(Boolean){
			if(reg.test(value)){ //不允许
				msgAlert.toast(msg)
				//alert('不允许输入中文！');
				return false; 
			}
			return true; 
		}else{
			if(!reg.test(value)){ //只能是汉字
				msgAlert.toast(msg)
				//alert('必须输入中文！');
				return false; 
			}
			return true; 
		}
		
	},
	checkZm:(value,msg)=>{ //只能是英文字母 
		let reg=/^[a-zA-Z]*$/; 
		if(!reg.test(value)){ 
		//alert("只能是英文字母！");
		msgAlert.toast(msg)
		return false; 
		} 
		return true; 
	},
	checkNumber:(value,msg)=>{ //只能是数字 
		let reg = /^[0-9]+$/; 
		if(!reg.test(value)){ 
		//alert('只能输入数字！'); 
		msgAlert.toast(msg)
		return false; 
		} 
		return true; 
	},
	checkZmOrNum:(value,msg)=>{ //只能是英文字母和数字 
		let reg=/^[0-9a-zA-Z]*$/; 
		if(!reg.test(value)){ 
			//alert("只能输入是字母或者数字,请重新输入");
			msgAlert.toast(msg)
			return false; 
		}
		return true; 
	},
	checktrim(value,msg){ //是否存在空格
		var reg =/\s/;
		if(reg.test(value)){
			//alert("value不能包含空格");
			msgAlert.toast(msg)
			return false; 
		}
		return true; 
	},
	checkDate:(value,msg)=>{ //检验时间大小(与当前时间比较)
		let reg =value.replace(/\-/g,"/");//替换字符，变成标准格式(检验格式为：'2018-12-10 11:12') 
		var date1=new Date(Date.parse(reg)); 
		var date2=new Date();//取今天的日期 
		if(date1>date2){ 
			//alert("不能大于当前时间！"); 
			msgAlert.toast(msg)
			return false; 
		} 
		return true; 
	},
	checkKeywords:(value,str,msg)=>{ //屏蔽关键字
		if(!value.includes(str)){ 
			//alert("屏蔽关键字(这里屏蔽****)！");
			msgAlert.toast(msg)
			return false;
		} 
		return true; 
	},
	checksame:(value1,value2,msg)=>{ //两次输入密码是否相同 
		if(value1!=value2) 
		{ 
			//alert("密码不一致") 
			msgAlert.toast(msg)
			return false;
		}
		return true; 
	},
	checkEmail:(value,msg)=>{ // 邮箱检验
		let Email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(!Email.test(value))
		{
			msgAlert.toast(msg)
			//alert('请输入有效的邮箱！');
			return false;
		}
		return true; 
	},
	checkPhone:(value,msg)=>{ // 手机检验
		let reg = /^1[0-9]{10,10}$/;
		if(!reg.test(value))
		{
			msgAlert.toast(msg)
			//alert('请输入有效的手机号码！');
			return false;
		}
		return true; 
	}
}

export default myCheck
