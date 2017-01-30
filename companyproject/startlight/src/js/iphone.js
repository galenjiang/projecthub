import {util} from "./core/util";
let $ = require("jQuery");
let page = {
  init: () => {
    page.ready(() => {
      // 图片预加载
      page.imgPreload([
          "../images/btn_big_active.png",
        ])
        // 初始化页面
      page.initPrizeDesc();
      // backward
      page.pagePrizeDescBackWard()
        // pagecheck close
      page.pageCheckCloseEvent()
    })
  },
  quickTap: true,
  confirm: new Hammer(document.querySelector(`.pageCheck .confirm`)),
  // 兑奖
  pageCheckConfirmEvent: (delid) => {
    page.confirm.off(`tap`);
    page.confirm.on(`tap`, () => {
      let key = document.querySelector(`.text`).value
      console.log(delid)
      console.log(key)
      util.loading.show()
      if (page.quickTap) {
        page.quickTap = false;
        // 请求ajax
        util.ajax({
          type: "get",
          url: "../../config/configAjax.php",
          data: {
            event: "heXiao",
            id: delid,
            key: key
          },
          dataType: "json",
          success: function(res) {
            util.loading.hide()
            if(res.status == 0){
              alert("兑换成功！")
              // util.alert.show({txt: "兑换成功！", btn: "确定", callback: function(){
                window.location.href = "prize.php";
              // }})
            }else{
              util.alert.show(res.msg)
            }
            page.quickTap = true;
          },
          error: function() {
            util.loading.hide()
            page.quickTap = true;
          }
        })
      }
    })
  },
  pageCheckCloseEvent: () => {
    let pageCheck = document.querySelector(`.pageCheck`)
    let close = new Hammer(document.querySelector(`.pageCheck .close`))
    close.on(`tap`, () => {
      pageCheck.classList.remove(`active`)
    })
  },
  getPrize: () => {
    let pageCheck = document.querySelector(`.pageCheck`)
    let aGetPrize = document.querySelectorAll(`.getPrize`)
    Array.prototype.forEach.call(aGetPrize, (el) => {
      let getPrize = new Hammer(el)
      getPrize.on(`tap`, () => {
        pageCheck.classList.add(`active`)
      })
    })
  },
  initPrizeDesc: () => {
    let arr1 = window.location.href.match(/id=(\d+)/);
    let id = arr1[1];
    let arr2 = window.location.href.match(/delid=(\d+)/);
    let delid = arr2[1];
    util.ajax({
      type: "get",
      url: "../../config/configAjax.php",
      data: {
        event: "listDetail",
        id: delid
      },
      dataType: "json",
      success: function(json) {

        // 初始化回调
        let title = document.querySelector(`.pagePrizeDesc .title`);
        let getPrize = document.querySelector(`.pagePrizeDesc .getPrize`);
        title.innerHTML = json.data.name;
        if (json.data.status == 2) {
          getPrize.style.display = `none`;
        } else if (json.data.status == 1) {
          getPrize.style.display = `block`;
          page.pageCheckConfirmEvent(delid)
        }
        // initDesc
        page.getPrize()
      },
      error: function() {}
    })
  },
  pagePrizeDescBackWard: () => {
    let back = new Hammer(document.querySelector(`.pagePrizeDesc .back`))
    back.on(`tap`, () => {
      window.location.href = `./prize.php`
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
      // console.log(el)
      let oImg = document.createElement("img");
      oImg.src = el
    })
  },
  preventMediaDefault: () => {
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, false);
  }
}
page.init()
