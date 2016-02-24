import React from 'react';
import { render } from 'react-dom';
import ToDoMVC from "./containers/ToDoMVC"

let todoLists = {}

render(
  <ToDoMVC todoList={todoList} />,
  document.getElementById("app")
)
