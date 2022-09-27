import {
    GET_USER,
    UPLOAD_IMAGE,
    UPDATE_BIO,
    UNFOLLOW_USER,
    FOLLOW_USER
} from "../actions/user.action";
const initialState = {};
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.playload;

        case UPLOAD_IMAGE:
            return {
                ...state,
                picture: action.playload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.playload,
            };
        case FOLLOW_USER:
            return {
                ...state,
                following: [action.playload.idToFollow, ...state.following],
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                following: state.following.filter(
                    (id) => id !== action.playload.idToUnFollow
                  ),
            };
        default:
            return state;
    }

}