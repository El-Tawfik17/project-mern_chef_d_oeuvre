import axios from 'axios';
import React,{useState} from 'react';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [pseudo,setPseudo]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [controlPassword,setControlPassword]= useState('');
    const [formSubmit,setFormSubmit]= useState(false);
    const handleRegister = async(e)=>{
        e.preventDefault();
        const pseudoError = document.querySelector('.pseudo.error');
        const terms = document.getElementById('terms');
        const termsError = document.querySelector('.terms.error');


        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        //cleaning input content
        passwordConfirmError.innerHTML ="";
        termsError.innerHTML = "";
        emailError.innerHTML = "";
        passwordError.innerHTML = "";


        if(password !== controlPassword || !terms.checked){
            if(password !== controlPassword)
                passwordConfirmError.innerHTML ="Les mots de passe ne correspondent pas";
            

            if(!terms.checked)
            termsError.innerHTML = "Veuillez valider les conditions générales ";


        }else{
           await axios({
                method:"POST",
                url:`${process.env.REACT_APP_API_URL}api/user/register`,
                withCredentials:true,
                data:{
                    pseudo,
                    email,
                    password,
                }
            })
            .then((res)=>{
                console.log(res);
                if(res.data.errors){
                    if(res.data.errors.pseudo)
                    pseudoError.innerHTML = res.data.errors.pseudo;
                    if(res.data.errors.email)
                    emailError.innerHTML = res.data.errors.email;
                    if(res.data.errors.password)
                    passwordError.innerHTML = res.data.errors.password;
                }else{
                    setFormSubmit(true);

                }

            })
            .catch((err)=>{
                console.log(err);
            })
        }

    }

     
    return (
        <React.Fragment>
            {formSubmit? (
            <React.Fragment>
                <SignInForm/>
                <span></span>
                <h4 className='success'>Enregistrement reussi,Veuillez vous connecter</h4>
            </React.Fragment>
            ):(
            <React.Fragment>
            <form  onSubmit={handleRegister}  className='sign-up-form'>
            <label htmlFor="pseudo">pseudo</label>
            <br/>
            <input type='text'  name='pseudo' id='pseudo'  onChange={(e)=> setPseudo(e.target.value)} value={pseudo}/>
            <div className='pseudo error'> </div>
            <br/>

            <label htmlFor="email">email</label>
            <br/>
            <input type='eamil'  name='email' id='email'  onChange={(e)=> setEmail(e.target.value)} value={email}/>
            <div className='email error'> </div>

            <br/>
            <label htmlFor="pseudo">Mot de passe</label>
            <br/>
            <input type='password'  name='password' id='password'    onChange={(e)=> setPassword(e.target.value)} value={password}/>
            <div className='password error'> </div>

            <br/>
            <label htmlFor="password-conf">Confirmer le mot de passe</label>
            <br/>
            <input type='password'  name='password-conf' id='password-conf'    onChange={(e)=> setControlPassword(e.target.value)} value={controlPassword}/>
            <div className='password-confirm error'> </div>

            <br/>
             <input type="checkbox" id="terms"/>
             <label htmlFor="terms"> J' accepte les {""} <a href='/' target="blank" rel="noopener noreferrer"> conditions générales</a></label>
             <div className='terms error'> </div>



            <input type='submit' value= "s'inscrire" />
        </form>
        </React.Fragment>)}
        </React.Fragment>
        
    );
};

export default SignUpForm;