/*导航栏 */
/*function nav(){
    var oNav_item = document.querySelector(".nav_item");
    var aA = oNav_item.querySelectorAll("li>a");
    oNav_item.onmouseover = function(e){
        var e = e||event;
        var target = e.target||e.srcElement;
        for(var i = 0;i<aA.length;i++){
            aA[i].className="";
        }
        target.className = "active";
        target.onmouseout = function(){
            this.className = "";
        }
    }
}
nav();*/

/*二级导航*/
/*function subnav(){
    var aLi = document.querySelectorAll(".allshop_item>li");
    // var aA = document.querySelectorAll(".item_menu>ul>li>a");
    for(var i = 0;i<aLi.length;i++){
        aLi[i].index = i
        aLi[i].onmouseover = function(){
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
        aLi[i].onmouseout = function(){
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
subnav();*/

/*轮播图*/
/*function banner(){
    var oBanner = document.querySelector(".banner");
    var oUl = document.querySelector(".banner>ul");
    var aLi1 = document.querySelectorAll(".banner>ul>li");
    var numsLi = document.querySelectorAll(".nums>ul>li")
    var iNow = 0;
    var timer = null;
    oBanner.style.width = document.documentElement.clientWidth+"px"
    oUl.style.marginLeft = -(aLi1[0].offsetWidth-document.documentElement.clientWidth)/2+"px"
    //赋值第一个li添加到ulla末尾
    var li = aLi1[0].cloneNode(true);
    oUl.appendChild(li);
    var aLi1 = document.querySelectorAll(".banner>ul>li");
    //动态设置ul的宽
    var iWidth = aLi1[0].offsetWidth;
    oUl.style.width = iWidth * aLi1.length +"px";
    //设置运动原理（运动）
    function toImg(){
        move(oUl,{left:-iNow*iWidth})
        for(var i = 0;i<numsLi.length;i++){
            numsLi[i].className = "";
        }
        numsLi[iNow==aLi1.length-1?0:iNow].className = "on";
    }
    //设置定时器运动
    function aotuPlay(){
        timer = setInterval(function(){
            if(iNow == aLi1.length-1){
                iNow = 1;
                oUl.style.left =0;
            }else{
                iNow++
            }   
            toImg();
        },2000)
    }
    aotuPlay();
    //鼠标移入停止轮播，移出开始轮播;
    oBanner.onmouseover = function(){
        clearInterval(timer);
    }
    oBanner.onmouseout = function(){
        aotuPlay();
    }
    //选项卡
    for(var i = 0;i<numsLi.length;i++){
        numsLi[i].index = i;
        numsLi[i].onmouseover = function(){
            for(var j = 0;j<numsLi.length;j++){
                numsLi[j].className = "";
            }
            this.className = "on";
            iNow = this.index;
            toImg();
        }
    }
}
banner();*/