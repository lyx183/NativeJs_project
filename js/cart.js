/*面向对象导航栏*/
function Nav(container,option){
    this.oUl = document.querySelector(container);
    this.aLi = this.oUl.querySelectorAll(option)
}
Nav.prototype = {
    init:function(){
        this.over();
    },
    over:function(){
        var _this = this;
        this.oUl.onmouseover = function(e){
            var e = e||event;
            var target = e.target||e.srcElement;
            for(var i = 0;i<_this.aLi.length;i++){
                _this.aLi[i].className="";
            }
            target.className = "active";
            target.onmouseout = function(){
                this.className = "";
            }
        }
    }
}
var nav = new Nav(".nav_item","li>a");
nav.init();

//获取元素
var oMain = document.querySelector(".mainWarp");
var oGoods = document.querySelector(".main>.goods>ul");
var oChkAll = document.getElementById("chkAll");
var oChk = document.getElementsByClassName("chk");
//获取cookies中商品id，根据id从json中获取数据，动态渲染到界面
if(getCookie("info")){
    var str1 = "";
    var arr = JSON.parse(getCookie("info"));
    for(var i = 0;i<arr.length;i++){
        var urlId = arr[i].id;
        var urlhead = Number(urlId.slice(0,1));
        var urlfoot = Number(urlId.slice(1));
        var url = "";
        switch(urlhead){
            case 0:
                url = "./../json/main.json";
                break;
            case 1:
                url = "./../json/oneseries.json";
                break;
            case 2:
                url = "./../json/twoseries.json";
                break;
            case 3:
                url = "./../json/thrseries.json";
                break;
        }
        fn(i,url)  
        function fn(i,url){
            ajax({
                type:"get",
                url:url,
                data:{},
                success:function(data){
                    var data = JSON.parse(data);
                    var str = ""
                    for(var j = 0;j<data.length;j++){
                        if(arr[i].id == data[j].id){
                            str += `<li data-id="${arr[i].id}"> 
                            <div><input type="checkbox" class="chk"></div>
                            <div class="pic"><a href="##"><img src="../${data[j].img}" width="100%" height="100%"></a></div>
                            <div class="name">
                                ${data[j].title}<br>
                                <span style="color:#FF0000">
                                    颜色:大红<br>
                                    码号:110<br>
                                </span>
                            </div>
                            <div class="price">${data[j].pirce}</div>
                            <div class="nums">
                                <span class="minus">-</span>
                                <input type="text" value="${arr[i].num}" class="num">
                                <span class="add">+</span>
                            </div>
                            <div class="priceSum">￥${(arr[i].num*data[j].pirce.slice(1)).toFixed(2)}</div>
                            <div class="del">删除</div>
                        </li>`
                        }    
                    }
                    oGoods.innerHTML += str;
                }
            })
        }     
    }
}
//商品改变操作
oMain.onclick = function(e){
    var e = e ||event;
    var target = e.target||e.srcElement;
    var arr = JSON.parse(getCookie("info"));
    //删除所有
    if(target.className == "delall"){
        oGoods.innerHTML = "";
        removeCookie("info",JSON.stringify(arr));
    }
    //删除按钮
    if(target.className == "del"){
        target.parentNode.remove();
        var aId = target.parentNode.getAttribute("data-id");
        for(var i=0;i<arr.length;i++){
            if(arr[i].id == aId){
                arr.splice(i,1);
                setCookie("info",JSON.stringify(arr),7);
            }
        }
        allPrice();
        allNum();
    }
    //商品增加按钮
    if(target.className == "add"){
        var aId = target.parentNode.parentNode.getAttribute("data-id");
        var val = target.previousElementSibling.value;
        val++;
        target.previousElementSibling.value = val;
        for(var i=0;i<arr.length;i++){
            if(arr[i].id == aId){
                arr[i].num++;
                target.parentNode.nextElementSibling.innerHTML = "￥"+(arr[i].num*target.parentNode.previousElementSibling.innerText.slice(1)).toFixed(2);
                setCookie("info",JSON.stringify(arr),7);
            }
        }
        allPrice();
        allNum();
    }
    //商品减少按钮
    if(target.className == "minus"){
        var aId = target.parentNode.parentNode.getAttribute("data-id");
        var val = target.nextElementSibling.value;
        if(val>1){
            val--;
        }
        target.nextElementSibling.value = val;
        for(var i=0;i<arr.length;i++){
            if(arr[i].id == aId){
                if(arr[i].num>1){
                    arr[i].num--;
                    target.parentNode.nextElementSibling.innerHTML = "￥"+(arr[i].num*target.parentNode.previousElementSibling.innerText.slice(1)).toFixed(2);
                }
                setCookie("info",JSON.stringify(arr),7);
            }
        }
        allPrice();
        allNum();
    }
    //用户改变输入框的值
    if(target.className == "num"){
        var aId = target.parentNode.parentNode.getAttribute("data-id");
        target.onblur = function(){
            var val = target.value;
            for(var i=0;i<arr.length;i++){
                if(arr[i].id == aId){
                    arr[i].num = val;
                    target.parentNode.nextElementSibling.innerHTML = "￥"+(arr[i].num*target.parentNode.previousElementSibling.innerText.slice(1)).toFixed(2);
                    setCookie("info",JSON.stringify(arr),7);
                }
            }
            allPrice();
            allNum();
        }
    }
    //全选
    if(target.id == "chkAll"){
        if(target.checked){
			for(var i =0;i<oChk.length;i++){
				oChk[i].checked = "checked";
            }
            allPrice();
            allNum();	
        }else{
			for(var i =0;i<oChk.length;i++){
				oChk[i].checked = "";
            }	
            allPrice();
            allNum();
		}
    }
    //反选
    for(var i=0;i<oChk.length;i++){
		if(target == oChk[i]){
			var bStop = true;
			for(var j=0;j<oChk.length;j++){
				if(!oChk[j].checked){
					bStop = false;
					break;
				}
			}
			if(bStop){
				oChkAll.checked = "checked"
			}else{
				oChkAll.checked = ""
            }
            allPrice();
            allNum();
		}
    }
}
//封装总价改变的函数
function allPrice(){
    var allprice = document.querySelector(".allprice");
    var s = 0;      
    for(var i=0;i<oChk.length;i++){
        if(oChk[i].checked){
            s+=Number(oChk[i].parentNode.parentNode.lastElementChild.previousElementSibling.innerText.slice(1))
        }else{
            s+=0
        }
    }
    allprice.innerText = "￥"+ (s.toFixed(2))
}
//封装总数量改变的函数
function allNum(){
    var allnum = document.querySelector(".bot_right>p>span");
    var s = 0;
    for(var i=0;i<oChk.length;i++){
        if(oChk[i].checked){
            s+=Number(oChk[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.previousElementSibling.value)
        }else{
            s+=0
        }
    }
    allnum.innerText = s
}

