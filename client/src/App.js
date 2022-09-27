 import React,{useState,useEffect} from 'react';
 import Routes from './components/Routes';
 import {UidContext} from "./components/AppContext";
 import {getUser} from './actions/user.action';
 import axios from 'axios';
import { useDispatch } from 'react-redux';
function App() {
  const[uid, setUid] =useState();
  const dispatch = useDispatch();

  useEffect(() => {
     const fetchToken =async ()=>{
      await axios({
        method:"get",
        url: 'http://localhost:5000/jwtid',
        withCredentials:true,
      })
      .then((res)=>{
        setUid(res.data);
      })
      .catch((err)=>console.log("NO token"))

     };
     fetchToken();
     if(uid) dispatch(getUser(uid));
    
  }, [uid,dispatch]);
  return (
    <UidContext.Provider value={uid}>
        <Routes/>
    </UidContext.Provider>
  );
}

export default App;

