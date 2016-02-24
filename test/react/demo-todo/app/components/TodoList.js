import React from "react";

export default React.createClass({
  render: function(){
    return (
      <div className="checkbox item-todolist">
        <label className="label-todolist">
          <input type="checkbox" value="" />
          <button type="button" className="btn btn-default btn-del">删除</button>
          <p className="status-del desc-item">
            Option one is this and that—be sure to include why its great
          </p>
        </label>
      </div>
    )
  }
})
