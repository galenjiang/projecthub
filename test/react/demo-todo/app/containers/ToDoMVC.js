import React from 'react';
import ContentBody from "../components/ContentBody";
import NavBar from "../components/NavBar";

export default React.createClass({
  getInitialState: function(){
    return {
      todoLists: [
        {key: 1,text: "hello, world"},
        {key: 2,text: "hello, galen"}
      ],
    }
  },
  render: function(){
    return (
      <div>
        <NavBar />
        <ContentBody todoLists = {this.state.todoLists} />
      </div>
    )
  }
})
