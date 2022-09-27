module.exports.signUpErrors = (err)=>{
    //object initialization!! 
    let errors ={pseudo : '', email : '', password : ''};
    // output for incorrect pseudo 

    if(err.message.includes("pseudo"))
    errors.pseudo = 'Cet pseudo est incorrect';
        // output for incorrect email 
    if(err.message.includes("email"))
    errors.email ='Cet email est incorrect';
    // output for incorrect password 
    if(err.message.includes("password"))
    errors.password =' Cet mot de passe est incorrect';
    // output error when password already exist
    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo ='Cet pseudo est déja pris';
    // output error when email already exist 
    if(err.code == 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = 'Cet email est déja pris';
     
    return errors;

}

module.exports.signInErrors = (err)=>{
    const errors = {email:'',password:''};
    if(err.message.includes("email"))
    errors.email =" Email incorrect";

    if(err.message.includes("password"))
    errors.password= "Mot de passe incorrect";
    return errors;
}
module.exports.uploadProfilErrors =(err)=>{
    const errors ={file :'',size:''};
    if(err.message.includes("invalid file"))
    errors.file='fichier incompatible';
    if(err.message.includes("max size"))
    errors.size= 'la taille est insupportable';

    return errors;
}