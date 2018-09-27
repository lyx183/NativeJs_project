/*
	生成n-m的随机数
	
 */
function numRandom(n,m) {
	if(n>m){
		return parseInt(m+Math.random()*(n-m+1));
	}else{
		return parseInt(n+Math.random()*(m-n+1));
	}
}
/*
	冒泡排序
 */
function bubbleSort(arr){
	var temp;
	for(var i=1;i<arr.length;i++){
		for(var j=0;j<arr.length-i;j++){
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}

	return arr;
}

/*
	选择排序

 */
function selectSort(arr){
	var temp;
	 for(var i=0;i<arr.length-1;i++){
	 	for(var j=i+1;j<arr.length;j++){
	 		if(arr[i]>arr[j]){
	 			temp = arr[i];
	 			arr[i] = arr[j];
	 			arr[j] = temp;
	 		}
	 	}		
	 	
	 }
	 return arr;
}


/*
	快速排序法

 */
	function quickSort(arr){
		if(arr.length<=1){
			return arr;
		}
		//获取下标
		var midIndex = arr.length%2 == 0?arr.length/2:(arr.length+1)/2;
		//取中间值
		var mid = arr[midIndex];
		//定义左边的数组
		var left = [];
		//定义右边的数组
		var right = [];
	
		for(var i=0;i<arr.length;i++){
			if(i !=midIndex && arr[i]<=mid){
				left.push(arr[i]);
			}
	
			if(i !=midIndex && arr[i]>mid){
				right.push(arr[i]);
			}
	}

	return quickSort(left).concat(mid).concat(quickSort(right))
}

/*
	生成n位数的随机验证码
*/
	function randomCode(n){
		var str = "";
		for(var i = 0;i<n;i++){
			var num = parseInt(48+Math.random()*(122-48+1));
			//ASCII值48-122为0-Z（包括小写字母，大写字母，数字）
			while((num>=58&& num<=64) || (num>=91&&num<=96)){//去掉无用的字符
				num = parseInt(48+Math.random()*(122-48+1));
			}
			str+=String.fromCharCode(num);
		}
		return str;
	}


/*
	生成16进制随机颜色
*/
	function randomToColor(){
		var R = numRandom(0,255);
		var G = numRandom(0,255);
		var B = numRandom(0,255);
		return kzero(R,G,B)

		function kzero(R,G,B){
			R = R.toString(16).length<2?"0"+R.toString(16):R.toString(16);
			G = G.toString(16).length<2?"0"+G.toString(16):G.toString(16);
			B = B.toString(16).length<2?"0"+B.toString(16):B.toString(16);
			return "#"+R+G+B;
		}
	}
	



/*
	生成rgb随机颜色
*/
	function randomTo2Color(){
		var R = numRandom(0,255);
		var G = numRandom(0,255);
		var B = numRandom(0,255);
		return "rgb("+R+","+G+","+B+")";
	}

/*
	获取非行间样式；
	obj:要获取的对象；如：div
	attr:要获取对象的属性值；如：width
*/
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}

/*
	自定义属性；传入（元素对象）和（属性或属性值）
	如果是三个参数：添加自定义属性及属性值
	如果是两个参数：获取自定义属性值
*/
	function attr(){
		if(arguments.length == 2){
			return arguments[0].getAttribute(arguments[1]);
		}

		if(arguments.length == 3){
			arguments[0].setAttribute(arguments[1],arguments[2]);
		}
	}

/*
	 获取当前元素到界面的左偏移量（封装方法）
	传入元素  得到左便宜量
*/
	function offsetl(obj){
		var l = obj.offsetLeft;
		while(obj.offsetParent){
			obj = obj.offsetParent;
			l+=obj.offsetLeft;
		}
		return l;
	}
	

/*
	获取当前元素到界面的左偏移量和右偏移量（封装方法）
	传入元素，得到一个对象，包含左偏移量和右偏移量
 */
	function offsetAll(el){
		var obj = {};
		obj.l = el.offsetLeft;
		obj.t = el.offsetTop;
		while(el.offsetParent){
			el = el.offsetParent;
			obj.l+=el.offsetLeft;
			obj.t+=el.offsetTop;
		}
		return obj;
	}

/*
	阻止浏览器默认行为的兼容写法 （阻止右键菜单）
*/
	function prevernt(e){
		if(e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue = false;
		}
	}

/*
	完美运动框架（需用到获取非行间样式封装函数getStyle()）
	传入参数及实例：{
		1、obj：需运动的对象
		2、json：想要运动的属性（可多个）
		3、fn：可链式调用
	}
		move(oBox,{width:200,height:300,opacity:30},function(){
       		move(oBox,{width:300})
    	});
*/
	function move(obj,json,fn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bStop = true;
			for(var attr in json){

				//获取透明度或着其他的非行间属性    
				var iCur = 0
				if(attr == "opacity"){
					iCur = parseInt(getStyle(obj,attr)*100)
				}else{
					iCur = parseInt(getStyle(obj,attr));
				}
				
				//计算速度
				var speed = (json[attr] - iCur)/8;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				
				//按照速度改变对应的值，opacity不需要加px
				if(attr == "opacity"){
					obj.style.opacity = (iCur+speed)/100;
					obj.style.filter = "alpha(opacity:"+(iCur+speed)+")";
				}else{
					obj.style[attr] = (iCur+speed)+"px"
				}

				//判断所有的运动是否都已到达终点,只要有一个不到就false
				if(json[attr] != iCur){
					bStop = false;
				}
			
				//都到达终点才清除定时器
				if(bStop){
					clearInterval(obj.timer);
					fn&&fn();
				}
			}
		},30)
	}
/*
	封装ajax;
	调用方式
		ajax({
			type:"get",
			url:"data.json",//或者接口
			data:{a:1,b:2},//或者不传
			success:function(data){
				代码块：
				var obj = JSON.parse(data);
				console.log(obj);
			},
			error:function(e){
				console.log(e);
			}
		})
*/
    function ajax(options){
		var xhr = new XMLHttpRequest();
		//数据处理将{a=1,b=2}==>  ?a=1&b=2
		var str = "";
		for(var key in options.data){
			str += "&"+key+"="+options.data[key]
		}
		str = str.slice(1);
		if(options.type == "get"){
			var url = options.url+"?"+str;
			xhr.open("get",url);
			xhr.send();
		}else if(options.type == "post"){
			xhr.open("post",options.url);
			xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
			xhr.send(str);
		}

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				var d = xhr.responseText;
				options.success&&options.success(d)
			}else if(xhr.status !==200 ){
				options.error&&options.error(xhr.status);
			}
		}
	}

/*
 * 设置cookie
	key:参数
	val:参数值
	expires:存在天数
*/
function setCookie(key,val,expires){
	var d = new Date();
	d.setDate(d.getDate()+expires);
	document.cookie = key+"="+val+";path=/;expires="+d;
}


/*
	删除cookie（调用设置函数把天数设置成后一天即可）	 
*/
function removeCookie(key,val){
	setCookie(key,val,-1);
}

/*
	获取cookie	 
	分割两次字符串
*/

function getCookie(key){
	var cookie = document.cookie;
	var arr = cookie.split("; ");
	for(var i=0;i<arr.length;i++){
		var newArr = arr[i].split("=");
		if(key == newArr[0]){
			return newArr[1];
		}
	}
}
