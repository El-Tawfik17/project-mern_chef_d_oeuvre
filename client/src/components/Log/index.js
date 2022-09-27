import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = (props) => {
    const{ signup,signin}= props;
    const [signInModal,setSignInModal] = useState(signin);
    const [signUpModal,setSignUpModal] = useState(signup);
    const handleModels = (e)=>{
        if(e.target.id === "register"){
            setSignInModal(false);
            setSignUpModal(true);
        }else if(e.target.id === "login"){
            setSignInModal(true);
            setSignUpModal(false);

        }

    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handleModels} id= "register" className={ signUpModal ? "active-btn" : null}>
                        S'inscrire
                    </li>
                    <li onClick={handleModels} id= "login" className={ signInModal ? "active-btn" : null}>
                        se connecter
                    </li>
                </ul>
                {signInModal && <SignInForm/>}
                {signUpModal && <SignUpForm/>}
            </div>
            
        </div>
    );
};

export default Log;