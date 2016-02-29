import React from "react";

export default React.createClass({
  onClickHandler: function() {
    this.props.onListClickHandler(this.props.itemKey);
  },
  onDelHandler: function() {
    this.props.onDelHandler(this.props.itemKey)
  },
  render: function(){
    return (
      <div className="checkbox item-todolist"
        key={this.props.key}>
        <label className="label-todolist">
          <input onClick={this.onClickHandler} type="checkbox" defaultChecked={this.props.done} />
          <button onClick={this.onDelHandler} type="button" className="btn btn-default btn-del">删除</button>
          <p className={this.props.done ? "status-del desc-item" : "desc-item"}>
            {this.props.text}
          </p>
        </label>
      </div>
    )
  }
})
