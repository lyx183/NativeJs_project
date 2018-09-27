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


var urlId = location.href.split("?")[1].split("=")[1];
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
new Promise(function(resolve,reject){
    ajax({
        type:"get",
        url:url,
        data:{},
        success:function(data){
            var data = JSON.parse(data);
            resolve(data);
        }
    })
}).then(function(data){
    var oPic1 = document.querySelector(".pic>.pic1");
    var str = "";
    var str1 = "";
    var str2 = "";
    //动态渲染图片
    for(var i = 0;i<data.length;i++){
        if(data[i].id == urlId){
            str1 = `<div class="middle">
                <div class="filter"></div>
                <img src="../${data[i].middle_img[0]}" class="middle_pic">
            </div>`;
            for(var j = 0;j<data[i].small_img.length;j++){
                str2 +=`<img src="../${data[i].small_img[j]}" data-j="${j}" class="small_pic">`
            }
            str = `${str1}<div class="small">
            <a href="##" class="prev"></a>
            <div class="smallpic">  
                ${str2}
            </div>
            <a href="##" class="next"></a>
        </div>
        <div class="large">
            <img src="../${data[i].middle_img[0]}" class="large_pic">
        </div>`
        }
    }
    oPic1.innerHTML += str;

    //图片切换
    var oMiddle = oPic1.querySelector(".middle");
    var oSmall = oPic1.querySelector(".small");
    var oLarge = oPic1.querySelector(".large");
    var iMiddle_pic = oMiddle.querySelector(".middle_pic")
    var iLarge_pic = oLarge.querySelector(".large_pic")
    var oFilter = oPic1.querySelector(".filter");
    var aImg = oSmall.querySelectorAll("img");
    for(var i = 0;i<aImg.length;i++){
        aImg[i].onmouseover = function(){
            var j = this.getAttribute("data-j");
            iMiddle_pic.src = "../"+data[urlfoot-1].middle_img[j];
            iLarge_pic.src = "../"+data[urlfoot-1].middle_img[j];

        }
    }
    //放大镜
    oMiddle.onmouseover = function(){
        oLarge.style.display = "block";
        oFilter.style.display = "block";

        this.onmousemove = function(e){
            var e = e || event;

            var iWidth = iMiddle_pic.offsetWidth - oFilter.offsetWidth;
            var iHeight = iMiddle_pic.offsetHeight - oFilter.offsetHeight;
            
            var l = e.clientX - 75 - oFilter.offsetWidth/2;
            var t = e.clientY -75- oFilter.offsetHeight/2;

            l = l>iWidth?iWidth:(l<0?0:l);
		    t = t>iHeight?iHeight:(t<0?0:t);

            oFilter.style.left = l +25+ "px";
            oFilter.style.top = t +20+"px";
            
            iLarge_pic.style.left = -2*l +"px";
		    iLarge_pic.style.top = -2*t +"px";
        }
        this.onmouseout = function(){
            oLarge.style.display = "none";
            oFilter.style.display = "none";
        }
    }

    //动态渲染名称和价格
    var oTitle1 = document.querySelector(".product>h1")
    var oTitle2 = document.querySelector(".product>p")
    var oPrise = document.querySelector(".itemPanel>h2>i")
    var marketPrise = document.querySelector(".itemPanel>div>em");
    var morePrise = document.querySelector(".property_price>div>span")
    for(var i = 0;i<data.length;i++){
        if(data[i].id == urlId){
            oPrise.innerHTML = data[i].pirce;
            oTitle1.innerHTML = data[i].title;
            oTitle2.innerHTML = data[i].title;
            marketPrise.innerHTML = "￥"+(parseInt(data[i].pirce.slice(1))+20).toFixed(2);
            morePrise.innerHTML = "￥"+(parseInt(data[i].pirce.slice(1))*0.9).toFixed(2);
        }
    }
    
    //加入购物车以及改变数量
    var oProperty = document.querySelector(".property");
    oProperty.onclick = function(e){
        var e = e||event;
        var target = e.target||e.srcElement;
        if(target.className == "add"){
            var val = target.previousElementSibling.value;
            val++;
            target.previousElementSibling.value = val;
        }
         //商品减少按钮
        if(target.className == "minus"){
            var val = target.nextElementSibling.value;
            if(val>1){
                val--;
            }
            target.nextElementSibling.value = val;
        }
        if(target.className == "addtocart"){
            var val = Number(target.parentNode.previousElementSibling.lastElementChild.previousElementSibling.value);
            var goodsId = urlId;
            if(getCookie("info")){
                arr = JSON.parse(getCookie("info"));
            }else{
                var arr = [];
            }
            if(arr.length>0){
                var bStop = false;
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].id == goodsId){
                        arr[i].num+=val;
                        bStop = true;
                        break;
                    }
                }
                if(!bStop){
                    var goods = {};
                    goods.id = goodsId;
                    goods.num = val;
                    arr.push(goods);
                }

            }else{
                var goods = {};
                goods.id = goodsId;
                goods.num = val;
                arr.push(goods);
            }
            setCookie("info",JSON.stringify(arr),7);
            alert("添加成功，您的宝贝已在购物车等着您的到来")
            console.log(arr);
        }
    }

})