import React from "react";

export default React.createClass({
  render: function(){
    return (
      <div className="checkbox item-todolist" key = {this.props.key}>
        <label className="label-todolist">
          <input type="checkbox" value="" />
          <button type="button" className="btn btn-default btn-del">删除</button>
          <p className="status-del desc-item">
            {this.props.text}
          </p>
        </label>
      </div>
    )
  }
})
