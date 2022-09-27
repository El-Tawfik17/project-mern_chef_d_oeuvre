import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postsReducer from './posts.reducer';
import allPostReducer from  './posts.reducer';
import trendsReducer from './trends.reducer';

export default combineReducers({
    userReducer,usersReducer,postsReducer,allPostReducer,trendsReducer
})

