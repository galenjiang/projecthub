import React from 'react';
import _ from "lodash";
import ContentBody from "../components/ContentBody";
import NavBar from "../components/NavBar";


export default React.createClass({
  getInitialState: function(){
    return {
      todoLists: [
        {key: 1, text: "hello, world", done: true},
        {key: 2,text: "hello, galen", done: false}
      ],
      key: 2,
    }
  },
  onNewList: function(newList) {
    this.setState({key: this.state.key + 1});
    let newTodoList = {
      key: this.state.key + 1,
      text: newList,
      done: false,
    }
    let newTodoLists = this.state.todoLists.concat( newTodoList );
    this.setState({
      todoLists: newTodoLists,
    })
  },
  onListClickHandler: function(itemKey) {
    let copyTodoLists = _.uniq(this.state.todoLists);
    let index = _.findIndex(copyTodoLists, function(item) {
      return item.key == itemKey;
    })
    copyTodoLists[index].done ? copyTodoLists[index].done = false : copyTodoLists[index].done = true;
    this.setState({
      todoLists: copyTodoLists,
    });
  },
  onDelHandler: function(itemKey) {
    let copyTodoLists = _.uniq(this.state.todoLists);
    let index = _.findIndex(copyTodoLists, function(item) {
      return item.key == itemKey;
    })
    copyTodoLists.splice(index, 1);
    this.setState({
      todoLists: copyTodoLists
    })
  },
  onDelAllHandler: function() {
    let newTodoLists = _.filter(this.state.todoLists, function(item) {
      return item.done !== true;
    })
    this.setState({
      todoLists: newTodoLists
    })
  },
  render: function(){
    let total = this.state.todoLists.length;
    let doneList = _.filter(this.state.todoLists, function(item) {
      return item.done == true
    })
    let done = doneList.length;
    return (
      <div>
        <NavBar />
        <ContentBody
          todoLists={this.state.todoLists}
          onNewList={this.onNewList}
          onListClickHandler={this.onListClickHandler}
          total={total}
          done={done}
          onDelHandler={this.onDelHandler}
          onDelAllHandler={this.onDelAllHandler} />
      </div>
    )
  }
})
