import React from "react";
import FormTitle from "./FormTitle"

export default React.createClass({
  render: function(){
    let todoLists = this.props.item.map(function(){
      return <TodoList />
    })
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <FormTitle />

          <div className="todolist">
            {todoLists}
            <Summary />
          </div>
        </div>
      </div>

    )
  }
})
