import { GET_TRENDS } from "../actions/trends.action";

const initialState={};

export default function  trendsReducer(state=initialState,action){
    switch(action.type){
        case GET_TRENDS:
            return action.playload;
        default:
            return state;
    }
}