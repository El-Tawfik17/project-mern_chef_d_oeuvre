import React from 'react';
 import ReactDOM from 'react-dom/client';
 import './styles/index.scss';
 import {Provider}  from 'react-redux';
 import { applyMiddleware } from "redux";
 import { composeWithDevTools } from "redux-devtools-extension";
 import { getUsers } from "./actions/users.action";


 import { configureStore } from '@reduxjs/toolkit';
 import rootReducer from './reducers';
 import thunk from "redux-thunk";
import App from './App';

 const store = configureStore({
   reducer: rootReducer,
   devTools: composeWithDevTools(applyMiddleware(thunk))
 });
 store.dispatch(getUsers());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <App />
   </Provider>
   
   
);
 

 
