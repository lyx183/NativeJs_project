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

/*面向对象二级导航*/
function Subnav(){
    this.aLi = document.querySelectorAll(".allshop_item>li");
}
Subnav.prototype = {
    init:function(){
        this.go();
    },
    go:function(){
        for(var i = 0;i<this.aLi.length;i++){
            this.aLi[i].index = i
            this.aLi[i].onmouseover = function(){
                this.children[0].id = "hover";
                this.children[1].style.display = "block"
                this.children[1].style.top = -75*this.index+"px";
                var aA = this.children[1].querySelectorAll("ul a");
                for(var j=0;j<aA.length;j++){
                    aA[j].onmouseover = function(){
                        this.className = "hover1"
                    }
                }
            }
            this.aLi[i].onmouseout = function(){
                this.children[0].id = "";
                this.children[1].style.display = "none"
                var aA = this.children[1].querySelectorAll("ul a");
                for(var j=0;j<aA.length;j++){
                    aA[j].onmouseout = function(){
                        this.className = ""
                    }
                }
            }
        }
    }
}
var subnav = new Subnav();
subnav.init();
/*面向对象轮播图*/
function Banner(){
    this.oBanner = document.querySelector(".banner");
    this.oUl = document.querySelector(".banner>ul");
    this.aLi1 = document.querySelectorAll(".banner>ul>li");
    this.numsLi = document.querySelectorAll(".nums>ul>li")
    this.iNow = 0;
    this.timer = null;
    this.iWidth = this.aLi1[0].offsetWidth;
}
Banner.prototype = {
    init:function(){
        this.oBanner.style.width = document.documentElement.clientWidth+"px"
        this.oUl.style.marginLeft = -(this.aLi1[0].offsetWidth-document.documentElement.clientWidth)/2+"px"
        var li = this.aLi1[0].cloneNode(true);
        this.oUl.appendChild(li);
        this.aLi1 = document.querySelectorAll(".banner>ul>li");
        this.oUl.style.width = this.iWidth * this.aLi1.length +"px";
        this.aotuPlay();
        this.over();
        this.out();
        this.toggle();
    },
    toImg:function(){
        move(this.oUl,{left:-this.iNow*this.iWidth})
        for(var i = 0;i<this.numsLi.length;i++){
            this.numsLi[i].className = "";
        }
        this.numsLi[this.iNow==this.aLi1.length-1?0:this.iNow].className = "on";
    },
    aotuPlay:function(){
        var _this = this;
        this.timer = setInterval(function(){
            if(_this.iNow == _this.aLi1.length-1){
                _this.iNow = 1;
                _this.oUl.style.left =0;
            }else{
                _this.iNow++
            }   
            _this.toImg();
        },3000)
    },
    over:function(){
        var _this = this;
        this.oBanner.onmouseover = function(){
            clearInterval(_this.timer);
        }
    },
    out:function(){
        var _this = this;
        this.oBanner.onmouseout = function(){
            _this.aotuPlay();
        }
    },
    toggle:function(){
        var _this = this;
        for(var i = 0;i<this.numsLi.length;i++){
            this.numsLi[i].index = i;
            this.numsLi[i].onmouseover = function(){
                for(var j = 0;j<_this.numsLi.length;j++){
                    _this.numsLi[j].className = "";
                }
                this.className = "on";
                _this.iNow = this.index;
                _this.toImg();
            }
        }
    }
}
var banner = new Banner();
banner.init();
/*main-新品上市*/
new Promise(function(resolve,reject){
    ajax({
        type:"get",
        url:"./json/main.json",
        data:{},
        success:function(data){
            var data = JSON.parse(data);
            resolve(data);
        }
    })
}).then(function(data){
    var oContent = document.querySelector(".content");
    var str = "";
    for(var i = 0;i<data.length;i++){
    str+=`<li data-id="${data[i].id}">
    <img src="${data[i].img}" width="100%" alt="">
    <div class="box">
        <p class="title">${data[i].title}</p>
        <p class="pirse">${data[i].pirce}</p>
        <a href="#" class="go">去看看</a>
    </div>   
</li>`
}
oContent.innerHTML = str;
oContent.onclick = function(e){
    var e = e||event;
    var target = e.target||e.srcElement;
    if(target.tagName == "IMG"){
        var id = target.parentNode.getAttribute("data-id");
        location.href="html/detail.html?id="+id;
    }else if(target.className == "go"){
        var id = target.parentNode.parentNode.getAttribute("data-id");
        location.href="html/detail.html?id="+id;
    }
}
})
/*main-精品推荐*/
/*main-热销排行*/
var mainAll = document.querySelectorAll(".main_top");
var mainLi = document.querySelectorAll(".main_top>li>a")
//选项卡
for(var i = 0;i<mainLi.length;i++){
    mainLi[i].index = i;
    mainLi[i].onmouseover = function(){
        for(var j = 0;j<mainLi.length;j++){
            mainLi[j].className = "";
        }
        mainLi[this.index].className = "active";
    }
}
mainAll[0].onmouseover = function(e){
    var e = e||event;
    var target = e.target||e.srcElement;
    if(target.id == "main_one"){
        var url = "./json/main.json"
    }else if(target.id == "main_two"){
        var url = "./json/mainTwo.json"
    }else if(target.id == "main_thr"){
        var url = "./json/mainThr.json"
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
        var oContent = document.querySelector(".content");
        var str = "";
        for(var i = 0;i<data.length;i++){
        str+=`<li data-id="${data[i].id}">
        <img src="${data[i].img}" width="100%" alt="">
        <div class="box">
            <p class="title">${data[i].title}</p>
            <p class="pirse">${data[i].pirce}</p>
            <a href="#" class="go">去看看</a>
        </div>   
    </li>`
    }
    oContent.innerHTML = str;
    oContent.onclick = function(e){
        var e = e||event;
        var target = e.target||e.srcElement;
        if(target.tagName == "IMG"){
            var id = target.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }else if(target.className == "go"){
            var id = target.parentNode.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }
    }
    })
}
/*series-1F*/
new Promise(function(resolve,reject){
    ajax({
        type:"get",
        url:"./json/oneseries.json",
        data:{},
        success:function(data){
            var data = JSON.parse(data);
            resolve(data);
        }
    })
}).then(function(data){
    var oSeries_content1 = document.querySelector(".oneseries>.series_content");
    var str = "";
    for(var i =0;i<data.length;i++){
        str += `<li data-id="${data[i].id}">
    <img src="${data[i].img}" width="100%">
        <p class="title"><a href="##" class="atitle">${data[i].title}</a></p>
        <p class="pirse">
            ${data[i].pirce}
            <a href="##" class="addtocart">加入购物车</a>
        </p> 
    </li>`;
    }
    oSeries_content1.innerHTML = str;

    oSeries_content1.onclick = function(e){
        var e = e||event;
        var target = e.target||e.srcElement;
        if(target.tagName == "IMG"){
            var id = target.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }if(target.className == "atitle"){
            var id = target.parentNode.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }if(target.className == "addtocart"){
            var goodsId = target.parentNode.parentNode.getAttribute("data-id");
            if(getCookie("info")){
                arr = JSON.parse(getCookie("info"));
            }else{
                var arr = [];
            }
            if(arr.length>0){
                var bStop = false;
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].id == goodsId){
                        arr[i].num++;
                        bStop = true;
                        break;
                    }
                }
                if(!bStop){
                    var goods = {};
                    goods.id = goodsId;
                    goods.num = 1;
                    arr.push(goods);
                }

            }else{
                var goods = {};
                goods.id = goodsId;
                goods.num = 1;
                arr.push(goods);
            }
            setCookie("info",JSON.stringify(arr),7);
            alert("添加成功，您的宝贝已在购物车等着您的到来");
            icon();
        }
    }
})

