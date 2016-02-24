import React from "react";

export default React.createClass({
  render: function(){
    return (
      <div className="checkbox sum-todolist">
        <label className="label-todolist">
          <input type="checkbox" value="" />
          <button type="button" className="btn btn-default btn-del">清除已完成</button>
          <p className="">
            {3}已完成/{6}总数
          </p>
        </label>
      </div>
    )
  }
})
