import React from "react";
export default React.createClass({
  onEnterHandler: function(e) {
    if(e.keyCode == 13){
      let newList = this.refs.addText.value;
      this.props.onNewList(newList);
      this.refs.addText.value = "";
    };

  },
  render: function(){
    return (
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon"><span className="glyphicon glyphicon-plus-sign"></span></span>
          <input onKeyDown={this.onEnterHandler} ref="addText" type="text" className="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status" />
        </div>
      </div>
    )
  }
})
