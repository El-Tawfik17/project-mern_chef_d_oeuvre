import React,{ useContext}from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import UploadProfil from '../components/profil/UploadProfil';

const Profil = () => {
    const uid = useContext(UidContext);
     console.log(uid);
    return (
        <div className='profil-page'>
            {
                uid? (
                    <UploadProfil/>
                ):(
                    <div className='log-container'>
                <Log  signup = {false} signin ={true} />
                <div className='img-container'>
                    <img src='./img/log.svg' alt='img-log' />
                </div>


            </div>
                )
            }


            
        </div>
    );
};

export default Profil;