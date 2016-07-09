import {util} from "./core/util";
let $ = require("jQuery");
let page = {
  init: () => {
    page.ready(() => {

      // 图片预加载
      page.imgPreload([
          // "../images/btn_getprize_active.png",
          // "../images/btn_confirm_active.png",
        ])
        // pagePrize backward
      page.pagePrizeBackWard();
      // tap 2 prize detail content
      page.pagePrize2details()

      page.initPrize(page.pagePrize2details);

    })
  },

  initPrize: (fn) => {
    let prizeList = document.querySelector("#prizeList")
    util.ajax({
      type: "get",
      url: "../../config/configAjax.php",
      data: {
        event: "myList"
      },
      dataType: "json",
      success: (json) => {
        // getlist

        let arr = json.data
        let _html = ""
        arr.forEach((el, i) => {
          if (arr[i].status == 2) {
            _html += `<li data-delid="${arr[i].id}" data-id="${arr[i].resLocal.id}" data-type="${arr[i].resLocal.type}" data-status="${arr[i].status}" data-name="${arr[i].resLocal.name}" class="prize">\
            <span class="title">Lucky Star</span>\
            <span class="status havegot"></span>\
            <div class="tip">奖品:<span class="desc">${arr[i].resLocal.name}</span></div>\
            </li>`
          } else if (arr[i].status == 1) {
            _html += `<li data-delid="${arr[i].id}" data-id="${arr[i].resLocal.id}" data-type="${arr[i].resLocal.type}" data-status="${arr[i].status}" data-name="${arr[i].resLocal.name}" class="prize">\
            <span class="title">Lucky Star</span>\
            <span class="status noget"></span>\
            <div class="tip">奖品:<span class="desc">${arr[i].resLocal.name}</span></div>\
            </li>`
          }
        })
        if(arr.length == 0){
          _html = "<span class='nodata'>暂未获奖</span>";
        }
        prizeList.innerHTML = _html;
        fn()
      }
    })
  },

  pagePrize2details: () => {
    let $doc = new Hammer(document.querySelector(`body`))
    let aLi = document.querySelectorAll(`.prize`)
    $doc.on(`tap`, (e) => {
      // console.log(e.target)
      let res = null;
      if (aLi) {
        Array.prototype.forEach.call(aLi, (el) => {
          if (e.target && el.contains(e.target)) {
            if (el.classList.contains(`prize`)) {
              if (!res) {
                res = el
              }
            }
          }
        })
      }
      if (res) {
        let id = res.getAttribute(`data-id`);
        let name = res.getAttribute(`data-name`);
        let status = res.getAttribute(`data-status`);
        let type = res.getAttribute(`data-type`);
        let delid = res.getAttribute(`data-delid`)

        if (type == 2) {
          window.location.href = `./iphone.php?id=${id}&delid=${delid}`
            // page.initPrizeDesc(id, name, status, type)
        } else if (type == 1) {
          window.location.href = `./currency.php?id=${id}&delid=${delid}`
          // page.initCurrencyDesc(id, name, status, type)
        }
      }
    })
  },

  pagePrizeBackWard: () => {
    let back = new Hammer(document.querySelector(`.pagePrize .back`))
    back.on(`tap`, () => {
      window.location.href = "./app.php"
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
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, false);
  }
}
page.init()
