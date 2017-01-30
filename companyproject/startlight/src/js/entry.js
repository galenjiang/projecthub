let $ = require("jQuery");
import {util} from "./core/util";

let page = {
  init: () => {
    page.ready(() => {
      document.querySelector(`.wrapper`).style.height = document.body.clientHeight + "px"
      // 图片预加载
      page.imgPreload([
          "../images/btn_big_active.png"
        ])
        // entry rule btn events
      page.pageEntryRuleEvent()
        // entry confirm btn events
      page.pageEntryConfirmEvent()
        // pagerule close
      page.pageRuleCloseEvent()
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
  pageRuleCloseEvent: () => {
    let close = document.querySelector(".maskRule .pop .close");
    new Hammer(close).on(`tap`, () => {
      let pageRule = document.querySelector("#pageRule")
      pageRule.classList.remove("active")
    })
  },
  quickTap: true,
  pageEntryConfirmEvent: () => {
    let entryConfirm = document.querySelector(`.pageEntry .confirm`)
    new Hammer(entryConfirm).on(`tap`, () => {
      let mobile = document.querySelector(`.mobile`);
      if(!/^1[356789]\d{9}$/.test(mobile.value)){
        util.alert.show("手机号码不正确，请重新输入！")
        return false;
      }
      util.loading.show()
      if(page.quickTap){
        page.quickTap = false
        // ajax 验证 成功后回调
        util.ajax({
          type: "get",
          url: "../../config/configAjax.php",
          data: {
            event: "login",
            telphone: mobile.value
          },
          dataType: "json",
          success: (res) => {
            console.log(res)
            util.loading.hide()
            if(res.status == 0){
              window.location.href = "./app.php"
            }else{
              util.alert.show(res.msg)
              page.quickTap = true;
            }
          },
          error: (e) => {
            page.quickTap = true
            util.loading.hide()
          }
        })
      }
    })
  },
  pageEntryRuleEvent: () => {
    let entryRule = document.querySelector(".pageEntry .rule")
    let $entryRule = new Hammer(entryRule)
    $entryRule.on(`tap`, () => {
      let pageRule = document.querySelector("#pageRule")
      pageRule.classList.add("active")
    })
  }
}
page.init()
