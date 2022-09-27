import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils';
import { followUser } from '../../actions/user.action';
import { unFollowUser } from '../../actions/user.action';

const FollowHandler = ({idToFollow,type}) => {
    const [isFollowed,setIsFollowed]= useState(false);
    const userData = useSelector((state)=> state.userReducer);
    console.table('id:',idToFollow);

    const dispatch = useDispatch();
    const handleFollow =()=>{
        dispatch(followUser(userData._id,idToFollow));
        setIsFollowed(true);
    }
    const handleUnfollow =()=>{
        dispatch(unFollowUser(userData._id,idToFollow));
        setIsFollowed(false);

    }
    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
              setIsFollowed(true);
            } else setIsFollowed(false);
          }
    }, [userData,idToFollow]);

    return (
        <>
        {isFollowed && !isEmpty(userData) && (
          <span onClick={handleUnfollow}>
            {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
            {type === "card" && <img src="./img/icons/checked.svg" alt="checked"/>}
          </span>
        )}
        {isFollowed === false && !isEmpty(userData) && (
          <span onClick={handleFollow}>
            {type === "suggestion" && <button className="follow-btn">Suivre</button>}
            {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
          </span>
        )}
      </>
    );
};

export default FollowHandler;