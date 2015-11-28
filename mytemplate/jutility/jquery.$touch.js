/**
 * Created by admin on 2015/9/17.
 */
define(function(require, exports, module){
  var $; if ($ || jQuery) { $ = jQuery ? jQuery : $;} else { return false;}

  return (function($){

    // $.fn.hover();
    // $.fn.removeHover();
    // $.fn.touchend();
    // $.fn.offTouchend();
    // $.touchmoved();

    // ΪtouchStart��touchEnd��Ӻ�ɾ��hoverЧ��
    // ������ʱ������ֹ�û�����ק��ʱ���Ҳ��ӦhoverЧ��
    // Ҳ����˵���û�ֻ���ڰ�ס������10�������Ӧ
    var touchHover = {
      start: function(e){
        var _this = $(this);
        var _t = setTimeout(function(){
          _this.attr("hover", "on");
        }, 10);
        _this.attr("hoverTimeout", _t);
      },
      move: function(e) {
        var _this = $(this);
        clearTimeout(_this.attr("hoverTimeout"));
        _this.removeAttr("hoverTimeout");
        _this.removeAttr("hover");
      },
      end: function(e){
        var _this = $(this);
        clearTimeout(_this.attr("hoverTimeout"));
        _this.removeAttr("hoverTimeout");
        _this.removeAttr("hover");
      }
    };
    $.fn.hover = function(el) {
      if (el){
        this.on("touchstart", el, touchHover.start);
        this.on("touchmove", el, touchHover.move);
        this.on("touchend", el, touchHover.end);
      } else {
        this.on("touchstart", touchHover.start);
        this.on("touchmove", touchHover.move);
        this.on("touchend", touchHover.end);
      }
      return this;
    };
    $.fn.removeHover = function(el) {
      if (el){
        this.off("touchstart", el, touchHover.start);
        this.off("touchmove", el, touchHover.move);
        this.off("touchend", el, touchHover.end);
      } else {
        this.off("touchstart", touchHover.start);
        this.off("touchmove", touchHover.move);
        this.off("touchend", touchHover.end);
      }
      return this;
    };

    // ��touchstart֮����ָ���ƶ���$.touchMoved()Ϊfalse�����û���ƶ���Ϊtrue
    var touchmove = {
      hasMove: false,
      on: function(){
        $(document).on("touchstart touchmove", touchmove.move);
      },
      off: function(){
        touchmove.hasMove = false;
        $(document).off("touchstart touchmove", touchmove.move);
      },
      move: function(e){
        if (e.type == "touchstart") {
          touchmove._x = e.originalEvent.changedTouches[0].pageX;
          touchmove._y = e.originalEvent.changedTouches[0].pageY;
          touchmove.hasMove = false;
        } else if (e.type == "touchmove") {
          var _x = e.originalEvent.changedTouches[0].pageX;
          var _y = e.originalEvent.changedTouches[0].pageY;
          if (Math.abs(_x - touchmove._x) > 10 || Math.abs(_y - touchmove._y) > 10){
            touchmove.hasMove = true;
          }
        }
      }
    };
    touchmove.on();

    // touchend�¼�
    $.fn.touchend = function(A, B, C){
      if (A && typeof A == "function"){
        $(this).hover().on("touchend", function(){
          var _this = $(this);
          if (!$.touchmoved() || B){
            A.apply(_this);
          }
          return false;
        });
      } else if (A && typeof A == "string" && B && typeof B == "function"){
        $(this).hover(A).on("touchend", A, function(){
          var _this = $(this);
          if (!$.touchmoved() || C){
            B.apply(_this);
          }
          return false;
        });
      }
    };

    // ж��touchend�¼�
    $.fn.offTouchend = function(el){
      if (el){
        $(this).removeHover(el).off("touchend");
      } else {
        $(this).removeHover().off("touchend");
      }
    }

    // ��touchstart֮����ָ���ƶ���Ϊfalse�����û���ƶ���Ϊtrue
    $.touchmoved = function(){
      return touchmove.hasMove;
    };
  })(jQuery);
});