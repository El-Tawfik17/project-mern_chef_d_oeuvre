import axios from 'axios';
export  const GET_USER ="GET_USER";
export  const UPLOAD_IMAGE ="UPLOADE_IMAGE";
export  const UPDATE_BIO ="UPDATE_BIO";
export const FOLLOW_USER="FOLLOW_USER";
export const UNFOLLOW_USER="UNFOLLOW_USER";
export const getUser= (uid)=>{
    return (dispatch)=>{
        return axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        .then((res)=>{
            dispatch({
                type:GET_USER,
                playload:res.data
            })
        })
        .catch((err)=> console.log(err));
    }

}

export const uploadPicture = (data,id)=>{
    return (dispatch)=>{
        return axios.post(
            `${process.env.REACT_APP_API_URL}api/user/upload`,
            data
        )
        .then((res)=>{
            return axios.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res)=> dispatch({
                type : UPLOAD_IMAGE,
                playload : res.data.picture
            }))
            .catch((err)=> console.log(err));
        })
        .catch((err)=> console.log(err));
    }

}

export const updateBio =(bio,id)=>{
    return (dispatch)=>{
        return axios(
            {
                method:"put",
                url:`${process.env.REACT_APP_API_URL}api/user/${id}`,
                data:{
                    bio
                }
            }
        )
        .then((res)=>
             dispatch({
                type:UPDATE_BIO,
                 playload: bio,
                })
                
        )
        .catch((err)=>console.log(err));
    }
}

export const followUser = (id,idToFollow)=>{
    return (dispatch)=>{
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/user/follow/${id}`,
            data:{idToFollow}
        })
        .then((res)=> dispatch({
                type:FOLLOW_USER,
            playload:{idToFollow}
    })
        )
        .catch((err)=> console.log(err));
    }
}
export const unFollowUser = (id,idToUnFollow)=>{
    return (dispatch)=>{
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}api/user/unfollow/${id}`,
            data:{idToUnFollow}
        })
        .then((res)=> dispatch({
                type:UNFOLLOW_USER,
            playload:{idToUnFollow}
        })
        )
        .catch((err)=> console.log(err));
    }
}