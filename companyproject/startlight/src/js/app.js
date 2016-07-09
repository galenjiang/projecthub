let $ = require("jQuery");
import {util} from "./core/util";
let page = {
  last_x: undefined,
  last_y: undefined,
  last_update: 0,
  init: function() {
    page.ready(() => {
      // 富媒体阻止默认
      page.preventMediaDefault();
      // 图片预加载
      page.imgPreload([
          "../images/btn_big_active.png",
          "../images/btn_start_active.png",
        ])
        // pagerule close
      page.pageRuleCloseEvent();
      // home rule open events
      page.pageHomeRuleEvent();
      // home goto pagePrize
      page.pageHomeRecordEvent();

      // start roll
      page.pageHomeStart();
      // 摇奖后get页去查看
      page.pageMaskGet2CheckEvent();
      // 摇奖后get页关闭窗口
      page.pageMaskGetCloseEvent();
      //  摇奖后sorry页关闭窗口
      page.pageMaskSorryCloseEvent();

    })
  },
  rollBeTrue: true,
  pageMaskSorryCloseEvent: () => {
    let close = new Hammer(document.querySelector(`.maskSorry .close`))
    let pageGet = document.querySelector(`.maskSorry`)
    close.on(`tap`, () => {
      pageGet.classList.remove(`active`);
    })
  },
  pageMaskGetCloseEvent: () => {
    let close = new Hammer(document.querySelector(`.maskGet .close`))
    let pageGet = document.querySelector(`.maskGet`)
    close.on(`tap`, () => {
      pageGet.classList.remove(`active`);
    })
  },
  pageMaskGet2CheckEvent: () => {
    let goPrize = new Hammer(document.querySelector(`.maskGet .check`))
    goPrize.on(`tap`, () => {
      window.location.href = `./prize.php`
    })
  },
  goRoll: () => {
    let maskShake = document.querySelector(`.maskShake`)
    maskShake.classList.remove(`active`);
    util.loading.show();
    $.ajax({
      type: "post",
      url: "../../config/configAjax.php",
      data: {
        event: "shake"
      },
      dataType: "json",
      success: function(json) {
        let start = document.querySelector(`.pageHome .start`)
        start.style.pointerEvents = "auto";
        start.style.opacity = 1;
        util.loading.hide();
        // 成功后回调
        // alert(JSON.stringify(json))
        if (json.status == 0) {
          let _html = json.data.yes.res.name;
          let getPrize = document.querySelector(`#get`);
          let name = document.querySelector(`.prizename`);
          getPrize.classList.add(`active`);
          name.innerHTML = _html;

        } else {
          let noPrize = document.querySelector(`#sorry`);
          noPrize.classList.add(`active`)
        }
      },
      error: function(res){
        let start = document.querySelector(`.pageHome .start`)
        start.style.pointerEvents = "auto";
        start.style.opacity = 1;
        util.loading.hide()
      }
    })
  },
  shakeInit: () => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', page.deviceMotionHandler, false);
    } else {
      page.goRoll()
    }
  },
  deviceMotionHandler: (eventData) => {
    var x = 0;
    var y = 0;
    let bgMusic = document.querySelector("#audio");
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - page.last_update) > 100) {
      var diffTime = curTime - page.last_update;
      page.last_update = curTime;
      x = acceleration.x;
      y = acceleration.y;
      if (x + y - page.last_x - page.last_y > 20) {
        window.removeEventListener("devicemotion", page.deviceMotionHandler, false);
        bgMusic.play();
        page.goRoll();
      }
      page.last_x = x;
      page.last_y = y;
    }
  },
  pageHomeStart: () => {
    let start = document.querySelector(`.pageHome .start`)
    let pageShake = document.querySelector(`.maskShake`)
    new Hammer(start).on(`tap`, () => {
      pageShake.classList.add(`active`)
      setTimeout(function(){
        pageShake.classList.remove(`active`)
      },5000)
      start.style.pointerEvents = "none";
      start.style.opacity = 0.7;

      page.shakeInit()
    })
  },
  pagePrizeBackWard: () => {
    let back = document.querySelector(`.pagePrize .back`);
    let pagePrize = document.querySelector(`.pagePrize`);
    new Hammer(back).on(`tap`, () => {
      pagePrize.classList.remove(`active`)
    })
  },
  pageHomeRecordEvent: () => {
    let pagePrize = document.querySelector(`.pagePrize`)
    let go2Record = document.querySelector(`.pageHome .record`)
    new Hammer(go2Record).on(`tap`, () => {
      // pagePrize.classList.add(`active`);
      window.location.href = "./prize.php"
    })
  },
  pageHomeRuleEvent: () => {
    let Rule = document.querySelector(".pageHome .rule")
    new Hammer(Rule).on(`tap`, () => {
      let pageRule = document.querySelector("#pageRule")
      pageRule.classList.add("active")
    })
  },
  pageRuleCloseEvent: () => {
    let close = document.querySelector(".maskRule .pop .close");
    new Hammer(close).on(`tap`, () => {
      let pageRule = document.querySelector("#pageRule")
      pageRule.classList.remove("active")
    })
  },

  ready: (fn) => {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },
  // 传数组
  imgPreload: (arr) => {
    arr.forEach((el) => {
      console.log(el)
      let oImg = document.createElement("img");
      oImg.src = el
    })
  },
  preventMediaDefault: () => {
    document.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, false);
  },
}

page.init()
