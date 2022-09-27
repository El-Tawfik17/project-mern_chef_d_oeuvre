import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Card from './post/Card';
import {getPosts} from '../actions/posts.action';
import { isEmpty } from './utils';
  

const Thread = () => {
    const [loadPost,setLoadPost]= useState(true);
    const [count,setCount]= useState(5)
    const dispatch = useDispatch();
    const posts = useSelector((state)=> state.postsReducer);
    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
          setLoadPost(true);
        }
      }

    useEffect(() => {
        if (loadPost) {
          dispatch(getPosts(count));
          setLoadPost(false);
          setCount(count + 5);
        }
    
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
      }, [loadPost, dispatch, count]);
    
    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) && 
                    posts.map((post) => {
                        return <Card post={post} key={post._id} />;
                    })}
            </ul>
        </div>
    );
};

export default Thread;