/*series-2F*/
new Promise(function(resolve,reject){
    ajax({
        type:"get",
        url:"./json/twoseries.json",
        data:{},
        success:function(data){
            var data = JSON.parse(data);
            resolve(data);
        }
    })
}).then(function(data){
    var oSeries_content2 = document.querySelector(".twoseries>.series_content");
    var str = "";
    for(var i =0;i<data.length;i++){
        str += `<li data-id="${data[i].id}">
    <img src="${data[i].img}" width="100%">
        <p class="title"><a href="##" class="atitle">${data[i].title}</a></p>
        <p class="pirse">
            ${data[i].pirce}
            <a href="##" class="addtocart">加入购物车</a>
        </p> 
    </li>`;
    }
    oSeries_content2.innerHTML = str;
    oSeries_content2.onclick = function(e){
        var e = e||event;
        var target = e.target||e.srcElement;
        if(target.tagName == "IMG"){
            var id = target.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }if(target.className == "atitle"){
            var id = target.parentNode.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }if(target.className == "addtocart"){
            var goodsId = target.parentNode.parentNode.getAttribute("data-id");
            if(getCookie("info")){
                arr = JSON.parse(getCookie("info"));
            }else{
                var arr = [];
            }
            if(arr.length>0){
                var bStop = false;
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].id == goodsId){
                        arr[i].num++;
                        bStop = true;
                        break;
                    }
                }
                if(!bStop){
                    var goods = {};
                    goods.id = goodsId;
                    goods.num = 1;
                    arr.push(goods);
                }

            }else{
                var goods = {};
                goods.id = goodsId;
                goods.num = 1;
                arr.push(goods);
            }
            setCookie("info",JSON.stringify(arr),7);
            alert("添加成功，您的宝贝已在购物车等着您的到来")
            icon();
        }
    }
})

