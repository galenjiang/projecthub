import React from "react";
export default React.createClass({
  render: function(){
    return (
      <div className="form-group">
        <div className="input-group">
          <span className="input-group-addon"><span className="glyphicon glyphicon-plus-sign"></span></span>
          <input type="text" className="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status" />
        </div>
      </div>
    )
  }
})
