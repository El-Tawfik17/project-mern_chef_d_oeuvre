import axios from 'axios';
import React,{useState} from 'react';
// import {dotenv} from 'dotenv';

const SignInForm = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const emailError = document.querySelector(".email.error");

    const passwordError = document.querySelector(".password.error");
    const handleLogin = (e)=>{
        e.preventDefault();
        axios({
            method:"POST",
            url:`${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials:true,
            data:{
                email,
                password,
            },
        })
        .then((res)=>{
            console.log(res);
            if(res.data.errors){
                emailError.innerHTML=res.data.errors.email;
                passwordError.innerHTML=res.data.errors.password;

            }else{
                window.location ='/';

            }
        })
        .catch((err)=>{
            console.log(err);
        });

    }
    return (
        <form  action=''  onSubmit={handleLogin}  id='sign-up-form'>
            <label htmlFor='email'>Email</label>
            <br/>
            <input type='email' name='email'   id='eamil' onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <div className='email error'></div>
            <br/>
            <label htmlFor='password'>Password</label>
            <br/>
            <input type='password' name='password'   id='password' onChange={(e)=>setPassword(e.target.value)} value={password }/>
            <div className='password error'></div>
            <br/>

            <input type='submit' value='Se connecter'/>

             
        </form>
    );
};

export default SignInForm;