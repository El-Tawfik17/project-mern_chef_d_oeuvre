export const GET_TRENDS ='GET_TRENDS';

export const getTrends=(trends)=>{
return (dispatch)=>{
    return dispatch({
        type:GET_TRENDS,
    playload:trends
});
}
}