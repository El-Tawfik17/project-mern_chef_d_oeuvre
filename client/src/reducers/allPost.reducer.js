const initialState={};
import { GET_ALL_POSTS } from "../actions/posts.action";

export function allPostReducer(state=initialState,action){
    switch(action.type){
        case GET_ALL_POSTS:
            return action.playload;
        default:
            return state;
    }
}