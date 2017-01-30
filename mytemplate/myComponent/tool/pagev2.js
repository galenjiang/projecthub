$(function() {
  var scope = {
    //当前页
    currentpage: 1,
    //当前最小页
    minpage: 1,
    //当前最大页
    maxpage: 10,
    //总页数
    totalpage: 1,
    //索引
    index: 1
  };
  window.initPage = function(totalpage,fn) {

    $("#pagelist .pre").off().on("click", function(){
      prePage(fn);
    });
    $("#pagelist .next").off().on("click", function(){
      nextPage(fn);
    });

    $("#pagelist .num").off().on("click", "li", function(){
      _this = this;
      numclick(fn,_this);
    });
    listInit(totalpage,fn);
  };
  //页数点击
  /*
  <div class="pagelist" id="pagelist">
    <a href="javacript:;" class="pre">上一页</a>
    <ul class="num">
      <li class="active">1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <a href="javacript:;" class="next">下一页</a>
  </div>
  */
/*
调用 传去两个参数， 总页数，和回调执行函数
page.getTotalPage(initPage(parseInt(scope.totalpage), page.getData));
*/


  function listInit(totalpage,fn){
    scope.totalpage = parseInt(totalpage);
    if((typeof scope.totalpage) == "number"){
      if(scope.totalpage > 10){
        $("#pagelist .num").html('<li class="active">1</li>' + '<li>2</li>' + '<li>3</li>' + '<li>4</li>' + '<li>5</li>' + '<li>6</li>' + '<li>7</li>' + '<li>8</li>' + '<li>9</li>' + '<li>10</li>')
      }else{
        scope.maxpage = scope.totalpage;
        var _html = '';
        for (var i = 0, len = totalpage; i < len; i++) {
          if (i == 0) {
            _html += '<li class="active">' + ( i + 1 ) + '</li>';
          } else {
            _html += '<li>' + ( i + 1 ) + '</li>';
          }
        }
        $("#pagelist .num").html(_html);
        fn(1);
      }
    }else{
      console.log("页数是非数字，请确认！");
      scope.totalpage = 1;
      scope.minpage = 1;
      scope.maxpage = 1;
    }

  };

  //上一页
  function prePage(fn) {
    console.log(scope.totalpage,scope.currentpage,scope.minpage,scope.maxpage)
    if (scope.index > 1) {
      var _res = fn(scope.currentpage - 1);
      if(_res.hasContent){
        //放弃了。。。
      }else{
        //放弃了。。。
      }
    }
  };
  //下一页
  function nextPage(fn) {
    console.log(scope.totalpage,scope.currentpage,scope.minpage,scope.maxpage)
    if(scope.currentpage < scope.maxpage){
      $("#pagelist").find("li").eq(scope.index).removeClass("active");
      scope.index ++;
      $("#pagelist").find("li").eq(scope.index).addClass("active");
      scope.currentpage ++;
      fn(scope.currentpage);
    }else if(scope.currentpage == scope.maxpage){
      //回调 返回有数据为true;
      var _res = fn(scope.currentpage + 1);
      if(_res.hasContent){
        scope.currentpage ++;
        scope.totalpage = _res.totalpage;
        if(scope.maxpage == 10){
          //放弃了。。。
        }else{
          //放弃了。。。
        }

      }else{
        console.log("这是最后一页！")
      };
    }
  };

  function numclick(fn,_this) {
    $("#pagelist .num").find("li").removeClass("active");
    $(_this).addClass("active");
    scope.currentpage = $(_this).html();
    fn(scope.currentpage);
  }
})
