import React from "react";
import FormTitle from "./FormTitle"
import TodoList from "./TodoList"
import Summary from "./Summary"

export default React.createClass({
  render: function(){
    let mapTodoLists = this.props.todoLists.map(function(task){
      return (
        <TodoList key = {task.key} text = {task.text} />
      )
    })
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <FormTitle />
          <div className="todolist">
            {mapTodoLists}
            <Summary />
          </div>
        </div>
      </div>

    )
  }
})
