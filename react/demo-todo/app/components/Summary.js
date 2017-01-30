import React from "react";

export default React.createClass({
  onDelAllHandler: function() {
    this.props.onDelAllHandler();
  },
  render: function(){
    return (
      <div className="checkbox sum-todolist">
        <label className="label-todolist">
          <button onClick={this.onDelAllHandler} type="button" className="btn btn-default btn-del">清除已完成</button>
          <p className="">
            {this.props.done}已完成/{this.props.total}总数
          </p>
        </label>
      </div>
    )
  }
})
