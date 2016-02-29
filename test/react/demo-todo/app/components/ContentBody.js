import React from "react";
import FormTitle from "./FormTitle"
import TodoList from "./TodoList"
import Summary from "./Summary"

export default React.createClass({
  render: function(){
    let mapTodoLists = this.props.todoLists.map(task => {
      return (
        <TodoList
          key={task.key}
          itemKey={task.key}
          text={task.text}
          done={task.done}
          onListClickHandler={this.props.onListClickHandler}
          onDelHandler={this.props.onDelHandler} />
      )
    });
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <FormTitle onNewList={this.props.onNewList} />
          <div className="todolist">
            {mapTodoLists}
            <Summary
              total={this.props.total}
              done={this.props.done}
              onDelAllHandler={this.props.onDelAllHandler} />
          </div>
        </div>
      </div>

    )
  }
})