/*series-3F*/
new Promise(function(resolve,reject){
    ajax({
        type:"get",
        url:"./json/thrseries.json",
        data:{},
        success:function(data){
            var data = JSON.parse(data);
            resolve(data);
        }
    })
}).then(function(data){
    var oSeries_content3 = document.querySelector(".thrseries>.series_content");
    var str = "";
    for(var i =0;i<data.length;i++){
        str += `<li data-id="${data[i].id}">
    <img src="${data[i].img}" width="100%">
        <p class="title"><a href="##" class="atitle">${data[i].title}</a></p>
        <p class="pirse">
            ${data[i].pirce}
            <a href="##" class="addtocart">加入购物车</a>
        </p> 
    </li>`;
    }
    oSeries_content3.innerHTML = str;
    oSeries_content3.onclick = function(e){
        var e = e||event;
        var target = e.target||e.srcElement;
        if(target.tagName == "IMG"){
            var id = target.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }if(target.className == "atitle"){
            var id = target.parentNode.parentNode.getAttribute("data-id");
            location.href="html/detail.html?id="+id;
        }if(target.className == "addtocart"){
            var goodsId = target.parentNode.parentNode.getAttribute("data-id");
            if(getCookie("info")){
                arr = JSON.parse(getCookie("info"));
            }else{
                var arr = [];
            }
            if(arr.length>0){
                var bStop = false;
                for(var i = 0;i<arr.length;i++){
                    if(arr[i].id == goodsId){
                        arr[i].num++;
                        bStop = true;
                        break;
                    }
                }
                if(!bStop){
                    var goods = {};
                    goods.id = goodsId;
                    goods.num = 1;
                    arr.push(goods);
                }

            }else{
                var goods = {};
                goods.id = goodsId;
                goods.num = 1;
                arr.push(goods);
            }
            setCookie("info",JSON.stringify(arr),7);
            alert("添加成功，您的宝贝已在购物车等着您的到来")
            icon();
        }
    }
})

//购物车数量图标
function icon(){
    var icon = document.querySelector(".topbarCart>a>span")
    var icon1 = document.querySelector(".cart_num")
    var iconArr = JSON.parse(getCookie("info"));
    var s = 0;
    for(var i=0;i<iconArr.length;i++){
        s += iconArr[i].num;
    }
    // icon(s)
    icon.innerHTML = s;
    icon1.innerHTML = s;
}
icon();
