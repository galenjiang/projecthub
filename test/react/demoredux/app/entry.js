import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import App from './containers/App';
// import configureStore from './stores/configureStore';
// const store = configureStore();

// reducer
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}



// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
