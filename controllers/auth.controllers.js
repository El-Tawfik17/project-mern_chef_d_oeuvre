const UserModel = require('../models/user.model');
require('dotenv').config({path:'./config/.env'});
const jwt =require('jsonwebtoken');
const maxAge = 3*24*60*60*1000;
const {signUpErrors, signInErrors} = require('../utils/errors.utils');

const createToken = (id)=>{
    return jwt.sign({id},process.env.TOKEN_SECRET,{expiresIn : maxAge});
}
module.exports.signUp = async (req,res)=>{
    console.log(req.body);
const {pseudo,email,password}=req.body;

try{
    const user = await UserModel.create({pseudo,email,password});
    res.status(200).json({user: user});
}catch(err){
    const errors = signUpErrors(err)
    res.status(201).send({errors});
}

}
module.exports.signIn = async (req, res)=>{
    try{
        const {email,password}=req.body;
    const user = await UserModel.login(email,password);
    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge});
    res.status(200).json({user});

    }catch(err){
        const errors = signInErrors(err);
        res.status(200).json({errors});
    }
    
}
module.exports.logOut= async (req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}
  
